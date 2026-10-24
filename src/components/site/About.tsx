import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { openLead } from '@/lib/lead';

const HELP = [
  { icon: 'Calculator', label: 'Составление смет' },
  { icon: 'PenTool', label: 'Разработка дизайна' },
  { icon: 'ClipboardCheck', label: 'Оформление заказа' },
  { icon: 'Truck', label: 'Доставка и монтаж' },
];

const FACTS = [
  { icon: 'Factory', title: 'Свой раскрой', text: 'Полотно режем на собственном участке — без посредников и лишней недели ожидания.' },
  { icon: 'Users', title: 'Штатные бригады', text: 'Не подряд с биржи: те же монтажники приезжают и на гарантийное обслуживание.' },
  { icon: 'FileText', title: 'Договор и фикс-цена', text: 'Смета после замера фиксируется. Доплат «по факту» в договоре не предусмотрено.' },
  {
    icon: 'Truck',
    title: 'Работаем по России',
    text: 'Выезд замерщика по Москве и области. Партнерская сеть монтажных компаний в регионах РФ.',
  },
];

const About = () => {
  return (
    <Section
      id="about"
      index="11"
      eyebrow="О компании"
      title={
        <>
          Тканевые стены и потолки
          <br />с 2016 года
        </>
      }
      lead="Мы делаем только натяжные тканевые стены и потолки. Не берём общестрой, не разводим бригады по объектам — за счёт этого держим срок в один-два дня и отвечаем за результат."
      tone="dark"
    >
      <div className="mb-16 grid gap-10 border-t border-background/15 pt-12 lg:mb-20 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <span className="font-display text-sm uppercase tracking-[0.2em] text-primary">
            Команда FabricWall
          </span>
          <ul className="mt-6 space-y-px border border-background/15 bg-background/15 lg:max-w-[20rem]">
            {HELP.map((h) => (
              <li key={h.label} className="flex items-center gap-4 bg-foreground px-5 py-4">
                <Icon name={h.icon} fallback="Check" size={20} className="shrink-0 text-primary" />
                <span className="text-[0.95rem] text-background/85">{h.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-8">
          <p className="max-w-[30em] font-display text-[clamp(1.4rem,4.5vw,1.75rem)] uppercase leading-[1.15] tracking-wide text-background sm:text-[2rem]">
            Мы предоставляем инновационные продукты и услуги для проектно-строительного
            сообщества, создавая индивидуальные решения для уникальных задач.
          </p>
          <div className="mt-8 grid gap-6 text-[0.95rem] leading-[1.65] text-background/65 md:grid-cols-2 md:gap-10">
            <p>
              Руководствуясь стремлением к совершенству, мы имеем возможность оказывать поддержку
              нашим клиентам и партнерам, выстраивая долгосрочные отношения. Наша опытная команда
              готова сопровождать вас на каждом этапе оформления заказа.
            </p>
            <p>
              Команда FabricWall обладает необходимыми знаниями для помощи в составлении смет,
              разработке дизайна, оформлении заказов, доставке и многом другом. Пожалуйста,
              свяжитесь с нами и мы окажем вам любую необходимую помощь!
            </p>
          </div>
          <button
            type="button"
            onClick={() => openLead('О компании')}
            className="mt-10 inline-flex items-center gap-3 bg-primary px-7 py-4 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Связаться с нами
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>

      <div className="grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f) => (
          <article key={f.title} className="bg-foreground p-8">
            <Icon name={f.icon} fallback="Building2" size={26} className="text-primary" />
            <h3 className="mt-6 font-display text-2xl uppercase leading-none tracking-wide text-background">
              {f.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.6] text-background/60">{f.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default About;