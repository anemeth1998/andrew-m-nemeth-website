import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  PROJECTS,
  type MediaCategory,
  type Project,
} from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/project-card";
import { useReveal } from "@/hooks/use-reveal";

export function Projects() {
  const [selected, setSelected] = useState<MediaCategory[]>([]);
  const filterKey = selected.slice().sort().join(",") || "all";
  const ref = useReveal<HTMLElement>("0px 0px -6% 0px", filterKey);

  const featured = useMemo(
    () => PROJECTS.filter((p) => p.featured),
    [],
  );

  const filtered = useMemo(() => {
    if (selected.length === 0) return PROJECTS;
    return PROJECTS.filter((p) => selected.includes(p.category));
  }, [selected]);

  function toggle(cat: MediaCategory) {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function clearFilters() {
    setSelected([]);
  }

  function selectOnly(cat: MediaCategory) {
    setSelected([cat]);
  }

  return (
    <section
      id="work"
      ref={ref}
      className="section-pad relative scroll-mt-24 border-t border-border bg-bg-subtle/90 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[72rem]">
        <div className="reveal">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            Selected work
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight text-fg">
              Stronger pieces, first
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-fg-secondary">
              A short row of work that holds up across mediums—then the full
              archive below, filterable by type.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, i) => (
            <FeaturedCell key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="reveal mt-20 border-t border-border pt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
                Archive
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                All work
              </h2>
            </div>
            <p className="text-sm text-fg-muted tabular-nums">
              {filtered.length} of {PROJECTS.length}
              {selected.length > 0 && (
                <span className="text-fg-secondary">
                  {" "}
                  · {selected.join(", ")}
                </span>
              )}
            </p>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter by medium"
          >
            <button
              type="button"
              onClick={clearFilters}
              aria-pressed={selected.length === 0}
              className={cn(
                "min-h-10 rounded-full px-4 text-sm font-medium",
                "transition-[background-color,color,box-shadow,border-color,transform] duration-[var(--motion-quick)] ease-[var(--ease-apple)]",
                selected.length === 0
                  ? "bg-accent text-accent-fg shadow-btn-primary"
                  : "border border-border bg-bg-elevated text-fg-secondary shadow-sm hover:border-accent/30 hover:bg-accent-soft hover:text-accent-deep",
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
                  onDoubleClick={() => selectOnly(cat)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-10 rounded-full px-4 text-sm font-medium",
                    "transition-[background-color,color,box-shadow,border-color,transform] duration-[var(--motion-quick)] ease-[var(--ease-apple)]",
                    active
                      ? "bg-fg text-bg-elevated shadow-sm"
                      : "border border-border bg-bg-elevated text-fg-secondary shadow-sm hover:border-accent/30 hover:bg-accent-soft hover:text-accent-deep",
                  )}
                >
                  {cat}
                </button>
              );
            })}
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className={cn(
                  "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium",
                  "text-fg-muted transition-colors hover:text-accent-deep",
                )}
              >
                <X className="size-3.5" />
                Clear
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-fg-subtle">
            Select one or more mediums. Clear returns to the full grid.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard
              key={`${filterKey}-${project.id}`}
              project={project}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-fg-muted">No work matches those filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm font-medium text-accent transition-colors hover:text-accent-deep"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCell({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className={cn(index === 0 && "sm:col-span-2 lg:col-span-2")}>
      <ProjectCard project={project} index={index} featured={index === 0} />
    </div>
  );
}
