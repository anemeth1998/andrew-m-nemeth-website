import { useEffect, useRef } from "react";
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
      opacity: 0.18 + depth * 0.55,
    });
  }
  return stars;
}

const STARS = makeStars(90);

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}

export function AmbientField({ className }: { className?: string }) {
  const nodesRef = useRef<HTMLSpanElement[]>([]);
  const stateRef = useRef(STARS.map((s) => ({ x: s.x, y: s.y })));

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seed = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      stateRef.current = STARS.map((s) => ({
        x: s.x * w,
        y: s.y * h,
      }));
    };
    seed();

    if (reduced) {
      STARS.forEach((star, i) => {
        const el = nodesRef.current[i];
        const st = stateRef.current[i];
        if (!el || !st) return;
        el.style.transform = `translate3d(${st.x}px, ${st.y}px, 0)`;
        el.style.opacity = String(star.opacity);
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

      const w = window.innerWidth;
      const h = window.innerHeight;
      const pad = 8;

      STARS.forEach((star, i) => {
        const st = stateRef.current[i];
        const el = nodesRef.current[i];
        if (!st || !el) return;

        st.x += star.vx * dt;
        st.y += star.vy * dt;
        st.x = wrap(st.x, -pad, w + pad);
        st.y = wrap(st.y, -pad, h + pad);

        const shiftY = (scrollY * star.scrollFactor) % (h + pad * 2);
        const py = wrap(st.y - shiftY, -pad, h + pad);
        const twinkle = 0.75 + 0.25 * Math.sin(now / 1400 + i * 0.37);

        el.style.transform = `translate3d(${st.x}px, ${py}px, 0)`;
        el.style.opacity = String(star.opacity * twinkle);
        el.style.visibility = "visible";
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
      {STARS.map((star, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
          className="absolute left-0 top-0 rounded-full bg-fg will-change-transform"
          style={{
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
