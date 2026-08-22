import { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

type Group = 'Все' | 'Лён' | 'Велюр' | 'Рогожка' | 'Акустика';

interface Fabric {
  name: string;
  code: string;
  group: Exclude<Group, 'Все'>;
  color: string;
  note: string;
  price: string;
}

const FABRICS: Fabric[] = [
  { name: 'Лён Натур', code: 'LN-04', group: 'Лён', color: '#D9CFBC', note: 'Тёплый песочный, живая фактура нити', price: 'от 4 200 ₽/м²' },
  { name: 'Лён Графит', code: 'LN-19', group: 'Лён', color: '#5A5A54', note: 'Глубокий серый, не маркий', price: 'от 4 400 ₽/м²' },
  { name: 'Велюр Терракота', code: 'VL-07', group: 'Велюр', color: '#B4532F', note: 'Матовый ворс, меняет тон при свете', price: 'от 5 600 ₽/м²' },
  { name: 'Велюр Молоко', code: 'VL-01', group: 'Велюр', color: '#EDE6DA', note: 'Светлая база под любой интерьер', price: 'от 5 400 ₽/м²' },
  { name: 'Рогожка Дюна', code: 'RG-12', group: 'Рогожка', color: '#C8B79B', note: 'Плотное плетение, устойчива к когтям', price: 'от 3 900 ₽/м²' },
  { name: 'Рогожка Уголь', code: 'RG-22', group: 'Рогожка', color: '#3B3B38', note: 'Контрастная акцентная стена', price: 'от 4 100 ₽/м²' },
  { name: 'Акустик Фетр', code: 'AC-30', group: 'Акустика', color: '#8A8A84', note: 'Максимальное поглощение, −11 дБ', price: 'от 6 300 ₽/м²' },
  { name: 'Акустик Оранж', code: 'AC-41', group: 'Акустика', color: '#FF6637', note: 'Для кабинета и студии, яркий акцент', price: 'от 6 500 ₽/м²' },
];

const GROUPS: Group[] = ['Все', 'Лён', 'Велюр', 'Рогожка', 'Акустика'];

const Fabrics = () => {
  const [group, setGroup] = useState<Group>('Все');
  const list = group === 'Все' ? FABRICS : FABRICS.filter((f) => f.group === group);

  return (
    <Section
      id="fabrics"
      index="05"
      eyebrow="Каталог"
      title={<>Ткани: 180 оттенков в наличии</>}
      lead="Показываем восемь ходовых. Полную палитру замерщик привозит с собой — образцы можно приложить к мебели и посмотреть при своём свете."
      tone="surface"
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroup(g)}
            className={`border px-5 py-2.5 font-display text-base uppercase tracking-[0.06em] transition-colors ${
              g === group
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {list.map((f) => (
          <article key={f.code} className="group bg-card animate-scale-in">
            <div
              className="weave-soft relative aspect-[4/3] w-full"
              style={{ backgroundColor: f.color }}
            >
              <span className="absolute right-3 top-3 bg-foreground px-2 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-background">
                {f.code}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide">
                {f.name}
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">{f.note}</p>
              <p className="mt-4 font-display text-lg tracking-wide text-primary">{f.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="flex items-center gap-3 text-sm text-muted-foreground">
          <Icon name="Palette" size={18} className="shrink-0 text-primary" />
          Цена указана за квадратный метр готовой стены под ключ: каркас, войлок, полотно и монтаж.
        </p>
        <Link
          to="/catalog"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap bg-foreground px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Открыть каталог
          <Icon name="ArrowRight" size={18} />
        </Link>
      </div>
    </Section>
  );
};

export default Fabrics;