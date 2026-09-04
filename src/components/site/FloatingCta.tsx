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
      className={`fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 sm:bottom-6 sm:right-6 sm:gap-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <a
        href={PHONE_HREF}
        aria-label={`Позвонить ${PHONE_DISPLAY}`}
        title={PHONE_DISPLAY}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_-12px_rgba(28,28,26,0.6)] transition-colors hover:bg-primary-hover sm:h-16 sm:w-16"
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
        <span className="hidden sm:inline">Замер</span>
        <span className="sm:hidden">Замер</span>
      </button>
    </div>
  );
};

export default FloatingCta;