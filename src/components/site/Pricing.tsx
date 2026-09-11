import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { PLANS } from '@/lib/pricing';

const Pricing = ({ index = '07' }: { index?: string }) => {
  return (
    <Section
      id="price"
      index={index}
      eyebrow="Тарифы"
      title={<>Цена за квадратный метр под ключ</>}
      lead="В стоимость входит материал, каркас, работа и уборка. Итог фиксируется в смете после замера и больше не меняется."
      tone="surface"
    >
      <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
        {PLANS.map((p) => (
          <article
            key={p.name}
            className={`flex min-w-0 flex-col p-5 sm:p-8 lg:p-10 ${
              p.accent ? 'bg-foreground text-background' : 'bg-card text-foreground'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-4xl uppercase leading-none tracking-wide">
                {p.name}
              </h3>
              {p.accent && (
                <span className="bg-primary px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-primary-foreground">
                  Выбирают чаще
                </span>
              )}
            </div>
            <p
              className={`mt-3 text-sm ${
                p.accent ? 'text-background/60' : 'text-muted-foreground'
              }`}
            >
              {p.for}
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-5xl leading-none text-primary">{p.priceLabel}</span>
              <span
                className={`text-sm ${p.accent ? 'text-background/60' : 'text-muted-foreground'}`}
              >
                {p.unit}
              </span>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-[0.95rem] leading-[1.5]">
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span className={p.accent ? 'text-background/85' : 'text-foreground'}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openLead(`Тариф «${p.name}»`)}
              className={`mt-10 w-full px-6 py-4 font-display text-lg uppercase tracking-[0.04em] transition-colors ${
                p.accent
                  ? 'bg-primary text-primary-foreground hover:bg-background hover:text-foreground'
                  : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              Рассчитать тариф
            </button>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-card p-8 sm:flex-row sm:items-center lg:p-10">
        <div>
          <h3 className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
            Хотите точную цифру по своей стене?
          </h3>
          <p className="mt-3 max-w-[34em] text-sm leading-[1.55] text-muted-foreground">
            Введите длину и высоту стены в калькуляторе — стоимость посчитается сразу.
          </p>
        </div>
        <a
          href="#calc"
          className="whitespace-nowrap bg-foreground px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          К калькулятору
        </a>
      </div>

    </Section>
  );
};

export default Pricing;