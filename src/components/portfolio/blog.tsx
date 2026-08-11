import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, SOCIAL } from "@/data/portfolio";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { WritingLink } from "@/components/portfolio/writing-link";

export function Blog() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="blog"
      ref={ref}
      className="section-pad scroll-mt-24 border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-[72rem]">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
              Blog
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">
              Notes & writing
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
              Short pieces on teaching, study, and making—kept light on this
              site. Longer essays still appear on 𝕏 when they need more room.
            </p>
          </div>
          <WritingLink className="reveal shrink-0 text-sm font-medium text-accent" />
        </div>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {BLOG_POSTS.map((post, i) => {
            const href = post.href ?? SOCIAL.x.articlesHref;
            const external =
              post.external ?? /^https?:\/\//i.test(href);


            return (
              <li
                key={post.id}
                className="reveal"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={cn(
                    "group flex flex-col gap-3 py-7 transition-colors sm:flex-row sm:items-start sm:gap-8",
                    "hover:bg-bg-subtle/80 -mx-3 rounded-lg px-3 sm:-mx-4 sm:px-4",
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
                      <h3 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-deep">
                        {post.title}
                      </h3>
                      <span
                        className={cn(
                          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                          "border border-border bg-bg-elevated text-fg",
                          "transition-[background-color,color,border-color,transform] duration-[var(--motion-quick)]",
                          "group-hover:border-fg group-hover:bg-fg group-hover:text-bg-elevated group-hover:-translate-y-0.5",
                        )}
                        aria-hidden
                      >
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                    <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-fg-secondary">
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
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
