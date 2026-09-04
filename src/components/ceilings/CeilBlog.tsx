import { Link } from 'react-router-dom';
import Section from '@/components/site/Section';
import Icon from '@/components/ui/icon';
import { CEILING_POSTS } from '@/data/blog';

const CeilBlog = () => (
  <Section
    id="blog"
    index="10"
    eyebrow="Блог"
    title={<>Про натяжные потолки</>}
    lead="Статьи о технологии натяжных потолков: профили и закладные, фактуры полотна, освещение, ванная, шумоизоляция и честная анатомия цены."
    tone="surface"
  >
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {CEILING_POSTS.map((p) => (
        <Link
          key={p.slug}
          to={`/blog/${p.slug}`}
          className="group flex flex-col border border-border bg-background transition-colors hover:border-primary"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={p.img}
              alt={`${p.title} — статья о натяжных потолках`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-primary">{p.tag}</span>
              <span>{p.readTime}</span>
            </div>
            <h3 className="mt-4 font-display text-[1.35rem] uppercase leading-[1.05] tracking-wide text-foreground">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">{p.excerpt}</p>
            <span className="mt-6 flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-primary">
              Читать
              <Icon name="ArrowRight" size={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>

    <div className="mt-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 border border-border bg-background px-6 py-4 font-display text-lg uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        Все статьи блога
        <Icon name="ArrowRight" size={18} />
      </Link>
    </div>
  </Section>
);

export default CeilBlog;
