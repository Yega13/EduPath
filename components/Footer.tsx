import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg text-[var(--color-brand)]">
          EduPath
        </Link>
        <a
          href="mailto:EduPathSupport@gmail.com"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          EduPathSupport@gmail.com
        </a>
      </div>
    </footer>
  );
}
