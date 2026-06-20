import Link from "next/link";
import { cn } from "@/lib/utils";

export type ThreeDMarqueeItem =
  | { type: "logo" }
  | { type: "cta"; desc: string };

function ItemCard({ item }: { item: ThreeDMarqueeItem }) {
  if (item.type === "logo") {
    return (
      <div className="w-64 h-40 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 bg-white dark:bg-[var(--color-brand)] border border-[var(--border)] dark:border-transparent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-light.png" alt="Himq" className="block dark:hidden h-14 w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-dark.png" alt="Himq" className="hidden dark:block h-14 w-auto" />
      </div>
    );
  }
  return (
    <div className="w-64 h-40 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col items-center justify-center gap-3 shadow-[var(--shadow-md)] flex-shrink-0 px-5 text-center">
      <p className="text-xs text-[var(--text-secondary)] leading-snug">{item.desc}</p>
      <Link
        href="/auth"
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-bold hover:bg-[var(--color-brand-hover)] transition-colors"
      >
        Create Path →
      </Link>
    </div>
  );
}

function MarqueeCol({
  items,
  direction,
  speed,
}: {
  items: ThreeDMarqueeItem[];
  direction: "up" | "down";
  speed: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="flex flex-col gap-4 flex-shrink-0"
      style={{ animation: `marquee-col-${direction} ${speed}s linear infinite` }}
    >
      {doubled.map((item, i) => (
        <ItemCard key={i} item={item} />
      ))}
    </div>
  );
}

export function ThreeDMarquee({
  items,
  className,
}: {
  items: ThreeDMarqueeItem[];
  className?: string;
}) {
  const cols = 4;
  const perCol = Math.ceil(items.length / cols);
  const columns = Array.from({ length: cols }, (_, i) =>
    items.slice(i * perCol, (i + 1) * perCol)
  );
  const speeds = [40, 32, 48, 36];

  return (
    <div className={cn("relative h-[560px] overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />

      <div
        className="flex h-full items-center justify-center"
        style={{ perspective: "900px" }}
      >
        <div
          className="flex gap-4 items-start"
          style={{
            transform: "rotateX(20deg) rotateZ(-20deg)",
            transformOrigin: "center center",
          }}
        >
          {columns.map((col, i) => (
            <MarqueeCol
              key={i}
              items={col}
              direction={i % 2 === 0 ? "up" : "down"}
              speed={speeds[i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
