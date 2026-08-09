import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { NOW } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "amn-now-dismissed";

export function NowStrip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <div className="border-b border-border bg-bg-subtle/90">
      <div className="section-pad mx-auto flex max-w-[72rem] items-start gap-3 py-3 md:items-center">
        <span className="mt-0.5 shrink-0 rounded-full bg-fg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-bg-elevated md:mt-0">
          Now
        </span>
        <ul className="flex min-w-0 flex-1 flex-col gap-1 text-[13px] leading-snug text-fg-secondary sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
          {NOW.items.map((item, i) => (
            <li key={item} className="flex min-w-0 items-baseline gap-2">
              {i > 0 && (
                <span className="hidden text-fg-subtle sm:inline" aria-hidden>
                  ·
                </span>
              )}
              <span className="sm:whitespace-normal">{item}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={dismiss}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full",
            "text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg",
          )}
          aria-label="Dismiss currently strip"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
