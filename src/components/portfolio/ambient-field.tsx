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
  x: number;
  /** 0–1 within viewport at seed (then free to roam full page) */
  yBand: number;
  size: number;
  vx: number;
  vy: number;
  float: number;
  rotate: number;
  spin: number;
  opacity: number;
};

const SPECS: Spec[] = [
  { Icon: Camera, x: 0.08, yBand: 0.12, size: 42, vx: 14, vy: 22, float: 0.12, rotate: -8, spin: 3, opacity: 0.08 },
  { Icon: PenLine, x: 0.78, yBand: 0.18, size: 38, vx: -12, vy: 20, float: 0.22, rotate: 12, spin: -2.5, opacity: 0.07 },
  { Icon: Code2, x: 0.18, yBand: 0.32, size: 46, vx: 10, vy: -18, float: 0.08, rotate: 0, spin: 4, opacity: 0.085 },
  { Icon: Film, x: 0.86, yBand: 0.4, size: 40, vx: -16, vy: 19, float: 0.28, rotate: 6, spin: -3, opacity: 0.07 },
  { Icon: Atom, x: 0.12, yBand: 0.52, size: 44, vx: 11, vy: 21, float: 0.15, rotate: -4, spin: 5, opacity: 0.08 },
  { Icon: Sigma, x: 0.72, yBand: 0.62, size: 36, vx: -9, vy: -20, float: 0.18, rotate: 10, spin: -4, opacity: 0.07 },
  { Icon: BookOpen, x: 0.42, yBand: 0.72, size: 34, vx: -13, vy: 18, float: 0.1, rotate: -6, spin: 2.5, opacity: 0.065 },
  { Icon: Aperture, x: 0.58, yBand: 0.82, size: 38, vx: 8, vy: 23, float: 0.24, rotate: 0, spin: 5.5, opacity: 0.075 },
  { Icon: Binary, x: 0.5, yBand: 0.25, size: 32, vx: 13, vy: -17, float: 0.14, rotate: 8, spin: -2.5, opacity: 0.065 },
  { Icon: Triangle, x: 0.32, yBand: 0.45, size: 30, vx: -11, vy: 19, float: 0.16, rotate: -12, spin: 3.5, opacity: 0.07 },
  { Icon: Camera, x: 0.92, yBand: 0.68, size: 30, vx: -8, vy: 22, float: 0.3, rotate: 4, spin: -5, opacity: 0.06 },
  { Icon: Code2, x: 0.05, yBand: 0.88, size: 34, vx: 18, vy: -15, float: 0.12, rotate: -2, spin: 4, opacity: 0.07 },
  { Icon: PenLine, x: 0.55, yBand: 0.08, size: 32, vx: 11, vy: 24, float: 0.2, rotate: 5, spin: -3, opacity: 0.06 },
  { Icon: Film, x: 0.28, yBand: 0.58, size: 36, vx: -10, vy: -21, float: 0.16, rotate: -3, spin: 3, opacity: 0.065 },
  { Icon: Atom, x: 0.88, yBand: 0.28, size: 38, vx: -14, vy: 18, float: 0.26, rotate: 8, spin: -4, opacity: 0.07 },
  { Icon: Sigma, x: 0.2, yBand: 0.78, size: 32, vx: 14, vy: -16, float: 0.14, rotate: -6, spin: 3, opacity: 0.065 },
];

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}

function pageSize() {
  const w = window.innerWidth;
  const viewH = window.innerHeight;
  const doc = document.documentElement;
  const h = Math.max(
    doc.scrollHeight,
    doc.offsetHeight,
    document.body?.scrollHeight ?? 0,
    viewH,
  );
  return { w, h, viewH };
}

export function AmbientField({ className }: { className?: string }) {
  const nodesRef = useRef<HTMLSpanElement[]>([]);
  const stateRef = useRef(
    SPECS.map((s) => ({ x: s.x, y: s.yBand, rot: s.rotate })),
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** Seed every icon into the *current* viewport so they're never all off-screen. */
    const seed = () => {
      const { w, viewH } = pageSize();
      const top = window.scrollY;
      stateRef.current = SPECS.map((s) => ({
        x: s.x * w,
        // document Y: current scroll + band within viewport
        y: top + s.yBand * viewH,
        rot: s.rotate,
      }));
    };
    seed();

    if (reduced) {
      SPECS.forEach((spec, i) => {
        const el = nodesRef.current[i];
        const st = stateRef.current[i];
        if (!el || !st) return;
        const screenY = st.y - window.scrollY;
        el.style.transform = `translate3d(${st.x}px, ${screenY}px, 0) rotate(${st.rot}deg)`;
        el.style.opacity = String(spec.opacity);
        el.style.visibility = "visible";
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

      scrollY += (scrollTarget - scrollY) * Math.min(1, dt * 10);

      const { w, h, viewH } = pageSize();
      const pad = 80;

      SPECS.forEach((spec, i) => {
        const st = stateRef.current[i];
        const el = nodesRef.current[i];
        if (!st || !el) return;

        st.x += spec.vx * dt;
        st.y += spec.vy * dt;
        st.rot += spec.spin * dt;

        // Wrap across full page width × full document height
        st.x = wrap(st.x, -pad, w + pad);
        st.y = wrap(st.y, -pad, h + pad);

        // Document → screen; slight float lag vs pure scroll lock
        const screenY = st.y - scrollY * (1 - spec.float);
        const pulse = 0.88 + 0.12 * Math.sin(now / 1300 + i * 0.7);

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
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {SPECS.map((spec, i) => {
        const Icon = spec.Icon;
        return (
          <span
            key={i}
            ref={(el) => {
              if (el) nodesRef.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform"
            style={{
              width: spec.size,
              height: spec.size,
              opacity: spec.opacity,
              color: "#000",
            }}
          >
            <Icon strokeWidth={1.45} className="size-full stroke-black" />
          </span>
        );
      })}
    </div>
  );
}
