import { useMemo, useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { EXTRAS, PLANS, formatMoney } from '@/lib/pricing';
import { CATALOG, MATERIALS, PRICE_MIN } from '@/data/catalog';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const NumberField = ({
  id,
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm text-muted-foreground">
      {label}
    </label>
    <div className="flex min-w-0 items-stretch border border-border bg-card">
      <button
        type="button"
        aria-label="Уменьшить"
        onClick={() => onChange(clamp(Number((value - step).toFixed(1)), min, max))}
        className="flex w-11 shrink-0 items-center justify-center border-r border-border sm:w-12 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Icon name="Minus" size={16} />
      </button>
      <div className="flex min-w-0 flex-1 items-baseline justify-center gap-1.5 px-1 sm:px-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
          className="h-14 w-full min-w-0 [appearance:textfield] bg-transparent text-center font-display text-2xl tracking-wide text-foreground outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <button
        type="button"
        aria-label="Увеличить"
        onClick={() => onChange(clamp(Number((value + step).toFixed(1)), min, max))}
        className="flex w-11 shrink-0 items-center justify-center border-l border-border sm:w-12 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Icon name="Plus" size={16} />
      </button>
    </div>
  </div>
);

const Calculator = () => {
  const [length, setLength] = useState(4.2);
  const [height, setHeight] = useState(2.7);
  const [planId, setPlanId] = useState('quiet');
  const [extras, setExtras] = useState<string[]>([]);
  const [fabricSlug, setFabricSlug] = useState(CATALOG[0].slug);

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const fabric = CATALOG.find((f) => f.slug === fabricSlug) ?? CATALOG[0];
  const fabricExtra = fabric.price - PRICE_MIN;
  const rate = plan.rate + fabricExtra;
  const area = useMemo(() => Number((length * height).toFixed(2)), [length, height]);

  const walls = area * rate;
  const extrasSum = EXTRAS.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const total = walls + extrasSum;

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  const summary = `${length} × ${height} м (${area} м²), тариф «${plan.name}», ткань «${fabric.name}»${
    extras.length ? ', допы: ' + EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.label).join(', ') : ''
  } — ${formatMoney(total)}`;

  return (
    <Section
      id="calc"
      index="08"
      eyebrow="Калькулятор"
      title={<>Посчитайте стоимость своей стены</>}
      lead="Введите размеры стены, выберите тариф — расчёт появится сразу. Это ориентир: точную смету считает замерщик."
    >
      <div className="grid min-w-0 gap-px border border-border bg-border lg:grid-cols-12">
        <div className="min-w-0 bg-card p-5 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="grid min-w-0 gap-6 sm:grid-cols-2">
            <NumberField
              id="calc-length"
              label="Длина стены"
              unit="м"
              value={length}
              min={0.5}
              max={20}
              step={0.1}
              onChange={setLength}
            />
            <NumberField
              id="calc-height"
              label="Высота стены"
              unit="м"
              value={height}
              min={1.5}
              max={6}
              step={0.1}
              onChange={setHeight}
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Ruler" size={16} className="text-primary-ink" />
            Площадь полотна: <b className="text-foreground">{area} м²</b>
          </div>

          <div className="mt-9">
            <div className="mb-3 text-sm text-muted-foreground">Тариф</div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {PLANS.map((p) => {
                const active = p.id === planId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanId(p.id)}
                    aria-pressed={active}
                    className={`p-5 text-left transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground hover:bg-secondary'
                    }`}
                  >
                    <div className="font-display text-2xl uppercase leading-none tracking-wide">
                      {p.name}
                    </div>
                    <div
                      className={`mt-2 text-sm ${
                        active ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}
                    >
                      {p.rate.toLocaleString('ru-RU')} ₽/м²
                    </div>
                    <div
                      className={`mt-3 text-xs leading-[1.4] ${
                        active ? 'text-primary-foreground/75' : 'text-muted-foreground'
                      }`}
                    >
                      {p.for}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-9">
            <label htmlFor="calc-fabric" className="mb-3 block text-sm text-muted-foreground">
              Ткань из каталога
            </label>
            <div className="border border-border bg-card">
              <div className="flex items-center gap-4 border-b border-border p-4">
                <span
                  className="h-10 w-10 shrink-0 border border-border"
                  style={{ backgroundColor: fabric.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xl uppercase leading-none tracking-wide">
                    {fabric.name}
                  </div>
                  <div className="mt-1.5 truncate text-xs text-muted-foreground">
                    {fabric.material} · {fabric.colorName} ·{' '}
                    {fabricExtra ? `+${fabricExtra.toLocaleString('ru-RU')} ₽/м²` : 'базовая цена'}
                  </div>
                </div>
              </div>
              <select
                id="calc-fabric"
                value={fabricSlug}
                onChange={(e) => setFabricSlug(e.target.value)}
                className="h-14 w-full bg-card px-4 text-[0.95rem] text-foreground outline-none"
              >
                {MATERIALS.map((m) => {
                  const items = CATALOG.filter((f) => f.material === m);
                  if (!items.length) return null;
                  return (
                    <optgroup key={m} label={m}>
                      {items.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.name} · {f.price.toLocaleString('ru-RU')} ₽/м²
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>
            <p className="mt-3 text-xs leading-[1.5] text-muted-foreground">
              {fabric.description}
            </p>
          </div>

          <div className="mt-9">
            <div className="mb-3 text-sm text-muted-foreground">Дополнительно</div>
            <div className="space-y-px border border-border bg-border">
              {EXTRAS.map((e) => {
                const active = extras.includes(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggleExtra(e.id)}
                    aria-pressed={active}
                    className="flex w-full items-center gap-4 bg-card p-4 text-left transition-colors hover:bg-secondary"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${
                        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                      }`}
                    >
                      {active && <Icon name="Check" size={14} />}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[0.95rem] text-foreground">{e.label}</span>
                      <span className="block text-xs text-muted-foreground">{e.hint}</span>
                    </span>
                    <span className="font-display text-lg tracking-wide text-foreground">
                      +{e.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-foreground p-6 text-background sm:p-8 lg:col-span-5 lg:p-10">
          <span className="text-xs uppercase tracking-[0.14em] text-background/55">
            Ориентировочная стоимость
          </span>
          <div className="mt-3 font-display text-[3rem] leading-none text-primary sm:text-[3.75rem]">
            {formatMoney(total)}
          </div>

          <dl className="mt-8 space-y-3 border-t border-background/15 pt-6 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-background/60">
                {fabric.name} {area} м² × {rate.toLocaleString('ru-RU')} ₽
              </dt>
              <dd className="whitespace-nowrap">{formatMoney(walls)}</dd>
            </div>
            {EXTRAS.filter((e) => extras.includes(e.id)).map((e) => (
              <div key={e.id} className="flex items-baseline justify-between gap-4">
                <dt className="text-background/60">{e.label}</dt>
                <dd className="whitespace-nowrap">{formatMoney(e.price)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-background/60">Замер и доставка</dt>
              <dd className="whitespace-nowrap text-primary">0 ₽</dd>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-[1.55] text-background/55">
            В цену входит материал, каркас, работа и уборка. Итог фиксируется в смете после замера
            и больше не меняется.
          </p>

          <button
            type="button"
            onClick={() => openLead('Калькулятор', summary)}
            className="mt-8 w-full bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Отправить расчёт и получить смету
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Calculator;
