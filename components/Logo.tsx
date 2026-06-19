import Link from 'next/link';

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height = 32, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.png"
        alt="Himq"
        className="block dark:hidden"
        style={{
          height: `${height}px`,
          width: 'auto',
          /* white → brand blue in light mode */
          filter: 'brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(600%) hue-rotate(196deg) brightness(100%) contrast(104%)',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.png"
        alt="Himq"
        className="hidden dark:block"
        style={{ height: `${height}px`, width: 'auto' }}
      />
    </Link>
  );
}
