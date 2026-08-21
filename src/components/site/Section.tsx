import { ReactNode } from 'react';
import useReveal from '@/hooks/use-reveal';

interface SectionProps {
  id?: string;
  index?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'surface' | 'dark';
}

const toneMap = {
  default: 'bg-background text-foreground',
  surface: 'bg-secondary text-foreground',
  dark: 'bg-foreground text-background',
};

const Section = ({
  id,
  index,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  tone = 'default',
}: SectionProps) => {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`w-full border-t border-border ${toneMap[tone]} ${className}`}
    >
      <div
        className={`shell py-16 sm:py-20 lg:py-28 ${
          shown ? 'animate-rise' : 'opacity-0'
        }`}
      >
        {(eyebrow || title) && (
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {index && (
                <span
                  className={`font-display text-sm tracking-[0.2em] ${
                    tone === 'dark' ? 'text-primary' : 'text-primary'
                  }`}
                >
                  {index}
                </span>
              )}
              {eyebrow && (
                <div
                  className={`mt-2 text-xs uppercase tracking-[0.14em] ${
                    tone === 'dark' ? 'text-background/60' : 'text-muted-foreground'
                  }`}
                >
                  {eyebrow}
                </div>
              )}
            </div>
            <div className="lg:col-span-8">
              {title && (
                <h2 className="max-w-[16em] font-display text-[clamp(2rem,7.5vw,2.5rem)] uppercase leading-[0.98] tracking-[0.005em] sm:text-[3.25rem] lg:text-[4rem]">
                  {title}
                </h2>
              )}
              {lead && (
                <p
                  className={`mt-6 max-w-[38em] text-base leading-[1.6] ${
                    tone === 'dark' ? 'text-background/70' : 'text-muted-foreground'
                  }`}
                >
                  {lead}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
