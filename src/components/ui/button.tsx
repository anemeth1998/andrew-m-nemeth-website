import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium",
    "transition-[background-color,color,box-shadow,transform,border-color,opacity]",
    "duration-[var(--motion-fast)] ease-[var(--ease-apple)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:not-disabled:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "rounded-full bg-accent text-accent-fg",
          "hover:bg-accent-hover hover:shadow-btn-primary-hover hover:-translate-y-px",
          "active:bg-accent-deep",
        ].join(" "),
        secondary: [
          "rounded-full bg-transparent text-fg border border-border-strong",
          "hover:bg-accent-soft hover:border-fg",
          "active:bg-accent-soft-strong",
        ].join(" "),
        ghost: [
          "rounded-full bg-transparent text-fg",
          "hover:bg-accent-soft hover:text-accent-deep",
        ].join(" "),
        outline: [
          "rounded-full border border-border-strong bg-bg-elevated text-fg",
          "hover:border-accent hover:bg-accent-soft hover:text-accent-deep",
        ].join(" "),
        link: [
          "rounded-sm px-0 text-accent underline-offset-4",
          "hover:text-accent-deep hover:underline",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-12 px-7 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
