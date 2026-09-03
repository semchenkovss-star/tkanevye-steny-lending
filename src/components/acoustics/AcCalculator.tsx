import { useMemo, useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const money = (v: number) => Math.round(v).toLocaleString('ru-RU') + ' ₽';

const GOALS = [
  {
    id: 'echo',
    name: 'Убрать эхо',
    rate: 2100,
    coverage: 0.55,
    hint: 'Гулкий звук внутри комнаты, плохая разборчивость на созвонах',
    detail: 'Хватает одной-двух стен: обрабатываем зоны первых отражений.',
  },
  {
    id: 'noise',
    name: 'Защита от соседей',
    rate: 3400,
    coverage: 1,
    hint: 'Слышно речь, телевизор и шаги за стеной',
    detail: 'Нужен полный слой по стене-источнику: каркас, плита и мембрана.',
  },
] as const;

const EXTRAS = [
  { id: 'ceiling', label: 'Акустический потолок', hint: 'Шум сверху, гул под потолком', rate: 1900 },
  { id: 'door', label: 'Обработка дверного проёма', hint: 'Через дверь уходит до трети звука', price: 18000 },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const AcCalculator = () => {
  const [area, setArea] = useState(16);
  const [height, setHeight] = useState(2.7);
  const [goalId, setGoalId] = useState<string>('echo');
  const [extras, setExtras] = useState<string[]>([]);

  const goal = GOALS.find((g) => g.id === goalId) ?? GOALS[0];

  const wallArea = useMemo(() => {
    const side = Math.sqrt(area);
    const perimeter = side * 4;
    return Number((perimeter * height * goal.coverage).toFixed(1));
  }, [area, height, goal]);

  const wallSum = wallArea * goal.rate;
  const ceilSum = extras.includes('ceiling') ? area * 1900 : 0;
  const doorSum = extras.includes('door') ? 18000 : 0;
  const total = wallSum + ceilSum + doorSum;

  const days = useMemo(() => {
    let d = goal.id === 'noise' ? 2 : 1;
    if (wallArea > 30) d += 1;
    if (extras.includes('ceiling')) d += 1;
    return d;
  }, [goal, wallArea, extras]);

  const toggle = (id: string) =>
    setExtras((p) => (p.includes(id) ? p.filter((e) => e !== id) : [...p, id]));

  const summary = `Акустика: комната ${area} м², высота ${height} м, задача «${goal.name}», обработка ${wallArea} м² стен${
    extras.includes('ceiling') ? ' + потолок' : ''
  }${extras.includes('door') ? ' + дверь' : ''} — ${money(total)}, срок ${days} дн.`;

  return (
    <Section
      id="ac-calc"
      index="05"
      eyebrow="Калькулятор"
      title={<>Посчитайте стоимость тишины</>}
      lead="Укажите площадь комнаты и задачу — стоимость шумоизоляции комнаты под ключ появится сразу. Это ориентир: точную смету считает замерщик после замера шума."
    >
      <div className="grid gap-px border border-border bg-border lg:grid-cols-12">
        <div className="bg-card p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="ac-area" className="mb-2 block text-sm text-muted-foreground">
                Площадь комнаты, м²
              </label>
              <div className="flex items-stretch border border-border bg-card">
                <button
                  type="button"
                  aria-label="Уменьшить площадь"
                  onClick={() => setArea((v) => clamp(v - 1, 4, 200))}
                  className="flex w-12 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon name="Minus" size={16} />
                </button>
                <input
                  id="ac-area"
                  type="number"
                  inputMode="decimal"
                  min={4}
                  max={200}
                  value={area}
                  onChange={(e) => setArea(clamp(Number(e.target.value), 4, 200))}
                  className="h-14 w-full [appearance:textfield] bg-transparent text-center font-display text-2xl tracking-wide text-foreground outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label="Увеличить площадь"
                  onClick={() => setArea((v) => clamp(v + 1, 4, 200))}
                  className="flex w-12 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="ac-height" className="mb-2 block text-sm text-muted-foreground">
                Высота потолка, м
              </label>
              <div className="flex items-stretch border border-border bg-card">
                <button
                  type="button"
                  aria-label="Уменьшить высоту"
                  onClick={() => setHeight((v) => clamp(Number((v - 0.1).toFixed(1)), 2, 5))}
                  className="flex w-12 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon name="Minus" size={16} />
                </button>
                <input
                  id="ac-height"
                  type="number"
                  inputMode="decimal"
                  step={0.1}
                  min={2}
                  max={5}
                  value={height}
                  onChange={(e) => setHeight(clamp(Number(e.target.value), 2, 5))}
                  className="h-14 w-full [appearance:textfield] bg-transparent text-center font-display text-2xl tracking-wide text-foreground outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label="Увеличить высоту"
                  onClick={() => setHeight((v) => clamp(Number((v + 0.1).toFixed(1)), 2, 5))}
                  className="flex w-12 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Ruler" size={16} className="text-primary" />
            Площадь обработки: <b className="text-foreground">{wallArea} м²</b>
          </div>

          <div className="mt-9">
            <div className="mb-3 text-sm text-muted-foreground">Задача</div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {GOALS.map((g) => {
                const active = g.id === goalId;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoalId(g.id)}
                    aria-pressed={active}
                    className={`p-5 text-left transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground hover:bg-secondary'
                    }`}
                  >
                    <div className="font-display text-2xl uppercase leading-none tracking-wide">
                      {g.name}
                    </div>
                    <div
                      className={`mt-2 text-sm ${
                        active ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}
                    >
                      {g.rate.toLocaleString('ru-RU')} ₽/м²
                    </div>
                    <div
                      className={`mt-3 text-xs leading-[1.4] ${
                        active ? 'text-primary-foreground/75' : 'text-muted-foreground'
                      }`}
                    >
                      {g.hint}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs leading-[1.5] text-muted-foreground">{goal.detail}</p>
          </div>

          <div className="mt-9">
            <div className="mb-3 text-sm text-muted-foreground">Дополнительно</div>
            <div className="space-y-px border border-border bg-border">
              {EXTRAS.map((e) => {
                const active = extras.includes(e.id);
                const sum = e.id === 'ceiling' ? area * 1900 : 18000;
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggle(e.id)}
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
                    <span className="whitespace-nowrap font-display text-lg tracking-wide text-foreground">
                      +{money(sum)}
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
            {money(total)}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-background/70">
            <Icon name="Clock" size={16} className="text-primary" />
            Срок работ: <b className="text-background">{days} дн.</b>
          </div>

          <dl className="mt-8 space-y-3 border-t border-background/15 pt-6 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-background/60">
                Стены {wallArea} м² × {goal.rate.toLocaleString('ru-RU')} ₽
              </dt>
              <dd className="whitespace-nowrap">{money(wallSum)}</dd>
            </div>
            {ceilSum > 0 && (
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-background/60">Акустический потолок {area} м²</dt>
                <dd className="whitespace-nowrap">{money(ceilSum)}</dd>
              </div>
            )}
            {doorSum > 0 && (
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-background/60">Дверной проём</dt>
                <dd className="whitespace-nowrap">{money(doorSum)}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-background/60">Замер шума и контрольный замер</dt>
              <dd className="whitespace-nowrap text-primary">0 ₽</dd>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-[1.55] text-background/55">
            В цену входит каркас, звукопоглощающий слой, полотно, работа бригады и уборка. Итог
            фиксируется в смете после замера и больше не меняется.
          </p>

          <button
            type="button"
            onClick={() => openLead('Калькулятор акустики', summary)}
            className="mt-8 w-full bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Отправить расчёт и получить смету
          </button>
        </div>
      </div>
    </Section>
  );
};

export default AcCalculator;
