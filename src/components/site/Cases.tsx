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
  },
  {
    title: 'Спальня с гулким эхом',
    place: 'Химки, ЖК «Парковый»',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/d01a16cf-63e7-4aa5-a7fb-a5789d779a26.jpg',
    area: '14 м²',
    days: '1 день',
    fabric: 'Акустик Фетр AC-30',
    task: 'Соседей за стеной было слышно как в одной комнате, спать мешал каждый разговор.',
    result: 'Замер шума после монтажа: −9 дБ. Речь за стеной перестала различаться словами.',
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
  },
];

const Cases = () => {
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(50);
  const item = CASES[active];

  return (
    <Section
      id="cases"
      index="06"
      eyebrow="Объекты"
      title={<>Кейсы: до и после</>}
      lead="Потяните ползунок, чтобы сравнить состояние стены до монтажа и после."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="relative select-none overflow-hidden border border-border">
            <img
              src={item.img}
              alt={`${item.title} — после монтажа`}
              className="block aspect-[4/3] w-full object-cover"
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
              className="pointer-events-none absolute inset-y-0 w-px bg-primary"
              style={{ left: `${split}%` }}
            />
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

          <div className="mt-px flex flex-wrap gap-px bg-border">
            {CASES.map((c, i) => (
              <button
                key={c.title}
                type="button"
                onClick={() => {
                  setActive(i);
                  setSplit(50);
                }}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  i === active
                    ? 'bg-foreground text-background'
                    : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {c.place}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
            {item.title}
          </h3>

          <dl className="mt-8 divide-y divide-border border-y border-border">
            {[
              { k: 'Площадь стен', v: item.area },
              { k: 'Срок монтажа', v: item.days },
              { k: 'Ткань', v: item.fabric },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-muted-foreground">{row.k}</dt>
                <dd className="font-display text-xl tracking-wide">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <Icon name="CircleAlert" size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
              <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">{item.task}</p>
            </div>
            <div className="flex gap-4">
              <Icon name="CircleCheck" size={20} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-[0.95rem] leading-[1.6] text-foreground">{item.result}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Cases;
