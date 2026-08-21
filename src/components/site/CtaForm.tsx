import Icon from '@/components/ui/icon';
import LeadForm from '@/components/site/LeadForm';
import useReveal from '@/hooks/use-reveal';

const PROMISES = [
  'Замерщик приезжает бесплатно, даже если вы потом откажетесь',
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
        className={`relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28 ${
          shown ? 'animate-rise' : 'opacity-0'
        }`}
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-display text-sm tracking-[0.2em] text-primary">11</span>
            <h2 className="mt-4 max-w-[12em] font-display text-[2.5rem] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.25rem]">
              Бесплатный замер и смета за 24 часа
            </h2>
            <ul className="mt-8 space-y-4">
              {PROMISES.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem] leading-[1.55]">
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-border bg-card p-8 lg:p-10">
              <LeadForm source="Форма внизу" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaForm;