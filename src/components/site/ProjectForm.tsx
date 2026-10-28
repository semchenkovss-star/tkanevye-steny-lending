import { ChangeEvent, DragEvent, FormEvent, ReactNode, useRef, useState } from 'react';
import { Link } from '@/lib/router-compat';
import Icon from '@/components/ui/icon';
import PhoneInput from '@/components/ui/phone-input';
import Section from '@/components/site/Section';
import { isPhoneValid, sendLead } from '@/lib/lead';
import { FILE_ACCEPT, MAX_FILES, MAX_FILE_MB, uploadProjectFile } from '@/lib/projectFiles';

type Status = 'wait' | 'loading' | 'done' | 'error';

interface Item {
  id: string;
  file: File;
  status: Status;
  progress: number;
  url?: string;
  error?: string;
}

interface Errors {
  name?: string;
  phone?: string;
  files?: string;
  agree?: string;
}

const DEFAULT_TYPES = ['Квартира', 'Дом', 'Офис', 'Ресторан или кафе', 'Отель', 'Другое'];

interface ProjectFormProps {
  index?: string;
  source?: string;
  title?: ReactNode;
  lead?: string;
  objectTypes?: string[];
  companyLabel?: string;
  commentPlaceholder?: string;
  areaLabel?: string;
  areaPlaceholder?: string;
}

const ALLOWED = FILE_ACCEPT.split(',');

const sizeLabel = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} МБ` : `${Math.max(1, Math.round(bytes / 1024))} КБ`;

const fieldCls = (bad?: string) =>
  `h-14 w-full border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
    bad ? 'border-destructive' : 'border-border'
  }`;

const ProjectForm = ({
  index,
  source = 'Дизайнерам — заявка с проектом',
  title = <>Пришлите план или чертёж объекта</>,
  lead = 'Приложите планировку, развёртки стен или рабочий проект — посчитаем текстиль по чертежам и пришлём предварительную смету ещё до выезда на объект.',
  objectTypes = DEFAULT_TYPES,
  companyLabel = 'Студия или компания',
  commentPlaceholder = 'Какие стены, ткань или узлы нужны, сроки объекта',
  areaLabel,
  areaPlaceholder = 'Например, 45',
}: ProjectFormProps) => {
  const OBJECT_TYPES = objectTypes;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [objectType, setObjectType] = useState(OBJECT_TYPES[0]);
  const [area, setArea] = useState('');
  const [comment, setComment] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [drag, setDrag] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patch = (id: string, p: Partial<Item>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...p } : i)));

  const upload = async (item: Item) => {
    patch(item.id, { status: 'loading', progress: 0, error: undefined });
    try {
      const res = await uploadProjectFile(item.file, (p) => patch(item.id, { progress: p }));
      patch(item.id, { status: 'done', progress: 1, url: res.url });
    } catch (e) {
      patch(item.id, { status: 'error', error: e instanceof Error ? e.message : 'Ошибка загрузки' });
    }
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const room = MAX_FILES - items.length;
    const picked = Array.from(list);
    let note: string | undefined;
    if (picked.length > room) note = `Можно прикрепить до ${MAX_FILES} файлов`;
    const fresh: Item[] = [];
    for (const file of picked.slice(0, Math.max(0, room))) {
      const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
      if (!ALLOWED.includes(ext)) {
        note = `Формат ${ext} не подходит — пришлите PDF, DWG, изображение или архив`;
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        note = `«${file.name}» больше ${MAX_FILE_MB} МБ — заархивируйте или пришлите ссылкой в комментарии`;
        continue;
      }
      fresh.push({ id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`, file, status: 'wait', progress: 0 });
    }
    setErrors((p) => ({ ...p, files: note }));
    if (!fresh.length) return;
    setItems((prev) => [...prev, ...fresh]);
    fresh.forEach(upload);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    addFiles(e.dataTransfer.files);
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const busy = items.some((i) => i.status === 'loading' || i.status === 'wait');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Напишите, как к вам обращаться';
    if (!isPhoneValid(phone)) next.phone = 'Нужен полный номер телефона';
    if (!agree) next.agree = 'Без согласия мы не можем принять заявку';
    if (items.some((i) => i.status === 'error')) next.files = 'Удалите или загрузите заново файлы с ошибкой';
    setErrors(next);
    if (Object.keys(next).length || busy) return;

    const files = items
      .filter((i) => i.status === 'done' && i.url)
      .map((i) => ({ name: i.file.name, url: i.url as string, size: i.file.size }));

    setSending(true);
    const ok = await sendLead({
      name: name.trim(),
      phone,
      source,
      summary: [
        `Объект: ${objectType}`,
        area.trim() ? (areaLabel ? `размеры: ${area.trim()}` : `площадь стен ${area.trim()} м²`) : '',
        company.trim() ? `${companyLabel.toLowerCase()}: ${company.trim()}` : '',
      ]
        .filter(Boolean)
        .join(', '),
      comment: comment.trim(),
      files,
    });
    setSending(false);
    if (!ok) {
      setFailed(true);
      return;
    }
    setFailed(false);
    setSent(true);
  };

  return (
    <Section
      id="project-form"
      index={index}
      eyebrow="Расчёт по проекту"
      title={title}
      lead={lead}
    >
      {sent ? (
        <div className="flex max-w-[44em] flex-col items-start gap-4 border border-primary bg-card p-8 lg:p-10">
          <Icon name="CircleCheck" size={34} className="text-primary-ink" />
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide">Проект получен</h3>
          <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">
            {name.trim()}, спасибо. Менеджер изучит{' '}
            {items.length ? 'файлы' : 'заявку'} и перезвонит на {phone} в рабочее время, чтобы
            уточнить детали и согласовать расчёт.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-px border border-border bg-border lg:grid-cols-12">
          <div className="bg-card p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="pf-name" className="mb-2 block text-sm text-muted-foreground">
                  Как вас зовут
                </label>
                <input
                  id="pf-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Имя"
                  className={fieldCls(errors.name)}
                />
                {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="pf-phone" className="mb-2 block text-sm text-muted-foreground">
                  Телефон
                </label>
                <PhoneInput
                  id="pf-phone"
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                    if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  className={fieldCls(errors.phone)}
                />
                {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="pf-company" className="mb-2 block text-sm text-muted-foreground">
                  {companyLabel} <span className="text-muted-foreground/70">— необязательно</span>
                </label>
                <input
                  id="pf-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Название"
                  className={fieldCls()}
                />
              </div>
              <div>
                <label htmlFor="pf-area" className="mb-2 block text-sm text-muted-foreground">
                  {areaLabel ?? 'Площадь стен, м²'} <span className="text-muted-foreground/70">— если знаете</span>
                </label>
                <input
                  id="pf-area"
                  inputMode={areaLabel ? 'text' : 'decimal'}
                  value={area}
                  onChange={(e) =>
                    setArea(areaLabel ? e.target.value.slice(0, 80) : e.target.value.replace(/[^\d.,]/g, '').slice(0, 8))
                  }
                  placeholder={areaPlaceholder}
                  className={fieldCls()}
                />
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-2 block text-sm text-muted-foreground">Тип объекта</legend>
              <div className="flex flex-wrap gap-2">
                {OBJECT_TYPES.map((t) => {
                  const active = objectType === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setObjectType(t)}
                      aria-pressed={active}
                      className={`min-h-[44px] border px-4 py-2 text-sm transition-colors ${
                        active
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <label htmlFor="pf-comment" className="mb-2 block text-sm text-muted-foreground">
                Комментарий к проекту
              </label>
              <textarea
                id="pf-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 2000))}
                rows={4}
                placeholder={commentPlaceholder}
                className="w-full resize-y border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col bg-card p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div className="mb-2 text-sm text-muted-foreground">План, чертёж или проект</div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors ${
                drag ? 'border-primary bg-primary/5' : errors.files ? 'border-destructive' : 'border-border hover:border-primary'
              } ${items.length >= MAX_FILES ? 'pointer-events-none opacity-50' : ''}`}
            >
              <Icon name="FileUp" size={30} className="text-primary-ink" />
              <span className="font-display text-lg uppercase tracking-[0.03em] text-foreground">
                Перетащите файлы или выберите
              </span>
              <span className="text-xs leading-[1.5] text-muted-foreground">
                PDF, DWG, DXF, JPG, PNG, архивы · до {MAX_FILES} файлов по {MAX_FILE_MB} МБ
              </span>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={FILE_ACCEPT}
                onChange={onPick}
                className="hidden"
              />
            </div>
            {errors.files && <p className="mt-2 text-sm text-destructive">{errors.files}</p>}

            {items.length > 0 && (
              <ul className="mt-4 space-y-2">
                {items.map((i) => (
                  <li key={i.id} className="border border-border bg-background p-3">
                    <div className="flex items-center gap-3">
                      <Icon
                        name={i.status === 'done' ? 'FileCheck2' : i.status === 'error' ? 'FileX2' : 'FileClock'}
                        size={20}
                        className={i.status === 'error' ? 'shrink-0 text-destructive' : 'shrink-0 text-primary-ink'}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm text-foreground">{i.file.name}</div>
                        <div className={`text-xs ${i.status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {i.status === 'error'
                            ? i.error
                            : i.status === 'done'
                              ? `${sizeLabel(i.file.size)} · загружен`
                              : `${sizeLabel(i.file.size)} · загружаем ${Math.round(i.progress * 100)}%`}
                        </div>
                      </div>
                      {i.status === 'error' && (
                        <button
                          type="button"
                          onClick={() => upload(i)}
                          aria-label="Загрузить заново"
                          className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Icon name="RotateCw" size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => remove(i.id)}
                        aria-label="Убрать файл"
                        className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    {i.status === 'loading' && (
                      <div className="mt-2 h-1 w-full bg-border">
                        <div className="h-full bg-primary transition-all" style={{ width: `${Math.round(i.progress * 100)}%` }} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto pt-8">
              <label htmlFor="pf-agree" className="flex cursor-pointer items-start gap-3 text-xs leading-[1.55] text-muted-foreground">
                <input
                  id="pf-agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    if (errors.agree) setErrors((p) => ({ ...p, agree: undefined }));
                  }}
                  aria-invalid={Boolean(errors.agree)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[hsl(var(--primary))]"
                />
                <span>
                  Я согласен на обработку персональных данных и принимаю{' '}
                  <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
                    политику конфиденциальности
                  </Link>
                  . Файлы видит только наш менеджер.
                </span>
              </label>
              {errors.agree && <p className="mt-2 text-sm text-destructive">{errors.agree}</p>}

              <button
                type="submit"
                disabled={!agree || sending || busy}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-primary px-8 py-4 font-display text-xl uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                <Icon name="Send" size={18} />
                {sending ? 'Отправляем…' : busy ? 'Загружаем файлы…' : 'Отправить проект'}
              </button>
              {failed && (
                <p className="mt-3 text-sm text-destructive">
                  Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
                </p>
              )}
            </div>
          </div>
        </form>
      )}
    </Section>
  );
};

export default ProjectForm;
