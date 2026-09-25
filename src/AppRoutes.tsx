import { Suspense, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import CookieNotice from '@/components/site/CookieNotice';
import MetrikaPageView from '@/components/MetrikaPageView';
import { initPhoneTracking } from '@/lib/metrika';
import { captureAdSource } from '@/lib/adSource';
import { ROUTES, NOT_FOUND } from '@/routes';
import { CityProvider } from '@/lib/city';
import CityHint from '@/components/site/CityHint';
import { CITIES } from '@/data/cities';

/** Города, живущие в папке: у основного slug пустой, он уже на корне */
const CITY_SLUGS = CITIES.filter((c) => c.slug).map((c) => c.slug);

const queryClient = new QueryClient();

/**
 * Содержимое приложения без маршрутизатора.
 *
 * Маршрутизатор подключается снаружи: в браузере — BrowserRouter (App.tsx),
 * при сборке страниц — StaticRouter (scripts/prerender.mjs). Так один и тот же
 * код даёт одинаковую разметку и на сервере, и у посетителя.
 */
const AppRoutes = () => {
  useEffect(() => {
    captureAdSource();
    initPhoneTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CityProvider>
          <MetrikaPageView />
          <CityHint />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              {/* Список страниц — в src/routes.tsx: он общий для браузера и пререндера */}
              {ROUTES.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              {/* Те же страницы в папке города: /spb, /spb/catalog и т.д. */}
              {CITY_SLUGS.map((slug) =>
                ROUTES.map(({ path, Component }) => (
                  <Route
                    key={`${slug}${path}`}
                    path={`/${slug}${path === '/' ? '' : path}`}
                    element={<Component />}
                  />
                )),
              )}
              <Route path="*" element={<NOT_FOUND.Component />} />
            </Routes>
          </Suspense>
          <CookieNotice />
        </CityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppRoutes;
