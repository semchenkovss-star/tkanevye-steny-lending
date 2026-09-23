import { lazy, type ComponentType } from 'react';
import Index from './pages/Index';

type PageModule = { default: ComponentType };

export type RouteDef = {
  path: string;
  Component: ComponentType;
  load: () => Promise<PageModule>;
};

/**
 * Единый список страниц: по нему строятся и маршруты в браузере,
 * и заранее отрисованные HTML-файлы при сборке.
 */
export const ROUTES: RouteDef[] = [
  {
    path: '/',
    Component: Index,
    load: async () => ({ default: Index }),
  },
  {
    path: '/catalog',
    Component: lazy(() => import('./pages/Catalog')),
    load: () => import('./pages/Catalog'),
  },
  {
    path: '/acoustics',
    Component: lazy(() => import('./pages/Acoustics')),
    load: () => import('./pages/Acoustics'),
  },
  {
    path: '/panels',
    Component: lazy(() => import('./pages/Panels')),
    load: () => import('./pages/Panels'),
  },
  {
    path: '/ceilings',
    Component: lazy(() => import('./pages/Ceilings')),
    load: () => import('./pages/Ceilings'),
  },
  {
    path: '/blog',
    Component: lazy(() => import('./pages/Blog')),
    load: () => import('./pages/Blog'),
  },
  {
    path: '/blog/:slug',
    Component: lazy(() => import('./pages/BlogPost')),
    load: () => import('./pages/BlogPost'),
  },
  {
    path: '/privacy',
    Component: lazy(() => import('./pages/Privacy')),
    load: () => import('./pages/Privacy'),
  },
  {
    path: '/documents',
    Component: lazy(() => import('./pages/Documents')),
    load: () => import('./pages/Documents'),
  },
];

export const NOT_FOUND: RouteDef = {
  path: '*',
  Component: lazy(() => import('./pages/PageNotFound')),
  load: () => import('./pages/PageNotFound'),
};
