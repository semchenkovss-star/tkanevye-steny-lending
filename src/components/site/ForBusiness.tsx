import { Link } from '@/lib/router-compat';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const ITEMS = [
  {
    title: 'Офисы и переговорные',
    lead: 'Без эха на созвонах, класс горючести Г1, монтаж в нерабочие дни.',
    img: '/img/cf88160e-efe3-43a2-8db4-08693ab60558.webp',
    to: '/dlya-ofisa',
  },
  {
    title: 'Гостиницы и отели',
    lead: 'Тишина между номерами, замена полотна без ремонта, номер за 1–2 дня.',
    img: '/img/dlya-gostinicy.webp',
    to: '/dlya-gostinicy',
  },
  {
    title: 'Рестораны и кафе',
    lead: 'Меньше гула в зале, ткань не держит запахи, монтаж ночью или в санитарный день.',
    img: '/img/dlya-restorana.webp',
    to: '/dlya-restorana',
  },
];

const ForBusiness = () => (
  <Section
    id="business"
    eyebrow="Для бизнеса"
    title={<>Тканевые стены для бизнеса</>}
    lead="Работаем с юрлицами: договор, фиксированная смета, сертификаты для сдачи объекта и монтаж без остановки работы."
  >
    <div className="grid gap-px border border-border bg-border md:grid-cols-3">
      {ITEMS.map((b) => (
        <Link key={b.to} to={b.to} className="hover-card group flex flex-col bg-card">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
            <img
              src={b.img}
              alt={`Тканевые стены: ${b.title.toLowerCase()}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h3 className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
              {b.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{b.lead}</p>
            <span className="mt-auto flex items-center gap-2 pt-5 font-display text-base uppercase tracking-[0.04em] text-primary-ink">
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

    <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-card p-8 sm:flex-row sm:items-center">
      <div>
        <p className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
          Нужно коммерческое предложение?
        </p>
        <p className="mt-3 max-w-[34em] text-sm leading-[1.55] text-muted-foreground">
          Оставьте заявку — посчитаем площадь по плану объекта и пришлём КП с фиксированной ценой.
        </p>
      </div>
      <button
        type="button"
        onClick={() => openLead('Главная — для бизнеса, КП')}
        className="flex min-h-[52px] shrink-0 items-center justify-center gap-2 bg-primary px-7 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Icon name="FileText" size={18} />
        Получить КП
      </button>
    </div>
  </Section>
);

export default ForBusiness;
