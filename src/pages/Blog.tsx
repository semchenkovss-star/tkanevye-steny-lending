import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import CalcButton from '@/components/site/CalcButton';
import Footer from '@/components/site/Footer';
import LeadDialog from '@/components/site/LeadDialog';
import FloatingCta from '@/components/site/FloatingCta';
import Seo from '@/components/Seo';
import SiteSwitch from '@/components/site/SiteSwitch';
import { BLOG_POSTS, BLOG_TOPICS, BlogTopicId, postsByTopic } from '@/data/blog';
import { breadcrumbsLd, organizationLd, websiteLd } from '@/lib/schema';
import { openLead } from '@/lib/lead';
import Logo from '@/components/site/Logo';

const buildJsonLd = () => {
  const origin = window.location.origin;
  return [
    organizationLd(),
    websiteLd(),
    breadcrumbsLd([{ name: 'Блог', path: '/blog' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${origin}/blog#blog`,
      name: 'Блог о тканевых стенах и потолках',
      description:
        'Статьи о тканевых стенах, натяжных потолках и акустике: технология, материалы и стоимость.',
      url: `${origin}/blog`,
      inLanguage: 'ru-RU',
      publisher: { '@id': `${origin}/#organization` },
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.seoTitle ?? p.title,
        description: p.excerpt,
        datePublished: p.date,
        image: p.img.startsWith('http') ? p.img : origin + p.img,
        url: `${origin}/blog/${p.slug}`,
        author: { '@id': `${origin}/#organization` },
      })),
    },
  ];
};

const BlogPage = () => {
  const [topic, setTopic] = useState<BlogTopicId>('all');
  const posts = postsByTopic(topic);
  const [lead, ...rest] = posts;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Блог: тканевые стены, потолки и акустика | Fabric Wall"
        description="Как устроена тканевая стена и натяжной потолок, как убрать эхо, чем отличаются ткани и из чего складывается смета — статьи по делу."
        path="/blog"
        image={BLOG_POSTS[0].img}
        jsonLd={buildJsonLd()}
      />
      <SiteSwitch />
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

      <main className="shell py-14 sm:py-16 lg:py-24">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Блог</div>
        <h1 className="mt-3 max-w-[14em] font-display text-[clamp(2.1rem,8vw,2.75rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.5rem] lg:text-[4.5rem]">
          О тканевых стенах по делу
        </h1>
        <p className="mt-6 max-w-[38em] text-base leading-[1.6] text-muted-foreground">
          Технология, акустика, материалы и деньги — без маркетинговой воды, на основе своих
          объектов.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {BLOG_TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopic(t.id)}
              className={`border px-5 py-3 font-display text-base uppercase tracking-[0.06em] transition-colors ${
                topic === t.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary'
              }`}
            >
              {t.label}
              <span className="ml-2 text-xs opacity-60">{postsByTopic(t.id).length}</span>
            </button>
          ))}
        </div>

        <Link
          to={`/blog/${lead.slug}`}
          className="group mt-10 grid gap-0 border border-border transition-colors hover:border-primary lg:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img
              src={lead.img}
              alt={`${lead.title} — главная статья блога о тканевых стенах и потолках`}
              fetchPriority="high"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-primary-ink">{lead.tag}</span>
              <span>{lead.dateLabel}</span>
              <span>{lead.readTime}</span>
            </div>
            <h2 className="mt-5 font-display text-[2rem] uppercase leading-[1.02] tracking-wide sm:text-[2.5rem]">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-[32em] text-base leading-[1.6] text-muted-foreground">
              {lead.excerpt}
            </p>
            <span className="mt-8 flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-primary-ink">
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
                  alt={`${p.title} — статья о тканевых стенах, потолках и акустике`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="text-primary-ink">{p.tag}</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.5rem] uppercase leading-[1.05] tracking-wide">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{p.excerpt}</p>
                <span className="mt-6 flex items-center gap-2 text-sm transition-colors group-hover:text-primary-ink">
                  Читать
                  <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-8 border border-border bg-secondary p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <h2 className="font-display text-[2rem] uppercase leading-[1.02] tracking-wide">
              Остались вопросы по вашей стене?
            </h2>
            <p className="mt-3 max-w-[34em] text-sm leading-[1.6] text-muted-foreground">
              Замерщик приедет с образцами тканей, замерит шум и кривизну стены, посчитает бюджет и
              пришлёт смету в течение 24 часов. Замер бесплатный, даже если вы потом откажетесь.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openLead('Блог')}
              className="whitespace-nowrap bg-primary px-7 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Записаться на замер
            </button>
            <Link
              to="/catalog"
              className="flex items-center justify-center gap-2 whitespace-nowrap border border-border bg-card px-7 py-4 font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Каталог тканей
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default BlogPage;