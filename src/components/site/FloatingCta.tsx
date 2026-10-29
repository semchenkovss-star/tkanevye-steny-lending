import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { useContacts } from '@/lib/useContacts';

const CALC_IDS = ['calc', 'ac-calc', 'ceil-calc'];
const HIDE_NEAR = ['lead', ...CALC_IDS];

const findCalc = () => {
  for (const id of CALC_IDS) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
};

const FloatingCta = () => {
  const { PHONE_DISPLAY, PHONE_HREF } = useContacts();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const h = window.innerHeight;
      const covered = HIDE_NEAR.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < h * 0.85 && r.bottom > h * 0.15;
      });
      setVisible(window.scrollY > h * 0.6 && !covered);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goCalc = () => {
    const calc = findCalc();
    if (calc) calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.href = '/#calc';
  };

  const hidden = visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0';

  return (
    <>
      <div
        aria-hidden={!visible}
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 pt-2.5 backdrop-blur transition-all duration-300 sm:hidden ${hidden}`}
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <div className="grid grid-cols-2 gap-2">
          <a
            href={PHONE_HREF}
            tabIndex={visible ? 0 : -1}
            data-goal-place="Нижняя панель"
            aria-label={`Позвонить ${PHONE_DISPLAY}`}
            className="flex min-h-[48px] items-center justify-center gap-2 border border-foreground/25 font-display text-base uppercase tracking-[0.04em] text-foreground transition-colors active:border-primary active:text-primary-ink"
          >
            <Icon name="Phone" size={18} />
            Позвонить
          </a>
          <button
            type="button"
            tabIndex={visible ? 0 : -1}
            onClick={goCalc}
            className="flex min-h-[48px] items-center justify-center gap-2 bg-primary font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors active:bg-primary-hover"
          >
            <Icon name="Calculator" size={18} />
            Рассчитать
          </button>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 hidden items-center gap-3 transition-all duration-300 sm:flex ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <a
          href={PHONE_HREF}
          aria-label={`Позвонить ${PHONE_DISPLAY}`}
          title={PHONE_DISPLAY}
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_-12px_rgba(28,28,26,0.6)] transition-colors hover:bg-primary-hover"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          <Icon name="Phone" size={24} className="relative" />
        </a>
        <button
          type="button"
          onClick={() => openLead('Плавающая кнопка')}
          className="flex items-center gap-3 bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground shadow-[0_10px_40px_-12px_rgba(28,28,26,0.6)] transition-colors hover:bg-primary-hover"
        >
          <Icon name="Ruler" size={20} />
          Замер
        </button>
      </div>
    </>
  );
};

export default FloatingCta;
