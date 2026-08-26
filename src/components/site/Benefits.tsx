import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

const BENEFITS = [
  {
    icon: 'ShieldCheck',
    title: 'Долговечность',
    text: 'Текстиль устойчив к выгоранию, высокопрочный и не пропускает влагу, а также очень лёгок в уходе.',
  },
  {
    icon: 'Hammer',
    title: 'Антивандальность',
    text: 'Не царапается и не рвётся даже при механическом воздействии средней силы.',
  },
  {
    icon: 'Leaf',
    title: 'Гипоаллергенность',
    text: '100% полиэстер, не содержит клея и обладает антистатическим и антибактериальным эффектом.',
  },
  {
    icon: 'Building2',
    title: 'Применимость',
    text: 'Идеально подходит для коммерческой недвижимости: банки, рестораны, гостиницы, офисы и торговые павильоны.',
  },
  {
    icon: 'Timer',
    title: 'Быстрый монтаж',
    text: 'Не требуется специальная подготовка стен. Захотите поменять дизайн, цвет или фактуру — полотно меняется на новое без демонтажа системы.',
  },
  {
    icon: 'Volume2',
    title: 'В помещении тихо и комфортно',
    text: 'Акустическая мембрана поглощает звук: проходя сквозь ткань, он рассеивается в ней. В помещении нет эха и звонких звуков, речь становится разборчивее.',
  },
  {
    icon: 'AudioLines',
    title: 'Раскрывает аудиосистему',
    text: 'Натяжные стены обеспечивают правильный коэффициент реверберации — качество звучания растёт, атмосфера становится комфортной.',
  },
  {
    icon: 'Layers',
    title: 'Отделка под звукоизоляцию',
    text: 'В комплекте со звукоизоляционными панелями можно добиться не только звукопоглощения внутри помещения, но и изоляции звука снаружи.',
  },
];

const Benefits = () => {
  return (
    <Section
      id="benefits"
      index="03"
      eyebrow="Выгоды"
      title={<>Что вы получаете вместо ремонта</>}
      lead="Восемь свойств тканевой стены, из-за которых её выбирают вместо штукатурки и краски."
      tone="dark"
    >
      <div className="grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <article
            key={b.title}
            className="group flex flex-col bg-foreground p-7 transition-colors duration-300 hover:bg-primary lg:p-8"
          >
            <Icon
              name={b.icon}
              fallback="Check"
              size={26}
              className="text-primary transition-colors group-hover:text-primary-foreground"
            />
            <h3 className="mt-7 font-display text-2xl uppercase leading-none tracking-wide text-background">
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
