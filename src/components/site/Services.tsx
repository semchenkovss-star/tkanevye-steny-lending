import { Link } from 'react-router-dom';
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
    lead: 'Ровная стена на скрытом каркасе за один-два дня: без штукатурки, пыли и просушки.',
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/ff5a9931-f993-4df5-ab56-99200408285a.jpg',
    price: 'от 1 750 ₽ / м²',
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
    img: 'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/5db51be5-66f3-40cc-b60c-02133b86662d.jpg',
    price: 'от 1 200 ₽ / м²',
    features: [
      'Матовые, сатиновые и акустические полотна',
      'Световые линии и парящий контур',
      'Монтаж без демонтажа мебели',
    ],
    to: '/ceilings',
    cta: 'О потолках',
  },
];

const Services = () => (
  <Section
    id="services"
    index="02"
    eyebrow="Услуги"
    title={<>Два направления работ</>}
    lead="Делаем только текстильные поверхности — стены и потолки. Можно заказать по отдельности или вместе, одной бригадой и одним счётом."
    tone="surface"
  >
    <div className="grid gap-px border border-border bg-border md:grid-cols-2">
      {SERVICES.map((s) => (
        <Link key={s.title} to={s.to} className="group flex flex-col bg-card">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
            <img
              src={s.img}
              alt={s.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute left-4 top-4 bg-foreground px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-background">
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

            <span className="mt-8 flex items-center gap-2 font-display text-lg uppercase tracking-[0.04em] text-primary">
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
  </Section>
);

export default Services;
