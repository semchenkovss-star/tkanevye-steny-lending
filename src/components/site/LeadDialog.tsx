import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/site/LeadForm';
import { LEAD_EVENT } from '@/lib/lead';

const LeadDialog = () => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('Кнопка');
  const [summary, setSummary] = useState<string | undefined>();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string; summary?: string }>).detail;
      setSource(detail?.source ?? 'Кнопка');
      setSummary(detail?.summary);
      setOpen(true);
    };
    window.addEventListener(LEAD_EVENT, handler);
    return () => window.removeEventListener(LEAD_EVENT, handler);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Заявка на замер"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] border border-border bg-card p-7 animate-scale-in sm:p-10"
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="X" size={20} />
        </button>

        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{source}</span>
        <h3 className="mt-3 max-w-[10em] font-display text-4xl uppercase leading-none tracking-wide">
          Замер и смета за 24 часа
        </h3>
        <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">
          Оставьте имя и телефон — перезвоним в течение 15 минут и подберём удобное время.
        </p>

        {summary && (
          <div className="mt-5 flex gap-3 border border-border bg-secondary p-4">
            <Icon name="Calculator" size={18} className="mt-0.5 shrink-0 text-primary-ink" />
            <p className="text-sm leading-[1.5] text-foreground">
              <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Ваш расчёт
              </span>
              {summary}
            </p>
          </div>
        )}

        <div className="mt-7">
          <LeadForm source={source} summary={summary} compact />
        </div>
      </div>
    </div>
  );
};

export default LeadDialog;