import { SITE, SOCIAL } from "@/data/portfolio";
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
