import { DEFAULT_CITY } from '@/data/cities';

/**
 * Телефон, адрес и часы зависят от города — берите их хуком useContacts()
 * из '@/lib/useContacts'. Константы ниже оставлены как запасной вариант
 * для мест вне React (разметка в index.html, тексты договора и т.п.)
 * и указывают на основной город.
 */
export const PHONE_DISPLAY = DEFAULT_CITY.phoneDisplay;
export const PHONE_HREF = DEFAULT_CITY.phoneHref;
export const WORK_HOURS = DEFAULT_CITY.workHours;
export const ADDRESS = DEFAULT_CITY.address;
export const EMAIL = 'fabricwall@mail.ru';
export const EMAIL_HREF = 'mailto:fabricwall@mail.ru';
export const LEGAL_NAME = 'ИП Семченков С. С.';
export const LEGAL_INN = '325502907547';
export const LEGAL_OGRN = '323320000023952';

export const SOCIALS = [
  { id: 'vk', label: 'ВКонтакте', short: 'VK', icon: '', href: 'https://vk.ru/tihie_steni' },
  { id: 'youtube', label: 'YouTube', short: '', icon: 'Youtube', href: 'https://youtube.com/@tixiesteny' },
  { id: 'rutube', label: 'Rutube', short: 'RT', icon: '', href: 'https://rutube.ru/u/tihiesteni/' },
  { id: 'telegram', label: 'Telegram', short: '', icon: 'Send', href: 'https://t.me/tixie_steny' },
  { id: 'max', label: 'MAX', short: 'MAX', icon: '', href: 'https://max.ru/id325502907547_biz' },
];