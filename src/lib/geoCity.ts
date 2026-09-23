import { CITIES, type City } from '@/data/cities';

const GEO_URL = 'https://functions.poehali.dev/d0b8345f-18db-46ae-a8cc-6ee9c00b8556';

/** Город подтверждён или подсказка закрыта — больше не показываем */
const STORAGE_KEY = 'fw-city-confirmed';

export const isCityConfirmed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true; // Нет доступа к хранилищу — не навязываемся
  }
};

export const confirmCity = () => {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* приватный режим — просто не запомним */
  }
};

/** «Санкт-Петербург» и «санкт петербург» — один и тот же город */
const normalize = (s: string) =>
  s.toLowerCase().replace(/ё/g, 'е').replace(/[^а-яa-z]/g, '');

/** Ищет город сайта по названию из геосервиса */
const matchCity = (name: string, region: string): City | null => {
  const n = normalize(name);
  const r = normalize(region);
  if (!n) return null;

  return (
    CITIES.find((c) => normalize(c.name) === n) ??
    // Область: питерский пригород -> Санкт-Петербург
    CITIES.find((c) => r && normalize(c.region) === r) ??
    null
  );
};

/**
 * Город посетителя по IP — только для подсказки.
 * Возвращает null, если город совпадает с текущим, не обслуживается
 * или определить не удалось: в этих случаях подсказка не нужна.
 */
export const detectCity = async (current: City): Promise<City | null> => {
  if (CITIES.length < 2 || isCityConfirmed()) return null;

  try {
    const res = await fetch(GEO_URL, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;

    const { city, region } = (await res.json()) as { city: string; region: string };
    const found = matchCity(city || '', region || '');

    // Подсказываем, только если нашли другой обслуживаемый город
    return found && found.slug !== current.slug ? found : null;
  } catch {
    return null;
  }
};
