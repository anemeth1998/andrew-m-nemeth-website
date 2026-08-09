import { SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Default: logo + “Articles”. */
  label?: "articles" | "handle" | "mark";
};

export function WritingLink({ className, label = "articles" }: Props) {
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
      {label === "articles" && <span>Articles</span>}
      {label === "handle" && <span>{SOCIAL.x.handle}</span>}
      {label === "mark" && <span className="sr-only">𝕏 Articles</span>}
    </a>
  );
}
