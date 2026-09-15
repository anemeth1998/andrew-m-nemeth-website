import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/data/blog";
import { SITE } from "@/data/portfolio";
import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { XLogo } from "@/components/icons/x-logo";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — ${SITE.name}` : `Blog — ${SITE.name}`;
    const description = post?.excerpt ?? SITE.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const ref = useReveal<HTMLElement>();

  return (
    <PortfolioShell>
      <main>
        <article
          ref={ref}
          className="section-pad mx-auto max-w-[72rem] pb-20 pt-10 md:pb-24"
        >
          <div className="reveal mx-auto max-w-[42rem]">
            <Link
              to="/"
              hash="blog"
              className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" /> Blog
            </Link>

            <header className="mt-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                Essay ·{" "}
                <time dateTime={post.date} className="tabular-nums">
                  {post.dateLabel}
                </time>
              </p>
              <h1 className="mt-3 text-4xl font-medium tracking-tight text-fg">
                {post.title}
              </h1>
              <p className="mt-4 text-[17px] leading-relaxed text-fg-secondary">
                {post.excerpt}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-bg-subtle px-2.5 py-0.5 text-[11px] font-medium text-fg-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </header>

            <div className="mt-10 space-y-6 border-t border-border pt-10">
              {post.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-lg leading-relaxed text-fg-secondary md:text-[1.15rem] md:leading-[1.7]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <footer className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              {post.sourceUrl ? (
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-75"
                >
                  <XLogo className="size-[0.95em]" title="𝕏" />
                  <span>{post.sourceLabel ?? "Original on 𝕏"}</span>
                </a>
              ) : (
                <span />
              )}
              <Link
                to="/"
                hash="blog"
                className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg"
              >
                <ArrowLeft className="size-4" /> All essays
              </Link>
            </footer>
          </div>
        </article>
      </main>
    </PortfolioShell>
  );
}

function BlogPostNotFound() {
  return (
    <main className="section-pad mx-auto flex min-h-dvh max-w-lg flex-col justify-center py-24">
      <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Not found
      </p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-fg">
        This essay isn’t on the blog.
      </h1>
      <p className="mt-3 text-fg-secondary">
        It may have been renamed or moved. Head back to the list.
      </p>
      <a
        href="/#blog"
        className="mt-8 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
      >
        ← All essays
      </a>
    </main>
  );
}
