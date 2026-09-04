import { Link } from 'react-router-dom';

interface LogoProps {
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'inverted';
  className?: string;
}

const SIZES = {
  sm: { main: 'text-[1.25rem] sm:text-[1.4rem]', sub: 'text-[0.5rem] sm:text-[0.54rem]', gap: 'mt-1' },
  md: { main: 'text-[1.45rem] sm:text-[1.7rem]', sub: 'text-[0.56rem] sm:text-[0.6rem]', gap: 'mt-1.5' },
  lg: { main: 'text-[2.1rem] sm:text-[2.6rem]', sub: 'text-[0.68rem] sm:text-[0.76rem]', gap: 'mt-2' },
};

const SUB = 'ТКАНЕВЫЕ СТЕНЫ';

const Logo = ({ to = '/', size = 'md', tone = 'default', className = '' }: LogoProps) => {
  const s = SIZES[size];
  const mainColor = tone === 'inverted' ? 'text-background' : 'text-foreground';
  const accentColor = tone === 'inverted' ? 'text-primary' : 'text-primary-ink';
  const subColor = tone === 'inverted' ? 'text-background/50' : 'text-muted-foreground';

  const content = (
    <>
      <span
        className={`whitespace-nowrap font-display uppercase leading-none tracking-[0.1em] ${mainColor} ${s.main}`}
      >
        Fabric<span className={accentColor}> Wall</span>
      </span>
      <span
        aria-label={SUB}
        className={`flex w-full justify-between whitespace-nowrap uppercase leading-none ${subColor} ${s.sub} ${s.gap}`}
      >
        {SUB.split('').map((ch, i) => (
          <span key={`${ch}-${i}`} aria-hidden="true">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
    </>
  );

  const classes = `-my-1.5 flex min-h-[44px] w-fit shrink-0 flex-col items-stretch justify-center py-1.5 leading-none ${className}`;

  if (to.startsWith('#')) {
    return (
      <a href={to} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
};

export default Logo;
