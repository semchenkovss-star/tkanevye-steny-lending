import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Seo from '@/components/Seo';
import Logo from '@/components/site/Logo';
import CalcButton from '@/components/site/CalcButton';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';
import { openLead } from '@/lib/lead';
import { useContacts } from '@/lib/useContacts';
import { breadcrumbsLd, organizationLd } from '@/lib/schema';
import { LEGAL_INN, LEGAL_NAME, LEGAL_OGRN } from '@/lib/contacts';
import {
  ABOUT_FACTS,
  ABOUT_HISTORY,
  ABOUT_NUMBERS,
  ABOUT_PRINCIPLES,
  ABOUT_SERVICES,
} from '@/data/about';

const AboutPage = () => {
  const { ADDRESS, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } = useContacts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="О компании Fabric Wall: тканевые стены и потолки с 2016 года"
        description="Fabric Wall — натяжные тканевые стены и потолки на скрытом каркасе с 2016 года. Более 640 смонтированных стен, свой раскрой, штатные бригады, фиксированная смета."
        path="/about"
        keywords="fabric wall, о компании, тканевые стены москва, производитель тканевых стен, натяжные тканевые стены отзывы"
        jsonLd={[breadcrumbsLd([{ name: 'О компании', path: '/about' }]), organizationLd()]}
      />

      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Logo to="/" size="sm" />
          <div className="flex items-center gap-3">
            <CalcButton className="hidden sm:flex" />
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
        <section className="shell py-14 sm:py-16 lg:py-20">
          <span className="font-display text-sm tracking-[0.2em] text-primary-ink">О компании</span>
          <h1 className="mt-3 max-w-[14em] font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] sm:text-[3.5rem] lg:text-[4rem]">
            Тканевые стены и потолки с 2016 года
          </h1>
          <p className="mt-6 max-w-[42em] text-base leading-[1.6] text-muted-foreground">
            Fabric Wall делает натяжные тканевые стены и потолки на скрытом каркасе. Ровная
            поверхность без штукатурки, пыли и недель просушки: каркас выбирает кривизну до 60 мм,
            а за полотном исчезают проводка, стояки и кабель-каналы. Стена до 20 м² занимает
            6–8 часов — вы ночуете дома в тот же день.
          </p>

          <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_NUMBERS.map((n) => (
              <div key={n.label} className="bg-card p-7">
                <dt className="font-display text-4xl leading-none tracking-wide text-primary-ink">
                  {n.value}
                </dt>
                <dd className="mt-3 text-sm leading-[1.5] text-muted-foreground">{n.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-border bg-secondary py-14 sm:py-16 lg:py-20">
          <div className="shell">
            <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-wide sm:text-4xl">
              Как мы к этому пришли
            </h2>
            <p className="mt-4 max-w-[44em] text-[0.95rem] leading-[1.6] text-muted-foreground">
              Девять лет мы занимаемся одним делом. Ниже — короткая версия пути: что добавлялось и
              почему.
            </p>

            <ol className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-5">
              {ABOUT_HISTORY.map((h) => (
                <li key={h.year} className="bg-card p-7">
                  <span className="font-display text-sm tracking-[0.18em] text-primary-ink">
                    {h.year}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{h.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border py-14 sm:py-16 lg:py-20">
          <div className="shell">
            <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-wide sm:text-4xl">
              Чем занимаемся
            </h2>
            <p className="mt-4 max-w-[44em] text-[0.95rem] leading-[1.6] text-muted-foreground">
              Три направления, одна технология — скрытый каркас и натянутое полотно.
            </p>

            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {ABOUT_SERVICES.map((s) => (
                <article key={s.title} className="flex flex-col bg-card p-7 sm:p-9">
                  <Icon name={s.icon} fallback="Layers" size={26} className="text-primary-ink" />
                  <h3 className="mt-6 font-display text-2xl uppercase leading-none tracking-wide">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-display text-lg tracking-wide text-primary-ink">
                    {s.price}
                  </p>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-[1.6] text-muted-foreground">
                    {s.text}
                  </p>
                  <Link
                    to={s.to}
                    className="-my-2 mt-5 inline-flex min-h-[44px] items-center gap-2 py-2 font-display text-sm uppercase tracking-[0.04em] text-foreground transition-colors hover:text-primary-ink"
                  >
                    {s.linkLabel}
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-foreground py-14 text-background sm:py-16 lg:py-20">
          <div className="shell">
            <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-wide sm:text-4xl">
              Почему к нам возвращаются
            </h2>
            <p className="mt-4 max-w-[44em] text-[0.95rem] leading-[1.6] text-background/60">
              92% заказчиков приходят по рекомендации. Вот что за этим стоит.
            </p>

            <div className="mt-10 grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT_FACTS.map((f) => (
                <article key={f.title} className="bg-foreground p-8">
                  <Icon name={f.icon} fallback="Building2" size={26} className="text-primary" />
                  <h3 className="mt-6 font-display text-2xl uppercase leading-none tracking-wide text-background">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-background/60">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-14 sm:py-16 lg:py-20">
          <div className="shell">
            <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-wide sm:text-4xl">
              Как мы работаем
            </h2>

            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
              {ABOUT_PRINCIPLES.map((p) => (
                <article key={p.title} className="bg-card p-7 sm:p-9">
                  <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">
                    {p.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-secondary py-14 sm:py-16 lg:py-20">
          <div className="shell grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-wide sm:text-4xl">
                Реквизиты и контакты
              </h2>
              <p className="mt-4 max-w-[38em] text-[0.95rem] leading-[1.6] text-muted-foreground">
                Работаем по договору. Полные реквизиты для оплаты и документов пришлём вместе со
                сметой — или по запросу на почту.
              </p>

              <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
                <div className="bg-card p-6">
                  <dt className="text-sm text-muted-foreground">Юридическое лицо</dt>
                  <dd className="mt-2 text-base text-foreground">{LEGAL_NAME}</dd>
                </div>
                <div className="bg-card p-6">
                  <dt className="text-sm text-muted-foreground">ИНН</dt>
                  <dd className="mt-2 text-base text-foreground">{LEGAL_INN}</dd>
                </div>
                <div className="bg-card p-6">
                  <dt className="text-sm text-muted-foreground">ОГРНИП</dt>
                  <dd className="mt-2 text-base text-foreground">{LEGAL_OGRN}</dd>
                </div>
                <div className="bg-card p-6">
                  <dt className="text-sm text-muted-foreground">Режим работы</dt>
                  <dd className="mt-2 text-base text-foreground">{WORK_HOURS}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-border bg-card p-7 sm:p-9">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide">
                Связаться с нами
              </h3>

              <div className="mt-7 space-y-5">
                <a
                  href={PHONE_HREF}
                  data-goal-place="О компании"
                  className="-my-2 flex min-h-[44px] items-start gap-3 py-2 transition-colors hover:text-primary-ink"
                >
                  <Icon name="Phone" size={18} className="mt-1 shrink-0 text-primary-ink" />
                  <span className="font-display text-2xl tracking-wide">{PHONE_DISPLAY}</span>
                </a>

                <a
                  href={EMAIL_HREF}
                  className="-my-2 flex min-h-[44px] items-start gap-3 py-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon name="Mail" size={18} className="mt-1 shrink-0 text-primary-ink" />
                  {EMAIL}
                </a>

                <p className="flex items-start gap-3 text-base leading-[1.5] text-muted-foreground">
                  <Icon name="MapPin" size={18} className="mt-1 shrink-0 text-primary-ink" />
                  {ADDRESS}
                </p>
              </div>

              <button
                type="button"
                onClick={() => openLead('О компании')}
                className="mt-8 w-full bg-primary px-8 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Записаться на замер
              </button>
              <p className="mt-3 text-sm leading-[1.5] text-muted-foreground">
                Перезвоним в течение 15 минут в рабочее время.
              </p>
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

export default AboutPage;