import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/site/LeadForm';
import { LEAD_EVENT } from '@/lib/lead';
import { useContacts } from '@/lib/useContacts';

const LeadDialog = () => {
  const { PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } = useContacts();
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
        className="relative flex max-h-[92dvh] w-full max-w-[560px] flex-col overflow-y-auto overscroll-contain border border-border bg-card animate-scale-in sm:max-h-[90dvh]"
      >
        {/*
         * Кнопка закрытия липнет к верху окна: на невысоких экранах
         * форма прокручивается внутри, и крестик всегда остаётся виден.
         */}
        <div className="sticky top-0 z-10 flex justify-end bg-card/95 px-3 pt-3 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="X" size={22} />
          </button>
        </div>

        <div className="px-7 pb-7 pt-1 sm:px-10 sm:pb-10">
          {/* Источник заявки не показываем: он нужен только в уведомлении менеджеру */}
          <h3 className="max-w-[10em] font-display text-3xl uppercase leading-[1.05] tracking-wide sm:text-4xl sm:leading-none">
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

          {/* Быстрая связь для тех, кому проще позвонить, чем заполнять поля */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              или
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <a
            href={PHONE_HREF}
            className="mt-6 flex min-h-[56px] items-center justify-center gap-3 border border-foreground px-6 py-4 text-center font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <Icon name="Phone" size={20} className="shrink-0" />
            {PHONE_DISPLAY}
          </a>
          <p className="mt-3 text-center text-xs leading-[1.5] text-muted-foreground">
            {WORK_HOURS}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadDialog;