import http.client
import json
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
                f"INSERT INTO {schema}.leads (name, phone, source, summary, address, comment, samples) "
                f"VALUES ({_q(data['name'])}, {_q(data['phone'])}, {_q(data['source'])}, "
                f"{_q(data['summary'])}, {_q(data['address'])}, {_q(data['comment'])}, {_q(data['samples'])}) "
                f"RETURNING id"
            )
            lead_id = cur.fetchone()[0]
    conn.close()
    return lead_id


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


def _send_telegram(text: str, phone_digits: str = '') -> bool:
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
    if phone_digits:
        fields['reply_markup'] = json.dumps({
            'inline_keyboard': [[
                {'text': '💬 WhatsApp', 'url': f'https://wa.me/{phone_digits}'},
                {'text': '✈️ Telegram', 'url': f'https://t.me/+{phone_digits}'},
            ]]
        })

    for cid in chat_ids:
        payload = urllib.parse.urlencode({'chat_id': cid, **fields}).encode()
        for ip in TELEGRAM_IPS:
            try:
                if _telegram_request(ip, path, payload, 2.5) == 200:
                    sent = True
                    break
            except Exception as e:
                print(f'telegram {ip} for chat {cid}: {type(e).__name__} {e}')
    return sent


def _send_email(subject: str, text: str) -> bool:
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

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = formataddr((str(Header('Fabric Wall', 'utf-8')), user))
    msg['To'] = ', '.join(recipients)
    msg['Reply-To'] = user

    if port == 587:
        server = smtplib.SMTP(host, port, timeout=8)
        server.ehlo()
        server.starttls()
        server.ehlo()
    else:
        server = smtplib.SMTP_SSL(host, port, timeout=8)

    try:
        server.login(user, password)
        server.sendmail(user, recipients, msg.as_string())
    finally:
        try:
            server.quit()
        except Exception:
            pass
    return True


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

    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    source = str(body.get('source', 'Сайт')).strip()
    summary = str(body.get('summary', '')).strip()
    address = str(body.get('address', '')).strip()
    comment = str(body.get('comment', '')).strip()
    samples_list = body.get('samples') or []
    samples = ', '.join(str(s) for s in samples_list)

    digits = ''.join(ch for ch in phone if ch.isdigit())
    if len(name) < 2 or len(digits) != 11:
        return _cors(400, {'error': 'Проверьте имя и телефон'})

    data = {
        'name': name[:200],
        'phone': phone[:50],
        'source': source[:200],
        'summary': summary,
        'address': address,
        'comment': comment,
        'samples': samples,
    }

    lead_id = 0
    errors = []

    try:
        lead_id = _save_lead(data)
    except Exception as e:
        errors.append(f'db: {e}')
        print('lead save error:', e)

    lines = [
        'Новая заявка с сайта Fabric Wall',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
        f'Источник: {source}',
    ]
    if summary:
        lines.append(f'Расчёт: {summary}')
    if address:
        lines.append(f'Адрес: {address}')
    if samples:
        lines.append(f'Образцы: {samples}')
    if comment:
        lines.append(f'Комментарий: {comment}')
    if lead_id:
        lines.append('')
        lines.append(f'Заявка №{lead_id}')

    text = '\n'.join(lines)

    def esc(v: str) -> str:
        return str(v).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    tg_lines = [
        '<b>Новая заявка с сайта Fabric Wall</b>',
        '',
        f'Имя: <b>{esc(name)}</b>',
        f'Телефон: <a href="tel:+{digits}"><b>{esc(phone)}</b></a>',
        f'Источник: {esc(source)}',
    ]
    if summary:
        tg_lines.append(f'Расчёт: {esc(summary)}')
    if address:
        tg_lines.append(f'Адрес: {esc(address)}')
    if samples:
        tg_lines.append(f'Образцы: {esc(samples)}')
    if comment:
        tg_lines.append(f'Комментарий: {esc(comment)}')
    tg_lines.append('')
    tg_lines.append(f'<code>+{digits}</code> — нажмите, чтобы скопировать')
    if lead_id:
        tg_lines.append(f'Заявка №{lead_id}')

    tg_text = '\n'.join(tg_lines)

    tg_ok = False
    mail_ok = False

    try:
        tg_ok = _send_telegram(tg_text, digits)
    except Exception as e:
        errors.append(f'telegram: {e}')
        print('telegram error:', e)

    try:
        mail_ok = _send_email(f'Заявка с сайта — {name}, {phone}', text)
    except Exception as e:
        errors.append(f'email: {e}')
        print('email error:', e)

    if lead_id:
        try:
            _mark_delivered(lead_id, mail_ok, tg_ok, '; '.join(errors)[:900])
        except Exception as e:
            print('mark error:', e)

    if not lead_id and not tg_ok and not mail_ok:
        return _cors(502, {'error': 'Не удалось принять заявку'})

    return _cors(200, {'ok': True, 'id': lead_id, 'email': mail_ok, 'telegram': tg_ok})