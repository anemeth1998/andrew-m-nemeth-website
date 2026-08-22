import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, PROJECTS, type MediaCategory } from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/project-card";
import { useReveal } from "@/hooks/use-reveal";

export function Projects() {
  const [selected, setSelected] = useState<MediaCategory[]>([]);
  const filterKey = selected.slice().sort().join(",") || "all";
  const ref = useReveal<HTMLElement>("0px 0px -6% 0px", filterKey);
  const featured = useMemo(() => PROJECTS.filter((p) => p.featured), []);
  const filtered = useMemo(() => {
    if (selected.length === 0) return PROJECTS;
    return PROJECTS.filter((p) => selected.includes(p.category));
  }, [selected]);

  function toggle(cat: MediaCategory) {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  return (
    <section id="work" ref={ref} className="relative scroll-mt-24 border-t border-border bg-bg">
      <div className="section-pad mx-auto max-w-[72rem] pt-16 md:pt-24">
        <div className="reveal">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
            Selected work
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-[18ch] text-3xl font-medium tracking-tight text-fg">
              Stronger pieces, first
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-fg-secondary">
              Full-bleed modules, then the archive — filterable by type.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-3 px-3 md:grid-cols-2">
        {featured.map((project) => (
          <FeatureModule key={project.id} project={project} />
        ))}
      </div>

      <div className="section-pad mx-auto max-w-[72rem] pb-16 md:pb-24">
        <div className="reveal mt-20 border-t border-border pt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                Archive
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-fg md:text-3xl">
                All work
              </h2>
            </div>
            <p className="text-sm text-fg-muted tabular-nums">
              {filtered.length} of {PROJECTS.length}
              {selected.length > 0 && (
                <span className="text-fg-secondary"> · {selected.join(", ")}</span>
              )}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by medium">
            <button
              type="button"
              onClick={() => setSelected([])}
              aria-pressed={selected.length === 0}
              className={cn(
                "min-h-10 rounded-full px-4 text-sm font-medium",
                "transition-[background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-apple)]",
                selected.length === 0
                  ? "bg-accent text-accent-fg"
                  : "border border-border bg-transparent text-fg-secondary hover:border-fg hover:text-fg",
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const active = selected.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggle(cat)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-10 rounded-full px-4 text-sm font-medium",
                    "transition-[background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-apple)]",
                    active
                      ? "bg-fg text-bg"
                      : "border border-border bg-transparent text-fg-secondary hover:border-fg hover:text-fg",
                  )}
                >
                  {cat}
                </button>
              );
            })}
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-fg-muted hover:text-fg"
              >
                <X className="size-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={`${filterKey}-${project.id}`} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureModule({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="reveal flex min-h-[32rem] flex-col overflow-hidden rounded-2xl bg-bg-elevated text-center md:min-h-[40rem]">
      <div className="flex flex-col items-center px-6 pb-4 pt-12 md:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-fg-muted">
          {project.category}
        </p>
        <h3 className="mt-3 text-3xl font-medium tracking-tight text-fg md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg-secondary">
          {project.tagline}
        </p>
        <Link
          to="/work/$id"
          params={{ id: project.id }}
          className="mt-4 inline-flex items-center text-[15px] font-medium text-fg transition-opacity hover:opacity-70"
        >
          View
          <ChevronRight className="size-4" />
        </Link>
      </div>
      <Link
        to="/work/$id"
        params={{ id: project.id }}
        className="relative mx-auto mt-auto block w-full max-w-xl flex-1 overflow-hidden px-6 pb-10"
        aria-label={`Open ${project.title}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="mx-auto h-full max-h-[22rem] w-full object-contain transition-transform duration-[var(--motion-medium)] ease-[var(--ease-out-soft)] hover:scale-[1.03] md:max-h-[26rem]"
            loading="lazy"
          />
        ) : null}
      </Link>
    </article>
  );
}
