import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contacts';

const FloatingCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const lead = document.getElementById('lead');
      const nearForm = lead ? lead.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setVisible(window.scrollY > window.innerHeight * 0.9 && !nearForm);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-3 right-3 z-50 flex max-w-[calc(100vw-1.5rem)] items-center gap-1.5 sm:bottom-6 sm:right-6 sm:gap-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <a
        href={PHONE_HREF}
        aria-label={`Позвонить ${PHONE_DISPLAY}`}
        title={PHONE_DISPLAY}
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_-12px_rgba(28,28,26,0.6)] transition-colors hover:bg-primary-hover sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
        <Icon name="Phone" size={18} className="relative sm:hidden" />
        <Icon name="Phone" size={24} className="relative hidden sm:block" />
      </a>
      <button
        type="button"
        onClick={() => openLead('Плавающая кнопка')}
        className="flex items-center gap-2 bg-primary px-4 py-3 font-display text-sm uppercase tracking-[0.04em] text-primary-foreground shadow-[0_10px_40px_-12px_rgba(28,28,26,0.6)] transition-colors hover:bg-primary-hover sm:gap-3 sm:px-6 sm:py-4 sm:text-lg"
      >
        <Icon name="Ruler" size={16} className="sm:hidden" />
        <Icon name="Ruler" size={20} className="hidden sm:block" />
        Замер
      </button>
    </div>
  );
};

export default FloatingCta;