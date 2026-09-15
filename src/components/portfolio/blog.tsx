import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/data/blog";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Blog() {
  const ref = useReveal<HTMLElement>();
  const posts = getAllPosts();

  return (
    <section
      id="blog"
      ref={ref}
      className="section-pad scroll-mt-24 border-t border-border bg-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-[72rem]">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
              Blog
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-fg">
              Essays
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
              Longer pieces live here. Shorter notes and the running
              conversation stay on 𝕏.
            </p>
          </div>
          <a
            href="/#writing"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg transition-opacity hover:opacity-70"
          >
            Short-form on 𝕏
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className="reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className={cn(
                  "group -mx-3 flex flex-col gap-3 rounded-lg px-3 py-7 sm:-mx-4 sm:flex-row sm:items-start sm:gap-8 sm:px-4",
                  "transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle",
                )}
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 pt-1 text-xs font-medium tabular-nums tracking-wide text-fg-muted sm:w-28"
                >
                  {post.dateLabel}
                </time>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent-deep">
                      {post.title}
                    </h3>
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                        "border border-border bg-bg-elevated text-fg",
                        "transition-[background-color,color,border-color,transform] duration-[var(--motion-quick)]",
                        "group-hover:-translate-y-0.5 group-hover:border-fg group-hover:bg-fg group-hover:text-bg-elevated",
                      )}
                      aria-hidden
                    >
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                  <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-secondary">
                    {post.excerpt}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-bg-subtle px-2.5 py-0.5 text-[11px] font-medium text-fg-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
