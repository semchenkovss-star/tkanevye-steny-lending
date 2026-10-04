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
import { breadcrumbsLd, faqLd, serviceLd } from '@/lib/schema';
import { PLANS } from '@/lib/pricing';

const PATH = '/arhitekturnyj-tekstil';
const HERO_IMG = '/img/arhitekturnyj-tekstil-gostinaya.webp';
const DETAIL_IMG = '/img/arhitekturnyj-tekstil-uzel.webp';
const OG_IMG = '/img/arhitekturnyj-tekstil-og.jpg';

const FACTS = [
  { value: 'до 5 м', label: 'ширина полотна без шва' },
  { value: '13–80 мм', label: 'толщина стены с наполнением' },
  { value: '1 день', label: 'на стену до 20 м²' },
  { value: 'КМ1', label: 'класс пожарной безопасности' },
];

const PROPERTIES = [
  { icon: 'Scan', text: 'Изготовлен из 100% полиэстера' },
  { icon: 'Leaf', text: 'Экологичен и гипоаллергенен' },
  { icon: 'HeartPulse', text: 'Безопасен для здоровья — не содержит клея' },
  { icon: 'ShieldCheck', text: 'Не подвержен горению' },
  { icon: 'Wind', text: 'Антистатический эффект предотвращает оседание пыли' },
  { icon: 'Shield', text: 'Устойчив к повреждениям' },
];

const FEATURES = [
  {
    icon: 'Timer',
    title: 'Быстрая установка',
    text: 'Для монтажа достаточно черновой подготовки стен.',
  },
  {
    icon: 'Volume1',
    title: 'Акустический комфорт',
    text: 'Текстиль эффективно поглощает звуковые волны, улучшая разборчивость речи и снижая уровень шума в помещении.',
  },
  {
    icon: 'Lamp',
    title: 'Светильники, полки и телевизоры',
    text: 'В конструкцию можно встроить различные светильники и закрепить тяжёлые навесные предметы.',
  },
  {
    icon: 'Image',
    title: 'Фотопечать и роспись',
    text: 'На архитектурный текстиль можно наносить любые изображения.',
  },
  {
    icon: 'Box',
    title: 'Объединение стен и потолка',
    text: 'Системы монтажа позволяют легко объединить стены и потолок в единое конструктивное решение.',
  },
];

const STEPS = [
  {
    title: 'Монтаж профиля',
    text: 'Алюминиевый профиль крепится по периметру стены и выставляется по лазеру — он задаёт ровную плоскость.',
  },
  {
    title: 'Установка мембраны',
    text: 'Внутри каркаса укладывается звукопоглощающий слой: от него зависит, насколько тише станет в комнате.',
  },
  {
    title: 'Натяжка ткани',
    text: 'Полотно заводится в замок профиля и натягивается без складок и швов.',
  },
  {
    title: 'Подрезка и дозаправка',
    text: 'Излишки ткани подрезаются, края заправляются в профиль — стена готова.',
  },
];

const DESIGN = [
  'Варианты драпировки и форм (волны, складки, геометрия)',
  'Подсветка (задняя, контурная, скрытая)',
  'Печать изображений и паттернов',
  'Сочетание с другими материалами (дерево, металл, камень)',
  'Тканевые светильники',
];

const COLLECTIONS = [
  { name: 'Комфорт', price: '1 750 ₽', note: 'Мягкая тёплая поверхность, 30 мм, 9 дБ' },
  { name: 'Луна и Марс', price: '1 900 ₽', note: 'Льняное плетение, самые тонкие — 13 мм' },
  { name: 'Узор', price: '2 100 ₽', note: 'Геометрический рельеф, 18 оттенков' },
  { name: 'Штукатурка', price: '2 100 ₽', note: 'Фактура венецианки без мокрых работ' },
  { name: 'Акустик', price: '2 100 ₽', note: 'Плотный ворс, 40 мм, 11 дБ' },
  { name: 'Модерн', price: 'от 5 900 ₽', note: 'Премиальная гладкая ткань с отблеском' },
];

const COMPARE = {
  head: ['', 'Обои', 'Покраска', 'Текстильная стена'],
  rows: [
    ['Стыки', 'видны', 'нет', 'нет'],
    ['Подготовка стены', 'штукатурка', 'штукатурка', 'не нужна'],
    ['Звукопоглощение', 'нет', 'нет', 'до 11 дБ'],
    ['Пыль и просушка', 'есть', 'есть', 'нет'],
    ['Срок на комнату', 'дни на штукатурку и просушку', 'дни на штукатурку и просушку', '1–2 дня'],
  ],
};

const TEXTILE_FAQ = [
  {
    q: 'Что такое архитектурный текстиль?',
    a: 'Это современное решение для отделки стен и потолков в жилых и общественных помещениях. Ткань из 100% полиэстера натягивается на скрытый алюминиевый каркас и держится в замке профиля без клея. За полотном можно разместить звукопоглощающую мембрану, встроить светильники и закладные под полки и телевизор.',
  },
  {
    q: 'Сколько стоят текстильные стены?',
    a: 'Ткань — от 1 750 ₽ за м². Под ключ с каркасом и монтажом: базовый тариф от 3 900 ₽ за м², «Тихо» с акустической мембраной — от 5 900 ₽, «Проект» с премиальными коллекциями и подсветкой — от 7 900 ₽. Точная смета — после бесплатного замера, в течение 24 часов, и цена фиксируется в договоре.',
  },
  {
    q: 'Сколько площади съедает текстильная стена?',
    a: 'От 13 до 80 мм от стены, в зависимости от толщины наполнения и кривизны основания. Тонкое полотно без слоя — для внешнего вида, толстое с плитой и мембраной — для защиты от соседей. На комнате 18 м² это обычно меньше четверти квадратного метра.',
  },
  {
    q: 'Как ухаживать за тканевыми стенами?',
    a: 'Раз в два-три месяца пройдитесь пылесосом с мягкой насадкой на минимальной мощности. Свежее пятно промокните сухой салфеткой, затем обработайте слабым мыльным раствором. Растворители, хлор и жёсткие щётки использовать нельзя.',
  },
  {
    q: 'Подходит ли текстиль для ванной и кухни?',
    a: 'Для кухни — да, если взять коллекцию с влаго- и жироотталкивающей пропиткой и не вести полотно над плитой. Для ванной текстильные стены не рекомендуем: там лучше работает ПВХ.',
  },
];

const buildJsonLd = () => [
  breadcrumbsLd([{ name: 'Архитектурный текстиль', path: PATH }]),
  serviceLd({
    name: 'Архитектурный текстиль: текстильные стены под ключ',
    serviceType: 'Отделка стен архитектурным текстилем на скрытом каркасе',
    description:
      'Текстильные стены из архитектурного текстиля на скрытом алюминиевом каркасе: бесшовное полотно до 5 м, звукопоглощение, монтаж за 1–2 дня без штукатурки и пыли.',
    path: PATH,
    tiers: PLANS.map((p) => ({ name: p.name, price: p.rate, description: p.for })),
  }),
  faqLd(TEXTILE_FAQ),
];

const TextilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Архитектурный текстиль для стен: текстильные стены под ключ | Fabric Wall"
        description="Текстильные стены из архитектурного текстиля на скрытом каркасе: бесшовное полотно до 5 м, звукопоглощение до 11 дБ, без штукатурки и пыли. Ткань от 1 750 ₽/м², монтаж за 1–2 дня, бесплатный замер."
        path={PATH}
        keywords="архитектурный текстиль, текстильные стены, архитектурный текстиль для стен, текстиль на стены, тканевые стены, отделка стен тканью"
        image={OG_IMG}
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
            alt="Архитектурный текстиль в гостиной — текстильная стена от пола до потолка без швов"
            {...{ fetchpriority: 'high' }}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative z-10 shell py-16 sm:py-24 lg:py-32">
            <div className="text-xs uppercase tracking-[0.14em] text-primary">
              Текстильные стены
            </div>
            <h1 className="mt-4 max-w-[13em] font-display text-[clamp(2.3rem,8vw,3rem)] uppercase leading-[0.98] sm:text-[4rem] lg:text-[5rem]">
              Архитектурный текстиль для стен
            </h1>
            <p className="mt-6 max-w-[38em] text-base leading-[1.6] text-background/70">
              Ткань на скрытом каркасе вместо штукатурки, обоев и панелей. Бесшовная стена от пола
              до потолка, тише в комнате и никакой пыли. Ткань от 1 750 ₽ / м², под ключ — от
              3 900 ₽ / м², монтаж за 1–2 дня.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openLead('Архитектурный текстиль — первый экран')}
                className="flex min-h-[52px] items-center justify-center gap-2 bg-primary px-7 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icon name="Ruler" size={18} />
                Записаться на замер
              </button>
              <a
                href="#calc"
                className="flex min-h-[52px] items-center justify-center gap-2 border border-background/30 px-7 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name="Calculator" size={18} />
                Рассчитать стоимость
              </a>
            </div>

            <dl className="mt-14 grid max-w-[52rem] grid-cols-2 gap-px bg-background/15 sm:grid-cols-4">
              {FACTS.map((f) => (
                <div key={f.label} className="bg-foreground/80 p-5">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-2xl uppercase text-primary sm:text-3xl">
                    {f.value}
                  </dd>
                  <dd className="mt-1 text-sm leading-[1.4] text-background/70">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section
          index="01"
          eyebrow="Что это"
          title="Что такое архитектурный текстиль"
          lead="Архитектурный текстиль — это современное решение для отделки стен и потолков в жилых и общественных помещениях."
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h3 className="font-display text-[clamp(1.25rem,4vw,1.5rem)] uppercase leading-[1.05] text-foreground">
                Основные характеристики архитектурного текстиля
              </h3>
              <ul className="mt-6 grid gap-px bg-border sm:grid-cols-2">
                {PROPERTIES.map((p) => (
                  <li key={p.text} className="flex items-start gap-4 bg-card p-5 sm:p-6">
                    <Icon name={p.icon} size={22} className="mt-0.5 shrink-0 text-primary-ink" />
                    <span className="text-[0.95rem] leading-[1.55] text-foreground">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="lg:col-span-5">
              <img
                src={DETAIL_IMG}
                alt="Узел текстильной стены: ткань в алюминиевом профиле, под ней акустическая плита и мембрана"
                loading="lazy"
                className="block aspect-square w-full object-cover"
              />
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Ткань в замке профиля, под ней — звукопоглощающий слой.
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section
          index="02"
          eyebrow="Особенности"
          title="Особенности архитектурного текстиля"
          tone="surface"
        >
          <dl className="border-t border-border">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="grid gap-3 border-b border-border py-6 sm:grid-cols-12 sm:gap-8 sm:py-8"
              >
                <dt className="flex items-start gap-3 sm:col-span-5">
                  <Icon name={f.icon} size={22} className="mt-1 shrink-0 text-primary-ink" />
                  <span className="font-display text-[clamp(1.2rem,4vw,1.45rem)] uppercase leading-[1.1] text-foreground">
                    {f.title}
                  </span>
                </dt>
                <dd className="text-[0.95rem] leading-[1.65] text-muted-foreground sm:col-span-7">
                  {f.text}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          index="03"
          eyebrow="Монтаж"
          title="Как монтируют текстильные стены"
          lead="Четыре этапа сухого монтажа — без штукатурки, клея и просушки."
        >
          <ol className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-col bg-card p-6 sm:p-7">
                <div className="font-display text-4xl text-primary-ink">0{i + 1}</div>
                <h3 className="mt-4 font-display text-[clamp(1.2rem,4vw,1.4rem)] uppercase leading-[1.1] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          index="04"
          eyebrow="Дизайн"
          title="Дизайнерские возможности"
          tone="surface"
          lead="Архитектурный текстиль — это не только ровная стена, но и материал для выразительного интерьера."
        >
          <ol className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {DESIGN.map((d, i) => (
              <li
                key={d}
                className="flex gap-5 bg-card p-6 sm:flex-col sm:gap-4 sm:p-7 sm:last:col-span-2 lg:last:col-span-1"
              >
                <div className="shrink-0 font-display text-3xl text-primary-ink">0{i + 1}</div>
                <p className="text-base leading-[1.55] text-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          index="05"
          eyebrow="Сравнение"
          title="Текстиль, обои и покраска"
          lead="Сравниваем по тому, что важно в готовой комнате: швы, подготовка, тишина и сроки."
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

        <Section
          index="06"
          eyebrow="Коллекции"
          title="Ткани для текстильных стен"
          tone="surface"
          lead="Семь коллекций архитектурного текстиля: от спокойного базового полотна до рельефа и премиальной гладкой ткани. Цена — за м² ткани."
        >
          <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((c) => (
              <li key={c.name} className="flex flex-col bg-card p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl uppercase tracking-[0.03em] text-foreground">
                    {c.name}
                  </h3>
                  <span className="shrink-0 font-display text-lg text-primary-ink">{c.price}</span>
                </div>
                <p className="mt-3 text-[0.95rem] leading-[1.55] text-muted-foreground">{c.note}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/catalog"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 font-display text-sm uppercase tracking-[0.06em] text-primary-ink transition-colors hover:text-foreground"
          >
            Смотреть все ткани в каталоге
            <Icon name="ArrowRight" size={16} />
          </Link>
        </Section>

        <Pricing index="07" />
        <Calculator index="08" />

        <Section
          id="faq"
          index="09"
          eyebrow="Частые вопросы"
          title="Что спрашивают об архитектурном текстиле"
          tone="surface"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-10 lg:col-start-2">
              <Accordion type="single" collapsible className="border-t border-border">
                {TEXTILE_FAQ.map((item, i) => (
                  <AccordionItem key={item.q} value={`textile-faq-${i}`} className="border-border">
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
                Привезём образцы текстиля и посчитаем смету
              </h2>
              <p className="mt-6 max-w-[34em] text-base leading-[1.6] text-background/70">
                Покажем ткани вживую, замерим стены лазером и за 24 часа пришлём смету с
                фиксированной ценой. Замер бесплатный.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openLead('Архитектурный текстиль — финальный блок')}
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

export default TextilePage;