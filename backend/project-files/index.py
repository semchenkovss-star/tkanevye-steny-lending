import base64
import json
import os
import re
import uuid
from urllib.parse import quote

import boto3

MAX_CHUNK = 2 * 1024 * 1024 + 1024
MAX_FILE = 25 * 1024 * 1024
MAX_PARTS = 13
ALLOWED_EXT = {
    'pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'dwg', 'dxf',
    'zip', 'rar', '7z', 'doc', 'docx', 'xls', 'xlsx', 'skp', 'pln',
}
CONTENT_TYPES = {
    'pdf': 'application/pdf', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png',
    'webp': 'image/webp', 'heic': 'image/heic', 'zip': 'application/zip',
}
CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}


def _resp(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(body, ensure_ascii=False),
        'isBase64Encoded': False,
    }


def _s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )


def _safe_name(name: str) -> str:
    name = os.path.basename(str(name or 'file')).strip()[:120]
    name = re.sub(r'[^\w.\-() ]+', '_', name, flags=re.UNICODE).strip(' .') or 'file'
    return name


def _ext(name: str) -> str:
    return name.rsplit('.', 1)[-1].lower() if '.' in name else ''


def handler(event: dict, context) -> dict:
    """Загрузка плана или чертежа объекта частями: сохраняет файл в хранилище и возвращает ссылку для заявки"""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': '', 'isBase64Encoded': False}
    if method != 'POST':
        return _resp(405, {'error': 'Method not allowed'})

    body = json.loads(event.get('body') or '{}')
    action = body.get('action')

    if action == 'start':
        name = _safe_name(body.get('name', ''))
        size = int(body.get('size') or 0)
        if _ext(name) not in ALLOWED_EXT:
            return _resp(400, {'error': 'Этот формат файла не принимаем'})
        if size <= 0 or size > MAX_FILE:
            return _resp(400, {'error': 'Файл больше 25 МБ'})
        return _resp(200, {'uploadId': uuid.uuid4().hex, 'name': name})

    upload_id = str(body.get('uploadId', ''))
    if not re.fullmatch(r'[0-9a-f]{32}', upload_id):
        return _resp(400, {'error': 'Неверная загрузка'})
    prefix = f'project-uploads/{upload_id}'
    s3 = _s3()

    if action == 'chunk':
        part = int(body.get('part', -1))
        if part < 0 or part >= MAX_PARTS:
            return _resp(400, {'error': 'Файл больше 25 МБ'})
        data = base64.b64decode(body.get('data') or '')
        if not data or len(data) > MAX_CHUNK:
            return _resp(400, {'error': 'Неверная часть файла'})
        s3.put_object(Bucket='files', Key=f'{prefix}/parts/{part:03d}', Body=data)
        return _resp(200, {'ok': True, 'part': part})

    if action == 'finish':
        name = _safe_name(body.get('name', ''))
        parts = int(body.get('parts', 0))
        if _ext(name) not in ALLOWED_EXT or parts < 1 or parts > MAX_PARTS:
            return _resp(400, {'error': 'Неверная загрузка'})
        chunks = []
        total = 0
        for i in range(parts):
            obj = s3.get_object(Bucket='files', Key=f'{prefix}/parts/{i:03d}')
            chunk = obj['Body'].read()
            total += len(chunk)
            if total > MAX_FILE:
                return _resp(400, {'error': 'Файл больше 25 МБ'})
            chunks.append(chunk)
        key = f'{prefix}/{name}'
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=b''.join(chunks),
            ContentType=CONTENT_TYPES.get(_ext(name), 'application/octet-stream'),
            ContentDisposition="attachment; filename*=UTF-8''" + quote(name),
        )
        for i in range(parts):
            try:
                s3.delete_object(Bucket='files', Key=f'{prefix}/parts/{i:03d}')
            except Exception as e:
                print('cleanup error:', e)
        url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{prefix}/{quote(name)}"
        return _resp(200, {'url': url, 'name': name, 'size': total})

    return _resp(400, {'error': 'Неизвестное действие'})
