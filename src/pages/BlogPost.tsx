import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import CalcButton from '@/components/site/CalcButton';
import Footer from '@/components/site/Footer';
import LeadDialog from '@/components/site/LeadDialog';
import FloatingCta from '@/components/site/FloatingCta';
import Seo from '@/components/Seo';
import SiteSwitch from '@/components/site/SiteSwitch';
import { BLOG_POSTS, getPost } from '@/data/blog';
import { breadcrumbsLd, organizationLd, websiteLd } from '@/lib/schema';
import { openLead } from '@/lib/lead';
import Logo from '@/components/site/Logo';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
        <h1 className="font-display text-[2.5rem] uppercase leading-none">Статья не найдена</h1>
        <Link
          to="/blog"
          className="bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Все статьи
        </Link>
      </div>
    );
  }

  const rest = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const sameTopic = rest.filter((p) => p.topic === post.topic);
  const pool = sameTopic.length >= 3 ? sameTopic : rest;
  const sameTag = pool.filter((p) => p.tag === post.tag);
  const others = [...sameTag, ...pool.filter((p) => p.tag !== post.tag)].slice(0, 3);

  const isCeilings = post.topic === 'ceilings';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const wordCount = post.body.reduce(
    (n, b) => n + b.p.reduce((k, t) => k + t.split(/\s+/).length, 0),
    0,
  );

  const jsonLd = [
    organizationLd(),
    websiteLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${origin}/blog/${post.slug}#article`,
      headline: post.seoTitle ?? post.title,
      alternativeHeadline: post.title,
      description: post.seoDescription ?? post.excerpt,
      image: post.img.startsWith('http') ? post.img : origin + post.img,
      datePublished: post.date,
      dateModified: post.date,
      wordCount,
      inLanguage: 'ru-RU',
      author: { '@id': `${origin}/#organization` },
      publisher: { '@id': `${origin}/#organization` },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${origin}/blog/${post.slug}`,
      },
      isPartOf: { '@id': `${origin}/blog#blog` },
      articleSection: post.tag,
      keywords: post.keywords,
    },
    breadcrumbsLd([
      { name: 'Блог', path: '/blog' },
      { name: post.seoTitle ?? post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.seoTitle ?? post.title} | Fabric Wall`}
        description={post.seoDescription ?? post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.img}
        type="article"
        publishedAt={post.date}
        keywords={post.keywords}
        jsonLd={jsonLd}
      />
      <SiteSwitch />
      <header className="border-b border-border">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Logo to="/" size="sm" />
          <div className="flex items-center gap-3">
            <CalcButton className="hidden sm:flex" />
            <Link
            to="/blog"
            className="-my-2 flex min-h-[44px] items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={16} />
            Все статьи
          </Link>
          </div>
        </div>
      </header>

      <main className="shell py-14 sm:py-16 lg:py-24">
        <nav aria-label="Хлебные крошки" className="mb-10 text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/blog" className="transition-colors hover:text-foreground">
                Блог
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{post.title}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-10">
              <span className="font-display text-sm tracking-[0.2em] text-primary-ink">
                {post.tag}
              </span>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {post.dateLabel} · {post.readTime}
              </div>
            </div>
          </div>

          <article className="lg:col-span-8">
            <h1 className="max-w-[15em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.25rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[38em] text-lg leading-[1.6] text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-10 aspect-[16/9] overflow-hidden">
              <img
            src={post.img}
            alt={`${post.title} — тканевые стены и потолки, статья блога`}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
            </div>

            <div className="mt-12 max-w-[42em]">
              {post.body.map((block, i) => (
                <div key={i} className="mb-10">
                  {block.h && (
                    <h2 className="mb-4 font-display text-[1.75rem] uppercase leading-[1.05] tracking-wide">
                      {block.h}
                    </h2>
                  )}
                  {block.p.map((text, k) => (
                    <p key={k} className="mb-4 text-base leading-[1.75] text-muted-foreground">
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <aside className="mt-4 flex flex-col gap-5 border border-border bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
              <div className="flex gap-4">
                <Icon name="Ruler" size={22} className="mt-0.5 shrink-0 text-primary-ink" />
                <div>
                  <h2 className="font-display text-[1.15rem] uppercase leading-[1.15] tracking-wide">
                    {isCeilings ? 'Замерим ваш потолок бесплатно' : 'Замерим вашу комнату бесплатно'}
                  </h2>
                  <p className="mt-2 max-w-[32em] text-sm leading-[1.55] text-muted-foreground">
                    {isCeilings
                      ? 'Приедем с лазером, проверим перепады и закладные, посчитаем смету за 24 часа.'
                      : 'Приедем с шумомером, замерим эхо и шум, посчитаем смету за 24 часа.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openLead(`Статья: ${post.title}`)}
                className="shrink-0 whitespace-nowrap bg-primary px-6 py-3.5 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Записаться на замер
              </button>
            </aside>
          </article>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-[2rem] uppercase leading-none tracking-wide">
            Читайте также
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Ещё материалы в рубрике «{post.tag}»
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex flex-col border border-border transition-colors hover:border-primary"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.title} — читайте также о тканевых стенах`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-xs uppercase tracking-[0.14em] text-primary-ink">{p.tag}</div>
                  <h3 className="mt-3 font-display text-[1.35rem] uppercase leading-[1.05] tracking-wide">
                    {p.title}
                  </h3>
                  <span className="mt-5 flex items-center gap-2 text-sm transition-colors group-hover:text-primary-ink">
                    Читать
                    <Icon name="ArrowRight" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 border border-border bg-secondary p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[30em] text-sm leading-[1.6] text-muted-foreground">
              Прикиньте бюджет своей комнаты за минуту — калькулятор считает по площади, ткани и
              наполнению.
            </p>
            <Link
              to="/#calc"
              className="flex items-center justify-center gap-2 whitespace-nowrap bg-primary px-7 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Рассчитать стоимость
              <Icon name="Calculator" size={18} />
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

export default BlogPostPage;