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

// NOTE: full PROJECTS array + helpers are restored in follow-up if truncated
export const PROJECTS: Project[] = [];

export const FEATURED_IDS: string[] = [];
export const YEARS: string[] = [];
export const SERIES: string[] = [];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getRelatedProjects(project: Project, limit = 4): Project[] {
  return [];
}

export function getProjectsBySeries(series: string): Project[] {
  return PROJECTS.filter((p) => p.series === series);
}

export function workPath(id: string) {
  return `/work/${id}` as const;
}
