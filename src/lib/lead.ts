export const LEAD_EVENT = 'polotno:lead';

/** Открыть модальное окно заявки из любой точки страницы */
export function openLead(source = 'Кнопка', summary?: string) {
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { source, summary } }));
}

/** Приведение телефона к маске +7 (___) ___-__-__ */
export function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = '+7';
  if (rest.length > 0) out += ' (' + rest.slice(0, 3);
  if (rest.length > 3) out += ') ' + rest.slice(3, 6);
  if (rest.length > 6) out += '-' + rest.slice(6, 8);
  if (rest.length > 8) out += '-' + rest.slice(8, 10);
  return out;
}

export function isPhoneValid(masked: string): boolean {
  return masked.replace(/\D/g, '').length === 11;
}
const LEADS_URL = 'https://functions.poehali.dev/5590f489-efb2-4d67-be9a-f87d8efe230a';

export interface LeadPayload {
  name: string;
  phone: string;
  source: string;
  summary?: string;
  address?: string;
  comment?: string;
  samples?: string[];
}

/** Отправка заявки на почту и в Telegram */
export async function sendLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(LEADS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}