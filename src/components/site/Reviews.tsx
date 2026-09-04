import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

const REVIEWS = [
  {
    name: 'Ирина М.',
    role: 'Квартира, Красногорск',
    text: 'Мы три года откладывали спальню: муж не хотел жить в пыли. Приехали в четверг утром, в пятницу вечером стена уже была готова. Из мусора — один пакет обрезков ткани.',
    rating: 5,
  },
  {
    name: 'Дмитрий К.',
    role: 'Кабинет, Москва',
    text: 'Брал ради звука для созвонов. Эхо ушло полностью, коллеги сразу заметили. Плюс за полотном спрятали кабель-канал, который меня раздражал два года.',
    rating: 5,
  },
  {
    name: 'Анна и Сергей',
    role: 'Гостиная, Одинцово',
    text: 'Стена была завалена почти на 5 см, ни один мастер не брался выровнять без потери площади. Здесь каркас всё вытянул, и шкаф наконец встал вплотную.',
    rating: 5,
  },
  {
    name: 'Ольга Т.',
    role: 'Детская, Химки',
    text: 'Выбирали по фактуре и не прогадали: рогожка держит удар мячом и не боится кошки. Ребёнок спит крепче — коридорные звуки почти не слышно.',
    rating: 5,
  },
];

const Reviews = () => {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  const move = (d: number) => setI((prev) => (prev + d + REVIEWS.length) % REVIEWS.length);

  return (
    <Section id="reviews" index="09" eyebrow="Отзывы" title={<>Говорят заказчики</>}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <blockquote className="border-l-2 border-primary pl-6 lg:pl-10">
            <p className="font-display text-[1.75rem] uppercase leading-[1.1] tracking-wide text-foreground sm:text-[2.25rem]">
              «{r.text}»
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-primary font-display text-xl text-primary-foreground">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="font-display text-xl uppercase tracking-wide">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.role}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Icon key={k} name="Star" size={16} className="fill-primary text-primary" />
                ))}
              </div>
            </footer>
          </blockquote>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              onClick={() => move(-1)}
              className="flex h-12 w-12 items-center justify-center border border-border transition-colors hover:bg-foreground hover:text-background"
            >
              <Icon name="ArrowLeft" size={18} />
            </button>
            <button
              type="button"
              aria-label="Следующий отзыв"
              onClick={() => move(1)}
              className="flex h-12 w-12 items-center justify-center border border-border transition-colors hover:bg-foreground hover:text-background"
            >
              <Icon name="ArrowRight" size={18} />
            </button>
            <span className="ml-3 font-display text-lg tracking-[0.14em] text-muted-foreground">
              {String(i + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="divide-y divide-border border-y border-border">
            {[
              { k: '640+', v: 'стен смонтировано с 2016 года' },
              { k: '4,9', v: 'средняя оценка на Яндекс Картах' },
              { k: '92%', v: 'заказчиков приходят по рекомендации' },
            ].map((s) => (
              <div key={s.k} className="py-6">
                <div className="font-display text-4xl leading-none text-primary-ink">{s.k}</div>
                <div className="mt-2 text-sm leading-[1.5] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Reviews;
