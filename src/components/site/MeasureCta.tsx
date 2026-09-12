import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

interface MeasureCtaProps {
  isCeilings?: boolean;
  source: string;
  heading?: 'h2' | 'span';
  className?: string;
}

const MeasureCta = ({
  isCeilings = false,
  source,
  heading = 'h2',
  className = '',
}: MeasureCtaProps) => {
  const Heading = heading;

  return (
    <aside
      className={`flex flex-col gap-5 border border-border bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7 ${className}`}
    >
      <div className="flex gap-4">
        <Icon name="Ruler" size={22} className="mt-0.5 shrink-0 text-primary-ink" />
        <div>
          <Heading className="block font-display text-[1.15rem] uppercase leading-[1.15] tracking-wide">
            {isCeilings ? 'Замерим ваш потолок бесплатно' : 'Замерим вашу комнату бесплатно'}
          </Heading>
          <p className="mt-2 max-w-[32em] text-sm leading-[1.55] text-muted-foreground">
            {isCeilings
              ? 'Приедем с лазером, проверим перепады и закладные, посчитаем смету за 24 часа.'
              : 'Приедем с шумомером, замерим эхо и шум, посчитаем смету за 24 часа.'}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => openLead(source)}
        className="shrink-0 whitespace-nowrap bg-primary px-6 py-3.5 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Записаться на замер
      </button>
    </aside>
  );
};

export default MeasureCta;
