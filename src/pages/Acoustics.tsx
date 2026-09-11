import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';
import LeadForm from '@/components/site/LeadForm';
import AcCalculator from '@/components/acoustics/AcCalculator';
import AcHeader from '@/components/acoustics/AcHeader';
import SiteSwitch from '@/components/site/SiteSwitch';
import AcCases from '@/components/acoustics/AcCases';
import Services from '@/components/site/Services';
import AcBlog from '@/components/acoustics/AcBlog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { openLead } from '@/lib/lead';
import { PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } from '@/lib/contacts';
import {
  ACOUSTIC_CASES,
  ACOUSTIC_PLACES,
  ACOUSTIC_FAQ,
  ACOUSTIC_IMG,
  ACOUSTIC_PAINS,
  ACOUSTIC_RESULTS,
  ACOUSTIC_STEPS,
} from '@/lib/acoustics';
import { breadcrumbsLd, faqLd, howToLd, organizationLd, websiteLd } from '@/lib/schema';
import CrossLinks from '@/components/site/CrossLinks';

const buildJsonLd = () => [
  organizationLd(),
  websiteLd(),
  breadcrumbsLd([{ name: 'Акустика под ключ', path: '/acoustics' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Шумоизоляция комнаты под ключ',
    serviceType: 'Шумоизоляция и акустическая обработка помещения под ключ',
    provider: { '@id': `${window.location.origin}/#organization` },
    areaServed: { '@type': 'Country', name: 'Россия' },
    offers: {
      '@type': 'Offer',
      price: '5900',
      priceCurrency: 'RUB',
      description:
        'Звукоизоляция стен в квартире и акустическая обработка помещения под ключ, цена за м²',
    },
  },
  howToLd(
    'Как проходит акустическая обработка помещения',
    'Четыре шага: замер шумомером, подбор состава, смета с гарантией результата и монтаж стен и потолка.',
    ACOUSTIC_STEPS.map((s) => ({ title: s.title, text: s.text })),
    'P3D',
  ),
  faqLd(ACOUSTIC_FAQ),
];

const AcousticsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Тихие стены: шумоизоляция комнаты под ключ | Fabric Wall"
        description="Тихие стены и звукоизоляция квартиры под ключ: замер шумомером, акустические полотна на стены и потолок. Монтаж за 1–3 дня, контрольный замер."
        path="/acoustics"
        image={ACOUSTIC_IMG.hero}
        jsonLd={buildJsonLd()}
      />

      <AcHeader />
      <SiteSwitch />

      <section id="top" className="relative w-full overflow-hidden bg-foreground text-background">
        <img
          src={ACOUSTIC_IMG.hero}
          alt="Акустические тканевые панели на стене — шумоизоляция комнаты под ключ"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 shell py-16 sm:py-24 lg:py-32">
          <Link
            to="/"
            className="-my-2 inline-flex min-h-[44px] items-center gap-2 py-2 text-sm text-background/70 transition-colors hover:text-background"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>

          <div className="mt-8 text-xs uppercase tracking-[0.14em] text-primary">
            Акустика под ключ
          </div>
          <h1 className="mt-4 max-w-[13em] font-display text-[clamp(2.3rem,8vw,3rem)] uppercase leading-[0.98] sm:text-[4rem] lg:text-[5rem]">
            Тихие стены за 1–3 дня
          </h1>
          <p className="mt-6 max-w-[36em] text-base leading-[1.6] text-background/70">Шумоизоляция комнаты под ключ: убираем эхо и шум, подбираем материалы, делаем смету, монтируем стены и потолок. От 5 900 ₽ / м².</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openLead('Акустика — первый экран')}
              className="whitespace-nowrap bg-primary px-7 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              Записаться на замер шума
            </button>
            <a
              href={PHONE_HREF}
              className="-my-1.5 flex min-h-[44px] items-center gap-2 py-1.5 font-display text-2xl uppercase tracking-[0.02em] text-background transition-colors hover:text-primary"
            >
              <Icon name="Phone" size={20} className="text-primary" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <dl className="mt-14 grid gap-px border border-background/20 bg-background/20 sm:grid-cols-2 lg:grid-cols-4">
            {ACOUSTIC_RESULTS.map((r) => (
              <div key={r.label} className="bg-foreground p-6">
                <dt className="font-display text-3xl leading-none tracking-wide text-primary">
                  {r.value}
                </dt>
                <dd className="mt-3 text-sm leading-[1.5] text-background/60">{r.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <main>
        <Section
          id="ac-pain"
          index="01"
          eyebrow="Проблема"
          title={<>Когда нужна акустика</>}
          lead="Три ситуации, с которыми к нам приходят чаще всего: эхо, шум соседей и плохая запись. Если узнали свою — акустическая обработка помещения решает задачу за один-три дня."
        >
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {ACOUSTIC_PAINS.map((p) => (
              <div key={p.title} className="bg-card p-7 sm:p-9">
                <Icon name={p.icon} size={26} className="text-primary-ink" />
                <h3 className="mt-6 font-display text-2xl uppercase leading-tight tracking-wide">
                  {p.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="ac-how"
          index="02"
          eyebrow="Как работаем"
          title={<>Пять шагов до тишины</>}
          lead="Звукоизоляция стен в квартире начинается с измерений, а не с догадок: сначала цифры, потом смета, в конце — контрольный замер."
          tone="surface"
        >
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-5">
            {ACOUSTIC_STEPS.map((s) => (
              <div key={s.n} className="bg-card p-6">
                <span className="font-display text-sm tracking-[0.2em] text-primary-ink">{s.n}</span>
                <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <AcCases />

        <Section
          id="ac-usage"
          index="04"
          eyebrow="Где применяем"
          title={<>Примеры применения</>}
          lead="Одинаковая технология, разные задачи: где-то нужна акустическая обработка помещения от эха, где-то — полноценная звукоизоляция от соседей или гула зала."
        >
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {ACOUSTIC_CASES.map((c) => (
              <article key={c.title} className="flex flex-col bg-card">
                <div className="aspect-[16/10] w-full overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt={`${c.title} — акустика под ключ: тканевые панели и звукопоглощение`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">
                    {c.text}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {c.facts.map((f) => (
                      <li key={f} className="flex gap-3 text-sm leading-[1.5]">
                        <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-primary-ink" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 sm:mt-14">
            <h3 className="font-display text-xl uppercase leading-tight tracking-wide text-foreground sm:text-2xl">
              Работаем и на других объектах
            </h3>
            <p className="mt-3 max-w-[46em] text-[0.95rem] leading-[1.6] text-muted-foreground">
              Технология одна, меняются только площадь обработки и тип полотна — считаем на замере
              под конкретное помещение.
            </p>

            <div className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {ACOUSTIC_PLACES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('ac-place', { detail: p.id }));
                    document.getElementById('ac-calc')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex flex-col bg-card p-6 text-left transition-colors hover:bg-secondary sm:p-7"
                >
                  <Icon name={p.icon} size={24} className="shrink-0 text-primary-ink" />
                  <h4 className="mt-4 font-display text-lg uppercase leading-tight tracking-wide text-foreground sm:text-xl">
                    {p.title}
                  </h4>
                  <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{p.text}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-primary-ink">
                    Рассчитать
                    <Icon
                      name="ArrowRight"
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/catalog?material[]=Акустик"
              className="flex items-center gap-2 border border-border bg-card px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:border-primary hover:text-primary-ink"
            >
              Акустические ткани в каталоге
              <Icon name="ArrowRight" size={18} />
            </Link>
            <Link
              to="/ceilings"
              className="flex items-center gap-2 border border-border bg-card px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:border-primary hover:text-primary-ink"
            >
              Акустические потолки
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        </Section>

        <AcCalculator />

        <Services index="06" />

        <AcBlog />

        <Section
          id="ac-faq"
          index="08"
          eyebrow="Частые вопросы"
          title={<>Что спрашивают перед замером</>}
          tone="surface"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-10 lg:col-start-2">
              <Accordion type="single" collapsible className="border-t border-border">
                {ACOUSTIC_FAQ.map((item, i) => (
                  <AccordionItem key={item.q} value={`ac-${i}`} className="border-border">
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

        <CrossLinks current="/acoustics" />

        <section id="ac-lead" className="w-full border-t border-border">
          <div className="shell py-16 sm:py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="font-display text-sm tracking-[0.2em] text-primary-ink">09</span>
                <h2 className="mt-4 max-w-[12em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] sm:text-[3.25rem]">
                  Замер шума бесплатно
                </h2>
                <ul className="mt-8 space-y-4">
                  {[
                    'Приезжаем с шумомером и меряем реальные цифры',
                    'Говорим честно, какой результат достижим в вашей комнате',
                    'Смета с фиксированной ценой — в течение 24 часов',
                    'Контрольный замер после монтажа и протокол на руки',
                  ].map((p) => (
                    <li key={p} className="flex gap-3 text-[0.95rem] leading-[1.55]">
                      <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-primary-ink" />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-border pt-6">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Или просто позвоните
                  </div>
                  <a
                    href={PHONE_HREF}
                    className="mt-2 flex min-h-[44px] items-center gap-3 py-1.5 font-display text-[2rem] uppercase leading-none tracking-[0.01em] text-foreground transition-colors hover:text-primary-ink sm:text-[2.5rem]"
                  >
                    <Icon name="Phone" size={26} className="text-primary-ink" />
                    {PHONE_DISPLAY}
                  </a>
                  <p className="mt-3 text-sm text-muted-foreground">{WORK_HOURS}</p>
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <div className="border border-border bg-card p-6 sm:p-8 lg:p-10">
                  <LeadForm
                    source="Акустика — форма на странице"
                    summary="Заявка на акустическое решение под ключ"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default AcousticsPage;