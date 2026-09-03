import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SITES = [
  { to: '/', label: 'Тканевые стены', icon: 'PanelLeft' },
  { to: '/ceilings', label: 'Натяжные потолки', icon: 'PanelTop' },
  { to: '/acoustics', label: 'Акустика под ключ', icon: 'Volume2' },
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
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-4 py-3 text-xs uppercase tracking-[0.12em] transition-colors sm:text-sm ${
                active
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              <Icon name={s.icon} size={15} className={active ? '' : 'text-primary'} />
              {s.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SiteSwitch;
