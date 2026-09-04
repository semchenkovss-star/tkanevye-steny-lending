import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { SERVICES } from '@/components/site/Services';

const ceilings = SERVICES[1];

const WallsCross = () => (
  <section className="w-full border-t border-border bg-secondary">
    <div className="shell py-14 sm:py-16 lg:py-20">
      <Link to="/ceilings" className="group grid border border-border bg-card lg:grid-cols-12">
        <div className="relative overflow-hidden lg:col-span-5">
          <img
            src={ceilings.img}
            alt="Бесшовный натяжной тканевый потолок на скрытом каркасе"
            loading="lazy"
            className="block aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] lg:aspect-auto lg:h-full"
          />
          <span className="absolute left-4 top-4 bg-foreground px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-background">
            {ceilings.price}
          </span>
        </div>

        <div className="flex flex-col justify-center border-t border-border p-7 sm:p-9 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-12">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Вторая услуга
          </div>
          <h2 className="mt-3 max-w-[14em] font-display text-[clamp(1.9rem,6vw,2.25rem)] uppercase leading-[0.98] sm:text-[2.75rem]">
            Делаем и натяжные потолки
          </h2>
          <p className="mt-5 max-w-[38em] text-base leading-[1.6] text-muted-foreground">
            Бесшовное полотно за один день: трещины и стыки плит уходят, свет ставим там, где нужно
            вам. Стены и потолки можно заказать вместе — одной бригадой и одним счётом.
          </p>
          <span className="mt-8 flex items-center gap-2 font-display text-lg uppercase tracking-[0.04em] text-primary">
            Перейти к натяжным потолкам
            <Icon
              name="ArrowRight"
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </div>
  </section>
);

export default WallsCross;
