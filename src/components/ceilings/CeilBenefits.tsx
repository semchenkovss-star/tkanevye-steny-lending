import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CEIL_BENEFITS } from '@/lib/ceilings';

const CeilBenefits = () => (
  <Section
    id="ceil-benefits"
    index="03"
    eyebrow="Выгоды"
    title={<>Что вы получаете вместо ремонта потолка</>}
    lead="Восемь причин, по которым натяжные потолки в Москве ставят вместо штукатурки и покраски плиты."
    tone="dark"
  >
    <div className="grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
      {CEIL_BENEFITS.map((b) => (
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

export default CeilBenefits;
