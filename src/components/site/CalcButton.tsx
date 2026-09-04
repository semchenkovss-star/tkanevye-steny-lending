import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

type Props = {
  to?: string;
  className?: string;
  label?: string;
};

const CalcButton = ({ to = '/#calc', className = '', label = 'Рассчитать стоимость' }: Props) => {
  const base =
    'flex items-center justify-center gap-2 whitespace-nowrap border border-border bg-card px-4 py-3 font-display text-sm uppercase tracking-[0.04em] text-foreground transition-colors hover:border-primary hover:text-primary-ink';

  if (to.startsWith('#')) {
    return (
      <a href={to} className={`${base} ${className}`}>
        <Icon name="Calculator" size={16} />
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={`${base} ${className}`}>
      <Icon name="Calculator" size={16} />
      {label}
    </Link>
  );
};

export default CalcButton;
