import Icon from '@/components/ui/icon';
import type { CertDoc } from '@/data/documents';

const block = (e: React.SyntheticEvent) => {
  e.preventDefault();
  return false;
};

const CertCard = ({ doc }: { doc: CertDoc }) => (
  <article className="flex flex-col gap-6 border border-border bg-background p-5 sm:flex-row sm:p-7">
    <div
      className="relative mx-auto w-[210px] shrink-0 select-none overflow-hidden border border-border bg-secondary sm:mx-0"
      onContextMenu={block}
      onDragStart={block}
    >
      <div
        role="img"
        aria-label={doc.title}
        className="aspect-[680/960] w-full bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${doc.img})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
      <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground/75 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-background">
        Оригинал по запросу
      </span>
    </div>

    <div className="min-w-0 flex-1">
      <h3 className="font-display text-xl uppercase leading-[1.1] tracking-wide text-foreground sm:text-2xl">
        {doc.title}
      </h3>

      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-muted-foreground">Номер:</dt>
          <dd className="font-medium text-foreground">{doc.number}</dd>
        </div>
        {doc.validUntil && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-muted-foreground">Действует до:</dt>
            <dd className="font-medium text-foreground">{doc.validUntil}</dd>
          </div>
        )}
        {doc.issued && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-muted-foreground">Дата выдачи:</dt>
            <dd className="font-medium text-foreground">{doc.issued}</dd>
          </div>
        )}
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-muted-foreground">Кем выдан:</dt>
          <dd className="text-foreground">{doc.issuer}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm leading-[1.6] text-muted-foreground">{doc.summary}</p>

      <ul className="mt-4 space-y-2">
        {doc.facts.map((f) => (
          <li key={f} className="flex gap-2 text-sm leading-[1.5] text-foreground">
            <Icon name="ShieldCheck" size={16} className="mt-0.5 shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  </article>
);

export default CertCard;