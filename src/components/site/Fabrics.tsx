import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CATALOG, Material } from '@/data/catalog';

type Group = 'Все' | Material;

const GROUPS: Group[] = ['Все', 'Марс', 'Луна', 'Комфорт', 'Штукатурка', 'Узор', 'Акустик'];

const Fabrics = () => {
  const [group, setGroup] = useState<Group>('Все');

  const list = useMemo(() => {
    if (group !== 'Все') return CATALOG.filter((i) => i.material === group).slice(0, 8);
    return GROUPS.filter((g) => g !== 'Все')
      .map((g) => CATALOG.find((i) => i.material === g))
      .filter(Boolean)
      .slice(0, 8) as typeof CATALOG;
  }, [group]);

  const minPrice = (m: Material) =>
    Math.min(...CATALOG.filter((i) => i.material === m).map((i) => i.price));

  return (
    <Section
      id="fabrics"
      index="05"
      eyebrow="Каталог"
      title={<>Ткани: 180 оттенков в наличии</>}
      lead="Шесть коллекций — от бюджетного «Узора» до акустического фетра. Полную палитру замерщик привозит с собой: образцы можно приложить к мебели и посмотреть при своём свете."
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

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f) => (
          <article key={f.slug} className="group bg-card animate-scale-in">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
              <img
                src={f.img}
                alt={f.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute right-3 top-3 bg-foreground px-2 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-background">
                {f.material}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide">
                {f.name}
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
                {f.colorName} · шумоизоляция до −{f.noise} дБ
              </p>
              <p className="mt-4 font-display text-lg tracking-wide text-primary">
                от {minPrice(f.material).toLocaleString('ru-RU')} ₽/м²
              </p>
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
