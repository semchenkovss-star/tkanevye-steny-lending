"""
Отправка обновлённых страниц на переобход в поисковые системы.

Два канала, оба независимы друг от друга:

1. IndexNow — Яндекс и Bing. Работает сразу, нужен только файл-ключ
   в корне сайта (public/<ключ>.txt). Это официальный способ сказать
   «страница изменилась, приходите за ней».

2. Яндекс Вебмастер, «Переобход страниц» — точечная переотправка адресов
   с учётом суточной квоты. Включается, когда заданы YANDEX_WEBMASTER_TOKEN
   и YANDEX_WEBMASTER_USER_ID.

Google собственного API для переобхода обычных страниц не предоставляет:
его Indexing API принимает только вакансии и трансляции. Для Google
единственный рабочий путь — актуальный sitemap.xml, он уже настроен.

Какие страницы отправлять, функция определяет сама по sitemap.xml:
берёт адреса, у которых дата изменения свежее заданного числа дней.
"""
import json
import os
import re
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

SITE = 'https://fabricwall.ru'
SITEMAP_URL = f'{SITE}/sitemap.xml'
INDEXNOW_KEY = '8028d3ca22c76f5e50942b4e55294902'
INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
WEBMASTER_API = 'https://api.webmaster.yandex.net/v4/user'

# Вебмастер принимает ограниченное число адресов в сутки: шлём самое важное
WEBMASTER_DAILY_LIMIT = 20


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


def _fetch(url: str, data=None, headers=None, method=None, timeout=8):
    req = urllib.request.Request(url, data=data, method=method)
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')
    except Exception as e:
        return 0, str(e)


def _changed_urls(days: int) -> list:
    """Адреса из sitemap.xml, изменённые за последние N дней"""
    status, body = _fetch(SITEMAP_URL, timeout=10)
    if status != 200:
        return []

    edge = (datetime.now(timezone.utc) - timedelta(days=days)).date()
    found = []
    for block in re.findall(r'<url>(.*?)</url>', body, re.S):
        loc = re.search(r'<loc>(.*?)</loc>', block)
        mod = re.search(r'<lastmod>(.*?)</lastmod>', block)
        if not loc:
            continue
        if mod:
            try:
                if datetime.strptime(mod.group(1)[:10], '%Y-%m-%d').date() < edge:
                    continue
            except ValueError:
                pass
        found.append(loc.group(1).strip())
    return found


def _send_indexnow(urls: list) -> dict:
    """Один запрос на все адреса — так требует протокол"""
    payload = json.dumps({
        'host': SITE.replace('https://', ''),
        'key': INDEXNOW_KEY,
        'keyLocation': f'{SITE}/{INDEXNOW_KEY}.txt',
        'urlList': urls,
    }).encode()

    status, text = _fetch(
        INDEXNOW_ENDPOINT,
        data=payload,
        headers={'Content-Type': 'application/json; charset=utf-8'},
        method='POST',
        timeout=10,
    )
    # 200 — принято, 202 — принято, ключ проверяется отдельно
    return {
        'sent': len(urls) if status in (200, 202) else 0,
        'status': status,
        'ok': status in (200, 202),
        'answer': text[:200] if status not in (200, 202) else '',
    }


def _host_id(token: str, user_id: str) -> str:
    status, body = _fetch(
        f'{WEBMASTER_API}/{user_id}/hosts/',
        headers={'Authorization': f'OAuth {token}'},
    )
    if status != 200:
        return ''
    try:
        for h in json.loads(body).get('hosts', []):
            if 'fabricwall.ru' in h.get('ascii_host_url', ''):
                return h.get('host_id', '')
    except (ValueError, AttributeError):
        pass
    return ''


def _send_webmaster(urls: list) -> dict:
    """Переобход страниц: по одному адресу за запрос, с учётом квоты"""
    token = os.environ.get('YANDEX_WEBMASTER_TOKEN', '').strip()
    user_id = os.environ.get('YANDEX_WEBMASTER_USER_ID', '').strip()
    if not token or not user_id:
        return {'enabled': False, 'reason': 'нет доступа: не заданы токен и user id'}

    host = _host_id(token, user_id)
    if not host:
        return {'enabled': True, 'sent': 0, 'error': 'сайт не найден в Вебмастере'}

    sent, errors = 0, []
    for url in urls[:WEBMASTER_DAILY_LIMIT]:
        status, text = _fetch(
            f'{WEBMASTER_API}/{user_id}/hosts/{host}/recrawl/queue/',
            data=json.dumps({'url': url}).encode(),
            headers={
                'Authorization': f'OAuth {token}',
                'Content-Type': 'application/json',
            },
            method='POST',
        )
        if status in (200, 202):
            sent += 1
        else:
            errors.append(f'{url}: {status} {text[:80]}')

    return {'enabled': True, 'sent': sent, 'errors': errors[:3]}


def handler(event: dict, context) -> dict:
    """Отправляет обновлённые страницы сайта на переобход в поисковики"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if event.get('httpMethod') not in ('GET', 'POST'):
        return _cors(405, {'error': 'Метод не поддерживается'})

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except ValueError:
            body = {}

    # Можно передать свои адреса, иначе берём изменённые из карты сайта
    urls = body.get('urls') or []
    days = int(body.get('days') or 7)

    if urls:
        urls = [u if u.startswith('http') else SITE + u for u in urls][:100]
    else:
        urls = _changed_urls(days)

    if not urls:
        return _cors(200, {
            'ok': True,
            'urls': 0,
            'note': f'За последние {days} дн. изменённых страниц нет',
        })

    return _cors(200, {
        'ok': True,
        'urls': len(urls),
        'indexnow': _send_indexnow(urls),
        'webmaster': _send_webmaster(urls),
        'google': 'API переобхода нет — Google берёт страницы из sitemap.xml',
    })
