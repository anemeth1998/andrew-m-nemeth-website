import type { ReactNode } from "react";
import { AmbientField } from "@/components/portfolio/ambient-field";
import { SiteNav } from "@/components/portfolio/site-nav";
import { SiteFooter } from "@/components/portfolio/site-footer";

type Props = {
  children: ReactNode;
};

/** Shared nav + footer chrome for the homepage and blog routes. */
export function PortfolioShell({ children }: Props) {
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <AmbientField />
      <div className="relative z-10">
        <SiteNav />
        <div className="pt-[calc(var(--grok-banner-h,0px)+3.5rem)] md:pt-[calc(var(--grok-banner-h,0px)+4rem)]">
          {children}
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
