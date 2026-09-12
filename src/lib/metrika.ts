const COUNTER_ID = 112376085;

type YmFn = (id: number, action: string, ...rest: unknown[]) => void;

let lastUrl = typeof window !== 'undefined' ? window.location.href : '';

declare global {
  interface Window {
    ym?: YmFn;
    dataLayer?: unknown[];
  }
}

export const GOALS = {
  LEAD: 'lead',
  PHONE_CLICK: 'phone_click',
  SOCIAL_CLICK: 'social_click',
  CATALOG_VIEW: 'catalog_view',
  FABRIC_VIEW: 'fabric_view',
} as const;

/** Цели, которые считаем один раз за визит — чтобы не накручивать конверсию */
const firedOnce = new Set<string>();

export function reachGoalOnce(goal: string, key?: string, params?: Record<string, unknown>) {
  const id = key ? `${goal}:${key}` : goal;
  if (firedOnce.has(id)) return;
  firedOnce.add(id);
  reachGoal(goal, params);
}

const SOCIAL_HOSTS: Record<string, string> = {
  't.me': 'Telegram',
  'telegram.me': 'Telegram',
  'vk.ru': 'ВКонтакте',
  'vk.com': 'ВКонтакте',
  'max.ru': 'MAX',
  'youtube.com': 'YouTube',
  'rutube.ru': 'Rutube',
};

const socialName = (href: string): string | null => {
  const host = href.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '');
  return SOCIAL_HOSTS[host] || null;
};

/** Отправка цели в Яндекс.Метрику */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
  window.ym(COUNTER_ID, 'reachGoal', goal, params);
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

    const network = socialName(href);
    if (network) reachGoal(GOALS.SOCIAL_CLICK, { network });
  });
}