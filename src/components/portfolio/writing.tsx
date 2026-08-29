import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIAL } from "@/data/portfolio";
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

          <div className="mt-8 flex items-center gap-3">
            <img
              src="/x/avatar.jpg"
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium tracking-tight">{SITE.name}</p>
              <p className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
                <XLogo className="size-3.5" />
                {SOCIAL.x.handle}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <XFollowButton />
            <XTweetButton />
            <a
              href={SOCIAL.x.articlesHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-fg"
            >
              Articles
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div
          className="reveal lg:col-span-7"
          style={{ transitionDelay: "80ms" }}
        >
          <XTimeline />
        </div>
      </div>
    </section>
  );
}
