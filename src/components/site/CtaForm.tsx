import Icon from '@/components/ui/icon';
import LeadForm from '@/components/site/LeadForm';
import useReveal from '@/hooks/use-reveal';
import { PHONE_DISPLAY, PHONE_HREF, WORK_HOURS } from '@/lib/contacts';

const PROMISES = [
  'Замерщик приезжает, даже если вы потом откажетесь',
  'Смета с фиксированной ценой — в течение 24 часов',
  'Образцы тканей привозим с собой, смотрите при своём свете',
  'Без навязчивых звонков: один разговор и письмо со сметой',
];

const CtaForm = () => {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section id="lead" ref={ref} className="relative w-full overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="weave-panel absolute inset-y-0 right-0 hidden w-[5%] overflow-hidden lg:block"
      />

      <div
        className={`relative z-10 shell py-16 sm:py-20 lg:py-28 ${
          shown ? 'animate-rise' : 'opacity-0'
        }`}
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-display text-sm tracking-[0.2em] text-primary">13</span>
            <h2 className="mt-4 max-w-[12em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.25rem]">
              Замер и смета за 24 часа
            </h2>
            <ul className="mt-8 space-y-4">
              {PROMISES.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem] leading-[1.55]">
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-6">
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Или просто позвоните
              </div>
              <a
                href={PHONE_HREF}
                className="mt-3 flex items-center gap-3 font-display text-[2rem] uppercase leading-none tracking-[0.01em] text-foreground transition-colors hover:text-primary sm:text-[2.5rem]"
              >
                <Icon name="Phone" size={26} className="text-primary" />
                {PHONE_DISPLAY}
              </a>
              <p className="mt-3 text-sm text-muted-foreground">{WORK_HOURS}</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-border bg-card p-6 sm:p-8 lg:p-10">
              <LeadForm source="Форма внизу" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaForm;