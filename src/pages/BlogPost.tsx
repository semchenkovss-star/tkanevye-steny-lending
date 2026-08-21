import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Footer from '@/components/site/Footer';
import LeadDialog from '@/components/site/LeadDialog';
import FloatingCta from '@/components/site/FloatingCta';
import { BLOG_POSTS, getPost } from '@/data/blog';
import { openLead } from '@/lib/lead';

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
          className="bg-primary px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
        >
          Все статьи
        </Link>
      </div>
    );
  }

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-6 px-6 lg:px-10">
          <Link to="/" className="font-display text-xl uppercase tracking-[0.16em]">
            Полотно
          </Link>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={16} />
            Все статьи
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-10">
              <span className="font-display text-sm tracking-[0.2em] text-primary">
                {post.tag}
              </span>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {post.dateLabel} · {post.readTime}
              </div>
            </div>
          </div>

          <article className="lg:col-span-8">
            <h1 className="max-w-[15em] font-display text-[2.5rem] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.25rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[38em] text-lg leading-[1.6] text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-10 aspect-[16/9] overflow-hidden">
              <img src={post.img} alt={post.title} className="h-full w-full object-cover" />
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

            <div className="mt-4 flex flex-col items-start gap-6 border border-border bg-secondary p-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[26em] text-sm leading-[1.6] text-muted-foreground">
                Хотите понять, сколько выйдет именно ваша стена? Замер и смета — бесплатно.
              </p>
              <button
                type="button"
                onClick={() => openLead(`Статья: ${post.title}`)}
                className="whitespace-nowrap bg-primary px-7 py-4 font-display text-lg uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
              >
                Вызвать замерщика
              </button>
            </div>
          </article>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-[2rem] uppercase leading-none tracking-wide">
            Читайте также
          </h2>
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
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-xs uppercase tracking-[0.14em] text-primary">{p.tag}</div>
                  <h3 className="mt-3 font-display text-[1.35rem] uppercase leading-[1.05] tracking-wide">
                    {p.title}
                  </h3>
                  <span className="mt-5 flex items-center gap-2 text-sm transition-colors group-hover:text-primary">
                    Читать
                    <Icon name="ArrowRight" size={16} />
                  </span>
                </div>
              </Link>
            ))}
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