import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { SOCIALS } from '@/lib/contacts';
import { GOALS, reachGoal } from '@/lib/metrika';

const CHANNELS = SOCIALS.filter((s) => s.id === 'telegram' || s.id === 'max');

interface Props {
  calc: string;
  summary: string;
}

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const CalcMessengers = ({ calc, summary }: Props) => {
  const [copied, setCopied] = useState(false);

  const send = async (channel: (typeof CHANNELS)[number]) => {
    const text = `Здравствуйте! Хочу смету. ${calc}: ${summary}. Страница: ${window.location.href}`;
    const ok = await copyText(text);
    setCopied(ok);
    reachGoal(GOALS.MESSENGER_CLICK, { channel: channel.label, place: calc });
    window.open(channel.href, '_blank', 'noopener');
  };

  return (
    <div className="mt-4">
      <div className="text-xs uppercase tracking-[0.14em] text-background/55">
        Или отправьте расчёт в мессенджер
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => send(c)}
            className="flex min-h-[48px] items-center justify-center gap-2 border border-background/25 px-4 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:border-primary hover:text-primary"
          >
            <Icon name={c.id === 'telegram' ? 'Send' : 'MessageCircle'} size={18} />
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs leading-[1.5] text-background/55" aria-live="polite">
        {copied
          ? 'Расчёт скопирован — вставьте его в чат, и менеджер ответит со сметой.'
          : 'Расчёт скопируется автоматически — останется вставить его в чат.'}
      </p>
    </div>
  );
};

export default CalcMessengers;
