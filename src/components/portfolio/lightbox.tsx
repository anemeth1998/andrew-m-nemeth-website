import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  X,
  ExternalLink,
} from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  items: Project[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
};

export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const project = items[index];
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    onIndex((index - 1 + items.length) % items.length);
    setActiveAnnotation(null);
  }, [index, items.length, onIndex]);

  const goNext = useCallback(() => {
    onIndex((index + 1) % items.length);
    setActiveAnnotation(null);
  }, [index, items.length, onIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "a" || e.key === "A") {
        setShowAnnotations((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    setActiveAnnotation(null);
  }, [index]);

  if (!project) return null;

  const src = project.highRes ?? project.image;
  const annotations = project.annotations ?? [];
  const hasAnnotations = annotations.length > 0;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 56) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[80] flex flex-col bg-black/94 text-white backdrop-blur-md outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — lightbox`}
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">
            {project.category} · {project.year}
            {project.location ? ` · ${project.location}` : ""}
          </p>
          <h2 className="mt-0.5 truncate text-lg font-medium tracking-tight">
            {project.title}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {hasAnnotations && (
            <button
              type="button"
              onClick={() => setShowAnnotations((v) => !v)}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors",
                showAnnotations
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
              aria-pressed={showAnnotations}
              aria-label={
                showAnnotations ? "Hide annotations" : "Show annotations"
              }
              title="Toggle annotations (A)"
            >
              <MessageSquare className="size-4" />
            </button>
          )}
          <Link
            to="/work/$id"
            params={{ id: project.id }}
            onClick={onClose}
            className="hidden size-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            aria-label="Open case study"
            title="Open case study"
          >
            <ExternalLink className="size-4" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 md:px-16">
        {src ? (
          <div className="relative max-h-full max-w-full">
            <img
              src={src}
              alt={project.title}
              className="max-h-[min(78vh,52rem)] max-w-full object-contain select-none"
              draggable={false}
            />

            {showAnnotations &&
              hasAnnotations &&
              annotations.map((a, i) => (
                <button
                  key={`${a.label}-${i}`}
                  type="button"
                  className={cn(
                    "absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[11px] font-semibold shadow-md transition-transform",
                    activeAnnotation === i
                      ? "scale-110 border-white bg-white text-black"
                      : "border-white/90 bg-black/55 text-white hover:scale-105",
                  )}
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                  onClick={() =>
                    setActiveAnnotation((prev) => (prev === i ? null : i))
                  }
                  aria-label={a.label}
                >
                  {i + 1}
                </button>
              ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white/15 md:left-6"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white/15 md:right-6"
          aria-label="Next"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-2xl px-6 pb-8 text-center">
        <p className="text-xs font-medium tabular-nums tracking-wide text-white/45">
          {index + 1} / {items.length}
        </p>

        {activeAnnotation != null && annotations[activeAnnotation] ? (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-sm">
            <p className="text-sm font-medium text-white">
              {annotations[activeAnnotation].label}
            </p>
            {annotations[activeAnnotation].body ? (
              <p className="mt-1 text-[15px] leading-relaxed text-white/75">
                {annotations[activeAnnotation].body}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            {project.description}
          </p>
        )}

        <Link
          to="/work/$id"
          params={{ id: project.id }}
          onClick={onClose}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-opacity hover:text-white sm:hidden"
        >
          Open case study
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
