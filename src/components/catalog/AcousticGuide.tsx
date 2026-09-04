import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const CRITERIA = [
  {
    icon: 'Volume2',
    title: 'Зачем нужна тишина',
    text: 'Гасить эхо внутри комнаты — хватит полотна на одной стене. Защититься от соседей — нужен акустический слой по всей площади.',
  },
  {
    icon: 'Ruler',
    title: 'Толщина полотна',
    text: 'До 30 мм убирает гулкость в спальне. От 40 мм заметно снижает шум в кабинете и переговорной.',
  },
  {
    icon: 'Sun',
    title: 'Свет и цвет',
    text: 'Тёмные плотные ткани поглощают лучше и не бликуют. Светлые визуально расширяют комнату — берите их на солнечную сторону.',
  },
  {
    icon: 'SprayCan',
    title: 'Уход и износ',
    text: 'В детской и на кухне берите ткани с защитной пропиткой: их можно протирать влажной губкой без разводов.',
  },
];

const AcousticGuide = () => (
  <section className="mt-10 border border-border bg-card p-6 sm:p-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-primary-ink">Подсказка</div>
        <h2 className="mt-2 font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
          Как выбрать акустическую ткань для стен
        </h2>
      </div>
      <p className="max-w-[30em] text-sm leading-[1.55] text-muted-foreground">
        Четыре вопроса, на которые стоит ответить, прежде чем купить акустические ткани для стен. Если
        сомневаетесь — замерим шум на месте и подберём полотно бесплатно.
      </p>
    </div>

    <div className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
      {CRITERIA.map((c) => (
        <div key={c.title} className="bg-card p-5">
          <Icon name={c.icon} size={22} className="text-primary-ink" />
          <h3 className="mt-4 font-display text-lg uppercase leading-tight tracking-wide">
            {c.title}
          </h3>
          <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">{c.text}</p>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={() =>
        openLead('Каталог: подбор акустики', 'Нужна помощь с выбором акустической ткани')
      }
      className="mt-7 flex items-center gap-2 bg-foreground px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <Icon name="Ruler" size={18} />
      Записаться на замер
    </button>
  </section>
);

export default AcousticGuide;
