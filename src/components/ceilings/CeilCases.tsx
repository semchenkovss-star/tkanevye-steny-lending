import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

interface CeilCase {
  title: string;
  place: string;
  img: string;
  imgBefore: string;
  area: string;
  days: string;
  fabric: string;
  task: string;
  result: string;
  tags: string[];
}

const CASES: CeilCase[] = [
  {
    title: 'Теневой профиль',
    place: 'Москва, Пресня',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/969e988a-401d-4e5d-89bb-c3573d8b3838.jpg',
    imgBefore:
      'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/155dceee-04b6-48e8-8195-96cdb38ae3d0.jpg',
    area: '9 м²',
    days: '1 день',
    fabric: 'Матовое полотно',
    task: 'Узкий коридор с голой плитой и проводами из потолка. Обычная галтель по периметру визуально сжимала проход ещё сильнее.',
    result:
      'Теневой профиль дал чистую линию по всей длине: между стеной и потолком тонкая тень, без вставок и стыков. В полотно врезали магнитный трек.',
    tags: ['Коридор', 'Теневой', 'Матовое'],
  },
  {
    title: 'Световое окно',
    place: 'Химки, ЖК «Парковый»',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/0a7d8697-af15-4b12-8c71-28cf0cab1e1a.jpg',
    imgBefore:
      'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/7dbc0405-dc08-4e83-902e-ff9e616ffa93.jpg',
    area: '9 м²',
    days: '2 дня',
    fabric: 'Транслюцентное полотно',
    task: 'Коридор без окон: днём приходилось включать свет, одна лампа давала резкие тени.',
    result:
      'Встроили световое окно на полпотолка. Мягкий дневной свет по всей длине, коридор перестал казаться тёмным тоннелем.',
    tags: ['Коридор', 'Световое окно', 'Транслюцент'],
  },
  {
    title: 'Парящий контур',
    place: 'Москва, Кунцево',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/5d93c289-d766-4fdd-bdfd-9320f7e4dcd8.jpg',
    imgBefore:
      'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/564c77a2-71da-45c0-9b6d-475b36e84802.jpg',
    area: '16 м²',
    days: '1 день',
    fabric: 'Сатиновое полотно',
    task: 'Плиты перекрытия с перепадом и швами, в спальне не хватало мягкого света для вечера.',
    result:
      'Парящий контур с тёплой лентой по периметру: вечером хватает одной подсветки, потолок будто висит в воздухе.',
    tags: ['Спальня', 'Парящий', 'Сатин'],
  },
  {
    title: 'Световые линии',
    place: 'Москва, Раменки',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/cd000b7c-7695-4f31-8ad7-314a7550cf26.jpg',
    imgBefore:
      'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/ae970eea-c54a-4ff5-abc6-35a912fc0fd4.jpg',
    area: '28 м²',
    days: '2 дня',
    fabric: 'Матовое полотно',
    task: 'Кухня-гостиная: под потолком висел воздуховод, а точечные светильники оставляли тёмные зоны над рабочей поверхностью.',
    result:
      'Две световые линии дают ровный свет без теней, воздуховод и проводка полностью скрыты в конструкции.',
    tags: ['Кухня-гостиная', 'Световые линии', 'Матовое'],
  },
  {
    title: 'Трековое освещение',
    place: 'Москва, Даниловский',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/bucket/b98887c5-81dc-4347-9042-25a641ad68f5.jpg',
    imgBefore:
      'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/5f76d32d-cc6c-4508-a6d4-e45fc317ec81.jpg',
    area: '34 м²',
    days: '2 дня',
    fabric: 'Матовое полотно',
    task: 'Студия без зонирования: одна лампа в центре, а расстановку мебели хозяева ещё не определили.',
    result:
      'Встроили магнитный трек заподлицо с полотном. Светильники переставляются по рельсу — сценарий света меняется без ремонта.',
    tags: ['Студия', 'Трек', 'Матовое'],
  },
];

const CeilCases = () => {
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(50);
  const item = CASES[active];

  const select = (i: number) => {
    setActive(i);
    setSplit(50);
  };

  return (
    <Section
      id="ceil-cases"
      index="06"
      eyebrow="Проекты"
      title={<>Потолки: до и после</>}
      lead="Реальные объекты наших клиентов. Потяните ползунок на большом фото, чтобы сравнить потолок до монтажа и после."
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
                src={item.imgBefore}
                alt={`${item.title} — до монтажа`}
                className="absolute inset-0 h-full w-full object-cover"
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
                { k: 'Полотно', v: item.fabric },
              ].map((row) => (
                <div key={row.k} className="bg-card p-4">
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    {row.k}
                  </dt>
                  <dd className="mt-2 font-display text-lg leading-tight tracking-wide">{row.v}</dd>
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

      <div className="mt-px grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
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

export default CeilCases;