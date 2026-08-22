import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project, SeriesMeta } from "@/data/portfolio";
import { SiteNav } from "@/components/portfolio/site-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";

type Props = {
  name: string;
  projects: Project[];
  meta?: SeriesMeta;
};

export function SeriesView({ name, projects, meta }: Props) {
  const years = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <SiteNav />
      <div className="pt-[calc(var(--grok-banner-h,0px)+4rem)]">
        <main className="section-pad mx-auto max-w-[72rem] pb-20 pt-10">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm text-fg-secondary hover:text-fg"
          >
            <ArrowLeft className="size-4" /> All work
          </Link>

          <header className="mt-8 max-w-2xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
              Series · {projects.length}{" "}
              {projects.length === 1 ? "piece" : "pieces"}
              {years.length ? ` · ${years.join("–")}` : ""}
            </p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight">{name}</h1>
            {meta?.blurb ? (
              <p className="mt-4 text-[17px] leading-relaxed text-fg-secondary">
                {meta.blurb}
              </p>
            ) : null}
          </header>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.id}>
                <Link
                  to="/work/$id"
                  params={{ id: p.id }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors hover:border-border-strong"
                >
                  {p.image ? (
                    <div className="aspect-[4/3] overflow-hidden bg-bg-subtle">
                      <img
                        src={p.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-[var(--motion-medium)] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-[4/3]"
                      style={{ background: p.art }}
                    />
                  )}
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-fg-muted">
                        {p.category} · {p.year}
                      </p>
                      <p className="mt-0.5 font-medium tracking-tight">
                        {p.title}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-fg-secondary">
                        {p.tagline}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-fg-muted transition-colors group-hover:text-fg" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
