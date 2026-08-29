import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { HornsText, PeaceText } from "@/components/icons/hand-signs";
import { playDevilHornsRiff } from "@/lib/guitar-riff";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [riffing, setRiffing] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (open) {
        setHidden(false);
        last = y;
        return;
      }
      if (y < 48) setHidden(false);
      else if (y > last + 8) setHidden(true);
      else if (y < last - 8) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  async function onHornsClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setRiffing(true);
    try {
      await playDevilHornsRiff();
    } finally {
      // clip is ~4.3s
      window.setTimeout(() => setRiffing(false), 4500);
    }
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,transform]",
        "duration-[var(--motion-fast)] ease-[var(--ease-apple)]",
        "pt-[var(--grok-banner-h,0px)]",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        scrolled || open
          ? "glass border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav
        className="section-pad mx-auto flex h-14 max-w-[72rem] items-center justify-between md:h-16"
        aria-label="Primary"
      >
        <div className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-tight text-fg">
          <a
            href="#top"
            onClick={close}
            className="inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-[var(--motion-quick)] hover:text-accent"
          >
            <PeaceText className="text-fg-muted" />
            <span>{SITE.name}</span>
          </a>
          <button
            type="button"
            onClick={onHornsClick}
            aria-label="Play guitar riff"
            title="Play a riff"
            className={cn(
              "inline-flex min-h-9 min-w-9 items-center justify-center rounded-md px-1",
              "font-semibold text-fg-muted",
              "transition-[color,transform,background-color] duration-[var(--motion-quick)]",
              "hover:bg-accent-soft hover:text-accent-deep",
              "active:scale-95",
              riffing && "animate-pulse text-accent-deep",
            )}
          >
            <HornsText />
          </button>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-2.5 py-2 text-[13px] font-medium text-fg-secondary lg:px-3.5",
                  "transition-[background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-apple)]",
                  "hover:bg-accent-soft hover:text-accent-deep",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <Button asChild size="sm" variant="primary">
              <a href="/#contact">Contact</a>
            </Button>
          </li>
        </ul>

        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full md:hidden",
            "text-fg transition-[background-color,color] duration-[var(--motion-quick)]",
            "hover:bg-accent-soft hover:text-accent-deep",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "section-pad overflow-hidden border-t border-border md:hidden",
          "transition-[max-height,opacity] duration-[var(--motion-fast)] ease-[var(--ease-out-soft)]",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <ul className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="block rounded-md px-3 py-3 text-base font-medium text-fg transition-colors hover:bg-accent-soft hover:text-accent-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <Button asChild className="w-full">
              <a href="/#contact" onClick={close}>
                Contact
              </a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
