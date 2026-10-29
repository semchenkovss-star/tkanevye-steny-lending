import Icon from '@/components/ui/icon';
import { useContacts } from '@/lib/useContacts';
import { PLANS } from '@/lib/pricing';

const NAV: { href: string; label: string; wide?: boolean }[] = [
  { href: '#services', label: 'Услуги' },
  { href: '#cases', label: 'Проекты' },
  { href: '#how', label: 'Монтаж' },
  { href: '#price', label: 'Цены' },
  { href: '#business', label: 'Для бизнеса', wide: true },
];

const Hero = () => {
  const { PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } = useContacts();
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* правая плоскость: ткань */}
      <div
        aria-hidden="true"
        className="weave-panel absolute inset-y-0 right-0 hidden w-[43%] overflow-hidden md:block"
      >
        <span className="wave-ring -left-[140px] top-1/2 -mt-[140px] h-[280px] w-[280px]" />
        <span
          className="wave-ring -left-[140px] top-1/2 -mt-[140px] h-[280px] w-[280px]"
          style={{ animationDelay: '2.4s' }}
        />
        <span
          className="wave-ring -left-[140px] top-1/2 -mt-[140px] h-[280px] w-[280px]"
          style={{ animationDelay: '4.8s' }}
        />

        <div className="absolute bottom-10 left-10 z-[2] max-w-[15em] text-[0.8rem] leading-[1.45] tracking-[0.02em] text-primary-foreground">
          <b className="mb-2.5 block font-display text-[2.4rem] leading-none tracking-[0.01em] font-normal">
            αw&nbsp;=&nbsp;0,30 <span className="text-[1.2rem]">(MH)</span>
          </b>
          Слой акустического войлока под полотном: разговор в соседней комнате перестаёт
          возвращаться эхом.
        </div>
      </div>

      {/* мобильная полоса ткани */}
      <div
        aria-hidden="true"
        className="weave-panel absolute inset-x-0 bottom-0 h-24 overflow-hidden md:hidden"
      />

      <div className="shell-left relative z-[3] flex min-h-[100svh] w-full flex-col pb-28 pr-5 pt-7 sm:pr-8 md:w-[57%] md:pb-14 md:pr-14 md:pt-11">
        <header className="rule-bottom flex items-baseline justify-between gap-6 pb-4">
          <a href="#top" className="flex shrink-0 flex-col leading-none">
            <span className="whitespace-nowrap font-display text-[1.45rem] uppercase leading-none tracking-[0.1em] text-foreground sm:text-[1.7rem]">
              Fabric<span className="text-primary-ink"> Wall</span>
            </span>
            <span className="mt-1.5 whitespace-nowrap text-[0.58rem] uppercase leading-none tracking-[0.26em] text-muted-foreground sm:text-[0.63rem]">
              Тканевые стены
            </span>
          </a>
          <nav className="hidden gap-5 lg:flex xl:gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link whitespace-nowrap ${item.wide ? 'hidden xl:inline' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={PHONE_HREF}
            className="-my-2 flex min-h-[44px] items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="Phone" size={16} />
            <span className="hidden whitespace-nowrap sm:inline lg:hidden 2xl:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Позвонить</span>
            <span className="hidden whitespace-nowrap lg:inline 2xl:hidden">Позвонить</span>
          </a>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10 md:py-0">
          <div
            className="mb-6 text-xs uppercase tracking-[0.14em] text-muted-foreground animate-fade-in"
            style={{ animationDelay: '80ms' }}
          >
            Отделка стен тканью на скрытом каркасе
          </div>
          <h1
            className="max-w-[12em] font-display text-[clamp(2.1rem,7.5vw,3rem)] uppercase leading-[0.98] tracking-[0.005em] text-foreground animate-fade-in sm:text-[3.6rem] lg:text-[4.2rem]"
            style={{ animationDelay: '160ms' }}
          >
            Натяжные тканевые стены
            <br />
            <span className="text-muted-foreground">под ключ <span className="whitespace-nowrap">за 1–2 дня</span></span>
          </h1>
          <p
            className="mt-4 max-w-[30em] font-display text-lg uppercase leading-[1.2] tracking-wide text-foreground animate-fade-in sm:text-2xl"
            style={{ animationDelay: '220ms' }}
          >
            Ровная поверхность без пыли и мокрых работ
          </p>
          <p
            className="max-w-[30em] leading-[1.55] text-muted-foreground animate-fade-in text-base text-left my-3.5 py-0 px-1.5"
            style={{ animationDelay: '260ms' }}
          >Полотно натягивается поверх каркаса. Толщина — от 13 мм, с акустическим слоем больше. Тихие стены гасят эхо, а в квартире нет грязи и строительной пыли.</p>
        </div>

        <div
          className="rule-top flex flex-col items-start gap-5 pt-6 animate-fade-in sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-8 sm:gap-y-5"
          style={{ animationDelay: '360ms' }}
        >
          <div className="w-full sm:w-auto">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#calc"
                className="bg-primary px-6 py-4 text-center font-display text-base uppercase leading-tight tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover sm:whitespace-nowrap sm:px-[26px] sm:py-[17px] sm:text-lg"
              >
                Рассчитать стоимость
              </a>
              <a
                href="#fabrics"
                className="flex items-center justify-center gap-2 border border-foreground/25 px-6 py-4 font-display text-base uppercase leading-tight tracking-[0.04em] text-foreground transition-colors hover:border-primary hover:text-primary-ink sm:whitespace-nowrap sm:py-[17px] sm:text-lg"
              >
                <Icon name="SwatchBook" fallback="Palette" size={18} />
                Подобрать ткань
              </a>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <b className="font-semibold text-foreground">{PLANS[0].priceLabel} ₽/м² под ключ</b>{' '}
              — каркас, ткань и монтаж
            </p>
          </div>
          <div className="max-w-[22em]">
            <a
              href={PHONE_HREF}
              className="-my-1.5 flex min-h-[44px] items-center gap-2 py-1.5 font-display text-2xl uppercase tracking-[0.02em] text-foreground transition-colors hover:text-primary"
            >
              <Icon name="Phone" size={20} className="text-primary" />
              {PHONE_DISPLAY}
            </a>
            <p className="mt-2 text-sm leading-[1.45] text-muted-foreground">Пн–Сб, 9:00–20:00. Замер и расчёт — смета в течение 24 часов</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;