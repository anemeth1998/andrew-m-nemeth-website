import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  PROJECTS,
  SERIES,
  YEARS,
  type MediaCategory,
} from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/project-card";
import { useReveal } from "@/hooks/use-reveal";

type Facets = {
  categories: MediaCategory[];
  years: string[];
  series: string[];
};

const emptyFacets: Facets = { categories: [], years: [], series: [] };

export function Projects() {
  const [facets, setFacets] = useState<Facets>(emptyFacets);

  const filterKey = useMemo(() => {
    const parts = [
      ...facets.categories.slice().sort(),
      ...facets.years.slice().sort(),
      ...facets.series.slice().sort(),
    ];
    return parts.join(",") || "all";
  }, [facets]);

  const ref = useReveal<HTMLElement>("0px 0px -6% 0px", filterKey);
  const featured = useMemo(() => PROJECTS.filter((p) => p.featured), []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (
        facets.categories.length > 0 &&
        !facets.categories.includes(p.category)
      ) {
        return false;
      }
      if (facets.years.length > 0 && !facets.years.includes(p.year)) {
        return false;
      }
      if (
        facets.series.length > 0 &&
        (!p.series || !facets.series.includes(p.series))
      ) {
        return false;
      }
      return true;
    });
  }, [facets]);

  const activeCount =
    facets.categories.length + facets.years.length + facets.series.length;

  function toggleCategory(cat: MediaCategory) {
    setFacets((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }

  function toggleYear(year: string) {
    setFacets((prev) => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter((y) => y !== year)
        : [...prev.years, year],
    }));
  }

  function toggleSeries(s: string) {
    setFacets((prev) => ({
      ...prev,
      series: prev.series.includes(s)
        ? prev.series.filter((x) => x !== s)
        : [...prev.series, s],
    }));
  }

  function clearAll() {
    setFacets(emptyFacets);
  }

  return (
    <section
      id="work"
      ref={ref}
      className="relative scroll-mt-24 border-t border-border bg-bg"
    >
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
              Full-bleed modules, then the archive — filterable by type, year,
              and series.
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
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <FilterRow label="Type">
              {CATEGORIES.map((cat) => {
                const on = facets.categories.includes(cat);
                return (
                  <Chip key={cat} active={on} onClick={() => toggleCategory(cat)}>
                    {cat}
                  </Chip>
                );
              })}
            </FilterRow>

            <FilterRow label="Year">
              {YEARS.map((year) => {
                const on = facets.years.includes(year);
                return (
                  <Chip key={year} active={on} onClick={() => toggleYear(year)}>
                    {year}
                  </Chip>
                );
              })}
            </FilterRow>

            {SERIES.length > 0 && (
              <FilterRow label="Series">
                {SERIES.map((s) => {
                  const on = facets.series.includes(s);
                  return (
                    <Chip key={s} active={on} onClick={() => toggleSeries(s)}>
                      {s}
                    </Chip>
                  );
                })}
              </FilterRow>
            )}

            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-fg-muted hover:text-fg"
              >
                <X className="size-3.5" />
                Clear filters
              </button>
            )}
          </div>
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
          <p className="mt-12 text-center text-sm text-fg-muted">
            No pieces match these filters.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-14 shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
        active
          ? "bg-fg text-bg"
          : "border border-border bg-transparent text-fg-secondary hover:border-fg hover:text-fg",
      )}
    >
      {children}
    </button>
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
