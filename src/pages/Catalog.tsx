import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Footer from '@/components/site/Footer';
import LeadDialog from '@/components/site/LeadDialog';
import FloatingCta from '@/components/site/FloatingCta';
import Seo from '@/components/Seo';
import CatalogCard from '@/components/catalog/CatalogCard';
import SamplesDialog from '@/components/catalog/SamplesDialog';
import { openSamples } from '@/lib/samples';
import CatalogFilters, { EMPTY_FILTERS, Filters } from '@/components/catalog/CatalogFilters';
import {
  CATALOG,
  CONCEPTS,
  Concept,
  MATERIALS,
  Material,
  PRICE_MAX,
  ROOMS,
  Room,
  TONES,
  Tone,
  toneOf,
} from '@/data/catalog';

type Sort = 'popular' | 'price-asc' | 'price-desc' | 'noise';

const SORTS: { id: Sort; label: string }[] = [
  { id: 'popular', label: 'По популярности' },
  { id: 'price-asc', label: 'Сначала дешевле' },
  { id: 'price-desc', label: 'Сначала дороже' },
  { id: 'noise', label: 'Тише всего' },
];

const readFilters = (params: URLSearchParams): Filters => ({
  concepts: params.getAll('concept[]').filter((c) => CONCEPTS.some((x) => x.id === c)) as Concept[],
  materials: params.getAll('material[]').filter((m) => MATERIALS.includes(m as Material)) as Material[],
  rooms: params.getAll('room[]').filter((r) => ROOMS.includes(r as Room)) as Room[],
  tones: params.getAll('tone[]').filter((t) => TONES.some((x) => x.id === t)) as Tone[],
  maxPrice: Number(params.get('price')) || PRICE_MAX,
  inStock: params.get('stock') === '1',
});

const CatalogPage = () => {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => readFilters(params));
  const [sort, setSort] = useState<Sort>('popular');
  const [mobileOpen, setMobileOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#fabric-')) {
      const t = window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const applyFilters = (f: Filters) => {
    setFilters(f);
    const next = new URLSearchParams();
    f.concepts.forEach((c) => next.append('concept[]', c));
    f.materials.forEach((m) => next.append('material[]', m));
    f.rooms.forEach((r) => next.append('room[]', r));
    f.tones.forEach((t) => next.append('tone[]', t));
    if (f.maxPrice < PRICE_MAX) next.set('price', String(f.maxPrice));
    if (f.inStock) next.set('stock', '1');
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    let out = CATALOG.filter((i) => {
      if (filters.concepts.length && !filters.concepts.includes(i.concept)) return false;
      if (filters.materials.length && !filters.materials.includes(i.material)) return false;
      if (filters.rooms.length && !i.rooms.some((r) => filters.rooms.includes(r))) return false;
      if (filters.tones.length && !filters.tones.includes(toneOf(i.color))) return false;
      if (i.price > filters.maxPrice) return false;
      if (filters.inStock && !i.inStock) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'noise') return b.noise - a.noise;
      return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
    });

    return out;
  }, [filters, sort]);

  const chips = [
    ...filters.concepts.map((c) => ({
      key: `c-${c}`,
      label: CONCEPTS.find((x) => x.id === c)?.label ?? c,
      remove: () => applyFilters({ ...filters, concepts: filters.concepts.filter((x) => x !== c) }),
    })),
    ...filters.materials.map((m) => ({
      key: `m-${m}`,
      label: m,
      remove: () =>
        applyFilters({ ...filters, materials: filters.materials.filter((x) => x !== m) }),
    })),
    ...filters.rooms.map((r) => ({
      key: `r-${r}`,
      label: r,
      remove: () => applyFilters({ ...filters, rooms: filters.rooms.filter((x) => x !== r) }),
    })),
    ...filters.tones.map((t) => ({
      key: `t-${t}`,
      label: TONES.find((x) => x.id === t)?.label ?? t,
      remove: () => applyFilters({ ...filters, tones: filters.tones.filter((x) => x !== t) }),
    })),
    ...(filters.maxPrice < PRICE_MAX
      ? [
          {
            key: 'price',
            label: `до ${filters.maxPrice.toLocaleString('ru-RU')} ₽/м²`,
            remove: () => applyFilters({ ...filters, maxPrice: PRICE_MAX }),
          },
        ]
      : []),
    ...(filters.inStock
      ? [
          {
            key: 'stock',
            label: 'В наличии',
            remove: () => applyFilters({ ...filters, inStock: false }),
          },
        ]
      : []),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Каталог тканевых стен',
    itemListElement: list.map((i, n) => ({
      '@type': 'ListItem',
      position: n + 1,
      item: {
        '@type': 'Product',
        name: i.name,
        image: i.img,
        description: i.description,
        offers: {
          '@type': 'Offer',
          price: i.price,
          priceCurrency: 'RUB',
          availability: i.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Каталог тканевых стен: 12 решений с ценами за м² | Полотно"
        description="Каталог тканевых стен под ключ: лён, велюр, рогожка, акустический фетр и микрошенилл. Фильтр по стилю интерьера, помещению и цене. Шумоизоляция до −11 дБ, гарантия до 5 лет, выезд замерщика."
        path="/catalog"
        jsonLd={jsonLd}
      />

      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl uppercase tracking-[0.16em]">
            Полотно
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="shell py-14 sm:py-16 lg:py-20">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Каталог</div>
        <h1 className="mt-3 max-w-[14em] font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.5rem] lg:text-[4.5rem]">
          Тканевые стены под ключ
        </h1>
        <p className="mt-6 max-w-[42em] text-base leading-[1.6] text-muted-foreground">
          Цена включает каркас, наполнение, полотно, монтаж и уборку. Подберите вариант по стилю
          интерьера и бюджету — точную смету посчитает замерщик.
        </p>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex w-full items-center justify-between border border-border bg-card px-5 py-4 font-display text-lg uppercase tracking-[0.04em] lg:hidden"
            >
              <span className="flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={18} className="text-primary" />
                Фильтр
              </span>
              <Icon name={mobileOpen ? 'ChevronUp' : 'ChevronDown'} size={18} />
            </button>

            <div
              className={`${mobileOpen ? 'mt-4 block' : 'hidden'} lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-2`}
            >
              <CatalogFilters value={filters} onChange={applyFilters} total={list.length} />
            </div>

            {mobileOpen && (
              <div className="sticky bottom-0 z-30 -mx-5 mt-4 border-t border-border bg-background/95 px-5 py-4 backdrop-blur lg:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    resultsRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
                  }}
                  className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground"
                >
                  Показать результаты
                  <span className="tabular-nums">({list.length})</span>
                </button>
              </div>
            )}
          </aside>

          <div className="lg:col-span-9" ref={resultsRef}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
              <span className="text-sm text-muted-foreground">
                Показано <b className="text-foreground">{list.length}</b> из {CATALOG.length}
              </span>
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                Сортировка
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {chips.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={c.remove}
                    className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {c.label}
                    <Icon name="X" size={14} />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => applyFilters(EMPTY_FILTERS)}
                  className="px-3 py-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-primary"
                >
                  Сбросить всё
                </button>
              </div>
            )}

            {list.length === 0 ? (
              <div className="mt-10 border border-border bg-card p-10 text-center">
                <Icon name="SearchX" size={34} className="mx-auto text-primary" />
                <h2 className="mt-5 font-display text-3xl uppercase tracking-wide">
                  Под такие условия ничего нет
                </h2>
                <p className="mx-auto mt-3 max-w-[30em] text-sm leading-[1.55] text-muted-foreground">
                  Попробуйте убрать часть фильтров или поднять бюджет — в наличии 180 оттенков,
                  подберём под задачу.
                </p>
                <button
                  type="button"
                  onClick={() => applyFilters(EMPTY_FILTERS)}
                  className="mt-7 bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
                {list.map((i) => (
                  <CatalogCard key={i.slug} item={i} />
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-foreground p-6 text-background sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                  Не нашли нужный оттенок?
                </h2>
                <p className="mt-3 max-w-[34em] text-sm leading-[1.55] text-background/60">
                  В наличии 180 оттенков — привезём до 5 образцов к вам домой.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openSamples()}
                  className="whitespace-nowrap bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  Заказать образцы
                </button>
                <Link
                  to="/#calc"
                  className="whitespace-nowrap border border-background/40 px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  Рассчитать стоимость
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingCta />
      <LeadDialog />
      <SamplesDialog />
    </div>
  );
};

export default CatalogPage;