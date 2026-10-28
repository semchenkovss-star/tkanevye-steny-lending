const UPLOAD_URL = 'https://functions.poehali.dev/17096db6-da1d-4f80-866e-ab2830ecb1e1';
const CHUNK = 1536 * 1024;

export const MAX_FILE_MB = 25;
export const MAX_FILES = 5;
export const FILE_ACCEPT =
  '.pdf,.jpg,.jpeg,.png,.webp,.heic,.dwg,.dxf,.zip,.rar,.7z,.doc,.docx,.xls,.xlsx,.skp,.pln';

export interface UploadedFile {
  name: string;
  url: string;
  size: number;
}

const toBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

const call = async (body: Record<string, unknown>) => {
  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Не удалось загрузить файл');
  return data;
};

export async function uploadProjectFile(
  file: File,
  onProgress?: (share: number) => void,
): Promise<UploadedFile> {
  const start = await call({ action: 'start', name: file.name, size: file.size });
  const parts = Math.max(1, Math.ceil(file.size / CHUNK));
  for (let i = 0; i < parts; i++) {
    const data = await toBase64(file.slice(i * CHUNK, (i + 1) * CHUNK));
    await call({ action: 'chunk', uploadId: start.uploadId, part: i, data });
    onProgress?.((i + 1) / (parts + 1));
  }
  const done = await call({ action: 'finish', uploadId: start.uploadId, name: start.name, parts });
  onProgress?.(1);
  return { name: done.name, url: done.url, size: done.size };
}
