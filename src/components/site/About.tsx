import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

const FACTS = [
  { icon: 'Factory', title: 'Свой раскрой', text: 'Полотно режем на собственном участке — без посредников и лишней недели ожидания.' },
  { icon: 'Users', title: 'Штатные бригады', text: 'Не подряд с биржи: те же монтажники приезжают и на гарантийное обслуживание.' },
  { icon: 'FileText', title: 'Договор и фикс-цена', text: 'Смета после замера фиксируется. Доплат «по факту» в договоре не предусмотрено.' },
  { icon: 'Truck', title: 'Москва и область', text: 'Выезд замерщика по Москве и в радиусе 50 км от МКАД — бесплатно.' },
];

const About = () => {
  return (
    <Section
      id="about"
      index="10"
      eyebrow="О компании"
      title={<>Полотно — с 2016 года</>}
      lead="Мы делаем только тканевые стены и потолки. Не берём общестрой, не разводим бригады по объектам — за счёт этого держим срок в один-два дня и отвечаем за результат."
      tone="dark"
    >
      <div className="grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f) => (
          <article key={f.title} className="bg-foreground p-8">
            <Icon name={f.icon} fallback="Building2" size={26} className="text-primary" />
            <h3 className="mt-6 font-display text-2xl uppercase leading-none tracking-wide text-background">
              {f.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.6] text-background/60">{f.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default About;
