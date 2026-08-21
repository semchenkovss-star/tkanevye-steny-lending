import Icon from '@/components/ui/icon';
import Section from '@/components/site/Section';

const PAINS = [
  {
    icon: 'CalendarX',
    title: 'Ремонт тянется месяцами',
    text: 'Штукатурка, шпаклёвка в три слоя, шлифовка, грунт, покраска. Между слоями — просушка. Комната выпадает из жизни на пять-шесть недель.',
  },
  {
    icon: 'AudioLines',
    title: 'В комнате гуляет эхо',
    text: 'Голые твёрдые поверхности отражают звук. Разговор гулкий, телевизор приходится делать громче, соседей слышно как в коридоре.',
  },
  {
    icon: 'RulerDimensionLine',
    title: 'Стены кривые, шкаф не встаёт',
    text: 'Перепад плоскости 3-6 см — обычная история в панельных и старых домах. Мебель отходит от стены, плинтус не садится, обои идут волной.',
  },
];

const Pain = () => {
  return (
    <Section
      id="pain"
      index="01"
      eyebrow="С чем к нам приходят"
      title={<>Три причины, по которым стену не трогают годами</>}
      lead="Мы не спорим с этими проблемами — мы убираем их конструктивно, а не косметикой."
      tone="surface"
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-3">
        {PAINS.map((p) => (
          <article
            key={p.title}
            className="group bg-card p-8 transition-colors duration-300 hover:bg-foreground lg:p-10"
          >
            <Icon
              name={p.icon}
              fallback="TriangleAlert"
              size={30}
              className="text-primary"
            />
            <h3 className="mt-8 font-display text-3xl uppercase leading-none tracking-wide text-foreground transition-colors group-hover:text-background">
              {p.title}
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground transition-colors group-hover:text-background/70">
              {p.text}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Pain;
