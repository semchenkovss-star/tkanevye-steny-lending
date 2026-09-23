import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CITIES, DEFAULT_CITY, cityBySlug, stripCity, type City } from '@/data/cities';

/**
 * Текущий город берётся из адреса страницы — это главный источник правды.
 * Так у каждого города свой адрес в поиске, а ссылкой можно поделиться:
 * получатель увидит тот же город, что и отправитель.
 *
 * Выбор в переключателе просто ведёт на адрес другого города,
 * поэтому ничего хранить в браузере не нужно.
 */
const CityContext = createContext<City>(DEFAULT_CITY);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const city = useMemo(() => cityBySlug(stripCity(pathname).slug), [pathname]);

  return <CityContext.Provider value={city}>{children}</CityContext.Provider>;
};

export const useCity = () => useContext(CityContext);

/** Адрес текущей страницы в другом городе — для переключателя */
export const useCityUrls = () => {
  const { pathname } = useLocation();
  const { rest } = stripCity(pathname);

  return CITIES.map((c) => ({
    city: c,
    href: c.slug ? `/${c.slug}${rest === '/' ? '' : rest}` : rest,
  }));
};
