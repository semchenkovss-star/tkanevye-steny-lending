import { Link } from 'react-router-dom';

interface LogoProps {
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'inverted';
  className?: string;
}

const SIZES = {
  sm: { main: 'text-[1.25rem] sm:text-[1.4rem]', sub: 'text-[0.52rem] sm:text-[0.56rem]' },
  md: { main: 'text-[1.45rem] sm:text-[1.7rem]', sub: 'text-[0.58rem] sm:text-[0.63rem]' },
  lg: { main: 'text-[2.1rem] sm:text-[2.6rem]', sub: 'text-[0.72rem] sm:text-[0.8rem]' },
};

const Logo = ({ to = '/', size = 'md', tone = 'default', className = '' }: LogoProps) => {
  const s = SIZES[size];
  const mainColor = tone === 'inverted' ? 'text-background' : 'text-foreground';
  const accentColor = tone === 'inverted' ? 'text-primary' : 'text-primary-ink';
  const subColor = tone === 'inverted' ? 'text-background/55' : 'text-muted-foreground';

  const content = (
    <>
      <span
        className={`whitespace-nowrap font-display uppercase leading-none tracking-[0.1em] ${mainColor} ${s.main}`}
      >
        Fabric<span className={accentColor}> Wall</span>
      </span>
      <span
        className={`mt-1.5 whitespace-nowrap uppercase leading-none tracking-[0.26em] ${subColor} ${s.sub}`}
      >
        Тканевые стены
      </span>
    </>
  );

  const classes = `flex shrink-0 flex-col leading-none ${className}`;

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
