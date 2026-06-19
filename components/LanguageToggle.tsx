import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

const LANGS = [
  { code: 'am', flag: '🇦🇲', label: 'Հայ' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
];

export default function LanguageToggle() {
  const router = useRouter();
  const { pathname, query, asPath, locale } = router;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[1];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const switchTo = (code: string) => {
    setOpen(false);
    router.replace({ pathname, query }, asPath, { locale: code });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                l.code === locale
                  ? 'bg-[var(--color-brand)] text-white font-medium'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--border)]'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
