import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

const BENEFITS = [
  {
    icon: 'Timer',
    metric: '1—2 дня',
    title: 'Монтаж вместо ремонта',
    text: 'Комната освобождается на сутки, а не на полтора месяца. Вечером второго дня в ней уже можно жить.',
  },
  {
    icon: 'Wind',
    metric: 'Ноль пыли',
    title: 'Сухая технология',
    text: 'Ни смесей, ни воды, ни шлифовки. Мебель достаточно отодвинуть от стены и накрыть плёнкой.',
  },
  {
    icon: 'Volume2',
    metric: '−9 дБ',
    title: 'Тише в комнате',
    text: 'Войлок под полотном убирает эхо и приглушает звук от соседей и с лестничной клетки.',
  },
  {
    icon: 'Ruler',
    metric: 'до 60 мм',
    title: 'Кривизна уходит',
    text: 'Каркас выставляется по уровню, а не по стене. Плоскость получается идеальной при любом исходнике.',
  },
  {
    icon: 'CableCar',
    metric: 'Всё внутри',
    title: 'Коммуникации скрыты',
    text: 'Провода, розетки, трубы и вентиляционные короба прячутся в пространстве каркаса.',
  },
  {
    icon: 'ShieldCheck',
    metric: '5 лет',
    title: 'Гарантия на конструкцию',
    text: 'Полотно не провисает и не выгорает. Гарантия на каркас, крепёж и натяжение — пять лет.',
  },
];

const Benefits = () => {
  return (
    <Section
      id="benefits"
      index="03"
      eyebrow="Выгоды"
      title={<>Что вы получаете вместо ремонта</>}
      tone="dark"
    >
      <div className="grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <article
            key={b.title}
            className="group bg-foreground p-8 transition-colors duration-300 hover:bg-primary lg:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-4xl leading-none text-primary transition-colors group-hover:text-primary-foreground">
                {b.metric}
              </span>
              <Icon
                name={b.icon}
                fallback="Check"
                size={22}
                className="text-background/40 transition-colors group-hover:text-primary-foreground"
              />
            </div>
            <h3 className="mt-8 font-display text-2xl uppercase leading-none tracking-wide text-background">
              {b.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.6] text-background/60 transition-colors group-hover:text-primary-foreground/85">
              {b.text}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Benefits;
