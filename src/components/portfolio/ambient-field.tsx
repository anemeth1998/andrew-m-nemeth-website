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
  /** 0–1 starting position across page */
  x: number;
  y: number;
  size: number;
  /** px/sec continuous drift in document space */
  vx: number;
  vy: number;
  /** 0 = locked to page scroll, 1 = nearly fixed to viewport */
  float: number;
  rotate: number;
  spin: number;
  /** base opacity — low, but pure black ink */
  opacity: number;
};

/** Sparse field — pure black marks, full-document travel */
const SPECS: Spec[] = [
  { Icon: Camera, x: 0.08, y: 0.06, size: 40, vx: 14, vy: 11, float: 0.15, rotate: -8, spin: 3, opacity: 0.018 },
  { Icon: PenLine, x: 0.78, y: 0.12, size: 36, vx: -12, vy: 9, float: 0.28, rotate: 12, spin: -2.5, opacity: 0.016 },
  { Icon: Code2, x: 0.18, y: 0.22, size: 44, vx: 9, vy: -10, float: 0.1, rotate: 0, spin: 4, opacity: 0.02 },
  { Icon: Film, x: 0.86, y: 0.3, size: 38, vx: -16, vy: 7, float: 0.35, rotate: 6, spin: -3, opacity: 0.016 },
  { Icon: Atom, x: 0.1, y: 0.42, size: 42, vx: 11, vy: 12, float: 0.18, rotate: -4, spin: 5, opacity: 0.018 },
  { Icon: Sigma, x: 0.72, y: 0.5, size: 34, vx: -8, vy: -11, float: 0.22, rotate: 10, spin: -4, opacity: 0.016 },
  { Icon: BookOpen, x: 0.42, y: 0.58, size: 32, vx: -13, vy: 8, float: 0.12, rotate: -6, spin: 2.5, opacity: 0.014 },
  { Icon: Aperture, x: 0.62, y: 0.66, size: 36, vx: 7, vy: 13, float: 0.3, rotate: 0, spin: 5.5, opacity: 0.018 },
  { Icon: Binary, x: 0.5, y: 0.74, size: 30, vx: 12, vy: -8, float: 0.16, rotate: 8, spin: -2.5, opacity: 0.014 },
  { Icon: Triangle, x: 0.32, y: 0.82, size: 28, vx: -10, vy: 10, float: 0.2, rotate: -12, spin: 3.5, opacity: 0.016 },
  { Icon: Camera, x: 0.92, y: 0.9, size: 28, vx: -7, vy: 12, float: 0.38, rotate: 4, spin: -5, opacity: 0.012 },
  { Icon: Code2, x: 0.04, y: 0.96, size: 32, vx: 18, vy: -6, float: 0.14, rotate: -2, spin: 4, opacity: 0.016 },
  { Icon: PenLine, x: 0.55, y: 0.18, size: 30, vx: 10, vy: 14, float: 0.25, rotate: 5, spin: -3, opacity: 0.012 },
  { Icon: Film, x: 0.25, y: 0.35, size: 34, vx: -9, vy: -12, float: 0.2, rotate: -3, spin: 3, opacity: 0.014 },
  { Icon: Atom, x: 0.88, y: 0.62, size: 36, vx: -14, vy: 8, float: 0.32, rotate: 8, spin: -4, opacity: 0.016 },
  { Icon: Sigma, x: 0.15, y: 0.78, size: 30, vx: 13, vy: -9, float: 0.18, rotate: -6, spin: 3, opacity: 0.014 },
];

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  let v = ((value - min) % range + range) % range + min;
  return v;
}

function pageSize() {
  const w = window.innerWidth;
  const doc = document.documentElement;
  const h = Math.max(
    doc.scrollHeight,
    doc.offsetHeight,
    document.body?.scrollHeight ?? 0,
    window.innerHeight,
  );
  return { w, h };
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

    const seed = () => {
      const { w, h } = pageSize();
      stateRef.current = SPECS.map((s) => ({
        x: s.x * w,
        y: s.y * h,
        rot: s.rotate,
      }));
    };
    seed();

    const ro = new ResizeObserver(() => {});
    ro.observe(document.documentElement);

    if (reduced) {
      const { w } = pageSize();
      const scrollY = window.scrollY;
      SPECS.forEach((spec, i) => {
        const el = nodesRef.current[i];
        const st = stateRef.current[i];
        if (!el || !st) return;
        const screenY = st.y - scrollY * (1 - spec.float * 0.5);
        el.style.transform = `translate3d(${st.x}px, ${screenY}px, 0) rotate(${st.rot}deg)`;
        el.style.opacity = String(spec.opacity * 0.9);
        el.style.visibility =
          screenY < -80 || screenY > window.innerHeight + 80 || st.x < -80 || st.x > w + 80
            ? "hidden"
            : "visible";
      });
      return () => ro.disconnect();
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

      const { w, h } = pageSize();
      const viewH = window.innerHeight;
      const pad = 100;

      SPECS.forEach((spec, i) => {
        const st = stateRef.current[i];
        const el = nodesRef.current[i];
        if (!st || !el) return;

        st.x += spec.vx * dt;
        st.y += spec.vy * dt;
        st.rot += spec.spin * dt;

        st.x = wrap(st.x, -pad, w + pad);
        st.y = wrap(st.y, -pad, h + pad);

        const screenY = st.y - scrollY * (1 - spec.float);
        const pulse = 0.92 + 0.08 * Math.sin(now / 1400 + i * 0.7);

        el.style.transform = `translate3d(${st.x}px, ${screenY}px, 0) rotate(${st.rot}deg)`;
        el.style.opacity = String(spec.opacity * pulse);

        const near =
          screenY > -pad &&
          screenY < viewH + pad &&
          st.x > -pad &&
          st.x < w + pad;
        el.style.visibility = near ? "visible" : "hidden";
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", seed);
      ro.disconnect();
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
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/50" />
      {SPECS.map((spec, i) => {
        const Icon = spec.Icon;
        return (
          <span
            key={i}
            ref={(el) => {
              if (el) nodesRef.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform text-black"
            style={{
              width: spec.size,
              height: spec.size,
              opacity: spec.opacity,
              color: "#000000",
            }}
          >
            <Icon strokeWidth={1.35} className="size-full stroke-black" />
          </span>
        );
      })}
    </div>
  );
}
