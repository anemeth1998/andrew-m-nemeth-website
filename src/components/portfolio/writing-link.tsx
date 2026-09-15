import { SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /**
   * `blog` (default) — the on-site Blog, home for longer essays.
   * `articles` / `handle` / `mark` — 𝕏 surfaces for short-form and syndication.
   */
  label?: "blog" | "articles" | "handle" | "mark";
};

export function WritingLink({ className, label = "blog" }: Props) {
  const base = "inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-75";

  if (label === "blog") {
    return (
      <a href="/#blog" className={cn(base, className)}>
        <span>Read the Blog</span>
      </a>
    );
  }

  return (
    <a
      href={SOCIAL.x.articlesHref}
      target="_blank"
      rel="noreferrer"
      className={cn(base, className)}
    >
      <XLogo className="size-[0.95em]" title="𝕏" />
      {label === "articles" && <span>Articles on 𝕏</span>}
      {label === "handle" && <span>{SOCIAL.x.handle}</span>}
      {label === "mark" && <span className="sr-only">𝕏 Articles</span>}
    </a>
  );
}
