import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Play,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectLink } from "@/data/portfolio";

function LinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
  switch (kind) {
    case "github":
      return <Github className="size-3.5" />;
    case "demo":
      return <ExternalLink className="size-3.5" />;
    case "case":
      return <FileText className="size-3.5" />;
    default:
      return <ArrowUpRight className="size-3.5" />;
  }
}

function aspectClass(aspect: Project["aspect"], category: Project["category"]) {
  if (aspect === "portrait") return "aspect-[3/4]";
  if (aspect === "square") return "aspect-square";
  if (aspect === "wide") return "aspect-[16/9]";
  if (aspect === "landscape") return "aspect-[6/5]";
  if (category === "Drawing") return "aspect-[4/5]";
  if (category === "Video") return "aspect-[16/9]";
  if (category === "Photography") return "aspect-[3/2]";
  return "aspect-[4/3]";
}

type Props = {
  project: Project;
  index?: number;
  featured?: boolean;
  onOpen?: () => void;
};

export function ProjectCard({ project, index = 0, featured = false, onOpen }: Props) {
  const isImageHeavy =
    project.category === "Drawing" ||
    project.category === "Photography" ||
    project.category === "Video";
  const isSoftware =
    project.category === "Software" || project.category === "Mixed";
  const isVideo = project.category === "Video";
  const hasPhoto = Boolean(project.image);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg bg-bg-elevated shadow-card",
        "transition-[transform,box-shadow,opacity] duration-[var(--motion-medium)] ease-[var(--ease-out-soft)]",
        "hover:-translate-y-0.5 hover:shadow-card-hover",
        "focus-within:-translate-y-0.5 focus-within:shadow-card-hover",
        featured && "md:min-h-full",
        onOpen && "cursor-pointer",
      )}
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
      onClick={onOpen}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      {/* Media */}
      <div
        className={cn(
          "relative overflow-hidden bg-bg-muted",
          aspectClass(project.aspect, project.category),
          featured && "md:aspect-[5/4]",
        )}
        style={hasPhoto ? undefined : { background: project.art }}
      >
        {hasPhoto && (
          <img
            src={project.image}
            alt=""
            className={cn(
              "absolute inset-0 size-full object-cover",
              "transition-transform duration-[var(--motion-medium)] ease-[var(--ease-out-soft)]",
              "group-hover:scale-[1.04]",
            )}
            loading="lazy"
            decoding="async"
          />
        )}

        {!hasPhoto && (
          <div
            className="absolute inset-0 opacity-35 transition-transform duration-[var(--motion-medium)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
            style={{
              background:
                "radial-gradient(ellipse at 28% 18%, rgba(255,255,255,0.5), transparent 55%)",
            }}
          />
        )}

        {/* Subtle film grain for gradient-only image mediums */}
        {isImageHeavy && !hasPhoto && (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
            aria-hidden
          />
        )}

        <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-bg-elevated/92 px-2.5 py-1 text-[11px] font-medium tracking-wide text-fg backdrop-blur-sm">
            {project.category}
          </span>
          <span
            className={cn(
              "text-[11px] font-medium drop-shadow-sm",
              hasPhoto ? "text-white/90" : "text-white/85",
            )}
          >
            {project.year}
          </span>
          {isVideo && project.duration && (
            <span className="rounded-full bg-ink/55 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white backdrop-blur-sm">
              {project.duration}
            </span>
          )}
        </div>

        {isVideo && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
              "rounded-full bg-bg-elevated/90 text-fg shadow-md backdrop-blur-sm",
              "transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out-soft)]",
              "group-hover:scale-105",
            )}
            aria-hidden
          >
            <Play className="ml-0.5 size-5 fill-current" />
          </div>
        )}

        {/* Image-heavy: title + description on hover */}
        {isImageHeavy && (
          <div
            className={cn(
              "absolute inset-0 z-10 flex flex-col justify-end p-5",
              "bg-gradient-to-t from-ink/88 via-ink/35 to-transparent",
              "opacity-0 transition-opacity duration-[var(--motion-fast)] ease-[var(--ease-apple)]",
              "group-hover:opacity-100 group-focus-within:opacity-100",
              "max-md:opacity-100 max-md:via-ink/20",
            )}
          >
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-1 max-w-[36ch] text-sm leading-relaxed text-white/90">
              {project.description}
            </p>
          </div>
        )}
      </div>

      {/* Meta */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-3 p-5",
          isImageHeavy && "max-md:pt-4",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "text-lg font-semibold tracking-tight text-fg",
                isImageHeavy && "md:group-hover:opacity-0 md:absolute md:sr-only",
              )}
            >
              {project.title}
            </h3>
            <p className="mt-0.5 text-sm text-fg-muted">{project.tagline}</p>
          </div>
          {!isSoftware && (
            <span
              className={cn(
                "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
                "border border-border bg-bg-subtle text-fg",
                "transition-[background-color,color,border-color] duration-[var(--motion-fast)]",
                "group-hover:border-fg group-hover:bg-fg group-hover:text-bg-elevated",
              )}
              aria-hidden
            >
              <ArrowUpRight className="size-4" />
            </span>
          )}
        </div>

        {isSoftware && (
          <>
            <p className="text-sm leading-relaxed text-fg-secondary">
              {project.description}
            </p>
            {project.stack && project.stack.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-bg-subtle px-2.5 py-1 text-[11px] font-medium text-fg-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {project.links && project.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className={cn(
                      "relative z-20 inline-flex items-center gap-1.5 rounded-full border border-border",
                      "bg-bg-elevated px-3 py-1.5 text-xs font-medium text-fg",
                      "transition-colors duration-[var(--motion-quick)]",
                      "hover:border-border-strong hover:bg-bg-subtle",
                    )}
                  >
                    <LinkIcon kind={link.kind} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
