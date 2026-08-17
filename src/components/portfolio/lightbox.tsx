import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

type Props = {
  items: Project[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
};

export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const project = items[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onIndex]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-black/92 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-fg-muted">
            {project.category} · {project.year}
          </p>
          <h2 className="mt-1 text-lg font-medium text-fg">{project.title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-accent-soft"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8 md:px-16">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="max-h-full max-w-full object-contain"
          />
        ) : null}

        <button
          type="button"
          onClick={() => onIndex((index - 1 + items.length) % items.length)}
          className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/50 text-fg backdrop-blur-sm hover:bg-accent-soft md:left-6"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => onIndex((index + 1) % items.length)}
          className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/50 text-fg backdrop-blur-sm hover:bg-accent-soft md:right-6"
          aria-label="Next"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <p className="mx-auto max-w-2xl px-6 pb-8 text-center text-sm leading-relaxed text-fg-secondary">
        {project.description}
      </p>
    </div>
  );
}
