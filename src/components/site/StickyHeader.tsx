import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import CalcButton from '@/components/site/CalcButton';
import { PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } from '@/lib/contacts';
import Logo from '@/components/site/Logo';

const LINKS = [
  { href: '#services', label: 'Услуги' },
  { href: '/ceilings', label: 'Потолки' },
  { href: '/acoustics', label: 'Акустика' },
  { href: '/catalog', label: 'Каталог' },
  { href: '#what', label: 'Что это' },
  { href: '#how', label: 'Монтаж' },
  { href: '#cases', label: 'Проекты' },
  { href: '#price', label: 'Цены' },
  { href: '#calc', label: 'Калькулятор' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#blog', label: 'Блог' },
];

const StickyHeader = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Logo to="#top" size="sm" />

          <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 xl:flex xl:gap-x-5">
            {LINKS.map((l) =>
              l.href.startsWith('/') ? (
                <Link key={l.href} to={l.href} className="nav-link">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="nav-link">
                  {l.label}
                </a>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 font-display text-lg uppercase tracking-[0.02em] text-foreground transition-colors hover:text-primary-ink md:flex"
            >
              <Icon name="Phone" size={17} className="text-primary-ink" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={PHONE_HREF}
              aria-label="Позвонить"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              <Icon name="Phone" size={18} />
            </a>
            <CalcButton to="#calc" className="hidden md:flex" />
            <button
              type="button"
              onClick={() => openLead('Шапка')}
              className="hidden bg-primary px-5 py-3 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover sm:block"
            >
              Замер
            </button>
            <button
              type="button"
              aria-label="Меню"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary xl:hidden"
            >
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in xl:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-5 sm:px-8">
            <Logo to="#top" size="sm" />
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center border border-border"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4 sm:px-8">
            {LINKS.map((l) =>
              l.href.startsWith('/') ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-3xl uppercase tracking-wide text-foreground"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-3xl uppercase tracking-wide text-foreground"
                >
                  {l.label}
                </a>
              ),
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openLead('Мобильное меню');
              }}
              className="mt-8 bg-primary px-6 py-4 font-display text-2xl uppercase tracking-[0.04em] text-primary-foreground"
            >
              Замер
            </button>
            <a
              href="#calc"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 border border-border py-4 font-display text-2xl uppercase tracking-[0.04em] text-foreground"
            >
              <Icon name="Calculator" size={20} className="text-primary" />
              Рассчитать
            </a>
            <a
              href={PHONE_HREF}
              className="mt-6 flex items-center justify-center gap-2 border border-border py-4 font-display text-2xl uppercase tracking-[0.02em] text-foreground"
            >
              <Icon name="Phone" size={20} className="text-primary-ink" />
              {PHONE_DISPLAY}
            </a>
            <span className="mt-3 text-center text-xs text-muted-foreground">{WORK_HOURS}</span>
          </nav>
        </div>
      )}
    </>
  );
};

export default StickyHeader;