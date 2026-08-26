import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { CEIL_STEPS } from '@/lib/ceilings';

const CeilHow = () => {
  const [active, setActive] = useState(0);
  const step = CEIL_STEPS[active];

  return (
    <Section
      id="ceil-how"
      index="04"
      eyebrow="Как это работает"
      title={<>Четыре шага от заявки до готового потолка</>}
      lead="Ваше участие — два разговора и выбор фактуры полотна. Всё остальное делаем мы."
    >
      <div className="grid gap-px border border-border bg-border lg:grid-cols-4">
        {CEIL_STEPS.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() => setActive(i)}
            className={`flex flex-col items-start gap-3 p-6 text-left transition-colors lg:p-8 ${
              i === active
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground hover:bg-secondary'
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-display text-3xl leading-none">Шаг {s.n}</span>
              <Icon name={s.icon} fallback="Circle" size={20} />
            </div>
            <span className="font-display text-xl uppercase leading-none tracking-wide">
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-px grid gap-8 border border-t-0 border-border bg-card p-8 lg:grid-cols-12 lg:p-12">
        <div className="lg:col-span-7">
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
            {step.title}
          </h3>
          <p className="mt-5 max-w-[42em] text-base leading-[1.65] text-muted-foreground">
            {step.text}
          </p>
        </div>
        <div className="flex items-end lg:col-span-5 lg:justify-end">
          <button
            type="button"
            onClick={() => openLead('Потолки — как это работает')}
            className="bg-foreground px-8 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Начать с замера
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CeilHow;
