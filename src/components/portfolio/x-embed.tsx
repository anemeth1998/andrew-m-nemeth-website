import { Fragment, type ReactNode } from "react";
import { ArrowUpRight, FileText, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { SITE, SOCIAL } from "@/data/portfolio";
import { X_TIMELINE, xPostUrl, type XPost } from "@/data/x-timeline";
import { XLogo } from "@/components/icons/x-logo";
import { cn } from "@/lib/utils";

export function XFollowButton({ className }: { className?: string }) {
  return (
    <a
      href="https://x.com/intent/follow?screen_name=AndrewMNemeth"
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-10 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-80",
        className,
      )}
    >
      Follow {SOCIAL.x.handle}
    </a>
  );
}

/* ————— Native timeline (owned-read snapshot, no widgets.js) ————— */

const POST_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const FULL_DATE = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

type Segment = { kind: "text"; value: string } | { kind: "link"; display: string; href: string };

/** Splits raw post text on t.co tokens, dropping hidden (media/article) placeholders. */
function splitByLinks(post: XPost): Segment[] {
  let segments: Segment[] = [{ kind: "text", value: post.text }];

  for (const link of post.links ?? []) {
    segments = segments.flatMap((segment) => {
      if (segment.kind !== "text" || !segment.value.includes(link.token)) return [segment];
      const parts = segment.value.split(link.token);
      const out: Segment[] = [];
      parts.forEach((part, i) => {
        if (part) out.push({ kind: "text", value: part });
        if (i < parts.length - 1 && !link.hidden) {
          out.push({ kind: "link", display: link.display, href: link.href });
        }
      });
      return out;
    });
  }

  // Hidden tokens sit at the end of the text; trim the whitespace they leave behind.
  while (segments.length > 0) {
    const last = segments[segments.length - 1];
    if (last.kind !== "text") break;
    const trimmed = last.value.trimEnd();
    if (trimmed) {
      segments[segments.length - 1] = { kind: "text", value: trimmed };
      break;
    }
    segments.pop();
  }

  return segments;
}

const MENTION_RE = /(^|[^A-Za-z0-9_@])@([A-Za-z0-9_]{1,15})/g;

function linkifyMentions(value: string): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  MENTION_RE.lastIndex = 0;

  while ((match = MENTION_RE.exec(value)) !== null) {
    const [, prefix, handle] = match;
    const start = match.index + prefix.length;
    if (start > cursor) nodes.push(value.slice(cursor, start));
    nodes.push(
      <a
        key={`${start}-${handle}`}
        href={`https://x.com/${handle}`}
        target="_blank"
        rel="noreferrer"
        className="text-accent transition-opacity hover:opacity-80"
      >
        @{handle}
      </a>,
    );
    cursor = start + handle.length + 1;
  }

  if (nodes.length === 0) return value;
  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

function PostText({ post }: { post: XPost }) {
  const segments = splitByLinks(post);
  return (
    <p className="whitespace-pre-line text-sm leading-relaxed text-fg">
      {segments.map((segment, i) =>
        segment.kind === "link" ? (
          <a
            key={i}
            href={segment.href}
            target="_blank"
            rel="noreferrer"
            className="break-all text-accent transition-opacity hover:opacity-80"
          >
            {segment.display}
          </a>
        ) : (
          <Fragment key={i}>{linkifyMentions(segment.value)}</Fragment>
        ),
      )}
    </p>
  );
}

function PostMedia({ post }: { post: XPost }) {
  if (!post.media?.length) return null;
  const multiple = post.media.length > 1;

  return (
    <a
      href={xPostUrl(post)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "mt-3 grid gap-1 overflow-hidden rounded-xl border border-border",
        multiple && "grid-cols-3",
      )}
    >
      {post.media.map((m) => (
        <img
          key={m.url}
          src={`${m.url}?name=small`}
          alt={m.alt ?? ""}
          width={m.width}
          height={m.height}
          loading="lazy"
          className={cn(
            "w-full bg-bg-subtle object-cover",
            multiple ? "aspect-square" : "max-h-96",
          )}
          style={multiple ? undefined : { aspectRatio: `${m.width} / ${m.height}` }}
        />
      ))}
    </a>
  );
}

function PostArticleCard({ post }: { post: XPost }) {
  if (!post.articleTitle) return null;
  return (
    <a
      href={xPostUrl(post)}
      target="_blank"
      rel="noreferrer"
      className="mt-3 flex items-start gap-3 rounded-xl border border-border bg-bg-subtle p-4 transition-colors hover:border-border-strong"
    >
      <FileText className="mt-0.5 size-4 shrink-0 text-fg-muted" />
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
          Article on 𝕏
        </span>
        <span className="mt-1 block text-sm font-medium leading-snug text-fg">
          {post.articleTitle}
        </span>
      </span>
    </a>
  );
}

function PostCard({ post }: { post: XPost }) {
  const href = xPostUrl(post);
  const created = new Date(post.createdAt);

  return (
    <article className="px-5 py-4">
      <PostText post={post} />
      <PostArticleCard post={post} />
      <PostMedia post={post} />
      <footer className="mt-3 flex items-center gap-4 text-xs text-fg-muted">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          title={FULL_DATE.format(created)}
          className="font-medium transition-colors hover:text-fg"
        >
          <time dateTime={post.createdAt}>{POST_DATE.format(created)}</time>
        </a>
        {post.replies > 0 && (
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="size-3.5" aria-hidden />
            {post.replies}
            <span className="sr-only"> replies</span>
          </span>
        )}
        {post.reposts > 0 && (
          <span className="inline-flex items-center gap-1">
            <Repeat2 className="size-3.5" aria-hidden />
            {post.reposts}
            <span className="sr-only"> reposts</span>
          </span>
        )}
        {post.likes > 0 && (
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5" aria-hidden />
            {post.likes}
            <span className="sr-only"> likes</span>
          </span>
        )}
      </footer>
    </article>
  );
}

/**
 * Native, design-matched timeline of recent posts.
 * Rendered from an owned-read API snapshot — no third-party script, no iframe,
 * SSR-friendly and immune to content blockers.
 */
export function XTimeline({ className }: { className?: string }) {
  return (
    <section
      aria-label={`Latest posts from ${SOCIAL.x.handle} on 𝕏`}
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-bg-elevated",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/x/avatar.jpg"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium tracking-tight text-fg">Latest posts</p>
            <a
              href={SOCIAL.x.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-fg-muted transition-colors hover:text-fg"
            >
              {SOCIAL.x.handle}
            </a>
          </div>
        </div>
        <XLogo className="size-4 text-fg-muted" title="" />
      </header>

      <ol className="max-h-[560px] divide-y divide-border overflow-y-auto overscroll-contain">
        {X_TIMELINE.posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ol>

      <footer className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
        <p className="text-xs text-fg-subtle">
          Snapshot · {FULL_DATE.format(new Date(X_TIMELINE.fetchedAt))}
        </p>
        <a
          href={SOCIAL.x.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-fg transition-opacity hover:opacity-70"
        >
          View live on 𝕏
          <ArrowUpRight className="size-3.5" />
        </a>
      </footer>
    </section>
  );
}

export function XTweetButton({ className }: { className?: string }) {
  const href = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `${SITE.name} — drawing, photography, software, and hybrid work.`,
  )}&via=AndrewMNemeth`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-fg",
        className,
      )}
    >
      Share
    </a>
  );
}
