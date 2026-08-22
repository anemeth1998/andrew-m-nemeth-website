import type { Project } from "./portfolio";
import { PHOTO_PROJECTS } from "./projects-photo";
import { DRAWING_PROJECTS } from "./projects-drawing";

export const PROJECTS: Project[] = [...PHOTO_PROJECTS, ...DRAWING_PROJECTS];
