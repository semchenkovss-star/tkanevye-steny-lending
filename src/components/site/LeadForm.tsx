import { FormEvent, useState } from 'react';
import Icon from '@/components/ui/icon';
import { formatPhone, isPhoneValid } from '@/lib/lead';

interface LeadFormProps {
  source?: string;
  compact?: boolean;
  onDone?: () => void;
}

const LeadForm = ({ source = 'Форма на странице', compact = false, onDone }: LeadFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = 'Напишите, как к вам обращаться';
    if (!isPhoneValid(phone)) next.phone = 'Нужен полный номер телефона';
    setErrors(next);
    if (Object.keys(next).length) return;

    // eslint-disable-next-line no-console
    console.log('lead', { name, phone, source });
    setSent(true);
    onDone?.();
  };

  if (sent) {
    return (
      <div
        className={`flex flex-col items-start gap-4 border border-primary bg-card p-8 ${
          compact ? '' : 'lg:p-10'
        }`}
      >
        <Icon name="CircleCheck" size={34} className="text-primary" />
        <h3 className="font-display text-3xl uppercase leading-none tracking-wide">
          Заявка принята
        </h3>
        <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">
          {name.trim()}, спасибо. Перезвоним на {phone} в течение 15 минут в рабочее время и
          согласуем дату бесплатного замера.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={compact ? 'space-y-5' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor={`name-${source}`} className="mb-2 block text-sm text-muted-foreground">
            Как вас зовут
          </label>
          <input
            id={`name-${source}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            placeholder="Имя"
            className={`h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
              errors.name ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`phone-${source}`} className="mb-2 block text-sm text-muted-foreground">
            Телефон
          </label>
          <input
            id={`phone-${source}`}
            inputMode="tel"
            value={phone}
            onFocus={() => {
              if (!phone) setPhone('+7 (');
            }}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            placeholder="+7 (___) ___-__-__"
            className={`h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
              errors.phone ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-primary px-8 py-4 font-display text-xl uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
      >
        Записаться на бесплатный замер
      </button>

      <p className="mt-4 text-xs leading-[1.55] text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных. Только два поля —
        имя и телефон, ничего лишнего не спрашиваем.
      </p>
    </form>
  );
};

export default LeadForm;
