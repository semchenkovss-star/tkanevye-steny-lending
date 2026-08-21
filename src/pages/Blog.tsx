import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Footer from '@/components/site/Footer';
import LeadDialog from '@/components/site/LeadDialog';
import FloatingCta from '@/components/site/FloatingCta';
import Seo from '@/components/Seo';
import { BLOG_POSTS } from '@/data/blog';
import { openLead } from '@/lib/lead';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Блог Полотно',
  description: 'Статьи о тканевых стенах: технология, акустика, материалы и стоимость.',
  blogPost: BLOG_POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    image: p.img,
    url: `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${p.slug}`,
  })),
};

const BlogPage = () => {
  const [lead, ...rest] = BLOG_POSTS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Блог о тканевых стенах: технология, акустика, материалы | Полотно"
        description="Как устроена тканевая стена, почему монтаж занимает один день, как убрать эхо в комнате, чем отличаются лён, рогожка и акустический фетр, из чего складывается смета."
        path="/blog"
        image={BLOG_POSTS[0].img}
        jsonLd={JSON_LD}
      />
      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl uppercase tracking-[0.16em]">
            Полотно
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="shell py-14 sm:py-16 lg:py-24">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Блог</div>
        <h1 className="mt-3 max-w-[14em] font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.5rem] lg:text-[4.5rem]">
          О тканевых стенах по делу
        </h1>
        <p className="mt-6 max-w-[38em] text-base leading-[1.6] text-muted-foreground">
          Технология, акустика, материалы и деньги — без маркетинговой воды, на основе своих
          объектов.
        </p>

        <Link
          to={`/blog/${lead.slug}`}
          className="group mt-14 grid gap-0 border border-border transition-colors hover:border-primary lg:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img
              src={lead.img}
              alt={lead.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-primary">{lead.tag}</span>
              <span>{lead.dateLabel}</span>
              <span>{lead.readTime}</span>
            </div>
            <h2 className="mt-5 font-display text-[2rem] uppercase leading-[1.02] tracking-wide sm:text-[2.5rem]">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-[32em] text-base leading-[1.6] text-muted-foreground">
              {lead.excerpt}
            </p>
            <span className="mt-8 flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-primary">
              Читать статью
              <Icon name="ArrowRight" size={16} />
            </span>
          </div>
        </Link>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group flex flex-col border border-border transition-colors hover:border-primary"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="text-primary">{p.tag}</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.5rem] uppercase leading-[1.05] tracking-wide">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{p.excerpt}</p>
                <span className="mt-6 flex items-center gap-2 text-sm transition-colors group-hover:text-primary">
                  Читать
                  <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border border-border bg-secondary p-8 sm:flex-row sm:items-center sm:justify-between lg:p-12">
          <div>
            <h2 className="font-display text-[2rem] uppercase leading-[1.02] tracking-wide">
              Остались вопросы по вашей стене?
            </h2>
            <p className="mt-3 max-w-[34em] text-sm leading-[1.6] text-muted-foreground">
              Замерщик приедет с образцами тканей, посчитает бюджет и пришлёт смету в течение 24
              часов. Бесплатно.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openLead('Блог')}
            className="whitespace-nowrap bg-primary px-7 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Бесплатный замер
          </button>
        </div>
      </main>

      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default BlogPage;