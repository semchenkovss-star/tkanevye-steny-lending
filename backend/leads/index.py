import http.client
import json
import re
import os
import smtplib
import socket
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr

import psycopg2


EMAIL_RE = re.compile(r'[^@\s]+@[^@\s]+\.[^@\s]{2,}')

DIRECTIONS = {'Потолки': '🔵', 'Стены': '🟢', 'Акустика': '🟠'}


def _cors(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps(body, ensure_ascii=False),
        'isBase64Encoded': False,
    }


def _q(value: str) -> str:
    return "'" + str(value).replace("'", "''") + "'"


def _save_lead(data: dict) -> int:
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    if not dsn:
        return 0
    conn = psycopg2.connect(dsn, connect_timeout=3)
    conn.autocommit = True
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                f"INSERT INTO {schema}.leads (name, phone, source, summary, address, comment, samples, call_time, page, calc, direction, files, ip, email) "
                f"VALUES ({_q(data['name'])}, {_q(data['phone'])}, {_q(data['source'])}, "
                f"{_q(data['summary'])}, {_q(data['address'])}, {_q(data['comment'])}, {_q(data['samples'])}, "
                f"{_q(data.get('call_time', ''))}, {_q(data.get('page', ''))}, {_q(data.get('calc', ''))}, {_q(data.get('direction', ''))}, {_q(data.get('files', ''))}, {_q(data.get('ip', ''))}, {_q(data.get('email', ''))}) "
                f"RETURNING id"
            )
            lead_id = cur.fetchone()[0]
    conn.close()
    return lead_id


RATE_LIMIT_HOUR = 5
RATE_LIMIT_DAY = 15


def _client_ip(event: dict) -> str:
    ip = ((event.get('requestContext') or {}).get('identity') or {}).get('sourceIp') or ''
    return str(ip)[:64]


def _too_many(ip: str) -> bool:
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    if not dsn or not ip:
        return False
    conn = psycopg2.connect(dsn, connect_timeout=2)
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"SELECT COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '1 hour'), COUNT(*) "
                f"FROM {schema}.leads WHERE ip = {_q(ip)} AND created_at > NOW() - INTERVAL '1 day'"
            )
            hour, day = cur.fetchone()
    finally:
        conn.close()
    return hour >= RATE_LIMIT_HOUR or day >= RATE_LIMIT_DAY


def _mark_delivered(lead_id: int, email_ok: bool, tg_ok: bool, error: str) -> None:
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    if not dsn or not lead_id:
        return
    conn = psycopg2.connect(dsn, connect_timeout=2)
    conn.autocommit = True
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE {schema}.leads SET email_sent = {'TRUE' if email_ok else 'FALSE'}, "
                f"telegram_sent = {'TRUE' if tg_ok else 'FALSE'}, delivery_error = {_q(error)} "
                f"WHERE id = {int(lead_id)}"
            )
    conn.close()


TELEGRAM_IPS = ['149.154.167.220', '149.154.167.99', '149.154.167.51']


def _telegram_request(ip: str, path: str, payload: bytes, timeout: float) -> int:
    """Запрос к api.telegram.org по конкретному IP: часть адресов недоступна с сервера"""
    ctx = ssl.create_default_context()
    raw = socket.create_connection((ip, 443), timeout=timeout)
    try:
        sock = ctx.wrap_socket(raw, server_hostname='api.telegram.org')
        conn = http.client.HTTPSConnection(ip, 443, timeout=timeout, context=ctx)
        conn.sock = sock
        conn.request(
            'POST',
            path,
            body=payload,
            headers={
                'Host': 'api.telegram.org',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': str(len(payload)),
            },
        )
        resp = conn.getresponse()
        status = resp.status
        body = resp.read()[:300]
        conn.close()
        if status != 200:
            print(f'telegram HTTP {status}: {body}')
        return status
    finally:
        try:
            raw.close()
        except Exception:
            pass


def _send_telegram(text: str, deadline: float = 0.0) -> bool:
    """deadline — момент (time.monotonic), после которого перебор прекращается"""
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if not token or not chat_id:
        print('telegram: no token or chat_id')
        return False

    chat_ids = [c.strip() for c in str(chat_id).split(',') if c.strip()]
    path = f'/bot{token}/sendMessage'
    sent = False

    fields = {
        'text': text,
        'parse_mode': 'HTML',
        'disable_web_page_preview': 'true',
    }

    for cid in chat_ids:
        payload = urllib.parse.urlencode({'chat_id': cid, **fields}).encode()
        for ip in TELEGRAM_IPS:
            left = deadline - time.monotonic() if deadline else 1.0
            if left <= 0.2:
                print('telegram: время вышло, пропускаем остальные адреса')
                return sent
            try:
                if _telegram_request(ip, path, payload, min(1.0, left)) == 200:
                    sent = True
                    break
            except Exception as e:
                print(f'telegram {ip} for chat {cid}: {type(e).__name__} {e}')
    return sent


def _send_email(subject: str, text: str, to_client: str = '') -> bool:
    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    to = os.environ.get('LEAD_EMAIL_TO') or ''
    if not host or not user or not password:
        return False

    port = int(os.environ.get('SMTP_PORT', '465'))
    recipients = [a.strip() for a in to.split(',') if a.strip()]
    if 'fabricwall@mail.ru' not in recipients:
        recipients.append('fabricwall@mail.ru')
    if to_client:
        recipients = [to_client]

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = formataddr((str(Header('Fabric Wall', 'utf-8')), user))
    msg['To'] = ', '.join(recipients)
    msg['Reply-To'] = user

    if port == 587:
        server = smtplib.SMTP(host, port, timeout=2)
        server.ehlo()
        server.starttls()
        server.ehlo()
    else:
        server = smtplib.SMTP_SSL(host, port, timeout=2)

    try:
        server.login(user, password)
        server.sendmail(user, recipients, msg.as_string())
    finally:
        try:
            server.quit()
        except Exception:
            pass
    return True


def _client_letter(name: str, summary: str, lead_id: int) -> str:
    lines = [
        f'{name}, здравствуйте!',
        '',
        'Спасибо за интерес к Fabric Wall. Вот расчёт, который вы сделали на сайте:',
        '',
        summary or 'Параметры расчёта не переданы.',
        '',
        'Это ориентировочная стоимость. В неё входят материал, каркас, работа бригады и уборка.',
        'Точную цену фиксируем в смете после бесплатного замера — после этого она не меняется.',
        '',
        'Что дальше:',
        '• ответьте на это письмо, если хотите уточнить ткань, тариф или сроки;',
        '• или запишитесь на замер на сайте https://fabricwall.ru — замерщик привезёт образцы тканей.',
        '',
        'Звонить без вашей просьбы не будем.',
    ]
    if lead_id:
        lines += ['', f'Номер обращения: {lead_id}']
    lines += ['', 'Fabric Wall — натяжные тканевые стены', 'https://fabricwall.ru']
    return '\n'.join(lines)


def handler(event: dict, context) -> dict:
    """Приём заявок с сайта: сохраняет имя и телефон в базу и отправляет на почту и в Telegram"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
            'isBase64Encoded': False,
        }

    if method != 'POST':
        return _cors(405, {'error': 'Method not allowed'})

    body = json.loads(event.get('body') or '{}')

    # Ловушка для ботов: скрытое поле, которое человек не видит и не заполняет.
    # Боту отвечаем «успехом», чтобы он не подбирал обход.
    if str(body.get('website', '')).strip():
        print('honeypot: bot lead dropped')
        return _cors(200, {'ok': True, 'id': 0})
    filled_ms = body.get('filledMs')
    if isinstance(filled_ms, (int, float)) and 0 <= filled_ms < 1500:
        print(f'too fast form: {filled_ms} ms, dropped')
        return _cors(200, {'ok': True, 'id': 0})

    ip = _client_ip(event)
    try:
        if _too_many(ip):
            print(f'rate limit for {ip}')
            return _cors(429, {'error': 'Слишком много заявок подряд. Позвоните нам, пожалуйста.'})
    except Exception as e:
        print('rate check error:', e)

    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    source = str(body.get('source', 'Сайт')).strip()
    city = str(body.get('city', '')).strip()
    ad_source = str(body.get('adSource', '')).strip()
    call_time = str(body.get('callTime', '')).strip()[:60]
    summary = str(body.get('summary', '')).strip()
    page = str(body.get('page', '')).strip()[:500]
    calc = str(body.get('calc', '')).strip()[:2000]
    direction = str(body.get('direction', '')).strip()
    if direction not in DIRECTIONS:
        direction = 'Стены'
    address = str(body.get('address', '')).strip()
    comment = str(body.get('comment', '')).strip()
    samples_list = body.get('samples') or []
    samples = ', '.join(str(s) for s in samples_list)
    files = []
    cdn_prefix = f"https://cdn.poehali.dev/projects/{os.environ.get('AWS_ACCESS_KEY_ID', '')}/bucket/project-uploads/"
    for f in (body.get('files') or [])[:5]:
        if not isinstance(f, dict):
            continue
        url = str(f.get('url', ''))
        if not url.startswith(cdn_prefix):
            continue
        fname = str(f.get('name', 'файл'))[:120]
        size_mb = round(int(f.get('size') or 0) / 1024 / 1024, 1)
        files.append({'name': fname, 'url': url, 'size': size_mb})

    email = str(body.get('email', '')).strip()[:200]
    if email and not EMAIL_RE.fullmatch(email):
        return _cors(400, {'error': 'Проверьте адрес почты'})

    digits = ''.join(ch for ch in phone if ch.isdigit())
    if len(name) < 2:
        return _cors(400, {'error': 'Проверьте имя и телефон'})
    if email and not digits:
        pass
    elif len(digits) != 11:
        return _cors(400, {'error': 'Проверьте имя и телефон'})

    data = {
        'name': name[:200],
        'phone': (phone or 'не указан')[:50],
        'email': email,
        'source': (f'{source} · {city}' if city else source)[:200],
        'summary': summary,
        'address': address,
        'comment': comment,
        'samples': samples,
        'call_time': call_time,
        'page': page,
        'calc': calc,
        'direction': direction,
        'ip': ip,
        'files': '\n'.join(f"{f['name']} — {f['url']}" for f in files),
    }
    # Расчёт уже передан кнопкой калькулятора — не дублируем его
    extra_calc = calc if calc and (not summary or summary not in calc) else ''

    lead_id = 0
    errors = []

    try:
        lead_id = _save_lead(data)
    except Exception as e:
        errors.append(f'db: {e}')
        print('lead save error:', e)

    lines = [
        f'[{direction.upper()}] Новая заявка с сайта Fabric Wall',
        '',
        f'Имя: {name}',
        f'Телефон: {phone or "не указан"}',
        f'Источник: {source}',
    ]
    if email:
        lines.append(f'Почта: {email} — клиент просил смету письмом')
    if page:
        lines.append(f'Страница: {page}')
    if call_time:
        lines.append(f'Удобное время звонка: {call_time}')
    if city:
        lines.append(f'Город: {city}')
    if ad_source:
        lines.append(f'Реклама: {ad_source}')
    if summary:
        lines.append(f'Расчёт: {summary}')
    if extra_calc:
        lines.append(f'Последний расчёт на сайте: {extra_calc}')
    if address:
        lines.append(f'Адрес: {address}')
    if samples:
        lines.append(f'Образцы: {samples}')
    if comment:
        lines.append(f'Комментарий: {comment}')
    if files:
        lines.append('')
        lines.append('Файлы проекта:')
        for f in files:
            lines.append(f"• {f['name']} ({f['size']} МБ): {f['url']}")
    if lead_id:
        lines.append('')
        lines.append(f'Заявка №{lead_id}')

    text = '\n'.join(lines)

    def esc(v: str) -> str:
        return str(v).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    tg_lines = [
        f'{DIRECTIONS[direction]} <b>{direction.upper()}</b>',
        '<b>Новая заявка с сайта Fabric Wall</b>',
        '',
        f'Имя: <b>{esc(name)}</b>',
        f'Телефон: +{digits}' if digits else 'Телефон: не указан',
        f'Источник: {esc(source)}',
    ]
    if email:
        tg_lines.append(f'✉️ Почта: {esc(email)} — клиент просил смету письмом')
    if page:
        tg_lines.append(f'Страница: {esc(page)}')
    if call_time:
        tg_lines.append(f'Удобное время: {esc(call_time)}')
    if city:
        tg_lines.append(f'Город: {esc(city)}')
    if ad_source:
        tg_lines.append(f'Реклама: {esc(ad_source)}')
    if summary:
        tg_lines.append(f'Расчёт: {esc(summary)}')
    if extra_calc:
        tg_lines.append(f'Последний расчёт на сайте: {esc(extra_calc)}')
    if address:
        tg_lines.append(f'Адрес: {esc(address)}')
    if samples:
        tg_lines.append(f'Образцы: {esc(samples)}')
    if comment:
        tg_lines.append(f'Комментарий: {esc(comment)}')
    if files:
        tg_lines.append('')
        tg_lines.append('📎 <b>Файлы проекта:</b>')
        for f in files:
            tg_lines.append(f"• <a href=\"{esc(f['url'])}\">{esc(f['name'])}</a> ({f['size']} МБ)")
    tg_lines.append('')
    if digits:
        tg_lines.append(f'<code>+{digits}</code>')
    if lead_id:
        tg_lines.append(f'Заявка №{lead_id}')

    tg_text = '\n'.join(tg_lines)

    tg_ok = False
    mail_ok = False

    # Лимит функции — 5 секунд. Заявка уже в базе, поэтому уведомления
    # отправляем в оставшееся время и не рискуем ответом клиенту.
    tg_deadline = time.monotonic() + 3.2

    try:
        tg_ok = _send_telegram(tg_text, tg_deadline)
    except Exception as e:
        errors.append(f'telegram: {e}')
        print('telegram error:', e)

    try:
        mail_ok = _send_email(f'[{direction}] Заявка с сайта{" + файлы" if files else ""} — {name}, {phone}', text)
    except Exception as e:
        errors.append(f'email: {e}')
        print('email error:', e)

    client_ok = None
    if email:
        try:
            client_ok = _send_email('Ваш расчёт тканевых стен — Fabric Wall', _client_letter(name, summary or calc, lead_id), to_client=email)
        except Exception as e:
            client_ok = False
            errors.append(f'client email: {e}')
            print('client email error:', e)

    if lead_id:
        try:
            _mark_delivered(lead_id, mail_ok, tg_ok, '; '.join(errors)[:900])
        except Exception as e:
            print('mark error:', e)

    if not lead_id and not tg_ok and not mail_ok:
        return _cors(502, {'error': 'Не удалось принять заявку'})

    return _cors(200, {'ok': True, 'id': lead_id, 'email': mail_ok, 'telegram': tg_ok, 'client': client_ok})