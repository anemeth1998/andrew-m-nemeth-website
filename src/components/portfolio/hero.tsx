import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

function TypewriterTitle({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setShown(text);
      setDone(true);
      return;
    }

    let i = 0;
    let timer = 0;
    // Brief pause before typing starts
    const start = window.setTimeout(() => {
      const step = () => {
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) {
          // Slightly slower on spaces / punctuation for a natural cadence
          const ch = text[i - 1] ?? "";
          const delay = /[—–.,]/.test(ch) ? 90 : ch === " " ? 45 : 28;
          timer = window.setTimeout(step, delay);
        } else {
          setDone(true);
        }
      };
      step();
    }, 320);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, [text]);

  return (
    <h1
      className="reveal max-w-[20ch] text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl"
      aria-label={text}
    >
      <span className="whitespace-pre-wrap">
        {shown}
        {!reduced && (
          <span
            className={
              done
                ? "ml-0.5 inline-block h-[0.9em] w-[0.08em] translate-y-[0.08em] bg-fg align-baseline opacity-0"
                : "ml-0.5 inline-block h-[0.9em] w-[0.08em] translate-y-[0.08em] animate-pulse bg-fg align-baseline"
            }
            aria-hidden
          />
        )}
      </span>
    </h1>
  );
}

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
        <TypewriterTitle text={SITE.tagline} />
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
            <a href="/#work">View work</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="/#about">About</a>
          </Button>
        </div>

        <a
          href="/#work"
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
