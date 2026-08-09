import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
};

/** Peace — typographic “V” (viewer’s left of the name). */
export function PeaceText({ className }: MarkProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.95em] font-medium tracking-tight",
        className,
      )}
      aria-hidden
    >
      V
    </span>
  );
}

/** Devil horns — classic text “\m/” (viewer’s right of the name). */
export function HornsText({ className }: MarkProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.85em] font-medium tracking-tight",
        className,
      )}
      aria-hidden
    >
      \m/
    </span>
  );
}
