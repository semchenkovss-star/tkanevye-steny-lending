import Icon from '@/components/ui/icon';

type Props = {
  tone?: 'light' | 'dark';
  className?: string;
};

const OfferNote = ({ tone = 'light', className = '' }: Props) => (
  <p
    className={`flex items-start gap-2 text-xs leading-[1.6] ${
      tone === 'dark' ? 'text-background/55' : 'text-muted-foreground'
    } ${className}`}
  >
    <Icon name="Info" size={14} className="mt-0.5 shrink-0" />
    <span>
      Цены на сайте носят справочный характер и не являются публичной офертой. Точная стоимость
      фиксируется в смете после замера.
    </span>
  </p>
);

export default OfferNote;
