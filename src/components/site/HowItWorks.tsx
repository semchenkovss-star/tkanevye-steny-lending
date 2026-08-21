import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const STEPS = [
  {
    n: '01',
    day: 'День 0',
    title: 'Заявка и звонок',
    text: 'Оставляете имя и телефон. Перезваниваем в течение 15 минут в рабочее время, уточняем комнату, метраж и задачу — эхо, кривизна или просто внешний вид.',
    icon: 'PhoneCall',
  },
  {
    n: '02',
    day: 'День 1',
    title: 'Замер и смета',
    text: 'Замерщик приезжает бесплатно, снимает геометрию лазером, показывает образцы тканей. Смета с фиксированной ценой приходит в течение 24 часов.',
    icon: 'Ruler',
  },
  {
    n: '03',
    day: 'День 3—10',
    title: 'Раскрой полотна',
    text: 'Ткань режется под ваши размеры на производстве, каркас комплектуется. Вы в это время ничего не делаете и живёте в квартире как обычно.',
    icon: 'Scissors',
  },
  {
    n: '04',
    day: 'День 11—12',
    title: 'Монтаж и сдача',
    text: 'Бригада ставит каркас, укладывает войлок, натягивает полотно. Уборка входит в работу. Подписываем акт и выдаём гарантийный талон.',
    icon: 'CheckCheck',
  },
];

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <Section
      id="how"
      index="04"
      eyebrow="Как это работает"
      title={<>Четыре шага от заявки до готовой стены</>}
      lead="Ваше участие — два разговора и выбор ткани. Всё остальное делаем мы."
    >
      <div className="grid gap-px border border-border bg-border lg:grid-cols-4">
        {STEPS.map((s, i) => (
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
              <span className="font-display text-3xl leading-none">{s.n}</span>
              <Icon name={s.icon} fallback="Circle" size={20} />
            </div>
            <span
              className={`text-xs uppercase tracking-[0.14em] ${
                i === active ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}
            >
              {s.day}
            </span>
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
            onClick={() => openLead('Как это работает')}
            className="bg-foreground px-8 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Начать с бесплатного замера
          </button>
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
