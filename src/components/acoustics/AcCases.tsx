import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

interface AcCase {
  title: string;
  place: string;
  img: string;
  imgBefore: string;
  area: string;
  days: string;
  fabric: string;
  before: string;
  after: string;
  task: string;
  result: string;
  tags: string[];
}

const CASES: AcCase[] = [
  {
    title: 'Переговорная в офисе',
    place: 'Москва, Сити',
    img: '/img/cf88160e-efe3-43a2-8db4-08693ab60558.webp',
    imgBefore:
      '/img/507aba46-1696-42b4-916c-d53b3203b068.webp',
    area: '24 м²',
    days: '2 дня',
    fabric: 'Акустик Графит',
    before: 'Реверберация 1,2 с',
    after: 'Реверберация 0,5 с',
    task: 'Бетонные стены давали гул: на видеовстречах речь расплывалась, а переговоры было слышно в коридоре.',
    result:
      'Полотно на двух стенах убрало гул и скрыло кабель-каналы. Речь стала разборчивой, за дверью разговор не читается.',
    tags: ['Офис', 'Эхо', 'Графит'],
  },
  {
    title: 'Домашняя студия',
    place: 'Москва, Академическая',
    img: '/img/1233a5a8-90c1-4465-b557-ef3787a14486.webp',
    imgBefore:
      '/img/ff60803f-20f5-4e80-8341-0e0e6437527d.webp',
    area: '13 м²',
    days: '2 дня',
    fabric: 'Акустик Графит + ловушки',
    before: 'Голос «в бочке»',
    after: 'Чистый сухой звук',
    task: 'Подкаст записывался в пустой комнате: микрофон ловил отражения, каждую дорожку приходилось чистить в редакторе.',
    result:
      'Обработали зоны первых отражений и поставили ловушки в углах. Голос пишется плотно и сухо, обработка почти не нужна.',
    tags: ['Студия', 'Запись', 'Ловушки'],
  },
  {
    title: 'Спальня у лифта',
    place: 'Химки, ЖК «Парковый»',
    img: '/img/296123a6-553a-4f1e-a145-76c8c748a86c.webp',
    imgBefore:
      '/img/46979d3b-c05c-41cf-8cdc-f9fa2b2fc814.webp',
    area: '15 м²',
    days: '1 день',
    fabric: 'Акустик Туман',
    before: '46 дБ ночью',
    after: '34 дБ ночью',
    task: 'Спальня примыкала к лифтовой шахте и коридору: ночью было слышно двери, шаги и разговоры соседей.',
    result:
      'Полный акустический слой на стене-источнике с мембраной. Речь за стеной перестала различаться словами, осталcя глухой фон.',
    tags: ['Спальня', 'Шум соседей', 'Туман'],
  },
  {
    title: 'Зал кафе',
    place: 'Москва, Таганская',
    img: '/img/67b42bff-63fb-4af3-9cb8-64840842d43a.webp',
    imgBefore:
      '/img/5eafce0d-5b4f-4ea2-b2c3-51fcbe24f58b.webp',
    area: '62 м²',
    days: '3 дня',
    fabric: 'Акустик Дюна',
    before: 'Гул 78 дБ в час пик',
    after: 'Гул 66 дБ в час пик',
    task: 'Бетон и стекло превращали полный зал в сплошной гул: гости кричали друг другу, официанты переспрашивали заказ.',
    result:
      'Обработали стены и потолок пожаробезопасным полотном. Разговор за столом слышно без повышенного голоса, средний чек вырос.',
    tags: ['Кафе', 'Гул зала', 'Дюна'],
  },
];

const AcCases = () => {
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(50);
  const item = CASES[active];

  const select = (i: number) => {
    setActive(i);
    setSplit(50);
  };

  return (
    <Section
      id="ac-cases"
      index="03"
      eyebrow="Проекты"
      title={<>Акустика: до и после</>}
      lead="Реальные объекты с замерами до и после: звукоизоляция стен в квартире, студия, офис и зал кафе. Потяните ползунок на большом фото, чтобы сравнить комнату."
    >
      <div className="border border-border bg-card">
        <div className="grid lg:grid-cols-12">
          <div className="relative select-none overflow-hidden lg:col-span-7">
            <img
              src={item.img}
              alt={`${item.title} — акустическая отделка тканью после монтажа`}
              className="block aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
              loading="lazy"
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${split}%` }}
            >
              <img
                src={item.imgBefore}
                alt={`${item.title} — помещение до акустической обработки стен`}
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
              <Icon name="MapPin" size={16} className="text-primary-ink" />
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

            <div className="mt-px grid grid-cols-2 gap-px border border-border bg-border">
              <div className="bg-card p-4">
                <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  Было
                </dt>
                <dd className="mt-2 font-display text-lg leading-tight tracking-wide text-muted-foreground">
                  {item.before}
                </dd>
              </div>
              <div className="bg-card p-4">
                <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Стало</dt>
                <dd className="mt-2 font-display text-lg leading-tight tracking-wide text-primary-ink">
                  {item.after}
                </dd>
              </div>
            </div>

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
                <Icon name="CircleCheck" size={20} className="mt-0.5 shrink-0 text-primary-ink" />
                <p className="text-[0.95rem] leading-[1.6] text-foreground">{item.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-px grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
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
                alt={`${c.title} — пример акустической обработки стен тканью`}
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

export default AcCases;
