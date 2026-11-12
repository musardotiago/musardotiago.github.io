import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center">
      {kicker && (
        <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground shadow-sticker">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl leading-tight text-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}

export function Pending({ label = "A preencher" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border-stitch bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground">
      ✏️ {label}
    </span>
  );
}

export function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; y: number; c: string; d: number }[]>([]);
  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["var(--strawberry)", "var(--caramel)", "var(--butter)", "var(--chocolate)", "var(--mint)"];
    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: trigger * 100 + i,
        x: (Math.random() - 0.5) * 520,
        y: (Math.random() - 0.2) * 420,
        c: colors[i % colors.length] ?? "var(--strawberry)",
        d: Math.random() * 200,
      })),
    );
    const t = setTimeout(() => setPieces([]), 1800);
    return () => clearTimeout(t);
  }, [trigger]);
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 z-20">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute h-3 w-2 rounded-sm"
          style={{ background: p.c, ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px`, animationDelay: `${p.d}ms` }}
        />
      ))}
    </div>
  );
}
