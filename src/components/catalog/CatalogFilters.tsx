import Icon from '@/components/ui/icon';
import { CONCEPTS, Concept, MATERIALS, Material, PRICE_MAX, ROOMS, Room } from '@/data/catalog';

export interface Filters {
  concepts: Concept[];
  materials: Material[];
  rooms: Room[];
  maxPrice: number;
  inStock: boolean;
}

export const EMPTY_FILTERS: Filters = {
  concepts: [],
  materials: [],
  rooms: [],
  maxPrice: PRICE_MAX,
  inStock: false,
};

const Check = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className="flex w-full items-center gap-3 py-2 text-left text-[0.95rem] text-foreground transition-colors hover:text-primary"
  >
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'
      }`}
    >
      {active && <Icon name="Check" size={13} />}
    </span>
    {label}
  </button>
);

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-t border-border py-6 first:border-t-0 first:pt-0">
    <h3 className="mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>
    {children}
  </div>
);

interface Props {
  value: Filters;
  onChange: (f: Filters) => void;
  total: number;
}

const CatalogFilters = ({ value, onChange, total }: Props) => {
  const toggle = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const dirty =
    value.concepts.length > 0 ||
    value.materials.length > 0 ||
    value.rooms.length > 0 ||
    value.inStock ||
    value.maxPrice < PRICE_MAX;

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-baseline justify-between gap-4 pb-5">
        <span className="font-display text-2xl uppercase tracking-wide">Фильтр</span>
        {dirty && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            Сбросить
          </button>
        )}
      </div>

      <Group title="Стиль интерьера">
        {CONCEPTS.map((c) => (
          <Check
            key={c.id}
            label={c.label}
            active={value.concepts.includes(c.id)}
            onClick={() => onChange({ ...value, concepts: toggle(value.concepts, c.id) })}
          />
        ))}
      </Group>

      <Group title="Материал">
        {MATERIALS.map((m) => (
          <Check
            key={m}
            label={m}
            active={value.materials.includes(m)}
            onClick={() => onChange({ ...value, materials: toggle(value.materials, m) })}
          />
        ))}
      </Group>

      <Group title="Помещение">
        {ROOMS.map((r) => (
          <Check
            key={r}
            label={r}
            active={value.rooms.includes(r)}
            onClick={() => onChange({ ...value, rooms: toggle(value.rooms, r) })}
          />
        ))}
      </Group>

      <Group title="Цена за м²">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">до</span>
          <span className="font-display text-xl tracking-wide">
            {value.maxPrice.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        <input
          type="range"
          min={3500}
          max={PRICE_MAX}
          step={100}
          value={value.maxPrice}
          onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value) })}
          aria-label="Максимальная цена"
          className="mt-3 h-1 w-full cursor-pointer appearance-none bg-border accent-primary"
        />
      </Group>

      <Group title="Наличие">
        <Check
          label="Только в наличии"
          active={value.inStock}
          onClick={() => onChange({ ...value, inStock: !value.inStock })}
        />
      </Group>

      <div className="border-t border-border pt-5 text-sm text-muted-foreground">
        Найдено вариантов: <b className="text-foreground">{total}</b>
      </div>
    </div>
  );
};

export default CatalogFilters;
