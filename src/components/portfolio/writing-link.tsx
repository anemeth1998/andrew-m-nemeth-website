import { Link } from "@tanstack/react-router";
import { SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /**
   * `blog` — on-site Blog (default).
   * `articles` / `handle` / `mark` — 𝕏 surfaces for syndication.
   */
  label?: "blog" | "articles" | "handle" | "mark";
};

/** Link to on-site Blog, or optionally to 𝕏 for short-form / syndication. */
export function WritingLink({ className, label = "blog" }: Props) {
  if (label === "blog") {
    return (
      <Link
        to="/"
        hash="blog"
        className={cn(
          "inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-75",
          className,
        )}
      >
        <span>Blog</span>
      </Link>
    );
  }

  return (
    <a
      href={SOCIAL.x.articlesHref}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-75",
        className,
      )}
    >
      <XLogo className="size-[0.95em]" title="𝕏" />
      {label === "articles" && <span>Articles on 𝕏</span>}
      {label === "handle" && <span>{SOCIAL.x.handle}</span>}
      {label === "mark" && <span className="sr-only">𝕏 Articles</span>}
    </a>
  );
}
