import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useCity } from '@/lib/city';
import { confirmCity, detectCity } from '@/lib/geoCity';
import { stripCity, type City } from '@/data/cities';

/**
 * Подсказка «Ваш город — Санкт-Петербург?».
 *
 * Город определяется по IP, но переход НЕ делается автоматически:
 * поисковый робот заходит с чужих адресов, и принудительная
 * переадресация читается как подмена содержимого — за это понижают
 * в выдаче. Поэтому только предложение, решает посетитель.
 */
const CityHint = () => {
  const current = useCity();
  const [suggested, setSuggested] = useState<City | null>(null);

  useEffect(() => {
    let alive = true;
    // Небольшая пауза: подсказка не должна мешать первому впечатлению
    const timer = window.setTimeout(() => {
      detectCity(current).then((city) => {
        if (alive) setSuggested(city);
      });
    }, 1500);

    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [current]);

  if (!suggested) return null;

  const dismiss = () => {
    confirmCity();
    setSuggested(null);
  };

  // Та же страница, но в папке предложенного города
  const { rest } = stripCity(window.location.pathname);
  const href = suggested.slug ? `/${suggested.slug}${rest === '/' ? '' : rest}` : rest;

  return (
    <div className="relative z-[70] border-b border-border bg-secondary">
      <div className="shell flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="flex items-start gap-2 text-sm leading-[1.5] text-foreground">
          <Icon name="MapPin" size={16} className="mt-0.5 shrink-0 text-primary-ink" />
          <span>
            Похоже, вы из&nbsp;города {suggested.name}. Показать контакты и&nbsp;цены для
            вашего города?
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={href}
            onClick={dismiss}
            className="inline-flex min-h-[40px] items-center bg-foreground px-5 py-2 font-display text-sm uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Да, мой город
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex min-h-[40px] items-center border border-border px-5 py-2 font-display text-sm uppercase tracking-[0.04em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Нет, остаться
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Закрыть подсказку"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityHint;
