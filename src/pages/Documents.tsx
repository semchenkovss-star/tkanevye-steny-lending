import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Seo from '@/components/Seo';
import Logo from '@/components/site/Logo';
import CalcButton from '@/components/site/CalcButton';
import Footer from '@/components/site/Footer';
import CertCard from '@/components/docs/CertCard';
import { CERT_DOCS, DOC_GROUPS } from '@/data/documents';
import { breadcrumbsLd } from '@/lib/schema';
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '@/lib/contacts';

const DocumentsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Сертификаты на ткани и полотна: пожарная и санитарная безопасность | Fabric Wall"
        description="Сертификаты на архитектурный текстиль и полотна Descor: пожарная безопасность Г1, санитарное заключение для детских и медицинских учреждений, стойкость окраски 5 из 5."
        path="/documents"
        keywords="сертификат пожарной безопасности ткань, сертификат descor, санитарное заключение ткань, трудновоспламеняемая ткань, документы на материалы"
        jsonLd={[breadcrumbsLd([{ name: 'Документы и сертификаты', path: '/documents' }])]}
      />

      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Logo to="/" size="sm" />
          <div className="flex items-center gap-3">
            <CalcButton className="hidden sm:flex" />
            <Link
              to="/"
              className="-my-2 flex min-h-[44px] items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={16} />
              На главную
            </Link>
          </div>
        </div>
      </header>

      <main className="shell py-14 sm:py-16 lg:py-20">
        <span className="font-display text-sm tracking-[0.2em] text-primary-ink">Документы</span>
        <h1 className="mt-3 max-w-[15em] font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] sm:text-[3.5rem] lg:text-[4rem]">
          Сертификаты на материалы
        </h1>
        <p className="mt-6 max-w-[42em] text-base leading-[1.6] text-muted-foreground">
          Работаем только с сертифицированными материалами: ткани и полотна прошли испытания на
          пожарную безопасность, санитарную безопасность и стойкость. Ниже — действующие документы
          с номерами и датами. Заверенные копии передаём на объект по запросу — они часто нужны для
          сдачи помещения.
        </p>

        <div className="mt-12 space-y-14 lg:mt-16">
          {DOC_GROUPS.map((g) => (
            <section key={g.id}>
              <h2 className="font-display text-2xl uppercase leading-[1.05] tracking-wide text-foreground sm:text-3xl">
                {g.title}
              </h2>
              <p className="mt-3 max-w-[44em] text-sm leading-[1.6] text-muted-foreground">
                {g.lead}
              </p>
              <div className="mt-6 grid gap-5">
                {CERT_DOCS.filter((d) => d.group === g.id).map((doc) => (
                  <CertCard key={doc.id} doc={doc} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 border border-border bg-secondary p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase leading-none tracking-wide text-foreground">
            Нужны заверенные копии?
          </h2>
          <p className="mt-3 max-w-[40em] text-sm leading-[1.6] text-muted-foreground">
            Для сдачи объекта, согласования с управляющей компанией или пожарной инспекцией выдаём
            копии с печатью. Напишите, какой документ нужен, и мы подготовим пакет к монтажу.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-foreground px-5 py-3 font-display text-base uppercase tracking-[0.04em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Icon name="Phone" size={16} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-border px-5 py-3 font-display text-base uppercase tracking-[0.04em] text-foreground transition-colors hover:border-foreground"
            >
              <Icon name="Mail" size={16} />
              {EMAIL}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentsPage;