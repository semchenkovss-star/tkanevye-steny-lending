import { useEffect } from 'react';
import { useLocation } from "@/lib/router-compat";
import { trackPageView } from '@/lib/metrika';

/**
 * Отправляет просмотр страницы в Метрику при переходах внутри сайта.
 * Ждёт кадр, чтобы Seo успел обновить document.title.
 */
const MetrikaPageView = () => {
  const location = useLocation();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const url = window.location.href;
      trackPageView(url);
    }, 80);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default MetrikaPageView;