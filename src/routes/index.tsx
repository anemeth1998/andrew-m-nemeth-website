import { createFileRoute } from "@tanstack/react-router";
import { AmbientField } from "@/components/portfolio/ambient-field";
import { SiteNav } from "@/components/portfolio/site-nav";
import { NowStrip } from "@/components/portfolio/now-strip";
import { Hero } from "@/components/portfolio/hero";
import { Projects } from "@/components/portfolio/projects";
import { About } from "@/components/portfolio/about";
import { Blog } from "@/components/portfolio/blog";
import { Skills } from "@/components/portfolio/skills";
import { Contact } from "@/components/portfolio/contact";
import { SiteFooter } from "@/components/portfolio/site-footer";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <AmbientField />
      <div className="relative z-10">
        <SiteNav />
        <div className="pt-[calc(var(--grok-banner-h,0px)+3.5rem)] md:pt-[calc(var(--grok-banner-h,0px)+4rem)]">
          <NowStrip />
          <main>
            <Hero />
            <Projects />
            <About />
            <Blog />
            <Skills />
            <Contact />
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
