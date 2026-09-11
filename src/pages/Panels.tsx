import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { openLead } from '@/lib/lead';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { breadcrumbsLd, faqLd, organizationLd, websiteLd } from '@/lib/schema';

const HERO_IMG = '/img/293a57f7-0f38-469b-9902-803f225b736f.webp';

const DIFFERENCES = [
  {
    icon: 'Grid2x2X',
    title: 'Без стыков',
    text: 'Обычные стеновые панели — это отдельные модули: МДФ, ПВХ, мягкие квадраты на Z-креплениях. Между ними всегда остаются стыки: их видно, в них собирается пыль, через них проходит звук.',
  },
  {
    icon: 'Ruler',
    title: 'Одно полотно на всю стену',
    text: 'Тканевая система натягивается по периметру комнаты одним полотном. Шва нет вообще. Стена получается ровной, даже если основание кривое на 5 см, — каркас выводит плоскость без штукатурки.',
  },
];

const COMPARE = {
  head: ['', 'МДФ и ПВХ', 'Мягкие модули', 'Тканевая система'],
  rows: [
    ['Стыки', 'видны', 'видны', 'нет'],
    ['Кривые стены', 'нужно ровнять', 'нужно ровнять', 'выравнивает каркас'],
    ['Шумоизоляция', 'почти нет', 'точечная', 'до −11 дБ по комнате'],
    ['Срок', '3–5 дней', '1 день', '1–2 дня'],
    ['Демонтаж', 'с повреждением', 'частичный', 'без следов'],
  ],
};

const ROOMS = [
  { icon: 'BedDouble', label: 'Спальня и изголовье кровати' },
  { icon: 'Sofa', label: 'Гостиная и ТВ-зона' },
  { icon: 'Briefcase', label: 'Кабинет и переговорная' },
  { icon: 'Baby', label: 'Детская' },
  { icon: 'DoorOpen', label: 'Коридор' },
];

const PANEL_FAQ = [
  {
    q: 'Что происходит с розетками и выключателями?',
    a: 'Все розетки, выключатели и выводы переносятся на плоскость полотна: в каркасе ставятся закладные, подрозетники выводятся заподлицо с тканью и закрываются штатными рамками. Внешне ничего не меняется — розетка остаётся на том же месте и той же высоте, просто выходит уже из новой стены. Провода при этом идут в пустоте за полотном, штробить ничего не нужно.',
  },
  {
    q: 'Можно ли мыть ткань?',
    a: 'Ткань не моют, а чистят. Обычный уход — пылесос с мягкой насадкой раз в два-три месяца: полотна идут с грязе- и пылеотталкивающей пропиткой, поэтому пыль не въедается. Пятна выводятся сухой чисткой или слегка влажной губкой с мягким средством, без трения и обильной воды. Если повреждение серьёзное, меняется одно полотнище, а не вся стена.',
  },
  {
    q: 'Как снять полотно при переезде или ремонте?',
    a: 'Полотно вынимается из замка по периметру — это обратимая операция, стену не ломают. Мастер снимает ткань за пару часов, каркас остаётся на месте и может принять новое полотно. Если нужно демонтировать всё целиком, под панелями остаётся исходная стена: следов, кроме точек крепежа, не будет. Именно поэтому систему часто ставят в съёмное жильё и офисы.',
  },
  {
    q: 'Выдержит ли крепление телевизора?',
    a: 'Да, но сказать об этом нужно замерщику до монтажа. В местах нагрузки в каркас закладываются платформы — телевизор, полки и кронштейны крепятся к ним, а не к ткани. Такая закладная спокойно держит панель весом до 40 кг и входит в стоимость работ. Кабели и розетка выводятся прямо за телевизором, поэтому проводов на виду не остаётся.',
  },
];

const buildJsonLd = () => [
  organizationLd(),
  websiteLd(),
  breadcrumbsLd([{ name: 'Стеновые панели из ткани', path: '/panels' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Стеновые панели из ткани под ключ',
    serviceType: 'Монтаж тканевых стеновых панелей на скрытом каркасе',
    provider: { '@id': `${window.location.origin}/#organization` },
    areaServed: { '@type': 'Country', name: 'Россия' },
    offers: {
      '@type': 'Offer',
      price: '1750',
      priceCurrency: 'RUB',
      description: 'Бесшовные тканевые стеновые панели под ключ, цена за м²',
    },
  },
  faqLd(PANEL_FAQ),
];

const PanelsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Стеновые панели из ткани: мягкие панели под ключ | Fabric Wall"
        description="Тканевые стеновые панели без стыков: бесшовное полотно на скрытом каркасе вместо МДФ и мягких модулей. Выравнивают стену, шумоизоляция до −11 дБ, монтаж за 1–2 дня."
        path="/panels"
        image={HERO_IMG}
        jsonLd={buildJsonLd()}
      />

      <SiteSwitch />

      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Logo to="/" size="sm" />
          <div className="flex items-center gap-3">
            <CalcButton to="#calc" className="hidden sm:flex" />
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
        <section id="top" className="relative w-full overflow-hidden bg-foreground text-background">
          <img
            src={HERO_IMG}
            alt="Стеновые панели из ткани — бесшовное полотно на скрытом каркасе в гостиной"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative z-10 shell py-16 sm:py-24 lg:py-32">
            <div className="text-xs uppercase tracking-[0.14em] text-primary">Панели для стен</div>
            <h1 className="mt-4 max-w-[13em] font-display text-[clamp(2.3rem,8vw,3rem)] uppercase leading-[0.98] sm:text-[4rem] lg:text-[5rem]">
              Стеновые панели из ткани
            </h1>
            <p className="mt-6 max-w-[38em] text-base leading-[1.6] text-background/70">
              Бесшовное тканевое полотно на скрытом каркасе — вместо стыков между модулями. Мягкая
              стена от пола до потолка за 1–2 дня, без пыли и штукатурки. От 1 750 ₽ / м².
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openLead('Панели — первый экран')}
                className="flex min-h-[52px] items-center justify-center gap-2 bg-primary px-7 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icon name="Ruler" size={18} />
                Вызвать замерщика
              </button>
              <a
                href="#calc"
                className="flex min-h-[52px] items-center justify-center gap-2 border border-background/30 px-7 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name="Calculator" size={18} />
                Рассчитать стоимость
              </a>
            </div>
          </div>
        </section>

        <Section
          index="01"
          eyebrow="Чем отличается"
          title="Чем отличается от обычных панелей"
          lead="Главная разница не в материале, а в конструкции: модули собираются из кусков, тканевая система натягивается целиком."
        >
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {DIFFERENCES.map((d) => (
              <div key={d.title} className="flex flex-col bg-card p-7 sm:p-9">
                <Icon name={d.icon} size={26} className="text-primary-ink" />
                <h3 className="mt-5 font-display text-[clamp(1.4rem,4.5vw,1.75rem)] uppercase leading-[1.05] text-foreground">
                  {d.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.65] text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          index="02"
          eyebrow="Сравнение"
          title="Ткань, МДФ и мягкие модули"
          tone="surface"
          lead="Сравниваем по тому, что видно и слышно в готовой комнате, а не по описанию из каталога."
        >
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[40rem] border-collapse bg-card text-left">
              <thead>
                <tr className="bg-foreground text-background">
                  {COMPARE.head.map((h, i) => (
                    <th
                      key={h || 'empty'}
                      scope="col"
                      className={`p-4 font-display text-sm uppercase tracking-[0.08em] sm:p-5 ${
                        i === 3 ? 'text-primary' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={`p-4 text-[0.95rem] leading-[1.5] sm:p-5 ${
                          i === 0
                            ? 'font-display uppercase tracking-[0.04em] text-foreground'
                            : i === 3
                              ? 'font-medium text-primary-ink'
                              : 'text-muted-foreground'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section index="03" eyebrow="Где ставят" title="Комнаты под мягкие панели">
          <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((r) => (
              <li key={r.label} className="flex items-center gap-3 bg-card p-6 sm:p-7">
                <Icon name={r.icon} size={22} className="shrink-0 text-primary-ink" />
                <span className="font-display text-base uppercase tracking-[0.03em] text-foreground sm:text-lg">
                  {r.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[46em] text-base leading-[1.7] text-muted-foreground">
            Мягкие стеновые панели чаще всего заказывают за изголовьем — там ткань работает сразу на
            три вещи: гасит эхо, закрывает общую стену с соседями и делает спальню тише на слух. В
            отличие от модулей, полотно можно вести на потолок единым куском.
          </p>
        </Section>

        <Pricing index="04" />
        <Calculator index="05" />

        <Section
          id="faq"
          index="06"
          eyebrow="Частые вопросы"
          title="Что спрашивают о панелях"
          tone="surface"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-10 lg:col-start-2">
              <Accordion type="single" collapsible className="border-t border-border">
                {PANEL_FAQ.map((item, i) => (
                  <AccordionItem key={item.q} value={`panel-faq-${i}`} className="border-border">
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
                Привезём образцы и посчитаем смету
              </h2>
              <p className="mt-6 max-w-[34em] text-base leading-[1.6] text-background/70">
                Покажем ткани вживую, замерим комнату лазером и отдадим смету с фиксированной ценой.
                Замер бесплатный.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openLead('Панели — финальный блок')}
              className="flex min-h-[56px] shrink-0 items-center justify-center gap-2 bg-primary px-8 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Icon name="Ruler" size={18} />
              Записаться на замер
            </button>
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

export default PanelsPage;