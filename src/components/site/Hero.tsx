import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const NAV = [
  { href: '#cases', label: 'Объекты' },
  { href: '#how', label: 'Монтаж' },
  { href: '#price', label: 'Цены' },
];

const Hero = () => {
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
          <b className="mb-2.5 block font-display text-[2.4rem] leading-none tracking-[0.01em]">
            −9&nbsp;дБ
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

      <div className="relative z-[3] flex min-h-[100svh] w-full flex-col justify-between px-6 pb-32 pt-8 md:w-[57%] md:px-16 md:pb-14 md:pl-[4.5rem] md:pt-11">
        <header className="rule-bottom flex items-baseline justify-between gap-6 pb-4">
          <a
            href="#top"
            className="font-display text-xl uppercase tracking-[0.16em] text-foreground"
          >
            Полотно
          </a>
          <nav className="hidden gap-7 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="tel:+74951234567"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <Icon name="Phone" size={16} />
            Позвонить
          </a>
        </header>

        <div className="py-14 pr-2 md:py-0">
          <div
            className="mb-6 text-xs uppercase tracking-[0.14em] text-muted-foreground animate-fade-in"
            style={{ animationDelay: '80ms' }}
          >
            Стены из ткани на скрытом каркасе
          </div>
          <h1
            className="max-w-[11.2em] font-display text-[3.25rem] uppercase leading-[0.98] tracking-[0.005em] text-foreground animate-fade-in sm:text-[4.5rem] lg:text-[5.4rem]"
            style={{ animationDelay: '160ms' }}
          >
            Ровная стена
            <br />
            за один день.
            <br />
            <span className="text-muted-foreground">Без штукатурки и просушки.</span>
          </h1>
          <p
            className="mt-7 max-w-[30em] text-[1.05rem] leading-[1.55] text-muted-foreground animate-fade-in"
            style={{ animationDelay: '260ms' }}
          >
            Каркас выбирает перепад плоскости до&nbsp;60&nbsp;мм, полотно натягивается поверх. В
            квартире не появляется ни мешка смеси, ни строительной пыли.
          </p>
        </div>

        <div
          className="rule-top flex flex-col items-start gap-5 pt-6 animate-fade-in sm:flex-row sm:items-end sm:gap-8"
          style={{ animationDelay: '360ms' }}
        >
          <button
            type="button"
            onClick={() => openLead('Первый экран')}
            className="whitespace-nowrap bg-primary px-[30px] py-[17px] font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Рассчитать стену по размерам
          </button>
          <p className="max-w-[22em] text-sm leading-[1.45] text-muted-foreground">
            Замер и расчёт&nbsp;— бесплатно, смета приходит в течение 24&nbsp;часов после заявки.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
