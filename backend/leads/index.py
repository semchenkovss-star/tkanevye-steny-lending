import json
import os
import smtplib
import urllib.parse
import urllib.request
from email.mime.text import MIMEText
from email.header import Header


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


def _send_telegram(text: str) -> bool:
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if not token or not chat_id:
        return False
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
        'disable_web_page_preview': 'true',
    }).encode()
    req = urllib.request.Request(url, data=data)
    with urllib.request.urlopen(req, timeout=8) as resp:
        return resp.status == 200


def _send_email(subject: str, text: str) -> bool:
    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    to = os.environ.get('LEAD_EMAIL_TO')
    if not host or not user or not password or not to:
        return False
    port = int(os.environ.get('SMTP_PORT', '465'))
    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = user
    msg['To'] = to
    if port == 587:
        server = smtplib.SMTP(host, port, timeout=12)
        server.starttls()
    else:
        server = smtplib.SMTP_SSL(host, port, timeout=12)
    with server:
        server.login(user, password)
        server.sendmail(user, [a.strip() for a in to.split(',')], msg.as_string())
    return True


def handler(event: dict, context) -> dict:
    """Приём заявок с сайта: отправляет имя, телефон и источник на почту и в Telegram"""
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
    samples = body.get('samples') or []

    digits = ''.join(ch for ch in phone if ch.isdigit())
    if len(name) < 2 or len(digits) != 11:
        return _cors(400, {'error': 'Проверьте имя и телефон'})

    lines = [
        'Новая заявка с сайта',
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
        lines.append('Образцы: ' + ', '.join(str(s) for s in samples))
    if comment:
        lines.append(f'Комментарий: {comment}')

    text = '\n'.join(lines)

    tg_ok = False
    mail_ok = False
    errors = []

    try:
        tg_ok = _send_telegram(text)
    except Exception as e:
        errors.append(f'telegram: {e}')

    try:
        mail_ok = _send_email(f'Заявка с сайта — {name}', text)
    except Exception as e:
        errors.append(f'email: {e}')

    if errors:
        print('lead delivery errors:', '; '.join(errors))

    if not tg_ok and not mail_ok:
        return _cors(502, {'error': 'Не удалось доставить заявку', 'telegram': tg_ok, 'email': mail_ok})

    return _cors(200, {'ok': True, 'telegram': tg_ok, 'email': mail_ok})
