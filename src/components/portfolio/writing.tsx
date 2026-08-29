import { ArrowUpRight } from "lucide-react";
import { SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import {
  XFollowButton,
  XTimeline,
  XTweetButton,
} from "@/components/portfolio/x-embed";
import { useReveal } from "@/hooks/use-reveal";

export function Writing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="writing"
      ref={ref}
      className="section-pad scroll-mt-24 border-t border-border bg-bg py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            Writing
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-fg">
            On 𝕏
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
            Longer pieces live as Articles. Day-to-day notes, replies, and
            conversation stay on the profile — this is that feed, on the page.
          </p>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-fg-muted">
            <XLogo className="size-3.5" />
            {SOCIAL.x.handle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted">
                Follow
              </p>
              <XFollowButton />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted">
                Share this site
              </p>
              <XTweetButton />
            </div>
          </div>

          <a
            href={SOCIAL.x.articlesHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-fg transition-opacity hover:opacity-70"
          >
            Articles
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div
          className="reveal lg:col-span-7"
          style={{ transitionDelay: "80ms" }}
        >
          <XTimeline height={560} />
        </div>
      </div>
    </section>
  );
}
