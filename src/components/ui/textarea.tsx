import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] w-full resize-y rounded-md border border-border bg-bg-elevated px-4 py-3",
        "text-[15px] text-fg placeholder:text-fg-subtle",
        "transition-[border-color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-apple)]",
        "hover:border-border-strong",
        "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent-soft",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
