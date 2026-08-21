import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const PLANS = [
  {
    name: 'База',
    price: 'от 3 900',
    unit: '₽ / м²',
    for: 'Ровная стена без акустики',
    features: [
      'Алюминиевый каркас по периметру',
      'Ткань из групп «Рогожка» и «Лён»',
      'Выравнивание перепада до 30 мм',
      'Монтаж за 1 день',
      'Гарантия 3 года',
    ],
    accent: false,
  },
  {
    name: 'Тихо',
    price: 'от 5 400',
    unit: '₽ / м²',
    for: 'Когда мешает эхо и соседи',
    features: [
      'Всё из тарифа «База»',
      'Акустический войлок 30 мм',
      'Снижение шума до −9 дБ',
      'Выравнивание перепада до 60 мм',
      'Скрытие труб и проводки',
      'Гарантия 5 лет',
    ],
    accent: true,
  },
  {
    name: 'Проект',
    price: 'от 7 800',
    unit: '₽ / м²',
    for: 'Дизайнерское решение под ключ',
    features: [
      'Всё из тарифа «Тихо»',
      'Велюр и премиальные коллекции',
      'Секции, рельеф, подсветка в полотне',
      'Ниши под ТВ и мебель',
      'Согласование с вашим дизайнером',
      'Гарантия 5 лет + сервис',
    ],
    accent: false,
  },
];

const Pricing = () => {
  const [area, setArea] = useState(18);
  const [rate, setRate] = useState(5400);
  const total = area * rate;

  return (
    <Section
      id="price"
      index="07"
      eyebrow="Тарифы"
      title={<>Цена за квадратный метр под ключ</>}
      lead="В стоимость входит материал, каркас, работа и уборка. Итог фиксируется в смете после замера и больше не меняется."
      tone="surface"
    >
      <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
        {PLANS.map((p) => (
          <article
            key={p.name}
            className={`flex flex-col p-8 lg:p-10 ${
              p.accent ? 'bg-foreground text-background' : 'bg-card text-foreground'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-4xl uppercase leading-none tracking-wide">
                {p.name}
              </h3>
              {p.accent && (
                <span className="bg-primary px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-primary-foreground">
                  Выбирают чаще
                </span>
              )}
            </div>
            <p
              className={`mt-3 text-sm ${
                p.accent ? 'text-background/60' : 'text-muted-foreground'
              }`}
            >
              {p.for}
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-5xl leading-none text-primary">{p.price}</span>
              <span
                className={`text-sm ${p.accent ? 'text-background/60' : 'text-muted-foreground'}`}
              >
                {p.unit}
              </span>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-[0.95rem] leading-[1.5]">
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span className={p.accent ? 'text-background/85' : 'text-foreground'}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openLead(`Тариф «${p.name}»`)}
              className={`mt-10 w-full px-6 py-4 font-display text-lg uppercase tracking-[0.04em] transition-colors ${
                p.accent
                  ? 'bg-primary text-primary-foreground hover:bg-background hover:text-foreground'
                  : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              Рассчитать тариф
            </button>
          </article>
        ))}
      </div>

      {/* Быстрый калькулятор */}
      <div className="mt-10 grid gap-8 border border-border bg-card p-8 lg:grid-cols-12 lg:p-12">
        <div className="lg:col-span-7">
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide">
            Прикинуть бюджет за минуту
          </h3>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="area" className="text-sm text-muted-foreground">
                Площадь стен
              </label>
              <span className="font-display text-2xl tracking-wide">{area} м²</span>
            </div>
            <input
              id="area"
              type="range"
              min={4}
              max={60}
              step={1}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-3 h-1 w-full cursor-pointer appearance-none bg-border accent-primary"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {PLANS.map((p, i) => {
              const value = [3900, 5400, 7800][i];
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setRate(value)}
                  className={`border px-5 py-2.5 font-display text-base uppercase tracking-[0.06em] transition-colors ${
                    rate === value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-border pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Ориентировочная стоимость
            </span>
            <div className="mt-3 font-display text-5xl leading-none text-foreground">
              {total.toLocaleString('ru-RU')} ₽
            </div>
            <p className="mt-4 text-sm leading-[1.55] text-muted-foreground">
              Предварительный расчёт. Точную смету считает замерщик — она бесплатна и приходит за
              24 часа.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openLead('Калькулятор')}
            className="mt-8 w-full bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Получить точную смету
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
