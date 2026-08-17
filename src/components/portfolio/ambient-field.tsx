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

type Star = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  scrollFactor: number;
  opacity: number;
};

type IconSpec = {
  Icon: typeof Camera;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  scrollFactor: number;
  rotate: number;
  spin: number;
  opacity: number;
};

function makeStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const depth = Math.random();
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: 0.6 + depth * 1.8,
      vx: (Math.random() - 0.5) * (4 + depth * 8),
      vy: (Math.random() - 0.5) * (3 + depth * 6),
      scrollFactor: 0.04 + depth * 0.22,
      opacity: 0.16 + depth * 0.45,
    });
  }
  return stars;
}

const STARS = makeStars(70);

const ICONS: IconSpec[] = [
  { Icon: Camera, x: 0.08, y: 0.14, size: 44, vx: 16, vy: 12, scrollFactor: 0.18, rotate: -8, spin: 3.2, opacity: 0.22 },
  { Icon: PenLine, x: 0.78, y: 0.2, size: 40, vx: -14, vy: 14, scrollFactor: 0.28, rotate: 12, spin: -2.8, opacity: 0.22 },
  { Icon: Code2, x: 0.18, y: 0.38, size: 48, vx: 11, vy: -13, scrollFactor: 0.12, rotate: 0, spin: 4.2, opacity: 0.22 },
  { Icon: Film, x: 0.86, y: 0.46, size: 42, vx: -18, vy: 10, scrollFactor: 0.32, rotate: 6, spin: -3.2, opacity: 0.22 },
  { Icon: Atom, x: 0.12, y: 0.58, size: 46, vx: 13, vy: 15, scrollFactor: 0.2, rotate: -4, spin: 5, opacity: 0.22 },
  { Icon: Sigma, x: 0.72, y: 0.68, size: 38, vx: -10, vy: -14, scrollFactor: 0.24, rotate: 10, spin: -4, opacity: 0.22 },
  { Icon: BookOpen, x: 0.42, y: 0.78, size: 36, vx: -15, vy: 11, scrollFactor: 0.14, rotate: -6, spin: 2.8, opacity: 0.22 },
  { Icon: Aperture, x: 0.58, y: 0.88, size: 40, vx: 9, vy: 16, scrollFactor: 0.3, rotate: 0, spin: 5.5, opacity: 0.22 },
  { Icon: Binary, x: 0.5, y: 0.28, size: 34, vx: 15, vy: -11, scrollFactor: 0.16, rotate: 8, spin: -2.6, opacity: 0.22 },
  { Icon: Triangle, x: 0.32, y: 0.5, size: 32, vx: -12, vy: 13, scrollFactor: 0.22, rotate: -12, spin: 3.6, opacity: 0.22 },
  { Icon: Camera, x: 0.92, y: 0.72, size: 32, vx: -9, vy: 15, scrollFactor: 0.35, rotate: 4, spin: -5, opacity: 0.22 },
  { Icon: Code2, x: 0.05, y: 0.92, size: 36, vx: 20, vy: -9, scrollFactor: 0.15, rotate: -2, spin: 4, opacity: 0.22 },
  { Icon: PenLine, x: 0.55, y: 0.1, size: 34, vx: 12, vy: 17, scrollFactor: 0.26, rotate: 5, spin: -3, opacity: 0.22 },
  { Icon: Film, x: 0.28, y: 0.64, size: 38, vx: -11, vy: -15, scrollFactor: 0.2, rotate: -3, spin: 3.2, opacity: 0.22 },
  { Icon: Atom, x: 0.88, y: 0.34, size: 40, vx: -16, vy: 12, scrollFactor: 0.3, rotate: 8, spin: -4.2, opacity: 0.22 },
  { Icon: Sigma, x: 0.2, y: 0.84, size: 34, vx: 15, vy: -12, scrollFactor: 0.18, rotate: -6, spin: 3.2, opacity: 0.22 },
];

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}

export function AmbientField({ className }: { className?: string }) {
  const starNodes = useRef<HTMLSpanElement[]>([]);
  const iconNodes = useRef<HTMLSpanElement[]>([]);
  const starState = useRef(STARS.map((s) => ({ x: s.x, y: s.y })));
  const iconState = useRef(ICONS.map((s) => ({ x: s.x, y: s.y, rot: s.rotate })));

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seed = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      starState.current = STARS.map((s) => ({ x: s.x * w, y: s.y * h }));
      iconState.current = ICONS.map((s) => ({
        x: s.x * w,
        y: s.y * h,
        rot: s.rotate,
      }));
    };
    seed();

    const paintStatic = () => {
      STARS.forEach((star, i) => {
        const el = starNodes.current[i];
        const st = starState.current[i];
        if (!el || !st) return;
        el.style.transform = `translate3d(${st.x}px, ${st.y}px, 0)`;
        el.style.opacity = String(star.opacity);
      });
      ICONS.forEach((spec, i) => {
        const el = iconNodes.current[i];
        const st = iconState.current[i];
        if (!el || !st) return;
        el.style.transform = `translate3d(${st.x}px, ${st.y}px, 0) rotate(${st.rot}deg)`;
        el.style.opacity = String(spec.opacity);
      });
    };

    if (reduced) {
      paintStatic();
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
      scrollY += (scrollTarget - scrollY) * Math.min(1, dt * 10);

      const w = window.innerWidth;
      const h = window.innerHeight;

      STARS.forEach((star, i) => {
        const st = starState.current[i];
        const el = starNodes.current[i];
        if (!st || !el) return;
        st.x = wrap(st.x + star.vx * dt, -8, w + 8);
        st.y = wrap(st.y + star.vy * dt, -8, h + 8);
        const py = wrap(st.y - ((scrollY * star.scrollFactor) % (h + 16)), -8, h + 8);
        const twinkle = 0.75 + 0.25 * Math.sin(now / 1400 + i * 0.37);
        el.style.transform = `translate3d(${st.x}px, ${py}px, 0)`;
        el.style.opacity = String(star.opacity * twinkle);
      });

      ICONS.forEach((spec, i) => {
        const st = iconState.current[i];
        const el = iconNodes.current[i];
        if (!st || !el) return;
        st.x = wrap(st.x + spec.vx * dt, -60, w + 60);
        st.y = wrap(st.y + spec.vy * dt, -60, h + 60);
        st.rot += spec.spin * dt;
        const py = wrap(st.y - ((scrollY * spec.scrollFactor) % (h + 120)), -60, h + 60);
        const pulse = 0.92 + 0.08 * Math.sin(now / 1200 + i * 0.65);
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
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg",
        className,
      )}
      aria-hidden
    >
      <div className="ambient-veil absolute inset-0" />
      {STARS.map((star, i) => (
        <span
          key={`s-${i}`}
          ref={(el) => {
            if (el) starNodes.current[i] = el;
          }}
          className="ambient-star absolute left-0 top-0 rounded-full bg-fg will-change-transform"
          style={{ width: star.size, height: star.size, opacity: star.opacity }}
        />
      ))}
      {ICONS.map((spec, i) => {
        const Icon = spec.Icon;
        return (
          <span
            key={`i-${i}`}
            ref={(el) => {
              if (el) iconNodes.current[i] = el;
            }}
            className="absolute left-0 top-0 text-fg will-change-transform"
            style={{ width: spec.size, height: spec.size, opacity: spec.opacity }}
          >
            <Icon strokeWidth={1.4} className="size-full" />
          </span>
        );
      })}
    </div>
  );
}
