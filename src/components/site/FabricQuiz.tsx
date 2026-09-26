import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CATALOG, CONCEPTS, ROOMS, type CatalogItem, type Concept, type Room } from '@/data/catalog';
import { openLead } from '@/lib/lead';
import { GOALS, reachGoal } from '@/lib/metrika';

type Priority = 'quiet' | 'walls' | 'style';
type Budget = 'low' | 'mid' | 'any';

interface Answers {
  room?: Room;
  priority?: Priority;
  concept?: Concept;
  budget?: Budget;
}

const PRIORITIES: { id: Priority; label: string; hint: string }[] = [
  { id: 'quiet', label: 'Тишина', hint: 'Глушим эхо и шум от соседей' },
  { id: 'walls', label: 'Скрыть стены', hint: 'Прячем неровности и старую отделку' },
  { id: 'style', label: 'Внешний вид', hint: 'Главное — фактура и цвет в интерьере' },
];

const BUDGETS: { id: Budget; label: string; hint: string; max: number }[] = [
  { id: 'low', label: 'До 1 800 ₽/м²', hint: 'Экономно', max: 1800 },
  { id: 'mid', label: 'До 2 000 ₽/м²', hint: 'Оптимально', max: 2000 },
  { id: 'any', label: 'Не ограничен', hint: 'Смотрим на качество', max: Infinity },
];

/** «5 лет», «3 года» — без этого выходит «5 года» */
const yearsLabel = (n: number) => {
  const last = n % 10;
  if (n % 100 >= 11 && n % 100 <= 14) return `${n} лет`;
  if (last === 1) return `${n} год`;
  if (last >= 2 && last <= 4) return `${n} года`;
  return `${n} лет`;
};

const ROOM_HINTS: Record<Room, string> = {
  Гостиная: 'Телевизор, гости, много света',
  Спальня: 'Тишина и мягкая фактура',
  Кабинет: 'Работа и звонки',
  Детская: 'Безопасность и уход',
  Переговорная: 'Речь должна быть разборчивой',
};

/** Насколько ткань подходит под ответы: чем больше баллов, тем выше в подборке */
const scoreFabric = (item: CatalogItem, a: Answers) => {
  let score = 0;

  if (a.room && item.rooms.includes(a.room)) score += 40;
  if (a.concept && item.concept === a.concept) score += 30;

  if (a.priority === 'quiet') {
    score += item.noise * 6;
    if (item.material === 'Акустик') score += 30;
  }
  if (a.priority === 'walls') {
    score += Math.min(item.thickness, 40) / 2;
    if (item.material === 'Штукатурка') score += 20;
  }
  if (a.priority === 'style') {
    score += item.warranty * 3;
    if (item.badge) score += 10;
  }

  if (item.inStock) score += 8;

  return score;
};

const FabricQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const budget = BUDGETS.find((b) => b.id === answers.budget);
  const conceptLabel = CONCEPTS.find((c) => c.id === answers.concept)?.label ?? '';
  const priorityLabel = PRIORITIES.find((p) => p.id === answers.priority)?.label ?? '';

  const matches = useMemo(() => {
    if (step < 4) return [];

    /* Бюджет — жёсткое ограничение: дороже названной суммы не предлагаем */
    const max = budget?.max ?? Infinity;
    const affordable = CATALOG.filter((i) => i.price <= max);
    const pool = affordable.length ? affordable : CATALOG;

    const ranked = pool
      .map((item) => ({ item, score: scoreFabric(item, answers) }))
      .sort((a, b) => b.score - a.score || a.item.price - b.item.price);

    /* Показываем разные коллекции: три «Комфорта» подряд не дают выбора */
    const picked: CatalogItem[] = [];
    const used = new Set<string>();
    for (const { item } of ranked) {
      if (picked.length === 3) break;
      if (used.has(item.material)) continue;
      used.add(item.material);
      picked.push(item);
    }
    for (const { item } of ranked) {
      if (picked.length === 3) break;
      if (!picked.includes(item)) picked.push(item);
    }
    return picked;
  }, [step, answers, budget]);

  const summary = `Подбор по квизу: ${answers.room}, приоритет «${priorityLabel}», стиль «${conceptLabel}», бюджет ${
    budget?.id === 'any' ? 'не ограничен' : budget?.label.toLowerCase()
  } — подошли: ${matches.map((m) => m.name).join(', ')}`;

  const catalogHref = useMemo(() => {
    const p = new URLSearchParams();
    if (answers.room) p.append('room[]', answers.room);
    if (answers.concept) p.append('concept[]', answers.concept);
    if (budget && budget.max !== Infinity) p.set('price', String(budget.max));
    return `/catalog?${p.toString()}`;
  }, [answers, budget]);

  const pick = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => {
      const next = s + 1;
      if (next === 4) reachGoal(GOALS.CALC_DONE, { source: 'Квиз подбора ткани' });
      return next;
    });
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const QUESTIONS = [
    {
      title: 'Где будут тканевые стены?',
      options: ROOMS.map((r) => ({ id: r, label: r, hint: ROOM_HINTS[r] })),
      onPick: (id: string) => pick('room', id as Room),
    },
    {
      title: 'Что важнее всего?',
      options: PRIORITIES,
      onPick: (id: string) => pick('priority', id as Priority),
    },
    {
      title: 'Какой стиль интерьера?',
      options: CONCEPTS.map((c) => ({ id: c.id, label: c.label, hint: '' })),
      onPick: (id: string) => pick('concept', id as Concept),
    },
    {
      title: 'Бюджет на ткань?',
      options: BUDGETS,
      onPick: (id: string) => pick('budget', id as Budget),
    },
  ];

  const current = QUESTIONS[step];

  return (
    <Section
      id="quiz"
      eyebrow="Подбор за минуту"
      title={<>Какая ткань подойдёт вам</>}
      lead="Четыре вопроса — и мы покажем подходящие варианты из наличия. Без регистрации и без звонка: результат сразу на экране."
    >
      <div className="border border-border bg-card">
        {/* Полоса прогресса: видно, сколько шагов осталось */}
        <div className="flex gap-1 border-b border-border p-4 sm:p-6">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 transition-colors ${
                i < step ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {step < 4 ? (
          <div className="p-6 sm:p-10">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm tracking-[0.2em] text-primary-ink">
                {String(step + 1).padStart(2, '0')} / 04
              </span>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon name="ArrowLeft" size={14} />
                  Назад
                </button>
              )}
            </div>

            <h3 className="mt-3 font-display text-[clamp(1.6rem,6vw,2rem)] uppercase leading-[1.05] tracking-wide sm:text-4xl">
              {current.title}
            </h3>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {current.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => current.onPick(o.id)}
                  className="group border border-border bg-background p-5 text-left transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="block font-display text-xl uppercase leading-none tracking-wide sm:text-2xl">
                    {o.label}
                  </span>
                  {o.hint && (
                    <span className="mt-2 block text-sm leading-[1.45] text-muted-foreground group-hover:text-primary-foreground/80">
                      {o.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-sm tracking-[0.2em] text-primary-ink">
                Результат
              </span>
              <button
                type="button"
                onClick={restart}
                className="flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon name="RotateCcw" size={14} />
                Пройти заново
              </button>
            </div>

            <h3 className="mt-3 font-display text-[clamp(1.6rem,6vw,2rem)] uppercase leading-[1.05] tracking-wide sm:text-4xl">
              Вам подойдут эти ткани
            </h3>
            <p className="mt-4 max-w-[38em] text-[0.95rem] leading-[1.6] text-muted-foreground">
              {answers.room}, приоритет — {priorityLabel.toLowerCase()}, стиль «{conceptLabel}».
              Образцы этих тканей замерщик привезёт с собой — посмотрите их при своём свете.
            </p>

            <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
              {matches.map((f, i) => (
                <div key={f.slug} className="flex flex-col bg-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                    <img
                      src={f.img}
                      alt={`Ткань ${f.name} — подобрана для помещения «${answers.room}»`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {i === 0 && (
                      <span className="absolute left-3 top-3 bg-primary px-2 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-primary-foreground">
                        Лучший выбор
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-display text-xl uppercase leading-none tracking-wide">
                      {f.name}
                    </h4>
                    <p className="mt-2 text-sm leading-[1.5] text-muted-foreground">
                      {f.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Шум −{f.noise} дБ</span>
                      <span>Гарантия {yearsLabel(f.warranty)}</span>
                    </div>
                    <p className="mt-3 font-display text-lg tracking-wide text-primary">
                      {f.price.toLocaleString('ru-RU')} ₽/м²
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => openLead('Квиз подбора ткани', summary)}
                className="flex min-h-[56px] items-center justify-center gap-2 bg-primary px-6 py-4 text-center font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <Icon name="Ruler" size={20} />
                Записаться на замер
              </button>
              <Link
                to={catalogHref}
                className="flex min-h-[56px] items-center justify-center gap-2 border border-foreground px-6 py-4 text-center font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Смотреть все похожие
                <Icon name="ArrowRight" size={18} />
              </Link>
            </div>

            <p className="mt-4 text-xs leading-[1.5] text-muted-foreground">
              Подбор носит рекомендательный характер: точную ткань и смету замерщик подтвердит на
              месте.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default FabricQuiz;