import { Github, Linkedin } from "lucide-react";
import { FOOTER_NAV_LINKS, SITE, SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";

function GrokMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 11.5714"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4.63453 7.42767L8.62395 4.46607C8.81953 4.32088 9.09907 4.37752 9.19225 4.60303C9.68274 5.79241 9.46361 7.22172 8.48776 8.20308C7.5119 9.18444 6.15411 9.39966 4.91305 8.9095L3.5573 9.54074C5.50184 10.8774 7.86313 10.5468 9.33868 9.0619C10.5091 7.88488 10.8716 6.28051 10.5326 4.8337L10.5357 4.83679C10.0442 2.71136 10.6565 1.86181 11.9109 0.124601C11.9406 0.0834107 11.9703 0.0422202 12 0L10.3493 1.65998V1.65483L4.6335 7.4287"
        fill="currentColor"
      />
      <path
        d="M3.81125 8.14747C2.41556 6.80672 2.6562 4.73175 3.84709 3.53517C4.72771 2.64958 6.17049 2.28813 7.42999 2.81949L8.78266 2.19133C8.53895 2.01421 8.22664 1.82371 7.86825 1.68984C6.24832 1.01946 4.3089 1.35311 2.99206 2.67635C1.7254 3.95016 1.32708 5.90877 2.01109 7.58007C2.52206 8.82917 1.68444 9.71271 0.840686 10.6045C0.541684 10.9206 0.241659 11.2368 0 11.5714L3.81022 8.1485"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-pad border-t border-border bg-fg text-bg-elevated">
      <div className="mx-auto max-w-[72rem] py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-2xl font-semibold tracking-tight">{SITE.name}</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-bg-elevated/70">
              {SITE.role}. Drawing, photography, software, video—and the space
              between them. Based in {SITE.location}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bg-elevated/50">
                Navigate
              </p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-bg-elevated/80 transition-colors hover:text-bg-elevated"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bg-elevated/50">
                Elsewhere
              </p>
              <ul className="mt-4 flex flex-wrap items-center gap-3">
                <li>
                  <a
                    href={SOCIAL.x.articlesHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Writing on 𝕏"
                    className="inline-flex size-9 items-center justify-center rounded-full text-bg-elevated/80 transition-colors hover:bg-bg-elevated/10 hover:text-bg-elevated"
                  >
                    <XLogo className="size-4" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.github.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="inline-flex size-9 items-center justify-center rounded-full text-bg-elevated/80 transition-colors hover:bg-bg-elevated/10 hover:text-bg-elevated"
                  >
                    <Github className="size-4" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.linkedin.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex size-9 items-center justify-center rounded-full text-bg-elevated/80 transition-colors hover:bg-bg-elevated/10 hover:text-bg-elevated"
                  >
                    <Linkedin className="size-4" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bg-elevated/50">
                Contact
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 block text-sm text-bg-elevated/80 transition-colors hover:text-bg-elevated"
              >
                {SITE.email}
              </a>
              <p className="mt-2 text-sm text-bg-elevated/50">{SITE.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-bg-elevated/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-bg-elevated/45">
              © {year} {SITE.name}
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs text-bg-elevated/45">
              <span>Made with Grok</span>
              <GrokMark className="size-3.5 shrink-0 text-bg-elevated/55" />
            </p>
          </div>
          <p className="text-xs text-bg-elevated/45">
            Writing on this site and on 𝕏.

          </p>
        </div>
      </div>
    </footer>
  );
}
