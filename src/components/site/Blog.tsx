import { Link } from 'react-router-dom';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { WALL_POSTS } from '@/data/blog';

const Blog = () => {
  const posts = WALL_POSTS.slice(0, 3);

  return (
    <Section
      id="blog"
      index="13"
      eyebrow="Блог"
      title={<>Разбираем технологию</>}
      lead="Короткие статьи о том, как устроена тканевая стена, что она даёт по звуку и из чего складывается цена."
      tone="surface"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group flex flex-col border border-border bg-background transition-colors hover:border-primary"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.img}
                alt={`${p.title} — статья о тканевых стенах и потолках`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <span className="text-primary-ink">{p.tag}</span>
                <span>{p.readTime}</span>
              </div>
              <h3 className="mt-4 font-display text-[1.5rem] uppercase leading-[1.05] tracking-wide text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{p.excerpt}</p>
              <span className="mt-6 flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-primary-ink">
                Читать
                <Icon name="ArrowRight" size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/blog?topic=walls"
          className="inline-flex items-center gap-2 border border-border bg-background px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Все статьи
          <Icon name="ArrowRight" size={18} />
        </Link>
      </div>
    </Section>
  );
};

export default Blog;