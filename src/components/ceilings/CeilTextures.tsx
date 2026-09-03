import { useState } from 'react';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CEIL_IMG } from '@/lib/ceilings';

interface Texture {
  id: string;
  name: string;
  img: string;
  price: string;
  lead: string;
  facts: string[];
}

const TEXTURES: Texture[] = [
  {
    id: 'matte',
    name: 'Матовый',
    img: CEIL_IMG.matte,
    price: 'от 1 200 ₽ / м²',
    lead: 'Спокойная поверхность без бликов — выглядит как идеально окрашенный потолок, но ставится за день.',
    facts: ['Не даёт отражений и зайчиков', 'Подходит для любой комнаты', 'Самое доступное решение'],
  },
  {
    id: 'satin',
    name: 'Ткань Descor',
    img: CEIL_IMG.hero,
    price: 'от 1 500 ₽ / м²',
    lead: 'Мягкий перламутровый отблеск: рассеивает свет, делает комнату теплее и визуально выше.',
    facts: ['Лёгкое свечение без зеркального эффекта', 'Хорош в спальне и гостиной', 'Не собирает пыль'],
  },
  {
    id: 'gloss',
    name: 'Ткань JM',
    img: CEIL_IMG.gloss,
    price: 'от 1 800 ₽ / м²',
    lead: 'Зеркальная поверхность зрительно удваивает высоту — решение для небольших комнат и тёмных интерьеров.',
    facts: ['Отражает свет и объём комнаты', 'Эффектен с подсветкой', 'Моется обычной губкой'],
  },
  {
    id: 'acoustic',
    name: 'Ткань Clipso',
    img: CEIL_IMG.work,
    price: 'от 2 400 ₽ / м²',
    lead: 'Микроперфорация и мембрана над полотном: убирает гулкое эхо в гостиной, кабинете и переговорной.',
    facts: ['Звукопоглощение αw = 0,25', 'Заметно тише при созвонах', 'Совместим со световыми линиями'],
  },
];

const CeilTextures = () => {
  const [active, setActive] = useState(0);
  const t = TEXTURES[active];

  return (
    <Section
      id="ceil-textures"
      index="05"
      eyebrow="Полотна"
      title={<>Четыре фактуры под задачу комнаты</>}
      lead="Образцы всех фактур замерщик привозит с собой — их можно посмотреть при своём освещении."
      tone="surface"
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {TEXTURES.map((x, i) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(i)}
            className={`border px-5 py-2.5 font-display text-base uppercase tracking-[0.06em] transition-colors ${
              i === active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="grid border border-border bg-card lg:grid-cols-12">
        <div className="relative overflow-hidden lg:col-span-7">
          <img
            src={t.img}
            alt={`${t.name} натяжной потолок`}
            loading="lazy"
            className="block aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full"
          />
          <span className="absolute left-4 top-4 bg-foreground px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-background">
            {t.price}
          </span>
        </div>

        <div className="flex flex-col justify-center border-t border-border p-7 sm:p-9 lg:col-span-5 lg:border-l lg:border-t-0">
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
            {t.name}
          </h3>
          <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">{t.lead}</p>
          <ul className="mt-7 space-y-3">
            {t.facts.map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-[1.5]">
                <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default CeilTextures;
