import { useEffect, useRef, useState } from 'react';

export function useAntiSpam() {
  const [trap, setTrap] = useState('');
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const field = (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Сайт
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </label>
    </div>
  );

  const meta = () => ({
    website: trap,
    filledMs: startedAt.current ? Date.now() - startedAt.current : undefined,
  });

  return { field, meta };
}
