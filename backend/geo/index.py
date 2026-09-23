import json
import os
import urllib.request
import urllib.error


def _cors(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            # Ответ зависит от IP — свой для каждого посетителя, но 6 часов стабилен
            'Cache-Control': 'private, max-age=21600',
        },
        'isBase64Encoded': False,
        'body': json.dumps(body, ensure_ascii=False),
    }


def _client_ip(event: dict) -> str:
    """IP посетителя: сначала заголовок прокси, потом данные платформы."""
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}

    forwarded = headers.get('x-forwarded-for', '')
    if forwarded:
        # Первый адрес в цепочке — исходный клиент
        return forwarded.split(',')[0].strip()

    ctx = event.get('requestContext') or {}
    return ((ctx.get('identity') or {}).get('sourceIp') or '').strip()


def _lookup(ip: str) -> dict:
    """Город по IP через ip-api.com. Без ключа, до 45 запросов в минуту."""
    url = (
        f'http://ip-api.com/json/{ip}'
        '?fields=status,country,countryCode,regionName,city&lang=ru'
    )
    req = urllib.request.Request(url, headers={'User-Agent': 'fabricwall-geo/1.0'})

    with urllib.request.urlopen(req, timeout=3) as resp:
        return json.loads(resp.read().decode('utf-8'))


def handler(event: dict, context) -> dict:
    """Определяет город посетителя по IP-адресу.

    Нужен для подсказки «Ваш город — Санкт-Петербург?». Сайт работает по
    HTTPS, а бесплатный геосервис отвечает только по HTTP, поэтому запрос
    идёт через эту функцию. Переадресация не делается: город только
    предлагается, выбор остаётся за посетителем.

    Ответ: {"city": "Санкт-Петербург", "region": "...", "country": "RU"}
    При любой ошибке возвращает город пустым — подсказка просто не покажется.
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'GET':
        return _cors(405, {'error': 'Метод не поддерживается'})

    # ?ip= — только для отладки, обычный посетитель этот параметр не шлёт
    params = event.get('queryStringParameters') or {}
    ip = (params.get('ip') or '').strip() or _client_ip(event)

    if not ip or ip.startswith(('127.', '10.', '192.168.', '172.16.')):
        return _cors(200, {'city': '', 'region': '', 'country': ''})

    try:
        data = _lookup(ip)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError):
        return _cors(200, {'city': '', 'region': '', 'country': ''})

    if data.get('status') != 'success':
        return _cors(200, {'city': '', 'region': '', 'country': ''})

    return _cors(
        200,
        {
            'city': data.get('city') or '',
            'region': data.get('regionName') or '',
            'country': data.get('countryCode') or '',
        },
    )
