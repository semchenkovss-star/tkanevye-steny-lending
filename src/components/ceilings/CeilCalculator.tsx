import { useMemo, useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { CEIL_EXTRAS, CEIL_PLANS, ceilMoney } from '@/lib/ceilings';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const NumberField = ({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm text-muted-foreground">
      {label}
    </label>
    <div className="flex items-stretch border border-border bg-card">
      <button
        type="button"
        aria-label="Уменьшить"
        onClick={() => onChange(clamp(Number((value - 0.1).toFixed(1)), min, max))}
        className="flex w-12 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Icon name="Minus" size={16} />
      </button>
      <div className="flex flex-1 items-baseline justify-center gap-1.5 px-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
          className="h-14 w-full [appearance:textfield] bg-transparent text-center font-display text-2xl tracking-wide text-foreground outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="text-sm text-muted-foreground">м</span>
      </div>
      <button
        type="button"
        aria-label="Увеличить"
        onClick={() => onChange(clamp(Number((value + 0.1).toFixed(1)), min, max))}
        className="flex w-12 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Icon name="Plus" size={16} />
      </button>
    </div>
  </div>
);

const CeilCalculator = () => {
  const [length, setLength] = useState(4.2);
  const [width, setWidth] = useState(3.4);
  const [planId, setPlanId] = useState('shadow');
  const [extras, setExtras] = useState<string[]>([]);

  const plan = CEIL_PLANS.find((p) => p.id === planId) ?? CEIL_PLANS[1];
  const area = useMemo(() => Number((length * width).toFixed(2)), [length, width]);

  const base = area * plan.rate;
  const extrasSum = CEIL_EXTRAS.filter((e) => extras.includes(e.id)).reduce(
    (s, e) => s + e.price,
    0,
  );
  const total = base + extrasSum;

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  const summary = `Потолок ${length} × ${width} м (${area} м²), тариф «${plan.name}»${
    extras.length
      ? ', допы: ' +
        CEIL_EXTRAS.filter((e) => extras.includes(e.id))
          .map((e) => e.label)
          .join(', ')
      : ''
  } — ${ceilMoney(total)}`;

  return (
    <Section
      id="ceil-calc"
      index="09"
      eyebrow="Калькулятор"
      title={<>Посчитайте стоимость своего потолка</>}
      lead="Введите размеры комнаты и выберите тариф — расчёт появится сразу. Это ориентир: точную смету считает замерщик."
    >
      <div className="grid gap-px border border-border bg-border lg:grid-cols-12">
        <div className="bg-card p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <NumberField
              id="ceil-length"
              label="Длина комнаты"
              value={length}
              min={1}
              max={20}
              onChange={setLength}
            />
            <NumberField
              id="ceil-width"
              label="Ширина комнаты"
              value={width}
              min={1}
              max={20}
              onChange={setWidth}
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Ruler" size={16} className="text-primary" />
            Площадь потолка: <b className="text-foreground">{area} м²</b>
          </div>

          <div className="mt-9">
            <div className="mb-3 text-sm text-muted-foreground">Тариф</div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {CEIL_PLANS.map((p) => {
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
            <div className="mb-3 text-sm text-muted-foreground">Дополнительно</div>
            <div className="space-y-px border border-border bg-border">
              {CEIL_EXTRAS.map((e) => {
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
                        active
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border'
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
            {ceilMoney(total)}
          </div>

          <dl className="mt-8 space-y-3 border-t border-background/15 pt-6 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-background/60">
                Полотно {area} м² × {plan.rate.toLocaleString('ru-RU')} ₽
              </dt>
              <dd className="whitespace-nowrap">{ceilMoney(base)}</dd>
            </div>
            {CEIL_EXTRAS.filter((e) => extras.includes(e.id)).map((e) => (
              <div key={e.id} className="flex items-baseline justify-between gap-4">
                <dt className="text-background/60">{e.label}</dt>
                <dd className="whitespace-nowrap">{ceilMoney(e.price)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-background/60">Замер и доставка</dt>
              <dd className="whitespace-nowrap text-primary">0 ₽</dd>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-[1.55] text-background/55">
            В цену входит полотно, багет, работа бригады и уборка. Итог фиксируется в смете после
            замера и больше не меняется.
          </p>

          <button
            type="button"
            onClick={() => openLead('Калькулятор потолков', summary)}
            className="mt-8 w-full bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Отправить расчёт и получить смету
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CeilCalculator;
