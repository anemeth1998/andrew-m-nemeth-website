import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getRelatedProjects, type Project } from "@/data/portfolio";
import { SiteNav } from "@/components/portfolio/site-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";

export function WorkDetail({ project }: { project: Project }) {
  const related = getRelatedProjects(project);
  const notes = project.processNotes ?? [];
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <SiteNav />
      <div className="pt-[calc(var(--grok-banner-h,0px)+4rem)]">
        <main className="section-pad mx-auto max-w-[72rem] pb-20 pt-10">
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm text-fg-secondary hover:text-fg">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <header className="mt-8 max-w-2xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
              {project.category} · {project.year}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight">{project.title}</h1>
            <p className="mt-3 text-lg text-fg-secondary">{project.tagline}</p>
          </header>
          {project.image ? (
            <figure className="mt-10 overflow-hidden rounded-2xl bg-bg-subtle">
              <img src={project.highRes ?? project.image} alt={project.title} className="mx-auto max-h-[min(80vh,52rem)] w-full object-contain" fetchPriority="high" />
            </figure>
          ) : null}
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-[17px] leading-relaxed text-fg-secondary">{project.description}</p>
              {project.technique?.length ? (
                <p className="text-sm text-fg-muted">{project.technique.join(" · ")}</p>
              ) : null}
              {project.camera?.notes ? (
                <p className="text-[15px] leading-relaxed text-fg-secondary border-t border-border pt-4">{project.camera.notes}</p>
              ) : null}
            </div>
            <div className="space-y-6">
              {notes.length ? (
                <section>
                  <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">Process</h2>
                  <div className="mt-4 space-y-6">
                    {notes.map((n) => (
                      <div key={n.title}>
                        <h3 className="font-medium">{n.title}</h3>
                        <p className="mt-1 text-[15px] leading-relaxed text-fg-secondary">{n.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <p className="text-sm text-fg-muted">Process notes for this piece are still being written.</p>
              )}
              {project.reflection ? (
                <blockquote className="rounded-xl border border-border bg-bg-elevated p-5 text-[15px] leading-relaxed text-fg-secondary">
                  {project.reflection}
                </blockquote>
              ) : null}
            </div>
          </div>
          {related.length > 0 ? (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">Related work</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link to="/work/$id" params={{ id: r.id }} className="group block overflow-hidden rounded-xl border border-border bg-bg-elevated hover:border-border-strong">
                      {r.image ? <img src={r.image} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" /> : null}
                      <div className="flex items-center justify-between gap-2 p-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-fg-muted">{r.category}</p>
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
        <SiteFooter />
      </div>
    </div>
  );
}
