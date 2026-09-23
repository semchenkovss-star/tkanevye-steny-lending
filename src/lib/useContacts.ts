import { useCity } from '@/lib/city';
import { EMAIL, EMAIL_HREF } from '@/lib/contacts';

/**
 * Контакты текущего города. Заменяет прямой импорт констант:
 *
 *   const { PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } = useContacts();
 *
 * Почта и юридические данные общие для всех городов.
 */
export const useContacts = () => {
  const city = useCity();

  return {
    PHONE_DISPLAY: city.phoneDisplay,
    PHONE_HREF: city.phoneHref,
    WORK_HOURS: city.workHours,
    ADDRESS: city.address,
    EMAIL,
    EMAIL_HREF,
    city,
  };
};
