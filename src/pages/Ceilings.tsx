import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Footer from '@/components/site/Footer';
import LeadDialog from '@/components/site/LeadDialog';
import FloatingCta from '@/components/site/FloatingCta';
import Seo from '@/components/Seo';
import { openLead } from '@/lib/lead';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/5db51be5-66f3-40cc-b60c-02133b86662d.jpg';
const WORK_IMG =
  'https://cdn.poehali.dev/projects/ce2018a8-652f-4f81-8b13-f4d5286e8e64/files/8d020d03-2754-4192-95aa-0d40e7d5b7a4.jpg';

const TYPES = [
  {
    name: 'Матовый',
    price: 'от 1 200 ₽ / м²',
    text: 'Ровная поверхность без бликов, максимально похожа на идеально окрашенный потолок.',
    icon: 'Square',
  },
  {
    name: 'Сатиновый',
    price: 'от 1 500 ₽ / м²',
    text: 'Мягкий перламутровый отблеск, зрительно поднимает высоту и делает свет теплее.',
    icon: 'Sparkles',
  },
  {
    name: 'Акустический',
    price: 'от 2 400 ₽ / м²',
    text: 'Микроперфорация и мембрана: убирает эхо в гостиной, кабинете и переговорной.',
    icon: 'AudioLines',
  },
  {
    name: 'Световые линии',
    price: 'от 3 200 ₽ / м²',
    text: 'Парящий контур и встроенные линии подсветки вместо люстры — по проекту дизайнера.',
    icon: 'Lightbulb',
  },
];

const STEPS = [
  { n: '01', t: 'Замер', d: 'Приезжаем в удобное время, снимаем геометрию и считаем смету за 24 часа.' },
  { n: '02', t: 'Подготовка', d: 'Крепим профиль по периметру, выводим закладные под свет и карниз.' },
  { n: '03', t: 'Монтаж полотна', d: 'Натягиваем полотно, ставим светильники — обычно один день на квартиру.' },
  { n: '04', t: 'Уборка', d: 'Забираем мусор и упаковку, комнатой можно пользоваться сразу.' },
];

const FACTS = [
  { v: '1 день', k: 'Монтаж квартиры' },
  { v: 'до 500 л', k: 'Держит воду при протечке' },
  { v: '0 мм', k: 'Швов на полотне до 5 м' },
  { v: '35 мм', k: 'Минимальный отступ от плиты' },
];

const CeilingsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Тканевые потолки под ключ в Москве — монтаж за 1 день | Полотно"
        description="Бесшовные тканевые потолки: матовые, сатиновые, акустические, со световыми линиями. Монтаж за один день без пыли, замер и смета за 24 часа. Москва и область."
        path="/ceilings"
        image={HERO_IMG}
      />

      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl uppercase tracking-[0.16em]">
            Полотно
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main>
        <section className="shell py-14 sm:py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Услуги · Потолки
              </div>
              <h1 className="mt-3 font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.5rem] lg:text-[4.25rem]">
                Тканевые потолки
                <br />
                без швов
              </h1>
              <p className="mt-6 max-w-[38em] text-base leading-[1.6] text-muted-foreground">
                Бесшовное полотно натягивается на скрытый профиль по периметру комнаты. Не нужно
                штукатурить плиту, ждать просушки и выносить мебель — квартира готова к вечеру того
                же дня.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openLead('Потолки — герой')}
                  className="bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
                >
                  Вызвать замерщика
                </button>
                <Link
                  to="/catalog"
                  className="flex items-center gap-2 border border-border px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-secondary"
                >
                  Каталог тканей
                  <Icon name="ArrowRight" size={18} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img
                src={HERO_IMG}
                alt="Бесшовный тканевый потолок со световыми линиями"
                className="aspect-[4/3] w-full border border-border object-cover"
              />
            </div>
          </div>

          <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-card p-6">
                <dt className="font-display text-3xl leading-none tracking-wide text-primary">
                  {f.v}
                </dt>
                <dd className="mt-3 text-sm text-muted-foreground">{f.k}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="w-full border-t border-border bg-secondary">
          <div className="shell py-16 sm:py-20 lg:py-24">
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Полотна</div>
            <h2 className="mt-3 max-w-[16em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] sm:text-[3rem]">
              Четыре решения под задачу
            </h2>

            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {TYPES.map((t) => (
                <div key={t.name} className="flex flex-col bg-card p-7">
                  <Icon name={t.icon} size={26} className="text-primary" fallback="Square" />
                  <h3 className="mt-5 font-display text-2xl uppercase leading-none tracking-wide">
                    {t.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-[1.55] text-muted-foreground">{t.text}</p>
                  <div className="mt-5 font-display text-lg tracking-wide text-primary">
                    {t.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full border-t border-border">
          <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
            <div className="lg:col-span-5">
              <img
                src={WORK_IMG}
                alt="Монтаж тканевого потолка"
                className="aspect-[4/3] w-full border border-border object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Как проходит
              </div>
              <h2 className="mt-3 font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] sm:text-[3rem]">
                Один день от профиля до уборки
              </h2>

              <ol className="mt-8 divide-y divide-border border-y border-border">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-6 py-5">
                    <span className="font-display text-sm tracking-[0.2em] text-primary">{s.n}</span>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-wide">{s.t}</h3>
                      <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="w-full border-t border-border bg-foreground text-background">
          <div className="shell flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:py-24">
            <div>
              <h2 className="max-w-[14em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] sm:text-[3rem]">
                Посчитаем потолок по вашей квартире
              </h2>
              <p className="mt-5 max-w-[34em] text-base leading-[1.6] text-background/70">
                Замерщик приедет с образцами полотен, снимет размеры и отдаст смету с фиксированной
                ценой в течение суток. Замер бесплатный.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openLead('Потолки — низ страницы')}
              className="shrink-0 bg-primary px-7 py-5 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              Вызвать замерщика
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default CeilingsPage;
