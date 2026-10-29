import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { openSamples } from '@/lib/samples';
import { CONCEPTS, CatalogItem, PRICE_MIN } from '@/data/catalog';
import { PLANS } from '@/lib/pricing';
import ImageZoom from '@/components/catalog/ImageZoom';
import { GOALS, reachGoalOnce } from '@/lib/metrika';

/** Лёгкая копия 600px для сетки: полноразмерный файл нужен только при увеличении */
const thumb = (src: string) => src.replace('/img/', '/img/thumb/');

const CatalogCard = ({ item }: { item: CatalogItem }) => {
  const concept = CONCEPTS.find((c) => c.id === item.concept)?.label ?? '';
  const [zoom, setZoom] = useState(false);
  const plan = PLANS[0];
  const turnkey = plan.rate + (item.price - PRICE_MIN);
  const bestFor = item.rooms.map((r) => r.toLowerCase()).join(', ');

  const openZoom = () => {
    setZoom(true);
    reachGoalOnce(GOALS.FABRIC_VIEW, item.slug, {
      fabric: item.name,
      material: item.material,
      price: item.price,
    });
  };

  return (
    <article
      id={`fabric-${item.slug}`}
      className="hover-card group flex flex-col scroll-mt-28 bg-card animate-scale-in target:ring-2 target:ring-primary"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <button
          type="button"
          onClick={openZoom}
          aria-label={`Рассмотреть фактуру ткани ${item.name}`}
          className="block h-full w-full cursor-zoom-in"
        >
          <img
            src={thumb(item.img)}
            alt={`Ткань для стен ${item.name} — ${item.material}, цвет ${item.colorName}`}
            loading="lazy"
            width={600}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Icon name="ZoomIn" size={18} />
          </span>
        </button>
        <span
          className="pointer-events-none absolute bottom-3 left-3 h-9 w-9 border border-background/70 shadow-sm"
          style={{ backgroundColor: item.color }}
          title={item.colorName}
        />
        {item.badge && (
          <span className="pointer-events-none absolute left-3 top-3 bg-primary px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-primary-foreground">
            {item.badge}
          </span>
        )}
        {!item.inStock && (
          <span className="pointer-events-none absolute right-3 top-3 bg-ink px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-background">
            Под заказ
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {concept} · {item.material}
        </div>
        <h3 className="mt-2 font-display text-2xl uppercase leading-none tracking-wide">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-[1.5] text-muted-foreground">{item.description}</p>
        {bestFor && (
          <p className="mt-3 flex items-start gap-2 text-sm leading-[1.4] text-foreground">
            <Icon name="Sofa" fallback="Home" size={16} className="mt-0.5 shrink-0 text-primary-ink" />
            <span>
              <span className="text-muted-foreground">Лучше смотрится:</span> {bestFor}
            </span>
          </p>
        )}

        <dl className="mt-5 grid grid-cols-2 gap-px border border-border bg-border text-center">
          <div className="bg-card px-2 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
              Ширина
            </dt>
            <dd className="mt-1 font-display text-lg tracking-wide">{item.width ?? 300} см</dd>
          </div>
          <div className="bg-card px-2 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
              Материал
            </dt>
            <dd className="mt-1 font-display text-lg tracking-wide">100% полиэстер</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-1 flex-col justify-end">
          <div className="border-t border-border pt-4">
            <div className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
              Под ключ, тариф «{plan.name}»
            </div>
            <div className="mt-1 font-display text-3xl leading-none text-foreground">
              <span className="mr-1 text-base text-muted-foreground">от</span>
              {turnkey.toLocaleString('ru-RU')} ₽
              <span className="ml-1 text-sm text-muted-foreground">/ м²</span>
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">
              Ткань отдельно — от{' '}
              {item.oldPrice && (
                <span className="mr-1 line-through">{item.oldPrice.toLocaleString('ru-RU')}</span>
              )}
              {item.price.toLocaleString('ru-RU')} ₽/м² без монтажа
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              onClick={() => openSamples(item.slug)}
              className="flex items-center justify-center gap-2 bg-primary px-4 py-3 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <Icon name="Package" size={16} />
              Получить образец
            </button>
            <button
              type="button"
              onClick={() =>
                openLead(
                  `Каталог: ${item.name}`,
                  `${item.name} — ${item.material}, под ключ от ${turnkey.toLocaleString('ru-RU')} ₽/м² (тариф «${plan.name}»)`,
                )
              }
              aria-label={`Вызвать замерщика: ${item.name}`}
              className="flex items-center gap-2 border border-foreground/25 px-4 py-3 font-display text-base uppercase tracking-[0.04em] text-foreground transition-colors hover:border-primary hover:text-primary-ink"
            >
              <Icon name="Ruler" size={16} />
              Замер
            </button>
          </div>
        </div>
      </div>

      {zoom && (
        <ImageZoom
          src={item.img}
          title={item.name}
          caption={`${item.colorName} · ширина ${item.width ?? 300} см`}
          onLead={() => {
            setZoom(false);
            openLead(
              `Каталог: ${item.name}`,
              `${item.name} — ${item.material}, ${item.price.toLocaleString('ru-RU')} ₽/м²`,
            );
          }}
          onClose={() => setZoom(false)}
        />
      )}
    </article>
  );
};

export default CatalogCard;