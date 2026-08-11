import { SITE } from "@/data/portfolio";
import { WritingLink } from "@/components/portfolio/writing-link";
import { useReveal } from "@/hooks/use-reveal";

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad scroll-mt-[calc(var(--grok-banner-h,0px)+5.5rem)] py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
        <div className="reveal lg:col-span-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">
            One practice, several languages.
          </h2>

          {/* Industry-standard portrait placement: About, large editorial crop */}
          <figure className="mt-8 overflow-hidden rounded-xl bg-bg-muted shadow-card">
            <div className="aspect-[3/4] w-full max-w-md overflow-hidden lg:max-w-none">
              <img
                src="/portrait.jpg"
                alt={`${SITE.name} — portrait with camera outdoors`}
                width={1200}
                height={1600}
                className="size-full object-cover object-[center_20%]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="sr-only">
              Portrait of {SITE.name}
            </figcaption>
          </figure>

          <div className="mt-6">
            <p className="font-semibold text-fg">{SITE.name}</p>
            <p className="text-sm text-fg-muted">
              {SITE.role} · {SITE.location}
            </p>
            <WritingLink className="mt-4 text-sm text-accent" label="blog" />
          </div>
        </div>

        <div
          className="reveal space-y-5 lg:col-span-7 lg:pt-14"
          style={{ transitionDelay: "80ms" }}
        >
          {SITE.bio.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-lg leading-relaxed text-fg-secondary md:text-[1.15rem] md:leading-[1.65]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
