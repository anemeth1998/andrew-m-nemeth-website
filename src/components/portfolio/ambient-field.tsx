import { useEffect, useRef } from "react";
import {
  Aperture,
  Atom,
  Binary,
  BookOpen,
  Camera,
  Code2,
  Film,
  PenLine,
  Sigma,
  Triangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Spec = {
  Icon: typeof Camera;
  /** 0–1 starting position */
  x: number;
  y: number;
  size: number;
  /** px/sec continuous drift */
  vx: number;
  vy: number;
  /** scroll parallax (multiplies scrollY) */
  parallax: number;
  rotate: number;
  spin: number;
  opacity: number;
};

const SPECS: Spec[] = [
  { Icon: Camera, x: 0.08, y: 0.12, size: 40, vx: 18, vy: 6, parallax: 0.12, rotate: -8, spin: 4, opacity: 0.08 },
  { Icon: PenLine, x: 0.78, y: 0.16, size: 36, vx: -14, vy: 8, parallax: 0.22, rotate: 12, spin: -3, opacity: 0.07 },
  { Icon: Code2, x: 0.18, y: 0.38, size: 44, vx: 10, vy: -12, parallax: 0.08, rotate: 0, spin: 5, opacity: 0.09 },
  { Icon: Film, x: 0.86, y: 0.42, size: 38, vx: -20, vy: -5, parallax: 0.28, rotate: 6, spin: -4, opacity: 0.07 },
  { Icon: Atom, x: 0.1, y: 0.72, size: 42, vx: 12, vy: 10, parallax: 0.16, rotate: -4, spin: 6, opacity: 0.08 },
  { Icon: Sigma, x: 0.72, y: 0.78, size: 34, vx: -9, vy: -14, parallax: 0.2, rotate: 10, spin: -5, opacity: 0.07 },
  { Icon: BookOpen, x: 0.42, y: 0.08, size: 32, vx: -16, vy: 7, parallax: 0.1, rotate: -6, spin: 3, opacity: 0.06 },
  { Icon: Aperture, x: 0.62, y: 0.58, size: 36, vx: 8, vy: 15, parallax: 0.24, rotate: 0, spin: 7, opacity: 0.08 },
  { Icon: Binary, x: 0.5, y: 0.88, size: 30, vx: 15, vy: -9, parallax: 0.14, rotate: 8, spin: -3, opacity: 0.06 },
  { Icon: Triangle, x: 0.32, y: 0.28, size: 28, vx: -11, vy: 11, parallax: 0.18, rotate: -12, spin: 4, opacity: 0.07 },
  { Icon: Camera, x: 0.92, y: 0.08, size: 28, vx: -8, vy: 14, parallax: 0.3, rotate: 4, spin: -6, opacity: 0.05 },
  { Icon: Code2, x: 0.04, y: 0.55, size: 32, vx: 22, vy: -4, parallax: 0.11, rotate: -2, spin: 5, opacity: 0.06 },
];

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  let v = value;
  while (v < min) v += range;
  while (v > max) v -= range;
  return v;
}

export function AmbientField({ className }: { className?: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLSpanElement[]>([]);
  const stateRef = useRef(
    SPECS.map((s) => ({
      x: s.x,
      y: s.y,
      rot: s.rotate,
    })),
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = layerRef.current;
    if (!layer) return;

    // Seed absolute positions once layout is known
    const seed = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 1);
      stateRef.current = SPECS.map((s) => ({
        x: s.x * w,
        y: s.y * h,
        rot: s.rotate,
      }));
    };
    seed();

    if (reduced) {
      // Static placement only
      const scrollY = window.scrollY;
      SPECS.forEach((spec, i) => {
        const el = nodesRef.current[i];
        const st = stateRef.current[i];
        if (!el || !st) return;
        el.style.transform = `translate3d(${st.x}px, ${st.y + scrollY * spec.parallax}px, 0) rotate(${st.rot}deg)`;
        el.style.opacity = String(spec.opacity * 0.7);
      });
      return;
    }

    let raf = 0;
    let last = performance.now();
    let scrollY = window.scrollY;
    let scrollTarget = window.scrollY;

    const onScroll = () => {
      scrollTarget = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", seed);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Smooth scroll for congruent motion (no jitter)
      scrollY += (scrollTarget - scrollY) * Math.min(1, dt * 10);

      const w = window.innerWidth;
      const h = window.innerHeight;
      // Extra vertical travel so icons cycle through the full scroll document feel
      const pad = 80;

      SPECS.forEach((spec, i) => {
        const st = stateRef.current[i];
        const el = nodesRef.current[i];
        if (!st || !el) return;

        st.x += spec.vx * dt;
        st.y += spec.vy * dt;
        st.rot += spec.spin * dt;

        // Cycle across the viewport (wrap edges)
        st.x = wrap(st.x, -pad, w + pad);
        st.y = wrap(st.y, -pad, h + pad);

        const py = st.y + scrollY * spec.parallax;
        // Soft pulse so the field feels alive without stealing focus
        const pulse = 0.85 + 0.15 * Math.sin(now / 900 + i);
        el.style.transform = `translate3d(${st.x}px, ${py}px, 0) rotate(${st.rot}deg)`;
        el.style.opacity = String(spec.opacity * pulse);
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", seed);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/30 to-bg/90" />
      {SPECS.map((spec, i) => {
        const Icon = spec.Icon;
        return (
          <span
            key={i}
            ref={(el) => {
              if (el) nodesRef.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform text-fg"
            style={{
              width: spec.size,
              height: spec.size,
              opacity: spec.opacity,
            }}
          >
            <Icon strokeWidth={1.15} className="size-full" />
          </span>
        );
      })}
    </div>
  );
}
