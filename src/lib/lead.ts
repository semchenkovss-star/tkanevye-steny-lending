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

const CALC_KEY = 'fw:last-calc';

/** Запомнить последний расчёт в калькуляторе — он уйдёт с любой заявкой за визит */
export function rememberCalc(name: string, summary: string) {
  try {
    sessionStorage.setItem(CALC_KEY, `${name}: ${summary}`);
  } catch {
    /* хранилище недоступно — просто не запоминаем */
  }
}

const lastCalc = (): string => {
  try {
    return sessionStorage.getItem(CALC_KEY) || '';
  } catch {
    return '';
  }
};

/** Страница, с которой отправлена заявка: «Потолки — fabricwall.ru/ceilings» */
const currentPage = (): string => {
  if (typeof window === 'undefined') return '';
  const title = document.title.split('|')[0].trim();
  const url = window.location.host + window.location.pathname;
  return title ? `${title} — ${url}` : url;
};

export type LeadDirection = 'Потолки' | 'Стены' | 'Акустика';

const directionByText = (text: string): LeadDirection | null => {
  const t = text.toLowerCase();
  if (/потол/.test(t)) return 'Потолки';
  if (/акусти|эхо|звукоизол|шумоизол/.test(t)) return 'Акустика';
  return null;
};

/**
 * Направление заявки — кому из менеджеров её передать.
 * Сначала кнопка и расчёт, затем раздел сайта, затем тема статьи и последний расчёт.
 * Всё остальное — тканевые стены, основное направление.
 */
const leadDirection = (payload: LeadPayload): LeadDirection => {
  const own = directionByText(`${payload.source} ${payload.summary || ''}`);
  if (own) return own;
  const path = stripCity(window.location.pathname).rest;
  if (path.startsWith('/ceilings')) return 'Потолки';
  if (path.startsWith('/acoustics')) return 'Акустика';
  if (path.startsWith('/blog/')) {
    const fromPost = directionByText(document.title.split('|')[0]);
    if (fromPost) return fromPost;
  }
  if (path === '/' || path.startsWith('/catalog') || path.startsWith('/panels') || path.startsWith('/arhitekturnyj-tekstil')) {
    return 'Стены';
  }
  return directionByText(lastCalc()) ?? 'Стены';
};

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
      body: JSON.stringify({
        city: currentCityName(),
        adSource: adSourceLabel(),
        page: currentPage(),
        calc: lastCalc(),
        direction: leadDirection(payload),
        ...payload,
      }),
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