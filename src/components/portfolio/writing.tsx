import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import { XFollowButton, XTweetButton } from "@/components/portfolio/x-embed";
import { useReveal } from "@/hooks/use-reveal";
import type { OwnedFeed, OwnedPost } from "@/lib/x-owned-feed";

export function Writing() {
  const ref = useReveal<HTMLElement>();
  const [feed, setFeed] = useState<OwnedFeed | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/x-feed")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: OwnedFeed | null) => {
        if (!cancelled && data) setFeed(data);
      })
      .catch(() => {
        /* stay on the profile card */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = feed?.posts ?? [];

  return (
    <section
      id="writing"
      ref={ref}
      className="section-pad scroll-mt-24 border-t border-border bg-bg py-16 md:py-24"
    >
      <div className="reveal mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            Writing
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-fg">
            On 𝕏
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Longer pieces live as Articles. Notes live on the profile, and
            here when the feed is connected.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-bg-elevated p-6">
            <div className="flex items-center gap-3">
              <img
                src="/x/avatar.jpg"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium tracking-tight">{SITE.name}</p>
                <p className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
                  <XLogo className="size-3.5" />
                  {SOCIAL.x.handle}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <XFollowButton />
              <XTweetButton />
              <a
                href={SOCIAL.x.articlesHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-fg"
              >
                Articles
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {posts.length > 0 ? (
            <ol className="divide-y divide-border rounded-2xl border border-border bg-bg-elevated">
              {posts.map((post) => (
                <li key={post.id}>
                  <Note post={post} />
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex min-h-48 items-center rounded-2xl border border-dashed border-border px-6 py-10">
              <p className="max-w-sm text-[15px] leading-relaxed text-fg-secondary">
                {feed?.configured
                  ? "No original posts in the last fetch. Replies stay off this list."
                  : "Notes stay on the profile until the feed is connected."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Note({ post }: { post: OwnedPost }) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noreferrer"
      className="block px-5 py-5 transition-colors hover:bg-bg-subtle"
    >
      <time
        className="text-[12px] font-medium uppercase tracking-[0.12em] text-fg-muted"
        dateTime={post.createdAt}
      >
        {formatDate(post.createdAt)}
      </time>
      <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-fg">
        {clip(post.text)}
      </p>
    </a>
  );
}

function formatDate(iso: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function clip(text: string, max = 280) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}
