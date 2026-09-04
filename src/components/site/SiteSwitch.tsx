import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export const SITES = [
  { to: '/', label: 'Тканевые стены', short: 'Стены', icon: 'PanelLeft' },
  { to: '/ceilings', label: 'Натяжные потолки', short: 'Потолки', icon: 'PanelTop' },
  { to: '/acoustics', label: 'Акустика под ключ', short: 'Акустика', icon: 'Volume2' },
];

export const useActiveSite = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/ceilings')) return '/ceilings';
  if (pathname.startsWith('/acoustics')) return '/acoustics';
  return '/';
};

const SiteSwitch = () => {
  const active = useActiveSite();

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-secondary">
      <nav aria-label="Направления" className="shell flex items-stretch gap-px bg-border">
        {SITES.map((s) => {
          const isActive = active === s.to;
          return (
            <Link
              key={s.to}
              to={s.to}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-[48px] min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-2 py-3 text-[0.65rem] uppercase tracking-[0.08em] transition-colors sm:gap-2 sm:px-4 sm:text-sm sm:tracking-[0.12em] ${
                isActive
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-primary"
                />
              )}
              <Icon
                name={s.icon}
                size={14}
                className={`shrink-0 ${isActive ? 'text-primary' : 'text-primary-ink'}`}
              />
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SiteSwitch;
