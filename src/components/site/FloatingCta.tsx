import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const FloatingCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const lead = document.getElementById('lead');
      const nearForm = lead ? lead.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setVisible(window.scrollY > window.innerHeight * 0.9 && !nearForm);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => openLead('Плавающая кнопка')}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground shadow-[0_10px_40px_-12px_rgba(28,28,26,0.6)] transition-all duration-300 hover:bg-foreground ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <Icon name="Ruler" size={20} />
      <span className="hidden sm:inline">Бесплатный замер</span>
      <span className="sm:hidden">Замер</span>
    </button>
  );
};

export default FloatingCta;
