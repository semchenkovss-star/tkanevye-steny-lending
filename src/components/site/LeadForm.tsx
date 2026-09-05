import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import PhoneInput from '@/components/ui/phone-input';
import { isPhoneValid, sendLead } from '@/lib/lead';

interface LeadFormProps {
  source?: string;
  summary?: string;
  compact?: boolean;
  onDone?: () => void;
}

const LeadForm = ({
  source = 'Форма на странице',
  summary,
  compact = false,
  onDone,
}: LeadFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; agree?: string }>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; phone?: string; agree?: string } = {};
    if (name.trim().length < 2) next.name = 'Напишите, как к вам обращаться';
    if (!isPhoneValid(phone)) next.phone = 'Нужен полный номер телефона';
    if (!agree) next.agree = 'Без согласия мы не можем принять заявку';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    const ok = await sendLead({ name: name.trim(), phone, source, summary });
    setSending(false);
    if (!ok) {
      setFailed(true);
      return;
    }
    setFailed(false);
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
        <Icon name="CircleCheck" size={34} className="text-primary-ink" />
        <h3 className="font-display text-3xl uppercase leading-none tracking-wide">
          Заявка принята
        </h3>
        <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">
          {name.trim()}, спасибо. Перезвоним на {phone} в течение 15 минут в рабочее время и
          согласуем дату замера.
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
          <PhoneInput
            id={`phone-${source}`}
            value={phone}
            onChange={(v) => {
              setPhone(v);
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            className={`h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
              errors.phone ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor={`agree-${source}`}
          className="flex cursor-pointer items-start gap-3 text-xs leading-[1.55] text-muted-foreground"
        >
          <input
            id={`agree-${source}`}
            type="checkbox"
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              if (errors.agree) setErrors((p) => ({ ...p, agree: undefined }));
            }}
            aria-invalid={Boolean(errors.agree)}
            className={`mt-0.5 h-6 w-6 shrink-0 cursor-pointer appearance-none border bg-card transition-colors checked:border-primary checked:bg-primary ${
              errors.agree ? 'border-destructive' : 'border-border'
            } bg-[length:16px_16px] bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%2220 6 9 17 4 12%22/></svg>')]`}
          />
          <span>
            Я согласен на обработку персональных данных и принимаю{' '}
            <Link
              to="/privacy"
              onClick={(e) => e.stopPropagation()}
              className="underline underline-offset-2 hover:text-foreground"
            >
              политику конфиденциальности
            </Link>
            . Только два поля — имя и телефон, ничего лишнего не спрашиваем.
          </span>
        </label>
        {errors.agree && <p className="mt-2 text-sm text-destructive">{errors.agree}</p>}
      </div>

      <button
        type="submit"
        disabled={!agree || sending}
        className="mt-6 w-full bg-primary px-8 py-4 font-display text-xl uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:bg-muted"
      >
        {sending ? 'Отправляем…' : 'Записаться на замер'}
      </button>
      {failed && (
        <p className="mt-3 text-sm text-destructive">
          Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
        </p>
      )}
    </form>
  );
};

export default LeadForm;