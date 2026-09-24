import { DEFAULT_CITY, cityBySlug, stripCity } from '@/data/cities';
import { GOALS, reachGoal } from '@/lib/metrika';
import { adSourceLabel } from '@/lib/adSource';

export const LEAD_EVENT = 'polotno:lead';

/** Открыть модальное окно заявки из любой точки страницы */
export function openLead(source = 'Кнопка', summary?: string) {
  reachGoal(GOALS.LEAD_OPEN, { source });
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
/** Город текущей страницы: '/spb/catalog' -> 'Санкт-Петербург' */
const currentCityName = () => {
  if (typeof window === 'undefined') return DEFAULT_CITY.name;
  return cityBySlug(stripCity(window.location.pathname).slug).name;
};

const LEADS_URL = 'https://functions.poehali.dev/5590f489-efb2-4d67-be9a-f87d8efe230a';

export interface LeadPayload {
  name: string;
  phone: string;
  source: string;
  /** Город из адреса страницы — менеджеру видно, куда ехать на замер */
  city?: string;
  /** Откуда пришёл посетитель: «Яндекс.Директ, кампания ...» */
  adSource?: string;
  /** Когда посетителю удобно принять звонок */
  callTime?: string;
  summary?: string;
  address?: string;
  comment?: string;
  samples?: string[];
}

/**
 * Варианты времени звонка.
 * Границы совпадают с графиком работы (Пн–Сб, 9:00–20:00), поэтому
 * менеджер не получит просьбу перезвонить, когда офис закрыт.
 */
export const CALL_TIMES = [
  { id: 'asap', label: 'Как можно скорее' },
  { id: 'morning', label: 'Утром, 9:00–12:00' },
  { id: 'day', label: 'Днём, 12:00–17:00' },
  { id: 'evening', label: 'Вечером, 17:00–20:00' },
] as const;

/** Отправка заявки на почту и в Telegram */
export async function sendLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(LEADS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: currentCityName(), adSource: adSourceLabel(), ...payload }),
    });
    if (res.ok) {
      reachGoal(GOALS.LEAD, { source: payload.source, city: currentCityName() });
    } else {
      reachGoal(GOALS.LEAD_ERROR, { source: payload.source, status: res.status });
    }
    return res.ok;
  } catch {
    reachGoal(GOALS.LEAD_ERROR, { source: payload.source, status: 'network' });
    return false;
  }
}