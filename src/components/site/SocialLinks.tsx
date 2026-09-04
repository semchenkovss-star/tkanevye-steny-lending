import Icon from '@/components/ui/icon';
import { SOCIALS } from '@/lib/contacts';

const SocialLinks = ({ className = '' }: { className?: string }) => (
  <div className={`flex flex-wrap items-center gap-3 ${className}`}>
    {SOCIALS.map((s) => (
      <a
        key={s.id}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.label}
        title={s.label}
        className="flex h-11 w-11 items-center justify-center border border-background/25 text-background/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        {s.icon ? (
          <Icon name={s.icon} size={18} />
        ) : (
          <span className="font-display text-sm uppercase tracking-[0.06em]">{s.short}</span>
        )}
      </a>
    ))}
  </div>
);

export default SocialLinks;
