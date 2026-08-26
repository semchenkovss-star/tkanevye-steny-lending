import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CEIL_BENEFITS } from '@/lib/ceilings';

const CeilBenefits = () => (
  <Section
    id="ceil-benefits"
    index="03"
    eyebrow="Выгоды"
    title={<>Что вы получаете вместо ремонта потолка</>}
    tone="dark"
  >
    <div className="grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-3">
      {CEIL_BENEFITS.map((b) => (
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

export default CeilBenefits;
