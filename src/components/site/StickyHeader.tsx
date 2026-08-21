import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const LINKS = [
  { href: '#pain', label: 'Проблема' },
  { href: '#what', label: 'Что это' },
  { href: '#how', label: 'Монтаж' },
  { href: '#fabrics', label: 'Ткани' },
  { href: '#cases', label: 'Объекты' },
  { href: '#price', label: 'Цены' },
  { href: '#faq', label: 'Вопросы' },
];

const StickyHeader = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-6 px-6 lg:px-10">
          <a href="#top" className="font-display text-xl uppercase tracking-[0.16em]">
            Полотно
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openLead('Шапка')}
              className="hidden bg-primary px-5 py-3 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground sm:block"
            >
              Бесплатный замер
            </button>
            <button
              type="button"
              aria-label="Меню"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <span className="font-display text-xl uppercase tracking-[0.16em]">Полотно</span>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center border border-border"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-3xl uppercase tracking-wide text-foreground"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openLead('Мобильное меню');
              }}
              className="mt-8 bg-primary px-6 py-4 font-display text-2xl uppercase tracking-[0.04em] text-primary-foreground"
            >
              Бесплатный замер
            </button>
            <a
              href="tel:+74951234567"
              className="mt-4 text-center text-muted-foreground"
            >
              +7 (495) 123-45-67
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default StickyHeader;
