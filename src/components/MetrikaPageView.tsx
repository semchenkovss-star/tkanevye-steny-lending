import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageCounter, trackPageView } from '@/lib/metrika';

/**
 * Отправляет просмотр страницы в Метрику при переходах внутри сайта.
 * Ждёт кадр, чтобы Seo успел обновить document.title.
 */
const MetrikaPageView = () => {
  const location = useLocation();
  const prevUrl = useRef(document.referrer);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const url = window.location.href;
      trackPageView(url);
      trackPageCounter(url, window.location.pathname, prevUrl.current);
      prevUrl.current = url;
    }, 80);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default MetrikaPageView;