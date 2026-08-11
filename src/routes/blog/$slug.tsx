import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/data/blog";
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
    const title = loaderData?.post
      ? `${loaderData.post.title} — Andrew M. Németh`
      : "Blog — Andrew M. Németh";
    const description = loaderData?.post?.excerpt;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const ref = useReveal<HTMLElement>();

  return (
    <PortfolioShell>
      <main>
        <article
          ref={ref}
          className="section-pad mx-auto max-w-[72rem] py-14 md:py-20"
        >
          <div className="reveal max-w-[40rem]">
            <Link
              to="/"
              hash="blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-accent-deep"
            >
              <ArrowLeft className="size-3.5" />
              Back to Blog
            </Link>

            <p className="mt-10 text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
              Blog
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              {post.title}
            </h1>
            <time
              dateTime={post.date}
              className="mt-4 block text-sm tabular-nums text-fg-muted"
            >
              {post.dateLabel}
            </time>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-bg-subtle px-2.5 py-0.5 text-[11px] font-medium text-fg-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

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

            {post.sourceUrl && (
              <footer className="mt-12 border-t border-border pt-8">
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-75"
                >
                  <XLogo className="size-[0.95em]" title="𝕏" />
                  <span>{post.sourceLabel ?? "Original on 𝕏"}</span>
                </a>
              </footer>
            )}
          </div>
        </article>
      </main>
    </PortfolioShell>
  );
}
