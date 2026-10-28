import { FormEvent, useState } from 'react';
import { Link } from '@/lib/router-compat';
import Icon from '@/components/ui/icon';
import { useAntiSpam } from '@/components/site/useAntiSpam';
import { sendLead } from '@/lib/lead';
import { GOALS, reachGoal } from '@/lib/metrika';

interface Props {
  calc: string;
  summary: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

const inputCls =
  'h-12 w-full border border-background/25 bg-transparent px-4 text-[0.95rem] text-background outline-none transition-colors placeholder:text-background/45 focus:border-primary';

const CalcEmail = ({ calc, summary }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState('');
  const antiSpam = useAntiSpam();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Напишите, как к вам обращаться');
    if (!EMAIL_RE.test(email.trim())) return setError('Проверьте адрес почты');
    if (!agree) return setError('Нужно согласие на обработку данных');
    setError('');
    setSending(true);
    const ok = await sendLead({
      ...antiSpam.meta(),
      name: name.trim(),
      phone: '',
      email: email.trim(),
      source: `${calc} — смета на почту`,
      summary,
    });
    setSending(false);
    if (!ok) return setError('Не удалось отправить. Попробуйте ещё раз или позвоните нам.');
    reachGoal(GOALS.ESTIMATE_EMAIL, { calc });
    setSentTo(email.trim());
  };

  if (sentTo) {
    return (
      <div className="mt-4 flex items-start gap-3 border border-primary/50 p-4 text-sm leading-[1.5] text-background/80">
        <Icon name="MailCheck" size={20} className="mt-0.5 shrink-0 text-primary" />
        <span>
          Расчёт отправлен на {sentTo}. Если письма нет — проверьте папку «Спам». Звонить без вашей
          просьбы не будем.
        </span>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-background/70 underline-offset-4 transition-colors hover:text-primary hover:underline"
      >
        <Icon name="Mail" size={16} />
        Не хотите звонков? Пришлём расчёт на почту
      </button>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative mt-4 space-y-3 border border-background/15 p-4">
      {antiSpam.field}
      <div className="text-xs uppercase tracking-[0.14em] text-background/55">Расчёт на почту</div>
      <input
        aria-label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        className={inputCls}
      />
      <input
        aria-label="Почта"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@mail.ru"
        className={inputCls}
      />
      <label className="flex cursor-pointer items-start gap-2 text-xs leading-[1.5] text-background/60">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[hsl(var(--primary))]"
        />
        <span>
          Согласен на обработку персональных данных и принимаю{' '}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-background">
            политику конфиденциальности
          </Link>
        </span>
      </label>
      {error && <p className="text-sm text-primary">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 border border-primary px-4 font-display text-base uppercase tracking-[0.04em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
      >
        <Icon name="Send" size={16} />
        {sending ? 'Отправляем…' : 'Прислать расчёт'}
      </button>
    </form>
  );
};

export default CalcEmail;
