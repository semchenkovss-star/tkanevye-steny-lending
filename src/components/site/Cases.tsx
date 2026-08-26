import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

interface CaseItem {
  title: string;
  place: string;
  img: string;
  area: string;
  days: string;
  fabric: string;
  task: string;
  result: string;
  tags: string[];
}

const CASES: CaseItem[] = [
  {
    title: 'Гостиная в панельном доме',
    place: 'Москва, Митино',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/480a4f0c-d22e-493f-82ea-78305902d47c.jpg',
    area: '18 м²',
    days: '2 дня',
    fabric: 'Лён Натур LN-04',
    task: 'Перепад стены 47 мм, диван не вставал вплотную, по стене шёл стояк отопления.',
    result: 'Каркас выбрал кривизну, стояк ушёл внутрь конструкции, стена стала ровной по лазеру.',
    tags: ['Гостиная', 'Выравнивание', 'Лён'],
  },
  {
    title: 'Спальня с гулким эхом',
    place: 'Химки, ЖК «Парковый»',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/d01a16cf-63e7-4aa5-a7fb-a5789d779a26.jpg',
    area: '14 м²',
    days: '1 день',
    fabric: 'Акустик Фетр AC-30',
    task: 'Соседей за стеной было слышно как в одной комнате, спать мешал каждый разговор.',
    result: 'Звукопоглощение αw = 0,30 (MH). Речь за стеной перестала различаться словами.',
    tags: ['Спальня', 'Акустика', 'Фетр'],
  },
  {
    title: 'Домашний кабинет',
    place: 'Москва, Хамовники',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/c8a6ab77-99e3-41aa-8446-bf8992503a5b.jpg',
    area: '11 м²',
    days: '1 день',
    fabric: 'Акустик Оранж AC-41',
    task: 'Созвоны с эхом, микрофон ловил отражение от голых стен.',
    result: 'Полотно на двух стенах убрало отражение, звук в записи стал плотным и сухим.',
    tags: ['Кабинет', 'Акустика', 'Цвет'],
  },
];

const Cases = () => {
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(50);
  const item = CASES[active];

  const select = (i: number) => {
    setActive(i);
    setSplit(50);
  };

  return (
    <Section
      id="cases"
      index="06"
      eyebrow="Проекты"
      title={<>Проекты: до и после</>}
      lead="Реальные квартиры наших клиентов. Потяните ползунок на большом фото, чтобы сравнить стену до монтажа и после."
    >
      <div className="border border-border bg-card">
        <div className="grid lg:grid-cols-12">
          <div className="relative select-none overflow-hidden lg:col-span-7">
            <img
              src={item.img}
              alt={`${item.title} — после монтажа`}
              className="block aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
              loading="lazy"
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${split}%` }}
            >
              <img
                src={item.img}
                alt={`${item.title} — до монтажа`}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: 'grayscale(1) brightness(0.72) contrast(1.15)' }}
                loading="lazy"
              />
              <span className="absolute left-4 top-4 bg-foreground px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-background">
                До
              </span>
            </div>
            <span className="absolute right-4 top-4 bg-primary px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-primary-foreground">
              После
            </span>
            <div
              className="pointer-events-none absolute inset-y-0 flex w-px items-center justify-center bg-primary"
              style={{ left: `${split}%` }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Icon name="MoveHorizontal" size={20} />
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              aria-label="Сравнение до и после"
              onChange={(e) => setSplit(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <div className="flex flex-col border-t border-border p-7 sm:p-9 lg:col-span-5 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} className="text-primary" />
              {item.place}
            </div>
            <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
              {item.title}
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="border border-border px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-px border border-border bg-border">
              {[
                { k: 'Площадь', v: item.area },
                { k: 'Срок', v: item.days },
                { k: 'Ткань', v: item.fabric.split(' ')[0] },
              ].map((row) => (
                <div key={row.k} className="bg-card p-4">
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    {row.k}
                  </dt>
                  <dd className="mt-2 font-display text-xl leading-none tracking-wide">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 space-y-5">
              <div className="flex gap-4">
                <Icon
                  name="CircleAlert"
                  size={20}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
                <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">{item.task}</p>
              </div>
              <div className="flex gap-4">
                <Icon name="CircleCheck" size={20} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-[0.95rem] leading-[1.6] text-foreground">{item.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-px grid gap-px bg-border sm:grid-cols-3">
        {CASES.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => select(i)}
            className={`group relative flex items-center gap-4 p-4 text-left transition-colors ${
              i === active ? 'bg-foreground text-background' : 'bg-card hover:bg-secondary'
            }`}
          >
            <span className="relative h-16 w-20 shrink-0 overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg uppercase leading-tight tracking-wide">
                {c.title}
              </span>
              <span
                className={`mt-1 block text-sm ${
                  i === active ? 'text-background/70' : 'text-muted-foreground'
                }`}
              >
                {c.place} · {c.area}
              </span>
            </span>
          </button>
        ))}
      </div>
    </Section>
  );
};

export default Cases;
