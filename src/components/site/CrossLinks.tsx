import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Direction {
  to: string;
  eyebrow: string;
  title: string;
  text: string;
  price: string;
  img: string;
  icon: string;
  cta: string;
}

const DIRECTIONS: Record<string, Direction> = {
  '/': {
    to: '/',
    eyebrow: 'Тканевые стены',
    title: 'Ровная стена за один день',
    text: 'Полотно натягивается поверх скрытого каркаса: перепады до 60 мм, проводка и стояки уходят под ткань. Без штукатурки, пыли и просушки.',
    price: 'от 1 750 ₽ / м²',
    img: '/img/ff5a9931-f993-4df5-ab56-99200408285a.webp',
    icon: 'PanelLeft',
    cta: 'Перейти к тканевым стенам',
  },
  '/ceilings': {
    to: '/ceilings',
    eyebrow: 'Натяжные потолки',
    title: 'Бесшовный потолок за день',
    text: 'Трещины и стыки плит уходят под полотно, свет ставим там, где нужно вам. Световые линии, парящий контур и ниши под карниз.',
    price: 'от 1 200 ₽ / м²',
    img: '/img/5db51be5-66f3-40cc-b60c-02133b86662d.webp',
    icon: 'PanelTop',
    cta: 'Перейти к натяжным потолкам',
  },
  '/acoustics': {
    to: '/acoustics',
    eyebrow: 'Акустика под ключ',
    title: 'Тихая комната без эха',
    text: 'Замеряем эхо и шум, считаем площадь обработки и подбираем полотно с поглощением до αw 0,85. Стены и потолок делаем разом.',
    price: 'от 5 900 ₽ / м²',
    img: '/img/34f57fd2-ef90-4be0-814b-f6ac20dc8c26.webp',
    icon: 'Volume2',
    cta: 'Перейти к акустике',
  },
};

const ORDER = ['/', '/ceilings', '/acoustics'];

const CrossLinks = ({ current }: { current: '/' | '/ceilings' | '/acoustics' }) => {
  const others = ORDER.filter((k) => k !== current).map((k) => DIRECTIONS[k]);

  return (
    <section className="w-full border-t border-border bg-secondary">
      <div className="shell py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-[16em] font-display text-[clamp(1.8rem,6vw,2.4rem)] uppercase leading-[0.98] text-foreground">
            Другие наши направления
          </h2>
          <p className="max-w-[26em] text-sm leading-[1.6] text-muted-foreground">
            Работаем одной бригадой и по одному счёту — стены, потолок и акустику можно заказать
            вместе.
          </p>
        </div>

        <div className="mt-8 grid gap-px bg-border sm:mt-10 lg:grid-cols-2">
          {others.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="group flex flex-col bg-card transition-colors hover:bg-card/60"
            >
              <div className="relative overflow-hidden">
                <img
                  src={d.img}
                  alt={`${d.eyebrow} — ${d.title}`}
                  loading="lazy"
                  className="block aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 flex items-center gap-2 bg-foreground px-3 py-1.5 font-display text-sm uppercase tracking-[0.12em] text-background">
                  <Icon name={d.icon} size={14} className="text-primary" />
                  {d.eyebrow}
                </span>
                <span className="absolute bottom-4 right-4 bg-primary px-3 py-1.5 font-display text-sm uppercase tracking-[0.06em] text-primary-foreground">
                  {d.price}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="max-w-[14em] font-display text-[clamp(1.5rem,4.5vw,1.9rem)] uppercase leading-[1] text-foreground">
                  {d.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">{d.text}</p>
                <span className="mt-auto flex items-center gap-2 pt-7 font-display text-base uppercase tracking-[0.04em] text-primary-ink sm:text-lg">
                  {d.cta}
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
      </div>
    </section>
  );
};

export default CrossLinks;
