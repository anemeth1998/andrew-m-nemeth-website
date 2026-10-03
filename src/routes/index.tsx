import { createFileRoute } from "@tanstack/react-router";
import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { Hero } from "@/components/portfolio/hero";
import { Projects } from "@/components/portfolio/projects";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Blog } from "@/components/portfolio/blog";
import { Writing } from "@/components/portfolio/writing";
import { Contact } from "@/components/portfolio/contact";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PortfolioShell>
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Blog />
        <Writing />
        <Contact />
      </main>
    </PortfolioShell>
  );
}
