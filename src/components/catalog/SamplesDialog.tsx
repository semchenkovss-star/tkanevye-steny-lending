import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { CATALOG } from '@/data/catalog';
import { formatPhone, isPhoneValid, sendLead } from '@/lib/lead';
import { SAMPLES_EVENT, SAMPLES_LIMIT } from '@/lib/samples';

interface Errors {
  picked?: string;
  name?: string;
  phone?: string;
  address?: string;
  agree?: string;
}

const SamplesDialog = () => {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<{ slug?: string }>).detail?.slug;
      setSent(false);
      setErrors({});
      setQuery('');
      if (slug) setPicked((p) => (p.includes(slug) ? p : [...p, slug].slice(0, SAMPLES_LIMIT)));
      setOpen(true);
    };
    window.addEventListener(SAMPLES_EVENT, handler);
    return () => window.removeEventListener(SAMPLES_EVENT, handler);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [open]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.colorName.toLowerCase().includes(q) ||
        i.material.toLowerCase().includes(q),
    );
  }, [query]);

  if (!open) return null;

  const toggle = (slug: string) => {
    setErrors((p) => ({ ...p, picked: undefined }));
    setPicked((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= SAMPLES_LIMIT) return prev;
      return [...prev, slug];
    });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (picked.length === 0) next.picked = 'Выберите хотя бы один оттенок';
    if (name.trim().length < 2) next.name = 'Напишите, как к вам обращаться';
    if (!isPhoneValid(phone)) next.phone = 'Нужен полный номер телефона';
    if (address.trim().length < 8) next.address = 'Укажите город, улицу, дом и квартиру';
    if (!agree) next.agree = 'Без согласия мы не можем принять заявку';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    const ok = await sendLead({
      name: name.trim(),
      phone,
      source: 'Каталог — заказ образцов',
      address: address.trim(),
      comment: comment.trim(),
      samples: picked.map((s) => CATALOG.find((i) => i.slug === s)?.name ?? s),
    });
    setSending(false);
    if (!ok) {
      setFailed(true);
      return;
    }
    setFailed(false);
    setSent(true);
  };

  const close = () => setOpen(false);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Заказ образцов ткани"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-[720px] flex-col border border-border bg-card animate-scale-in"
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={close}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-card text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="flex flex-col items-start gap-4 p-8 sm:p-10">
            <Icon name="CircleCheck" size={34} className="text-primary-ink" />
            <h3 className="font-display text-3xl uppercase leading-none tracking-wide">
              Образцы в пути
            </h3>
            <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">
              {name.trim()}, спасибо. Отправим {picked.length}{' '}
              {picked.length === 1 ? 'образец' : picked.length < 5 ? 'образца' : 'образцов'} по
              адресу: {address.trim()}. Перед отправкой позвоним на {phone} и уточним детали.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 bg-primary px-6 py-3.5 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex min-h-0 flex-col">
            <div className="border-b border-border p-7 pb-6 sm:p-9 sm:pb-6">
              <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Каталог
              </span>
              <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
                Образцы ткани домой
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.6] text-muted-foreground">
                Выберите до {SAMPLES_LIMIT} оттенков — привезём кусочки полотна, чтобы посмотреть
                цвет при своём освещении.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Выбрано{' '}
                  <b className="text-foreground">
                    {picked.length} из {SAMPLES_LIMIT}
                  </b>
                </span>
                <div className="relative">
                  <Icon
                    name="Search"
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Поиск по названию"
                    className="h-11 w-full border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary sm:w-56"
                  />
                </div>
              </div>

              {errors.picked && <p className="mt-3 text-sm text-destructive">{errors.picked}</p>}

              <div className="mt-4 grid max-h-[46vh] gap-px overflow-y-auto border border-border bg-border sm:grid-cols-2">
                {list.map((i) => {
                  const active = picked.includes(i.slug);
                  const disabled = !active && picked.length >= SAMPLES_LIMIT;
                  return (
                    <button
                      key={i.slug}
                      type="button"
                      onClick={() => toggle(i.slug)}
                      disabled={disabled}
                      className={`flex items-center gap-3 p-3 text-left transition-colors ${
                        active ? 'bg-secondary' : 'bg-card hover:bg-secondary'
                      } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                    >
                      <img
                        src={i.img}
                        alt={`Образец ткани ${i.name} — ${i.material}, цвет ${i.colorName}`}
                        loading="lazy"
                        className="h-12 w-12 shrink-0 object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base uppercase tracking-wide">
                          {i.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {i.colorName} · {i.material}
                        </span>
                      </span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center border ${
                          active
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-transparent'
                        }`}
                      >
                        <Icon name="Check" size={14} />
                      </span>
                    </button>
                  );
                })}
                {list.length === 0 && (
                  <p className="bg-card p-6 text-sm text-muted-foreground sm:col-span-2">
                    Ничего не нашлось — попробуйте другое название.
                  </p>
                )}
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="sm-name" className="mb-2 block text-sm text-muted-foreground">
                    Как вас зовут
                  </label>
                  <input
                    id="sm-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder="Имя"
                    className={`h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
                      errors.name ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="sm-phone" className="mb-2 block text-sm text-muted-foreground">
                    Телефон
                  </label>
                  <input
                    id="sm-phone"
                    inputMode="tel"
                    value={phone}
                    onFocus={() => {
                      if (!phone) setPhone('+7 (');
                    }}
                    onChange={(e) => {
                      setPhone(formatPhone(e.target.value));
                      setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    placeholder="+7 (___) ___-__-__"
                    className={`h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="sm-address" className="mb-2 block text-sm text-muted-foreground">
                    Адрес доставки
                  </label>
                  <input
                    id="sm-address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((p) => ({ ...p, address: undefined }));
                    }}
                    placeholder="Город, улица, дом, квартира"
                    className={`h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
                      errors.address ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="sm-comment" className="mb-2 block text-sm text-muted-foreground">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    id="sm-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                    placeholder="Домофон, удобное время, этаж"
                    className="w-full resize-none border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="sm-agree"
                  className="flex cursor-pointer items-start gap-3 text-xs leading-[1.55] text-muted-foreground"
                >
                  <input
                    id="sm-agree"
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                      setAgree(e.target.checked);
                      setErrors((p) => ({ ...p, agree: undefined }));
                    }}
                    aria-invalid={Boolean(errors.agree)}
                    className={`mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none border bg-card transition-colors checked:border-primary checked:bg-primary ${
                      errors.agree ? 'border-destructive' : 'border-border'
                    } bg-[length:14px_14px] bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%2220 6 9 17 4 12%22/></svg>')]`}
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
                    .
                  </span>
                </label>
                {errors.agree && <p className="mt-2 text-sm text-destructive">{errors.agree}</p>}
              </div>
            </div>

            <div className="border-t border-border bg-card p-5 sm:px-9 sm:py-6">
              <button
                type="submit"
                disabled={!agree || sending}
                className="w-full bg-primary px-8 py-4 font-display text-xl uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:bg-muted"
              >
                {sending ? 'Отправляем…' : 'Заказать образцы'}
              </button>
              {failed && (
                <p className="mt-3 text-sm text-destructive">
                  Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SamplesDialog;