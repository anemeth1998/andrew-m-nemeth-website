import { SKILLS } from "@/data/portfolio";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="section-pad scroll-mt-[calc(var(--grok-banner-h,0px)+5.5rem)] border-t border-border bg-bg-subtle py-16 md:py-24"
    >
      <div className="mx-auto max-w-[72rem]">
        <div className="reveal max-w-lg">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            Skills
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">
            A short map
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
            Not a résumé wall—just the clusters that show up in the work.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border shadow-sm md:grid-cols-3">
          {SKILLS.map((group, gi) => (
            <div
              key={group.group}
              className={cn("reveal bg-bg-elevated p-6 md:p-8")}
              style={{ transitionDelay: `${gi * 60}ms` }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
                {group.group}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border/80 pb-3 text-[15px] font-medium text-fg last:border-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
