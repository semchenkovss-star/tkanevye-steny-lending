import type { ReactNode } from 'react';
import { Link } from "@/lib/router-compat";
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

interface ServiceItem {
  title: string;
  lead: string;
  img: string;
  price: string;
  features: string[];
  to: string;
  cta: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Стены',
    lead: 'Натяжные стены на скрытом каркасе за один-два дня: ровная поверхность без штукатурки, пыли и просушки.',
    img: '/img/ff5a9931-f993-4df5-ab56-99200408285a.webp',
    price: 'ткань от 1 750 ₽ / м²',
    features: [
      'Скрывает перепады до 60 мм',
      'Прячет проводку и стояки',
      '180 оттенков в наличии',
    ],
    to: '/catalog',
    cta: 'Смотреть каталог',
  },
  {
    title: 'Потолки',
    lead: 'Бесшовное полотно без швов и разводов: световые линии, ниши под карниз, монтаж за день.',
    img: '/img/5db51be5-66f3-40cc-b60c-02133b86662d.webp',
    price: 'от 1 200 ₽ / м²',
    features: [
      'Матовые, сатиновые и акустические полотна',
      'Световые линии и парящий контур',
      'Монтаж без демонтажа мебели',
    ],
    to: '/ceilings',
    cta: 'О потолках',
  },
  {
    title: 'Акустика под ключ',
    lead: 'Тихие стены под задачу: считаем эхо и шум в комнате, подбираем полотно и площадь обработки, монтируем стены и потолок разом.',
    img: '/img/34f57fd2-ef90-4be0-814b-f6ac20dc8c26.webp',
    price: 'от 5 900 ₽ / м²',
    features: [
      'Замер эха и расчёт площади',
      'Полотна с поглощением до αw 0,85',
      'Кабинет, спальня, переговорная',
    ],
    to: '/acoustics',
    cta: 'Об акустике',
  },
];

const BUSINESS = [
  {
    title: 'Гостиницы и отели',
    lead: 'Тишина между номерами, замена полотна без ремонта и номер за 1–2 дня без закрытия отеля.',
    img: '/img/dlya-gostinicy.webp',
    to: '/dlya-gostinicy',
  },
  {
    title: 'Рестораны и кафе',
    lead: 'Меньше гула в зале, ткань не держит запахи, монтаж в санитарный день или ночью.',
    img: '/img/dlya-restorana.webp',
    to: '/dlya-restorana',
  },
];

interface ServicesProps {
  index?: string;
  /** Свой заголовок и подводка — чтобы блок не дублировал главную слово в слово */
  title?: ReactNode;
  lead?: ReactNode;
}

const Services = ({
  index = '12',
  title = <>Три услуги — один подрядчик</>,
  lead = 'Делаем только текстильные поверхности — стены и потолки. Можно заказать по отдельности или вместе, одной бригадой и одним счётом.',
}: ServicesProps) => (
  <Section
    id="services"
    index={index}
    eyebrow="Услуги"
    title={title}
    lead={lead}
    tone="surface"
  >
    <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s) => (
        <Link key={s.title} to={s.to} className="hover-card group flex flex-col bg-card">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
            <img
              src={s.img}
              alt={`${s.title} — услуга монтажа тканевых стен и потолков в Москве`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-background">
              {s.price}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-7 sm:p-9">
            <h3 className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
              {s.title}
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">{s.lead}</p>

            <ul className="mt-6 space-y-3">
              {s.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-[1.5] text-foreground">
                  <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <span className="mt-8 flex items-center gap-2 font-display text-lg uppercase tracking-[0.04em] text-primary-ink">
              {s.cta}
              <Icon
                name="ArrowRight"
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>

    <div className="mt-10">
      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Для бизнеса</div>
      <div className="mt-4 grid gap-px border border-border bg-border md:grid-cols-2">
        {BUSINESS.map((b) => (
          <Link key={b.to} to={b.to} className="hover-card group flex bg-card">
            <div className="relative w-32 shrink-0 overflow-hidden bg-secondary sm:w-48">
              <img
                src={b.img}
                alt={`Тканевые стены: ${b.title.toLowerCase()}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{b.lead}</p>
              <span className="mt-5 flex items-center gap-2 font-display text-base uppercase tracking-[0.04em] text-primary-ink">
                Подробнее
                <Icon
                  name="ArrowRight"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Section>
);

export default Services;