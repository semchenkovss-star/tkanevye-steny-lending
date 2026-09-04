import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CEIL_IMG, CEIL_LAYERS, CEIL_PAINS } from '@/lib/ceilings';

export const CeilPain = () => (
  <Section
    id="ceil-pain"
    index="01"
    eyebrow="С чем к нам приходят"
    title={<>Три причины переделать потолок</>}
    lead="Мы не маскируем эти проблемы шпаклёвкой — конструкция закрывает их целиком и навсегда."
    tone="surface"
  >
    <div className="grid gap-px border border-border bg-border md:grid-cols-3">
      {CEIL_PAINS.map((p) => (
        <article
          key={p.title}
          className="group bg-card p-8 transition-colors duration-300 hover:bg-foreground lg:p-10"
        >
          <Icon name={p.icon} fallback="TriangleAlert" size={30} className="text-primary" />
          <h3 className="mt-8 font-display text-3xl uppercase leading-none tracking-wide text-foreground transition-colors group-hover:text-background">
            {p.title}
          </h3>
          <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground transition-colors group-hover:text-background/70">
            {p.text}
          </p>
        </article>
      ))}
    </div>
  </Section>
);

export const CeilWhat = () => (
  <Section
    id="ceil-what"
    index="02"
    eyebrow="Технология"
    title={<>Как устроен бесшовный натяжной потолок</>}
    lead="Бесшовное полотно не крепится к плите: оно держится на багете по периметру комнаты. Поэтому состояние бетона больше не имеет значения, а потолок ставится за один день."
  >
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden border border-border">
          <img
            src={CEIL_IMG.matte}
            alt="Матовый бесшовный натяжной тканевый потолок в гостиной на скрытом каркасе"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="divide-y divide-border border-y border-border">
          {CEIL_LAYERS.map((l) => (
            <div key={l.n} className="flex gap-6 py-7">
              <span className="font-display text-2xl leading-none text-primary-ink">{l.n}</span>
              <div>
                <h3 className="font-display text-2xl uppercase leading-none tracking-wide">
                  {l.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted-foreground">{l.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-4 bg-secondary p-6">
          <Icon name="Info" size={20} className="mt-0.5 shrink-0 text-primary-ink" />
          <p className="text-sm leading-[1.6] text-muted-foreground">
            Конструкция разборная: полотно снимается из замка и ставится обратно за пару часов —
            доступ к проводке и стоякам сохраняется.
          </p>
        </div>
      </div>
    </div>
  </Section>
);
