import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Seo from '@/components/Seo';
import Footer from '@/components/site/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contacts';

const LINKS = [
  { to: '/', label: 'Главная', icon: 'Home' },
  { to: '/catalog', label: 'Каталог тканей', icon: 'Layers' },
  { to: '/ceilings', label: 'Натяжные потолки', icon: 'PanelTop' },
  { to: '/acoustics', label: 'Акустика под ключ', icon: 'Volume2' },
  { to: '/blog', label: 'Блог', icon: 'BookOpen' },
];

const PageNotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Seo
        title="Страница не найдена — 404 | Fabric Wall"
        description="Такой страницы нет. Вернитесь на главную или выберите нужный раздел сайта."
        path={location.pathname}
        noindex
      />

      <main className="shell flex flex-1 flex-col justify-center py-20 sm:py-28">
        <span className="font-display text-sm tracking-[0.2em] text-primary-ink">404</span>
        <h1 className="mt-4 max-w-[12em] font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.5rem]">
          Такой страницы нет
        </h1>
        <p className="mt-6 max-w-[34em] text-base leading-[1.6] text-muted-foreground">
          Возможно, ссылка устарела или в адресе опечатка. Выберите нужный раздел — или позвоните
          нам, подскажем.
        </p>

        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center gap-4 bg-card p-6 transition-colors hover:bg-secondary"
            >
              <Icon name={l.icon} size={22} className="shrink-0 text-primary-ink" />
              <span className="flex-1 font-display text-xl uppercase tracking-wide">{l.label}</span>
              <Icon
                name="ArrowRight"
                size={18}
                className="text-muted-foreground transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>

        <a
          href={PHONE_HREF}
          className="mt-10 flex items-center gap-3 font-display text-[1.75rem] uppercase leading-none tracking-[0.01em] text-foreground transition-colors hover:text-primary-ink sm:text-[2.25rem]"
        >
          <Icon name="Phone" size={24} className="text-primary-ink" />
          {PHONE_DISPLAY}
        </a>
      </main>

      <Footer />
    </div>
  );
};

export default PageNotFound;
