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
          className="hover-card hover-card-dark flex flex-col bg-ink p-7 lg:p-8"
        >
          <Icon
            name={b.icon}
            fallback="Check"
            size={26}
            className="text-primary"
          />
          <h3 className="mt-7 font-display text-2xl uppercase leading-none tracking-wide text-background">
            {b.title}
          </h3>
          <p className="mt-3 text-[0.95rem] leading-[1.6] text-background/60">
            {b.text}
          </p>
        </article>
      ))}
    </div>
  </Section>
);

export default CeilBenefits;
