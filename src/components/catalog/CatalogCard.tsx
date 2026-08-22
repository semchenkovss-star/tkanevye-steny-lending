import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { CONCEPTS, CatalogItem } from '@/data/catalog';

const CatalogCard = ({ item }: { item: CatalogItem }) => {
  const concept = CONCEPTS.find((c) => c.id === item.concept)?.label ?? '';

  return (
    <article className="group flex flex-col bg-card animate-scale-in">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          className="absolute bottom-3 left-3 h-9 w-9 border border-background/70 shadow-sm"
          style={{ backgroundColor: item.color }}
          title={item.colorName}
        />
        {item.badge && (
          <span className="absolute left-3 top-3 bg-primary px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-primary-foreground">
            {item.badge}
          </span>
        )}
        {!item.inStock && (
          <span className="absolute right-3 top-3 bg-foreground px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-background">
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

        <dl className="mt-5 grid grid-cols-3 gap-px border border-border bg-border text-center">
          <div className="bg-card px-2 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Шум</dt>
            <dd className="mt-1 font-display text-lg tracking-wide">−{item.noise} дБ</dd>
          </div>
          <div className="bg-card px-2 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
              Ширина
            </dt>
            <dd className="mt-1 font-display text-lg tracking-wide">
              {item.width ?? 300} см
            </dd>
          </div>
          <div className="bg-card px-2 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
              Гарантия
            </dt>
            <dd className="mt-1 font-display text-lg tracking-wide">
              {item.warranty} {item.warranty < 5 ? 'года' : 'лет'}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-1 items-end justify-between gap-4">
          <div>
            {item.oldPrice && (
              <div className="text-sm text-muted-foreground line-through">
                {item.oldPrice.toLocaleString('ru-RU')} ₽
              </div>
            )}
            <div className="font-display text-3xl leading-none text-foreground">
              {item.price.toLocaleString('ru-RU')} ₽
              <span className="ml-1 text-sm text-muted-foreground">/ м²</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openLead(`Каталог: ${item.name}`, `${item.name} — ${item.material}, ${item.price.toLocaleString('ru-RU')} ₽/м²`)}
            className="flex items-center gap-2 bg-foreground px-4 py-3 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Icon name="Ruler" size={16} />
            Замер
          </button>
        </div>
      </div>
    </article>
  );
};

export default CatalogCard;