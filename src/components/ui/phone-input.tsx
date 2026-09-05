import { forwardRef, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { formatPhone } from '@/lib/lead';

interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  'aria-invalid'?: boolean;
}

/** Позиция курсора после n-й цифры в отформатированной строке */
function caretAfterDigits(formatted: string, n: number): number {
  if (n <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      seen++;
      if (seen === n) return i + 1;
    }
  }
  return formatted.length;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ id, value, onChange, className, placeholder = '+7 (___) ___-__-__', ...rest }, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

    /** Backspace по разделителю удаляет ближайшую цифру слева */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const el = e.currentTarget;
      if (e.key !== 'Backspace') return;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      if (start !== end || start === 0) return;
      if (/\d/.test(el.value[start - 1])) return;

      e.preventDefault();
      let cut = start - 1;
      while (cut > 0 && !/\d/.test(el.value[cut - 1])) cut--;
      if (cut === 0) return;

      const next = formatPhone(el.value.slice(0, cut - 1) + el.value.slice(start));
      const digitsLeft = (el.value.slice(0, cut - 1).match(/\d/g) || []).length;
      onChange(next);
      requestAnimationFrame(() => {
        const pos = caretAfterDigits(next, digitsLeft);
        innerRef.current?.setSelectionRange(pos, pos);
      });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const el = e.target;
      const caret = el.selectionStart ?? el.value.length;
      const raw = el.value;
      const allDigits = raw.replace(/\D/g, '');
      let digitsBefore = (raw.slice(0, caret).match(/\d/g) || []).length;

      // маска сама подставляет код страны — сдвигаем курсор на эту цифру
      if (allDigits && !/^[78]/.test(allDigits)) digitsBefore += 1;

      const next = formatPhone(raw);
      onChange(next);
      requestAnimationFrame(() => {
        const pos = caretAfterDigits(next, digitsBefore);
        innerRef.current?.setSelectionRange(pos, pos);
      });
    };

    return (
      <input
        {...rest}
        id={id}
        ref={setRefs}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
