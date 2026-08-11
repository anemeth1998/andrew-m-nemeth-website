import { createFileRoute } from "@tanstack/react-router";
import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { NowStrip } from "@/components/portfolio/now-strip";
import { Hero } from "@/components/portfolio/hero";
import { Projects } from "@/components/portfolio/projects";
import { About } from "@/components/portfolio/about";
import { Blog } from "@/components/portfolio/blog";
import { Skills } from "@/components/portfolio/skills";
import { Contact } from "@/components/portfolio/contact";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PortfolioShell now={<NowStrip />}>
      <main>
        <Hero />
        <Projects />
        <About />
        <Blog />
        <Skills />
        <Contact />
      </main>
    </PortfolioShell>
  );
}
