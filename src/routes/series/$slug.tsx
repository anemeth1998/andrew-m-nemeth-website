import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  getProjectsBySeries,
  getSeriesBySlug,
  getSeriesMeta,
  SITE,
} from "@/data/portfolio";
import { SeriesView } from "@/components/portfolio/series-view";

export const Route = createFileRoute("/series/$slug")({
  loader: ({ params }) => {
    const name = getSeriesBySlug(params.slug);
    if (!name) throw notFound();
    const projects = getProjectsBySeries(name);
    if (projects.length === 0) throw notFound();
    const meta = getSeriesMeta(name);
    return { name, projects, meta, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Series";
    const title = `${name} — ${SITE.name}`;
    const description =
      loaderData?.meta?.blurb ??
      `Series: ${name} — work by ${SITE.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SeriesPage,
  notFoundComponent: SeriesNotFound,
});

function SeriesPage() {
  const { name, projects, meta } = Route.useLoaderData();
  return <SeriesView name={name} projects={projects} meta={meta} />;
}

function SeriesNotFound() {
  return (
    <main className="section-pad mx-auto flex min-h-dvh max-w-lg flex-col justify-center py-24">
      <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Not found
      </p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-fg">
        This series isn’t in the archive.
      </h1>
      <p className="mt-3 text-fg-secondary">
        It may have been renamed. Head back to the full grid.
      </p>
      <a
        href="/#work"
        className="mt-8 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
      >
        ← All work
      </a>
    </main>
  );
}
