import { Link } from 'react-router-dom';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';

const FACTS = [
  {
    icon: 'Flame',
    title: 'Не горит',
    text: 'Слабогорючие Г1 и трудновоспламеняемые материалы по ГОСТ. Соответствуют 123-ФЗ — документы примут при сдаче общественного помещения.',
  },
  {
    icon: 'Baby',
    title: 'Разрешено для детских и медицинских учреждений',
    text: 'Санитарная экспертиза подтвердила: формальдегид и летучие вещества — ниже порога обнаружения, ткань не электризуется и выдерживает влажную дезинфекцию.',
  },
  {
    icon: 'Sun',
    title: 'Не выцветает',
    text: 'Стойкость окраски к свету, влаге и трению — 5 из 5 баллов при норме 3. Цвет остаётся прежним, даже если стена на солнечной стороне.',
  },
];

const Certificates = () => (
  <Section
    id="certificates"
    index="06"
    eyebrow="Документы"
    title={<>Материалы с сертификатами</>}
    lead="Не на словах: каждое свойство подтверждено протоколами испытаний независимых лабораторий."
    tone="default"
  >
    <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
      {FACTS.map((f) => (
        <article key={f.title} className="bg-background p-6 sm:p-7">
          <Icon name={f.icon} size={26} className="text-primary" />
          <h3 className="mt-4 font-display text-xl uppercase leading-[1.1] tracking-wide text-foreground">
            {f.title}
          </h3>
          <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{f.text}</p>
        </article>
      ))}
    </div>

    <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-[34em] text-sm leading-[1.6] text-muted-foreground">
        Заверенные копии передаём на объект по запросу — их часто запрашивают управляющие компании
        и пожарная инспекция.
      </p>
      <Link
        to="/documents"
        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 bg-foreground px-6 py-3 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <Icon name="FileCheck2" size={18} />
        Смотреть сертификаты
      </Link>
    </div>
  </Section>
);

export default Certificates;
