import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const CRITERIA = [
  {
    icon: 'Ruler',
    title: 'Высота комнаты',
    text: 'Потолок съедает 3-5 см. Если высота меньше 2,5 м — берите глянец: зеркальная поверхность зрительно поднимает комнату.',
  },
  {
    icon: 'Sun',
    title: 'Свет и блики',
    text: 'Много окон и светильников — матовое полотно, оно не даёт зайчиков. Тёмная комната — сатин или глянец, они отражают свет.',
  },
  {
    icon: 'Droplets',
    title: 'Влага и запахи',
    text: 'Для кухни и санузла берите полотно с плотной поверхностью: оно не впитывает запахи и моется губкой.',
  },
  {
    icon: 'Volume2',
    title: 'Шум сверху',
    text: 'Слышны шаги соседей — акустическое полотно с микроперфорацией гасит гул и снижает ударный шум.',
  },
];

const CeilGuide = () => (
  <Section
    id="ceil-guide"
    index="06"
    eyebrow="Подсказка"
    title={<>Как выбрать потолочное полотно</>}
    lead="Четыре вопроса, на которые стоит ответить до заказа. Если сомневаетесь — замерим комнату и подберём полотно бесплатно."
    tone="surface"
  >
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
      {CRITERIA.map((c) => (
        <div key={c.title} className="bg-card p-6">
          <Icon name={c.icon} size={24} className="text-primary" />
          <h3 className="mt-5 font-display text-xl uppercase leading-tight tracking-wide">
            {c.title}
          </h3>
          <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{c.text}</p>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={() => openLead('Потолки: подбор полотна', 'Нужна помощь с выбором полотна')}
      className="mt-8 flex items-center gap-2 bg-foreground px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <Icon name="Ruler" size={18} />
      Записаться на замер
    </button>
  </Section>
);

export default CeilGuide;
