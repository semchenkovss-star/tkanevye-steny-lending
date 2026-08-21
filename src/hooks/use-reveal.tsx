import { useEffect, useRef, useState } from 'react';

/**
 * Появление блока при попадании в вьюпорт.
 * Возвращает ref для элемента и флаг видимости.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);

    // Страховка: если наблюдатель по каким-то причинам не сработал
    const fallback = window.setTimeout(() => setShown(true), 2500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, shown };
}

export default useReveal;