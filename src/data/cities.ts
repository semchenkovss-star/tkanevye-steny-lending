/**
 * Справочник городов.
 *
 * Город определяет телефон, адрес и тексты в заголовках. Основной город
 * (isDefault) живёт на корне сайта — fabricwall.ru, остальные в папках:
 * fabricwall.ru/spb. Папки, а не поддомены: так сила основного домена
 * работает на все города сразу.
 *
 * Чтобы добавить город — допишите объект в CITIES и перезапустите
 * scripts/sync-sitemap.mjs, адреса попадут в карту сайта автоматически.
 */
export interface City {
  /** Часть адреса: fabricwall.ru/spb. У основного города пустая строка */
  slug: string;
  /** Именительный падеж: «Санкт-Петербург» */
  name: string;
  /** Предложный падеж для заголовков: «в Санкт-Петербурге» */
  inName: string;
  /** Родительный падеж: «по Санкт-Петербургу» */
  ofName: string;
  phoneDisplay: string;
  phoneHref: string;
  address: string;
  /** Улица и дом отдельно — для разметки schema.org */
  street: string;
  /** Регион для разметки schema.org */
  region: string;
  workHours: string;
  /** Основной город: живёт на корне сайта, без префикса в адресе */
  isDefault?: boolean;
}

export const CITIES: City[] = [
  {
    slug: '',
    name: 'Москва',
    inName: 'в Москве',
    ofName: 'по Москве',
    phoneDisplay: '+7 (495) 797-08-09',
    phoneHref: 'tel:+74957970809',
    address: 'г. Москва, пер. Переведеновский, д. 3',
    street: 'Переведеновский пер., д. 3',
    region: 'Москва',
    workHours: 'Пн–Сб, 9:00–20:00',
    isDefault: true,
  },
];

/*
 * Как добавить город — скопируйте образец в CITIES выше и заполните:
 *
 *  {
 *    slug: 'spb',                       // адрес: fabricwall.ru/spb
 *    name: 'Санкт-Петербург',
 *    inName: 'в Санкт-Петербурге',      // «стены в Санкт-Петербурге»
 *    ofName: 'по Санкт-Петербургу',     // «выезд по Санкт-Петербургу»
 *    phoneDisplay: '+7 (812) 123-45-67',
 *    phoneHref: 'tel:+78121234567',
 *    address: 'г. Санкт-Петербург, ул. Примерная, д. 1',
 *    street: 'ул. Примерная, д. 1',
 *    region: 'Санкт-Петербург',
 *    workHours: 'Пн–Сб, 9:00–20:00',
 *  },
 */

export const DEFAULT_CITY = CITIES.find((c) => c.isDefault) ?? CITIES[0];

/** Город по части адреса: '/spb/catalog' -> город со slug 'spb' */
export const cityBySlug = (slug: string): City =>
  CITIES.find((c) => c.slug && c.slug === slug) ?? DEFAULT_CITY;

/** Адрес страницы с учётом города: ('/catalog', spb) -> '/spb/catalog' */
export const cityPath = (path: string, city: City): string => {
  const clean = path === '/' ? '' : path;
  return city.slug ? `/${city.slug}${clean}` : clean || '/';
};

/** Убирает префикс города из адреса: '/spb/catalog' -> '/catalog' */
export const stripCity = (path: string): { slug: string; rest: string } => {
  const m = /^\/([^/]+)(\/.*)?$/.exec(path);
  const known = m && CITIES.find((c) => c.slug && c.slug === m[1]);
  if (!known) return { slug: '', rest: path };
  return { slug: m[1], rest: m[2] || '/' };
};