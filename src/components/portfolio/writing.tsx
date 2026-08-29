import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import { XFollowButton, XTweetButton } from "@/components/portfolio/x-embed";
import { useReveal } from "@/hooks/use-reveal";

export function Writing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="writing"
      ref={ref}
      className="section-pad scroll-mt-24 border-t border-border bg-bg py-16 md:py-24"
    >
      <div className="reveal mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            Writing
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-fg">
            On 𝕏
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Longer pieces live as Articles. Notes and conversation live on
            the profile.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-bg-elevated p-6">
            <div className="flex items-center gap-3">
              <img
                src="/x/avatar.jpg"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium tracking-tight">{SITE.name}</p>
                <p className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
                  <XLogo className="size-3.5" />
                  {SOCIAL.x.handle}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
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

            <a
              href={SOCIAL.x.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-fg transition-opacity hover:opacity-70"
            >
              Open profile
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
