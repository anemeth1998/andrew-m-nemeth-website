import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  getRelatedProjects,
  PROJECTS,
  seriesSlug,
  type Project,
} from "@/data/portfolio";
import { SiteNav } from "@/components/portfolio/site-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { Lightbox } from "@/components/portfolio/lightbox";
import { ProcessGallery } from "@/components/portfolio/process-gallery";
import { ComparisonSlider } from "@/components/portfolio/comparison-slider";
import { cn } from "@/lib/utils";

const FOCUS_KEY = "portfolio-focus-mode";

export function WorkDetail({ project }: { project: Project }) {
  const related = getRelatedProjects(project);
  const notes = project.processNotes ?? [];
  const annotations = project.annotations ?? [];
  const processAssets = project.processAssets ?? [];
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FOCUS_KEY);
      if (stored === "1") setFocusMode(true);
    } catch {
      /* ignore */
    }
  }, []);

  function toggleFocus() {
    setFocusMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(FOCUS_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const lightboxItems = useMemo(() => {
    const sameSeries = project.series
      ? PROJECTS.filter((p) => p.series === project.series && p.image)
      : [];
    const pool =
      sameSeries.length > 1
        ? sameSeries
        : PROJECTS.filter((p) => Boolean(p.image));
    return pool;
  }, [project.series]);

  function openLightbox() {
    const idx = Math.max(
      0,
      lightboxItems.findIndex((p) => p.id === project.id),
    );
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }

  return (
    <div
      className={cn(
        "relative min-h-dvh bg-bg text-fg transition-colors",
        focusMode && "focus-mode",
      )}
    >
      {!focusMode && <SiteNav />}
      <div
        className={cn(
          focusMode
            ? "pt-6"
            : "pt-[calc(var(--grok-banner-h,0px)+4rem)]",
        )}
      >
        <main
          className={cn(
            "section-pad mx-auto pb-20 pt-10",
            focusMode ? "max-w-[var(--focus-measure,42rem)]" : "max-w-[72rem]",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            {!focusMode ? (
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-2 text-sm text-fg-secondary hover:text-fg"
              >
                <ArrowLeft className="size-4" /> All work
              </Link>
            ) : (
              <span className="text-sm text-fg-muted">Reading mode</span>
            )}
            <button
              type="button"
              onClick={toggleFocus}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors",
                focusMode
                  ? "border-fg/20 bg-fg/5 text-fg"
                  : "text-fg-secondary hover:border-border-strong hover:text-fg",
              )}
              aria-pressed={focusMode}
              title={focusMode ? "Exit reading mode" : "Reading mode"}
            >
              {focusMode ? (
                <>
                  <Minimize2 className="size-3.5" /> Exit
                </>
              ) : (
                <>
                  <BookOpen className="size-3.5" /> Focus
                </>
              )}
            </button>
          </div>

          <header className={cn("mt-8", focusMode ? "max-w-none" : "max-w-2xl")}>
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
              {project.category} · {project.year}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <h1
              className={cn(
                "mt-3 font-medium tracking-tight",
                focusMode ? "text-3xl md:text-[2.5rem]" : "text-4xl",
              )}
            >
              {project.title}
            </h1>
            <p
              className={cn(
                "mt-3 text-fg-secondary",
                focusMode ? "text-base leading-relaxed" : "text-lg",
              )}
            >
              {project.tagline}
            </p>
            {project.series ? (
              <p className="mt-2 text-sm text-fg-muted">
                Series ·{" "}
                {!focusMode ? (
                  <Link
                    to="/series/$slug"
                    params={{ slug: seriesSlug(project.series) }}
                    className="underline-offset-2 hover:underline"
                  >
                    {project.series}
                  </Link>
                ) : (
                  project.series
                )}
              </p>
            ) : null}
          </header>

          {project.image ? (
            <figure
              className={cn(
                "relative mt-10 overflow-hidden bg-bg-subtle",
                focusMode && "rounded-xl",
                !focusMode && "rounded-2xl",
              )}
            >
              <div className="relative">
                <img
                  src={project.highRes ?? project.image}
                  alt={project.title}
                  className="mx-auto max-h-[min(80vh,52rem)] w-full object-contain"
                  fetchPriority="high"
                />

                {!focusMode &&
                  annotations.map((a, i) => (
                    <button
                      key={`${a.label}-${i}`}
                      type="button"
                      className={cn(
                        "absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[11px] font-semibold shadow-sm transition-transform",
                        activeAnnotation === i
                          ? "scale-110 border-fg bg-fg text-bg"
                          : "border-fg/80 bg-bg/80 text-fg hover:scale-105",
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

              {!focusMode &&
                activeAnnotation != null &&
                annotations[activeAnnotation] ? (
                <figcaption className="border-t border-border bg-bg-elevated px-5 py-4">
                  <p className="text-sm font-medium">
                    {annotations[activeAnnotation].label}
                  </p>
                  {annotations[activeAnnotation].body ? (
                    <p className="mt-1 text-[15px] leading-relaxed text-fg-secondary">
                      {annotations[activeAnnotation].body}
                    </p>
                  ) : null}
                </figcaption>
              ) : null}

              {!focusMode && (
                <div className="absolute right-3 top-3">
                  <button
                    type="button"
                    onClick={openLightbox}
                    className="flex size-10 items-center justify-center rounded-full border border-border bg-bg/80 text-fg backdrop-blur-sm transition-colors hover:bg-bg"
                    aria-label="Open immersive view"
                    title="Immersive view"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              )}
            </figure>
          ) : null}

          {!focusMode && project.comparison ? (
            <ComparisonSlider pair={project.comparison} />
          ) : null}

          <div
            className={cn(
              "mt-10",
              focusMode ? "space-y-8" : "grid gap-12 md:grid-cols-2",
            )}
          >
            <div className="space-y-4">
              <p className="text-[17px] leading-relaxed text-fg-secondary">
                {project.description}
              </p>
              {project.technique?.length ? (
                <p className="text-sm text-fg-muted">
                  {project.technique.join(" · ")}
                </p>
              ) : null}
              {project.themes?.length ? (
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {project.themes.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-bg-subtle px-2.5 py-1 text-[11px] font-medium text-fg-secondary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
              {project.camera?.notes ? (
                <p className="border-t border-border pt-4 text-[15px] leading-relaxed text-fg-secondary">
                  {project.camera.notes}
                </p>
              ) : null}
            </div>

            {!focusMode && (
              <div className="space-y-6">
                {notes.length ? (
                  <section>
                    <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                      Process
                    </h2>
                    <div className="mt-4 space-y-6">
                      {notes.map((n) => (
                        <div key={n.title}>
                          <h3 className="font-medium">{n.title}</h3>
                          <p className="mt-1 text-[15px] leading-relaxed text-fg-secondary">
                            {n.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : (
                  <p className="text-sm text-fg-muted">
                    Process notes for this piece are still being written.
                  </p>
                )}
                {project.reflection ? (
                  <blockquote className="rounded-xl border border-border bg-bg-elevated p-5 text-[15px] leading-relaxed text-fg-secondary">
                    {project.reflection}
                  </blockquote>
                ) : null}
              </div>
            )}
          </div>

          {!focusMode && processAssets.length > 0 ? (
            <ProcessGallery assets={processAssets} />
          ) : null}

          {!focusMode && related.length > 0 ? (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                Related work
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/work/$id"
                      params={{ id: r.id }}
                      className="group block overflow-hidden rounded-xl border border-border bg-bg-elevated hover:border-border-strong"
                    >
                      {r.image ? (
                        <img
                          src={r.image}
                          alt=""
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                      <div className="flex items-center justify-between gap-2 p-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-fg-muted">
                            {r.category}
                          </p>
                          <p className="font-medium">{r.title}</p>
                        </div>
                        <ArrowUpRight className="size-4 text-fg-muted group-hover:text-fg" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </main>
        {!focusMode && <SiteFooter />}
      </div>

      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}
