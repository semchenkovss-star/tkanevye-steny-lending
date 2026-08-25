import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  src: string;
  title: string;
  caption?: string;
  onLead?: () => void;
  onClose: () => void;
}

const ImageZoom = ({ src, title, caption, onLead, onClose }: Props) => {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-foreground/85 p-4 animate-fade-in sm:p-8"
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <Icon name="X" size={20} />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Фактура ткани ${title}`}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[900px] flex-col items-center"
      >
        <div
          onClick={() => setZoomed((v) => !v)}
          onMouseMove={move}
          onMouseLeave={() => setOrigin('50% 50%')}
          className={`w-full overflow-hidden bg-secondary ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        >
          <img
            src={src}
            alt={`Фактура ткани ${title}`}
            style={{ transformOrigin: origin }}
            className={`h-auto w-full select-none transition-transform duration-300 ${
              zoomed ? 'scale-[2.2]' : 'scale-100'
            }`}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
          <span className="font-display text-xl uppercase tracking-wide text-background">
            {title}
          </span>
          {caption && <span className="text-sm text-background/70">{caption}</span>}
          <span className="flex items-center gap-1.5 text-sm text-background/70">
            <Icon name={zoomed ? 'ZoomOut' : 'ZoomIn'} size={15} />
            {zoomed ? 'Нажмите, чтобы уменьшить' : 'Нажмите, чтобы приблизить'}
          </span>
        </div>

        {onLead && (
          <button
            type="button"
            onClick={onLead}
            className="mt-5 flex items-center gap-3 bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <Icon name="Ruler" size={20} />
            Заказать замер
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageZoom;