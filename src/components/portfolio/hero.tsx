import { ArrowDown } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="top"
      ref={ref}
      className="section-pad relative flex min-h-[min(78dvh,760px)] flex-col justify-end pb-14 pt-10 md:pb-20 md:pt-14"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -right-24 top-8 size-[26rem] rounded-full opacity-[0.35] blur-3xl md:size-[34rem]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,113,227,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -left-16 bottom-8 size-[20rem] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.035) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[72rem]">
        <p className="reveal mb-5 text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
          {SITE.role} · {SITE.location}
        </p>
        <h1 className="reveal max-w-[18ch] text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
          {SITE.tagline}
        </h1>
        <p
          className="reveal mt-6 max-w-xl text-lg leading-relaxed text-fg-secondary md:text-[1.2rem] md:leading-relaxed"
          style={{ transitionDelay: "80ms" }}
        >
          {SITE.name} — drawing, photography, software, video, and hybrid work
          in one practice. Teaching while studying computer science, applied
          physics, and mathematics.
        </p>
        <div
          className="reveal mt-10 flex flex-wrap items-center gap-3"
          style={{ transitionDelay: "140ms" }}
        >
          <Button asChild size="lg">
            <a href="#work">View work</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#about">About</a>
          </Button>
        </div>

        <a
          href="#work"
          className="reveal group mt-16 inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors duration-[var(--motion-quick)] hover:text-accent-deep"
          style={{ transitionDelay: "200ms" }}
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-border bg-bg-elevated shadow-sm transition-[background-color,border-color,color,transform] duration-[var(--motion-quick)] group-hover:border-accent/35 group-hover:bg-accent-soft group-hover:text-accent-deep group-hover:translate-y-0.5">
            <ArrowDown className="size-3.5" />
          </span>
          Scroll to selected work
        </a>
      </div>
    </section>
  );
}
