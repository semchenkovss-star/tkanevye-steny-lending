import { useEffect, type ReactNode } from 'react';
import { Link } from '@/lib/router-compat';
import Icon from '@/components/ui/icon';
import Seo from '@/components/Seo';
import Logo from '@/components/site/Logo';
import Section from '@/components/site/Section';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';
import CalcButton from '@/components/site/CalcButton';
import SiteSwitch from '@/components/site/SiteSwitch';
import CrossLinks from '@/components/site/CrossLinks';
import Pricing from '@/components/site/Pricing';
import Calculator from '@/components/site/Calculator';
import { CASES } from '@/components/site/Cases';
import { openLead } from '@/lib/lead';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { breadcrumbsLd, faqLd, serviceLd } from '@/lib/schema';
import { PLANS } from '@/lib/pricing';

export interface LandingItem {
  icon: string;
  title: string;
  text: string;
}

export interface LandingBlock {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  items: LandingItem[];
  note?: ReactNode;
  tone?: 'default' | 'surface';
}

export interface LandingAction {
  label: string;
  icon: string;
  source?: string;
  href?: string;
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface RoomLandingProps {
  path: string;
  crumb: string;
  seo: { title: string; description: string; keywords: string; image: string };
  service: { name: string; serviceType: string; description: string };
  hero: {
    img: string;
    alt: string;
    eyebrow: string;
    title: ReactNode;
    text: ReactNode;
    primary: LandingAction;
    secondary: LandingAction;
  };
  blocks: LandingBlock[];
  cases?: string[];
  casesTitle?: ReactNode;
  casesLead?: string;
  extra?: (index: string) => ReactNode;
  pricing?: { title: ReactNode; lead: string };
  calc?: { title: ReactNode; lead: string };
  faqTitle: ReactNode;
  faq: LandingFaq[];
  final: { title: ReactNode; text: string; action: LandingAction };
}

const pad = (n: number) => String(n).padStart(2, '0');

const ActionButton = ({ action, primary }: { action: LandingAction; primary: boolean }) => {
  const cls = primary
    ? 'flex min-h-[52px] items-center justify-center gap-2 bg-primary px-7 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90'
    : 'flex min-h-[52px] items-center justify-center gap-2 border border-background/30 px-7 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:border-primary hover:text-primary';
  if (action.href) {
    return (
      <a href={action.href} className={cls}>
        <Icon name={action.icon} size={18} />
        {action.label}
      </a>
    );
  }
  return (
    <button type="button" onClick={() => openLead(action.source)} className={cls}>
      <Icon name={action.icon} size={18} />
      {action.label}
    </button>
  );
};

const RoomLanding = (props: RoomLandingProps) => {
  const { path, crumb, seo, service, hero, blocks, faq, final } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gallery = (props.cases ?? [])
    .map((t) => CASES.find((c) => c.title === t))
    .filter((c): c is (typeof CASES)[number] => Boolean(c));

  const jsonLd = [
    breadcrumbsLd([{ name: crumb, path }]),
    serviceLd({
      ...service,
      path,
      tiers: PLANS.map((p) => ({ name: p.name, price: p.rate, description: p.for })),
    }),
    faqLd(faq),
  ];

  let n = 0;
  const next = () => pad(++n);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={seo.title}
        description={seo.description}
        path={path}
        keywords={seo.keywords}
        image={seo.image}
        jsonLd={jsonLd}
      />

      <SiteSwitch />

      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Logo to="/" size="sm" />
          <div className="flex items-center gap-3">
            {props.calc && <CalcButton to="#calc" className="hidden sm:flex" />}
            <Link
              to="/"
              className="-my-2 flex min-h-[44px] items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={16} />
              На главную
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="relative w-full overflow-hidden bg-ink text-background">
          <img
            src={hero.img}
            alt={hero.alt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative z-10 shell py-16 sm:py-24 lg:py-32">
            <div className="text-xs uppercase tracking-[0.14em] text-primary">{hero.eyebrow}</div>
            <h1 className="mt-4 max-w-[13em] font-display text-[clamp(2.3rem,8vw,3rem)] uppercase leading-[0.98] sm:text-[4rem] lg:text-[5rem]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-[38em] text-base leading-[1.6] text-background/70">
              {hero.text}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ActionButton action={hero.primary} primary />
              <ActionButton action={hero.secondary} primary={false} />
            </div>
          </div>
        </section>

        {blocks.map((b) => (
          <Section
            key={b.eyebrow}
            index={next()}
            eyebrow={b.eyebrow}
            title={b.title}
            lead={b.lead}
            tone={b.tone ?? 'default'}
          >
            <div
              className={`grid gap-px bg-border sm:grid-cols-2 ${
                b.items.length === 3 ? 'lg:grid-cols-3' : ''
              }`}
            >
              {b.items.map((d) => (
                <div key={d.title} className="hover-card flex flex-col bg-card p-7 sm:p-9">
                  <Icon name={d.icon} size={26} className="text-primary-ink" />
                  <h3 className="mt-5 font-display text-[clamp(1.4rem,4.5vw,1.75rem)] uppercase leading-[1.05] text-foreground">
                    {d.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.65] text-muted-foreground">
                    {d.text}
                  </p>
                </div>
              ))}
            </div>
            {b.note && (
              <div className="mt-10 max-w-[46em] text-base leading-[1.7] text-muted-foreground">
                {b.note}
              </div>
            )}
          </Section>
        ))}

        {props.extra?.(next())}

        {gallery.length > 0 && (
          <Section
            index={next()}
            eyebrow="Готовые объекты"
            title={props.casesTitle}
            lead={props.casesLead}
          >
            <div className={`grid gap-px bg-border ${gallery.length > 1 ? 'lg:grid-cols-2' : ''}`}>
              {gallery.map((c) => (
                <article key={c.title} className="hover-card flex flex-col bg-card">
                  <div className="overflow-hidden">
                    <img
                      src={c.img}
                      alt={`${c.title} — натяжные тканевые стены на скрытом каркасе, ${c.place}`}
                      loading="lazy"
                      className="block aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={15} className="text-primary-ink" />
                      {c.place}
                    </div>
                    <h3 className="mt-3 font-display text-[clamp(1.35rem,4vw,1.6rem)] uppercase leading-[1.05] text-foreground">
                      {c.title}
                    </h3>
                    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <dt className="text-muted-foreground">Площадь</dt>
                        <dd className="font-display tracking-wide text-foreground">{c.area}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <dt className="text-muted-foreground">Срок</dt>
                        <dd className="font-display tracking-wide text-foreground">{c.days}</dd>
                      </div>
                    </dl>
                    <div className="mt-6 space-y-4">
                      <div className="flex gap-3">
                        <Icon
                          name="CircleAlert"
                          size={18}
                          className="mt-0.5 shrink-0 text-muted-foreground"
                        />
                        <p className="text-[0.9rem] leading-[1.6] text-muted-foreground">{c.task}</p>
                      </div>
                      <div className="flex gap-3">
                        <Icon
                          name="CircleCheck"
                          size={18}
                          className="mt-0.5 shrink-0 text-primary-ink"
                        />
                        <p className="text-[0.9rem] leading-[1.6] text-foreground">{c.result}</p>
                      </div>
                    </div>
                    <Link
                      to="/#cases"
                      className="mt-auto flex items-center gap-2 pt-7 font-display text-sm uppercase tracking-[0.06em] text-primary-ink transition-colors hover:text-foreground"
                    >
                      Сравнить до и после
                      <Icon name="ArrowRight" size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}

        {props.pricing && (
          <Pricing index={next()} title={props.pricing.title} lead={props.pricing.lead} />
        )}
        {props.calc && (
          <Calculator index={next()} title={props.calc.title} lead={props.calc.lead} />
        )}

        <Section id="faq" index={next()} eyebrow="Частые вопросы" title={props.faqTitle} tone="surface">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-10 lg:col-start-2">
              <Accordion type="single" collapsible className="border-t border-border">
                {faq.map((item, i) => (
                  <AccordionItem key={item.q} value={`faq-${i}`} className="border-border">
                    <AccordionTrigger className="gap-6 py-6 text-left font-display text-xl uppercase leading-tight tracking-wide hover:no-underline sm:text-2xl">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[52em] pb-7 text-[0.95rem] leading-[1.65] text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Section>

        <Section tone="dark">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-[14em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] sm:text-[3.25rem]">
                {final.title}
              </h2>
              <p className="mt-6 max-w-[34em] text-base leading-[1.6] text-background/70">
                {final.text}
              </p>
            </div>
            {final.action.href ? (
              <a
                href={final.action.href}
                className="flex min-h-[56px] shrink-0 items-center justify-center gap-2 bg-primary px-8 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icon name={final.action.icon} size={18} />
                {final.action.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => openLead(final.action.source)}
                className="flex min-h-[56px] shrink-0 items-center justify-center gap-2 bg-primary px-8 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icon name={final.action.icon} size={18} />
                {final.action.label}
              </button>
            )}
          </div>
        </Section>

        <CrossLinks current="/" />
      </main>

      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default RoomLanding;