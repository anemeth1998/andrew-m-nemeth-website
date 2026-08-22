import { useState } from "react";
import type { Project } from "@/data/portfolio";

export function ComparisonSlider({
  pair,
}: {
  pair: NonNullable<Project["comparison"]>;
}) {
  const [pos, setPos] = useState(50);

  return (
    <section className="mt-10">
      <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Comparison
      </h2>
      <div className="relative mt-4 overflow-hidden rounded-2xl bg-bg-subtle">
        <div className="relative aspect-[4/3] w-full select-none">
          <img
            src={pair.after}
            alt={pair.afterLabel ?? "After"}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={pair.before}
              alt={pair.beforeLabel ?? "Before"}
              className="absolute inset-0 h-full max-w-none object-cover"
              style={{ width: `${10000 / pos}%`, maxWidth: "none" }}
              draggable={false}
            />
          </div>
          <div
            className="absolute inset-y-0 w-0.5 bg-white shadow"
            style={{ left: `${pos}%` }}
          />
          <input
            type="range"
            min={2}
            max={98}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
            aria-label="Comparison slider"
          />
        </div>
        <div className="flex justify-between px-4 py-2 text-xs text-fg-muted">
          <span>{pair.beforeLabel ?? "Before"}</span>
          <span>{pair.afterLabel ?? "After"}</span>
        </div>
      </div>
    </section>
  );
}
