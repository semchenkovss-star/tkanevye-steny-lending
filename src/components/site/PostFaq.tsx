import Icon from '@/components/ui/icon';
import type { FaqItem } from '@/data/blogFaq';

interface PostFaqProps {
  items: FaqItem[];
  className?: string;
}

/**
 * Частые вопросы в конце статьи. Сделано на <details>, а не на аккордеоне
 * из ui: тот не выводит закрытые ответы в разметку, и поисковик видел бы
 * только вопросы. Здесь ответы всегда есть в HTML — и в готовых страницах.
 */
const PostFaq = ({ items, className = '' }: PostFaqProps) => {
  if (!items.length) return null;

  return (
    <section aria-labelledby="post-faq" className={className}>
      <h2
        id="post-faq"
        className="font-display text-[1.45rem] uppercase leading-[1.1] tracking-wide sm:text-[1.75rem] sm:leading-[1.05]"
      >
        Частые вопросы
      </h2>
      <div className="mt-6 border-t border-border">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-display text-[1.1rem] uppercase leading-[1.2] tracking-wide transition-colors hover:text-primary-ink sm:text-[1.25rem] [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <Icon
                name="ChevronDown"
                size={20}
                className="mt-0.5 shrink-0 text-primary-ink transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="max-w-[42em] pb-6 text-base leading-[1.7] text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default PostFaq;
