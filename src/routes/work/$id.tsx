import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProjectById, SITE } from "@/data/portfolio";
import { WorkDetail } from "@/components/portfolio/work-detail";

export const Route = createFileRoute("/work/$id")({
  loader: ({ params }) => {
    const project = getProjectById(params.id);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const title = project
      ? `${project.title} — ${SITE.name}`
      : `Work — ${SITE.name}`;
    const description = project?.description ?? SITE.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: WorkPage,
  notFoundComponent: WorkNotFound,
});

function WorkPage() {
  const { project } = Route.useLoaderData();
  return <WorkDetail project={project} />;
}

function WorkNotFound() {
  return (
    <main className="section-pad mx-auto flex min-h-dvh max-w-lg flex-col justify-center py-24">
      <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Not found
      </p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-fg">
        This work isn’t in the archive.
      </h1>
      <p className="mt-3 text-fg-secondary">
        It may have been renamed or removed. Head back to the full grid.
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
