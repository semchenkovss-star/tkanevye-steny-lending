import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'cookie-consent';

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== 'accepted') {
      const timer = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] animate-fade-in px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="shell flex flex-col gap-5 border border-border bg-card p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
        <p className="max-w-[52em] text-sm leading-[1.6] text-muted-foreground">
          Мы используем файлы cookie, чтобы сайт работал корректно и удобно. Продолжая пользоваться
          сайтом, вы соглашаетесь с обработкой персональных данных в соответствии с{' '}
          <Link to="/privacy" className="text-foreground underline underline-offset-4 hover:text-primary">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="whitespace-nowrap bg-primary px-7 py-3 font-display text-base uppercase tracking-[0.04em] text-primary-foreground transition-colors hover:bg-foreground"
        >
          Хорошо
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
