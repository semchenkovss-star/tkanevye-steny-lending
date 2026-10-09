import { stripCity } from '@/data/cities';

const COUNTER_ID = 112376085;

/** Отдельные счётчики для ключевых страниц (работают вместе с общим) */
const PAGE_COUNTERS: Record<string, number> = {
  '/': 112531578,
  '/ceilings': 113589077,
  '/acoustics': 113589145,
};

const initedPageCounters = new Set<number>();
let lastPageCounterUrl = '';

const pageCounterFor = (pathname: string): number | null => {
  const rest = stripCity(pathname).rest.replace(/\/+$/, '') || '/';
  return PAGE_COUNTERS[rest] ?? null;
};

/** Просмотр в отдельный счётчик страницы: при первом заходе — init, дальше — hit */
export function trackPageCounter(url: string, pathname: string, referer?: string) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
  const id = pageCounterFor(pathname);
  if (!id || url === lastPageCounterUrl) return;
  lastPageCounterUrl = url;
  if (!initedPageCounters.has(id)) {
    initedPageCounters.add(id);
    window.ym(id, 'init', {
      defer: false,
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      url,
      referrer: referer || document.referrer,
    });
    return;
  }
  window.ym(id, 'hit', url, { referer, title: document.title });
}

type YmFn = (id: number, action: string, ...rest: unknown[]) => void;

let lastUrl = typeof window !== 'undefined' ? window.location.href : '';

declare global {
  interface Window {
    ym?: YmFn;
    dataLayer?: unknown[];
  }
}

/**
 * Цели для Яндекс.Метрики и Директа.
 *
 * Ключевые (по ним настраивается оптимизация рекламы):
 *   lead           — заявка отправлена, главная цель
 *   samples_order  — заказ образцов, тоже готовый контакт
 *   phone_click    — клик по телефону, для мобильных = звонок
 *   messenger_click — переход в Telegram или MAX
 *
 * Вспомогательные (для анализа воронки, не для оптимизации):
 *   lead_open, calc_done, catalog_view, fabric_view, samples_open
 *   lead_error — отправка сорвалась, сигнал о проблеме
 */
export const GOALS = {
  LEAD: 'lead',
  LEAD_OPEN: 'lead_open',
  LEAD_ERROR: 'lead_error',
  CALC_DONE: 'calc_done',
  PHONE_CLICK: 'phone_click',
  MESSENGER_CLICK: 'messenger_click',
  SOCIAL_CLICK: 'social_click',
  CATALOG_VIEW: 'catalog_view',
  FABRIC_VIEW: 'fabric_view',
  SAMPLES_OPEN: 'samples_open',
  SAMPLES_ORDER: 'samples_order',
} as const;

/** Цели, которые считаем один раз за визит — чтобы не накручивать конверсию */
const firedOnce = new Set<string>();

export function reachGoalOnce(goal: string, key?: string, params?: Record<string, unknown>) {
  const id = key ? `${goal}:${key}` : goal;
  if (firedOnce.has(id)) return;
  firedOnce.add(id);
  reachGoal(goal, params);
}

/** Мессенджеры — это обращение к менеджеру, считаем отдельной целью */
const MESSENGER_HOSTS: Record<string, string> = {
  't.me': 'Telegram',
  'telegram.me': 'Telegram',
  'max.ru': 'MAX',
  'wa.me': 'WhatsApp',
  'api.whatsapp.com': 'WhatsApp',
};

/** Соцсети — это интерес, но не обращение */
const SOCIAL_HOSTS: Record<string, string> = {
  'vk.ru': 'ВКонтакте',
  'vk.com': 'ВКонтакте',
  'youtube.com': 'YouTube',
  'rutube.ru': 'Rutube',
};

const hostOf = (href: string) =>
  href.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '');

const messengerName = (href: string): string | null => MESSENGER_HOSTS[hostOf(href)] || null;

const socialName = (href: string): string | null => SOCIAL_HOSTS[hostOf(href)] || null;

/** Отправка цели в Яндекс.Метрику */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
  window.ym(COUNTER_ID, 'reachGoal', goal, params);
  const pageId = pageCounterFor(window.location.pathname);
  if (pageId && initedPageCounters.has(pageId)) {
    window.ym(pageId, 'reachGoal', goal, params);
  }
}

/**
 * Просмотр страницы при переходе внутри SPA.
 * Метрика сама считает только первую загрузку, дальше hit нужен вручную.
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
  if (url === lastUrl) return;
  const referer = lastUrl;
  lastUrl = url;
  window.ym(COUNTER_ID, 'hit', url, {
    referer,
    title: title || document.title,
  });
}

/** Клики по телефону и мессенджерам во всех блоках сайта — один слушатель на документ */
export function initPhoneTracking() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href') || '';

    if (href.startsWith('tel:')) {
      reachGoal(GOALS.PHONE_CLICK, { place: link.getAttribute('data-goal-place') || 'сайт' });
      return;
    }

    if (href.startsWith('mailto:')) {
      reachGoal(GOALS.MESSENGER_CLICK, { channel: 'Почта' });
      return;
    }

    const messenger = messengerName(href);
    if (messenger) {
      reachGoal(GOALS.MESSENGER_CLICK, { channel: messenger });
      return;
    }

    const network = socialName(href);
    if (network) reachGoal(GOALS.SOCIAL_CLICK, { network });
  });
}