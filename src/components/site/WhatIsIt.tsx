import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

const LAYERS = [
  {
    n: '01',
    title: 'Скрытый каркас',
    text: 'Алюминиевый профиль по периметру глубиной 12 мм.',
  },
  {
    n: '02',
    title: 'Акустический войлок',
    text: 'Слой 12-40 мм между стеной и полотном. Гасит отражение звука и работает как дополнительный утеплитель.',
  },
  {
    n: '03',
    title: 'Полотно',
    text: 'Ткань натягивается на каркас и фиксируется в замке. Идеальная плоскость без единого шва по всей стене.',
  },
];

const WhatIsIt = () => {
  return (
    <Section
      id="what"
      index="02"
      eyebrow="Технология"
      title={<>Что такое натяжная тканевая стена</>}
      lead="Это не обои и не декоративная драпировка. Натяжные стены — трёхслойная конструкция: она ставится поверх существующей стены, полностью заменяет чистовую отделку и делает комнату тише."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden border border-border">
            <img
              src="/img/480a4f0c-d22e-493f-82ea-78305902d47c.webp"
              alt="Гостиная с натяжной тканевой стеной на скрытом каркасе — отделка без пыли"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="divide-y divide-border border-y border-border">
            {LAYERS.map((l) => (
              <div key={l.n} className="flex gap-6 py-7">
                <span className="font-display text-2xl leading-none text-primary-ink">{l.n}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none tracking-wide">
                    {l.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted-foreground">
                    {l.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 bg-secondary p-6">
            <Icon name="Info" size={20} className="mt-0.5 shrink-0 text-primary-ink" />
            <p className="text-sm leading-[1.6] text-muted-foreground">
              Конструкция разборная: полотно снимается и ставится обратно за пару часов — доступ к
              коммуникациям остаётся навсегда.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsIt;