import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import SocialLinks from '@/components/site/SocialLinks';
import {
  ADDRESS,
  EMAIL,
  EMAIL_HREF,
  LEGAL_INN,
  LEGAL_NAME,
  LEGAL_OGRN,
  PHONE_DISPLAY,
  PHONE_HREF,
} from '@/lib/contacts';
import Logo from '@/components/site/Logo';

const COLUMNS = [
  {
    title: 'Разделы',
    links: [
      { href: '#services', label: 'Услуги' },
      { href: '/ceilings', label: 'Тканевые потолки' },
      { href: '/acoustics', label: 'Акустика под ключ' },
      { href: '#what', label: 'Что это такое' },
      { href: '#how', label: 'Как проходит монтаж' },
      { href: '/catalog', label: 'Каталог' },
      { href: '#cases', label: 'Проекты' },
    ],
  },
  {
    title: 'Помощь',
    links: [
      { href: '#price', label: 'Тарифы и цены' },
      { href: '#faq', label: 'Частые вопросы' },
      { href: '#reviews', label: 'Отзывы' },
      { href: '#blog', label: 'Блог' },
      { href: '#about', label: 'О компании' },
    ],
  },
];

const Footer = () => {
  const { pathname } = useLocation();
  const prefix = pathname === '/' ? '' : '/';

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="shell py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo to="/" size="lg" tone="inverted" />
            <p className="mt-4 max-w-[26em] text-[0.95rem] leading-[1.6] text-background/60">
              Натяжные тканевые стены и потолки на скрытом каркасе. Тихие стены, которые гасят эхо и
              шум соседей. Москва и область, монтаж за один-два дня без пыли и мокрых работ.
            </p>
            <button
              type="button"
              onClick={() => openLead('Футер')}
              className="mt-8 bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              Вызвать замерщика
            </button>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="lg:col-span-2">
              <h3 className="font-display text-xl uppercase tracking-wide text-background">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) =>
                  l.href.startsWith('/') ? (
                    <li key={l.href}>
                      <Link
                        to={l.href}
                        className="-my-1.5 inline-flex min-h-[44px] items-center py-1.5 text-sm text-background/60 transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <a
                        href={prefix + l.href}
                        className="-my-1.5 inline-flex min-h-[44px] items-center py-1.5 text-sm text-background/60 transition-colors hover:text-primary"
                      >
                        {l.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h3 className="font-display text-xl uppercase tracking-wide">Контакты</h3>
            <ul className="mt-5 space-y-4 text-sm text-background/70">
              <li className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="text-primary" />
                <a
                  href={PHONE_HREF}
                  className="-my-1.5 inline-flex min-h-[44px] items-center py-1.5 font-display text-lg tracking-[0.02em] text-background transition-colors hover:text-primary"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href={EMAIL_HREF} className="-my-1.5 inline-flex min-h-[44px] items-center py-1.5 transition-colors hover:text-primary">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="mt-0.5 text-primary" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Clock" size={16} className="mt-0.5 text-primary" />
                <span>Пн—Сб, 9:00—20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-background/15 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="font-display text-base uppercase tracking-[0.14em] text-background/80">
              Адрес
            </h4>
            <p className="mt-3 text-xs leading-[1.7] text-background/55">{ADDRESS}</p>
          </div>
          <div>
            <h4 className="font-display text-base uppercase tracking-[0.14em] text-background/80">
              Реквизиты
            </h4>
            <ul className="mt-3 space-y-1 text-xs leading-[1.7] text-background/55">
              <li>{LEGAL_NAME}</li>
              <li>ИНН {LEGAL_INN}</li>
              <li>ОГРН {LEGAL_OGRN}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base uppercase tracking-[0.14em] text-background/80">
              Почта
            </h4>
            <a
              href={EMAIL_HREF}
              className="mt-2 inline-flex min-h-[44px] items-center text-xs leading-[1.7] text-background/55 transition-colors hover:text-primary"
            >
              {EMAIL}
            </a>
            <h4 className="mt-6 font-display text-base uppercase tracking-[0.14em] text-background/80">
              Мы в соцсетях
            </h4>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-background/15 pt-8 text-xs text-background/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© Тканевыестены.рус 2026</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="-my-1.5 inline-flex min-h-[44px] items-center py-1.5 transition-colors hover:text-primary">
              Политика конфиденциальности
            </Link>
            <span>Информация на сайте не является публичной офертой.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;