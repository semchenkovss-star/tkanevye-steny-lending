import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useCity, useCityUrls } from '@/lib/city';
import { CITIES } from '@/data/cities';

/**
 * Выбор города. Каждый пункт — обычная ссылка на ту же страницу
 * в папке другого города, поэтому выбор переживает перезагрузку
 * и корректно работает при переходе по ссылке из поиска.
 */
const CitySwitch = ({ className = '' }: { className?: string }) => {
  const city = useCity();
  const urls = useCityUrls();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  // Один город — выбирать не из чего
  if (CITIES.length < 2) return null;

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex min-h-[44px] items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="MapPin" size={15} className="shrink-0" />
        <span className="whitespace-nowrap">{city.name}</span>
        <Icon
          name="ChevronDown"
          size={14}
          className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1 min-w-[190px] border border-border bg-background py-1 shadow-lg"
        >
          {urls.map(({ city: c, href }) => (
            <Link
              key={c.slug || 'default'}
              to={href}
              role="option"
              aria-selected={c.slug === city.slug}
              onClick={() => setOpen(false)}
              className={`flex min-h-[44px] items-center justify-between gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted ${
                c.slug === city.slug ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {c.name}
              {c.slug === city.slug && <Icon name="Check" size={15} className="shrink-0" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySwitch;
