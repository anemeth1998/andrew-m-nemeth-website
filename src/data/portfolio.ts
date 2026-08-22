import { PROJECTS } from "./projects-list";
export { PROJECTS };

export type MediaCategory =
  | "Drawing"
  | "Photography"
  | "Software"
  | "Video"
  | "Mixed";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "demo" | "case" | "external";
};

export type ProcessNote = {
  title: string;
  body: string;
};

export type ProcessAsset = {
  src: string;
  alt: string;
  caption?: string;
  kind?: "sketch" | "contact-sheet" | "process" | "final" | "reference";
};

export type Annotation = {
  /** Horizontal position 0–100 */
  x: number;
  /** Vertical position 0–100 */
  y: number;
  label: string;
  body?: string;
};

export type CameraSettings = {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  notes?: string;
};

export type ComparisonPair = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export type Project = {
  id: string;
  title: string;
  category: MediaCategory;
  year: string;
  tagline: string;
  description: string;
  /** Fallback / overlay wash when no image */
  art: string;
  /** Optional photo path under /public */
  image?: string;
  /** Featured pieces appear in the Selected Work row */
  featured?: boolean;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  /** Software / hybrid: tech labels */
  stack?: string[];
  links?: ProjectLink[];
  /** Video: runtime label */
  duration?: string;

  /* —— Extended content model (Phase 0+) —— */
  location?: string;
  technique?: string[];
  tools?: string[];
  themes?: string[];
  series?: string;
  relatedIds?: string[];
  processNotes?: ProcessNote[];
  processAssets?: ProcessAsset[];
  camera?: CameraSettings;
  equipment?: string[];
  reflection?: string;
  comparison?: ComparisonPair;
  /** Optional higher-resolution still for full-view */
  highRes?: string;
  annotations?: Annotation[];
};

export const CATEGORIES: MediaCategory[] = ["Drawing", "Photography"];

export const FEATURED_IDS = PROJECTS.filter((p) => p.featured).map((p) => p.id);

/** Distinct years, newest first */
export const YEARS = Array.from(new Set(PROJECTS.map((p) => p.year))).sort(
  (a, b) => Number(b) - Number(a),
);

/** Distinct series labels present in the archive */
export const SERIES = Array.from(
  new Set(
    PROJECTS.map((p) => p.series).filter((s): s is string => Boolean(s)),
  ),
).sort();

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getRelatedProjects(project: Project, limit = 4): Project[] {
  if (!project.relatedIds?.length) {
    return PROJECTS.filter(
      (p) =>
        p.id !== project.id &&
        (p.category === project.category || p.series === project.series),
    ).slice(0, limit);
  }
  return project.relatedIds
    .map((id) => getProjectById(id))
    .filter((p): p is Project => Boolean(p))
    .slice(0, limit);
}

export function getProjectsBySeries(series: string): Project[] {
  return PROJECTS.filter((p) => p.series === series);
}

export function seriesSlug(series: string): string {
  return series
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getSeriesBySlug(slug: string): string | undefined {
  return SERIES.find((s) => seriesSlug(s) === slug);
}

export type SeriesMeta = {
  name: string;
  slug: string;
  blurb: string;
};

export const SERIES_META: SeriesMeta[] = [
  {
    name: "Southeast walks",
    slug: "southeast-walks",
    blurb:
      "Daylight frames from Carolina walks and coastal stops—color, density, and small structures noticed in motion.",
  },
  {
    name: "Line studies 2026",
    slug: "line-studies-2026",
    blurb:
      "Ink-line portraits and gesture studies. Contour first, density only where it earns its place.",
  },
];

export function getSeriesMeta(name: string): SeriesMeta | undefined {
  return SERIES_META.find((m) => m.name === name);
}


export function workPath(id: string) {
  return `/work/${id}` as const;
}

export const SKILLS = [
  {
    group: "Creative",
    items: ["Drawing & illustration", "Photography", "Video editing", "Visual sequencing"],
  },
  {
    group: "Technical",
    items: [
      "Computer science coursework",
      "Applied physics",
      "Mathematics",
      "Programming practice",
    ],
  },
  {
    group: "Tools",
    items: ["TypeScript", "Python", "Git", "Figma / layout", "Camera & light"],
  },
];

export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
] as const;

export const FOOTER_NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

export const SOCIAL = {
  x: {
    label: "𝕏",
    handle: "@AndrewMNemeth",
    href: "https://x.com/AndrewMNemeth",
    articlesHref: "https://x.com/AndrewMNemeth/articles",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/AndrewMNemeth",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrewmnemeth",
  },
} as const;

export const SITE = {
  name: "Andrew M. Németh",
  shortName: "Andrew M. Németh",
  role: "Teacher · Student · Maker",
  tagline:
    "Between the humanities and the hard sciences—making work that thinks in more than one medium.",
  location: "North Carolina",
  email: "anemeth98@icloud.com",
  bio: [
    "I teach high school in North Carolina and study as a non-traditional student, moving from a humanities foundation into computer science, applied physics, and mathematics.",
    "I hold a bachelor’s degree with a triple major in Political Science (Pre-law), History, and Philosophy & Religion. I’m now pursuing a second bachelor’s focused on Computer Science, Applied Physics, and Mathematics—while still in the classroom full time.",
    "The portfolio is one practice, not several: drawing, photography, software, video, and hybrid work sit next to each other because that’s how the thinking actually moves. Longer writing lives on 𝕏.",
  ],
};
