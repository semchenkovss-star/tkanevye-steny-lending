/**
 * Запоминает, откуда пришёл посетитель.
 *
 * Человек часто приходит по объявлению, уходит подумать и возвращается
 * напрямую — метка в адресе теряется. Без неё заявка выглядит как
 * «прямой заход», и реклама кажется бесполезной. Поэтому метку
 * сохраняем на 30 дней и прикладываем к заявке.
 */
const KEY = 'fw-ad-source';
const TTL_DAYS = 30;

interface AdSource {
  /** utm_source: yandex, google, vk */
  source: string;
  /** utm_campaign: название кампании */
  campaign: string;
  /** Ключевая фраза или идентификатор объявления */
  term: string;
  /** Метка Директа — по ней ищут визит в Метрике */
  clickId: string;
  savedAt: number;
}

const read = (): AdSource | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as AdSource;
    const age = (Date.now() - data.savedAt) / 86400000;
    return age > TTL_DAYS ? null : data;
  } catch {
    return null;
  }
};

/** Снимает метки из адреса при первом заходе */
export const captureAdSource = () => {
  if (typeof window === 'undefined') return;

  const p = new URLSearchParams(window.location.search);
  const source = p.get('utm_source') || '';
  const clickId = p.get('yclid') || p.get('gclid') || '';

  // Ни меток, ни идентификатора клика — заход не рекламный
  if (!source && !clickId) return;

  const data: AdSource = {
    source,
    campaign: p.get('utm_campaign') || '',
    term: p.get('utm_term') || '',
    clickId,
    savedAt: Date.now(),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* приватный режим — метка не сохранится, это не критично */
  }
};

/** Короткая строка для письма менеджеру: «Яндекс.Директ, кампания Стены-Москва» */
export const adSourceLabel = (): string => {
  const d = read();
  if (!d) return '';

  const names: Record<string, string> = {
    yandex: 'Яндекс.Директ',
    google: 'Google Ads',
    vk: 'ВКонтакте',
  };
  const parts = [names[d.source] || d.source || 'Реклама'];
  if (d.campaign) parts.push(`кампания ${d.campaign}`);
  if (d.term) parts.push(`запрос «${d.term}»`);

  return parts.join(', ');
};
