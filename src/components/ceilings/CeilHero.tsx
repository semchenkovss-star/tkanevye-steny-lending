import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contacts';
import { CEIL_IMG } from '@/lib/ceilings';

const NAV = [
  { href: '#ceil-what', label: 'Технология' },
  { href: '#ceil-how', label: 'Монтаж' },
  { href: '#ceil-price', label: 'Цены' },
];

const CeilHero = () => (
  <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 hidden w-[43%] overflow-hidden md:block"
    >
      <img
        src={CEIL_IMG.hero}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/45" />
      <div className="absolute bottom-10 left-10 z-[2] max-w-[15em] text-[0.8rem] leading-[1.45] tracking-[0.02em] text-background">
        <b className="mb-2.5 block font-display text-[2.4rem] leading-none tracking-[0.01em] font-normal">
          до 500 л
        </b>
        Полотно удерживает воду при протечке сверху и не пускает её в комнату — ремонт переделывать
        не нужно.
      </div>
    </div>

    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-24 overflow-hidden md:hidden"
    >
      <img src={CEIL_IMG.hero} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-foreground/45" />
    </div>

    <div className="shell-left relative z-[3] flex min-h-[100svh] w-full flex-col pb-28 pr-5 pt-7 sm:pr-8 md:w-[57%] md:pb-14 md:pr-14 md:pt-11">
      <header className="rule-bottom flex items-baseline justify-between gap-6 pb-4">
        <Link to="/" className="font-display text-xl uppercase tracking-[0.16em] text-foreground">
          Натяжные потолки
        </Link>
        <nav className="hidden gap-7 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={PHONE_HREF}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="Phone" size={16} />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Позвонить</span>
        </a>
      </header>

      <div className="flex flex-1 flex-col justify-center py-10 md:py-0">
        <div
          className="mb-6 text-xs uppercase tracking-[0.14em] text-muted-foreground animate-fade-in"
          style={{ animationDelay: '80ms' }}
        >
          Бесшовные натяжные потолки в Москве
        </div>
        <h1
          className="max-w-[11.2em] font-display text-[clamp(2.4rem,8.5vw,3.25rem)] uppercase leading-[0.98] tracking-[0.005em] text-foreground animate-fade-in sm:text-[4.5rem] lg:text-[5.4rem]"
          style={{ animationDelay: '160ms' }}
        >
          Идеальный потолок
          <br />
          за один день.
          <br />
          <span className="text-muted-foreground">Без штукатурки и пыли</span>
        </h1>
        <p
          className="my-3.5 max-w-[30em] px-1.5 text-left text-base leading-[1.55] text-muted-foreground animate-fade-in"
          style={{ animationDelay: '260ms' }}
        >
          Бесшовное полотно натягивается на скрытый багет по периметру. Трещины, стыки плит и перепады
          уходят за один день, свет ставим там, где нужно вам.
        </p>
      </div>

      <div
        className="rule-top flex flex-col items-start gap-5 pt-6 animate-fade-in sm:flex-row sm:items-end sm:gap-8"
        style={{ animationDelay: '360ms' }}
      >
        <a
          href="#ceil-calc"
          className="whitespace-nowrap bg-primary px-[30px] py-[17px] font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
        >
          Рассчитать потолок
        </a>
        <div className="max-w-[22em]">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 font-display text-2xl uppercase tracking-[0.02em] text-foreground transition-colors hover:text-primary"
          >
            <Icon name="Phone" size={20} className="text-primary" />
            {PHONE_DISPLAY}
          </a>
          <p className="mt-2 text-sm leading-[1.45] text-muted-foreground">Пн–Сб, 9:00–20:00. Замер и расчёт — смета в течение 24 часа</p>
        </div>
      </div>
    </div>
  </section>
);

export default CeilHero;