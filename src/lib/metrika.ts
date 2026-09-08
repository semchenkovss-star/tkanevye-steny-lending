const COUNTER_ID = 112376085;

type YmFn = (id: number, action: string, ...rest: unknown[]) => void;

declare global {
  interface Window {
    ym?: YmFn;
    dataLayer?: unknown[];
  }
}

export const GOALS = {
  LEAD: 'lead',
  PHONE_CLICK: 'phone_click',
} as const;

/** Отправка цели в Яндекс.Метрику */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
  window.ym(COUNTER_ID, 'reachGoal', goal, params);
}

/** Клики по телефону во всех блоках сайта — один слушатель на документ */
export function initPhoneTracking() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest?.('a[href^="tel:"]');
    if (!link) return;
    reachGoal(GOALS.PHONE_CLICK, { place: link.getAttribute('data-goal-place') || 'сайт' });
  });
}
