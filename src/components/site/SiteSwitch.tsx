import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SITES = [
  { to: '/', label: 'Тканевые стены', short: 'Стены', icon: 'PanelLeft' },
  { to: '/ceilings', label: 'Натяжные потолки', short: 'Потолки', icon: 'PanelTop' },
  { to: '/acoustics', label: 'Акустика под ключ', short: 'Акустика', icon: 'Volume2' },
];

const SiteSwitch = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-full border-b border-border bg-secondary">
      <nav
        aria-label="Направления"
        className="shell flex items-stretch gap-px overflow-x-auto bg-border"
      >
        {SITES.map((s) => {
          const active = pathname === s.to;
          return (
            <Link
              key={s.to}
              to={s.to}
              aria-current={active ? 'page' : undefined}
              className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-2 py-3 text-[0.65rem] uppercase tracking-[0.08em] transition-colors sm:gap-2 sm:px-4 sm:text-sm sm:tracking-[0.12em] ${
                active
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              <Icon
                name={s.icon}
                size={14}
                className={`shrink-0 ${active ? '' : 'text-primary-ink'}`}
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