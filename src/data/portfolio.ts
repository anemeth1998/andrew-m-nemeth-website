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

export type CameraSettings = {
  notes?: string;
};

export type Project = {
  id: string;
  title: string;
  category: MediaCategory;
  year: string;
  tagline: string;
  description: string;
  art: string;
  image?: string;
  featured?: boolean;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  stack?: string[];
  links?: ProjectLink[];
  duration?: string;
  location?: string;
  technique?: string[];
  tools?: string[];
  themes?: string[];
  series?: string;
  relatedIds?: string[];
  processNotes?: ProcessNote[];
  camera?: CameraSettings;
  reflection?: string;
  highRes?: string;
};

export const CATEGORIES: MediaCategory[] = ["Drawing", "Photography"];

export const PROJECTS: Project[] = [
  {
    id: "maple-red",
    title: "Maple Red",
    category: "Photography",
    year: "2025",
    tagline: "Fayetteville, NC",
    description:
      "Japanese maple in peak color—branch geometry against a pale sky, leaves packing the frame edge to edge. Fayetteville, North Carolina.",
    art: "linear-gradient(150deg, #8b1a1a 0%, #c41e1e 50%, #e85d4c 100%)",
    image: "/work/maple-red.jpg",
    highRes: "/work/maple-red.jpg",
    featured: true,
    aspect: "landscape",
    location: "Fayetteville, NC",
    technique: ["Color photography", "Natural light", "Close framing"],
    tools: ["Camera", "Natural light"],
    themes: ["Nature", "Color", "Structure"],
    series: "Southeast walks",
    relatedIds: ["ducks-fish", "squirrel-tree"],
    camera: {
      notes:
        "Shot in open daylight; EXIF stripped on export. Emphasis on edge-to-edge leaf density rather than a single hero branch.",
    },
    processNotes: [
      {
        title: "Why this frame",
        body: "The tree was already past the soft pink stage into a deeper red. I moved in until the sky became a thin negative space—more structure than landscape postcard.",
      },
      {
        title: "What I left out",
        body: "Wider establishing shots diluted the color. Cropping out the trunk kept the eye inside the lattice of branches.",
      },
    ],
    reflection:
      "A quiet reminder that technical work and looking carefully are the same habit: notice the structure, then decide what the frame is actually about.",
  },
  {
    id: "ducks-fish",
    title: "Feeding Circle",
    category: "Photography",
    year: "2025",
    tagline: "Myrtle Beach, SC",
    description:
      "Ducks and fish sharing one turquoise plane—density, motion, and the hard line of a pier shadow. Myrtle Beach, South Carolina.",
    art: "linear-gradient(150deg, #1a6b7a 0%, #2a9fb0 45%, #7ec8d4 100%)",
    image: "/work/ducks-fish.jpg",
    featured: true,
    aspect: "landscape",
    location: "Myrtle Beach, SC",
    series: "Southeast walks",
    relatedIds: ["maple-red", "tanger-chair"],
  },
  {
    id: "normandie-motel",
    title: "Elvis Slept Here",
    category: "Photography",
    year: "2024",
    tagline: "Las Vegas, NV",
    description:
      "Normandie Motel axe and neon stack—American roadside typography against a clear desert-blue sky. Las Vegas, Nevada.",
    art: "linear-gradient(160deg, #1e5a8a 0%, #c43c3c 55%, #f0c040 100%)",
    image: "/work/normandie-motel.jpg",
    featured: true,
    aspect: "portrait",
    location: "Las Vegas, NV",
    relatedIds: ["tanger-chair", "broadway-clock"],
  },
  {
    id: "draw-face-to-face",
    title: "Face to Face",
    category: "Drawing",
    year: "2026",
    tagline: "Color line, two sitters",
    description:
      "Two seated figures on a white field—split-pink hair and a red-black sweater, clean contour, color reserved for clothing and hair.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-face-to-face.jpg",
    aspect: "landscape",
    series: "Line studies 2026",
    relatedIds: ["draw-web-heart", "draw-peace-selfie"],
  },
  {
    id: "draw-web-heart",
    title: "Web & Heart",
    category: "Drawing",
    year: "2026",
    tagline: "Ink line portrait",
    description:
      "Black-line portrait with spiderweb textile and heart pendant—clean contour, dense pattern work on the garment.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-web-heart.jpg",
    highRes: "/work/draw-web-heart.jpg",
    featured: true,
    aspect: "portrait",
    technique: ["Ink line", "Pattern density", "Contour first"],
    tools: ["Fine liner", "Paper"],
    themes: ["Portrait", "Pattern", "Symbol"],
    series: "Line studies 2026",
    relatedIds: ["draw-face-to-face", "draw-glasses-close", "draw-jj-gesture"],
    processNotes: [
      {
        title: "Contour before texture",
        body: "The face and shoulders were locked as a continuous line before any web pattern. Pattern only goes on the garment so the head stays quiet.",
      },
      {
        title: "The pendant",
        body: "The heart is a small pause in the vertical of the neck—one solid shape against the open line work around it.",
      },
      {
        title: "What failed first",
        body: "An earlier pass put cross-hatching on the face. It aged the subject and fought the textile. Clearing the face fixed the balance.",
      },
    ],
    reflection:
      "Drawing and debugging share a rule: isolate the variable. Here the variable was density—where ink is allowed to accumulate.",
  },
  {
    id: "tanger-chair",
    title: "Big Blue Chair",
    category: "Photography",
    year: "2025",
    tagline: "Myrtle Beach, full sun",
    description:
      "Self-portrait on the Tanger Outlets oversized Adirondack—scale, color, and a little coastal humor.",
    art: "linear-gradient(160deg, #1a5fb4 0%, #4a90d9 50%, #87ceeb 100%)",
    image: "/work/tanger-chair.jpg",
    aspect: "portrait",
    location: "Myrtle Beach, SC",
  },
  {
    id: "broadway-clock",
    title: "Broadway Clock",
    category: "Photography",
    year: "2025",
    tagline: "Portrait session, outdoor light",
    description:
      "Couple under the Broadway at the Beach clock—centered vertical, soft commercial light, a private moment in a public plaza.",
    art: "linear-gradient(165deg, #7eb8d4 0%, #c5d8a0 50%, #e8d5b0 100%)",
    image: "/work/broadway-clock.jpg",
    aspect: "portrait",
    location: "Myrtle Beach, SC",
  },
  {
    id: "graduation-scotland",
    title: "Scotland High",
    category: "Photography",
    year: "2025",
    tagline: "Laurinburg, NC",
    description:
      "Commencement night—graduate portrait after the ceremony at Scotland High School, under stadium lights and the flag line. Laurinburg, North Carolina.",
    art: "linear-gradient(160deg, #0a1a3a 0%, #1a3a7a 40%, #2a5aaa 100%)",
    image: "/work/graduation-scotland.jpg",
    aspect: "portrait",
    location: "Laurinburg, NC",
    relatedIds: ["portrait-hoodie", "portrait-bleachers"],
  },
  {
    id: "portrait-hoodie",
    title: "Studio Grey",
    category: "Photography",
    year: "2025",
    tagline: "Laurinburg, NC",
    description:
      "Formal portrait against a textured blue wall—straight-on, even light, room for the subject to carry the frame. Laurinburg, North Carolina.",
    art: "linear-gradient(180deg, #2a3540 0%, #4a5560 100%)",
    image: "/work/portrait-hoodie.jpg",
    aspect: "portrait",
    location: "Laurinburg, NC",
  },
  {
    id: "portrait-bleachers",
    title: "Field Lights",
    category: "Photography",
    year: "2025",
    tagline: "Laurinburg, NC",
    description:
      "Outdoor portrait with bleachers soft in the background—clean focus on the face, color in the block wall behind. Laurinburg, North Carolina.",
    art: "linear-gradient(165deg, #c43c3c 0%, #2a5aaa 55%, #f5f0e8 100%)",
    image: "/work/portrait-bleachers.jpg",
    aspect: "portrait",
    location: "Laurinburg, NC",
  },
  {
    id: "white-pony",
    title: "White Pony",
    category: "Photography",
    year: "2024",
    tagline: "Lancaster, PA",
    description:
      "Subject holding a sealed Deftones White Pony LP—studio warmth, big expression, the object as part of the character. Lancaster, Pennsylvania.",
    art: "linear-gradient(160deg, #c4a882 0%, #8b7355 50%, #3a3028 100%)",
    image: "/work/white-pony.jpg",
    aspect: "portrait",
    location: "Lancaster, PA",
  },
  {
    id: "squirrel-tree",
    title: "Hold Fast",
    category: "Photography",
    year: "2024",
    tagline: "Lancaster, PA",
    description:
      "Grey squirrel mid-climb—bark texture filling half the frame, eye contact, fallen leaves soft behind. Lancaster, Pennsylvania.",
    art: "linear-gradient(170deg, #6b5a4a 0%, #8a7a68 40%, #c4b8a0 100%)",
    image: "/work/squirrel-tree.jpg",
    aspect: "portrait",
    location: "Lancaster, PA",
    series: "Southeast walks",
    relatedIds: ["maple-red", "ducks-fish"],
  },
  {
    id: "chocolate-donut",
    title: "Drive-Thru",
    category: "Photography",
    year: "2024",
    tagline: "Rockingham, NC",
    description:
      "Chocolate-glazed donut held against a car dash—close, casual, a small still life between stops. Rockingham, North Carolina.",
    art: "linear-gradient(150deg, #3a2818 0%, #6b4423 45%, #d4a574 100%)",
    image: "/work/chocolate-donut.jpg",
    aspect: "portrait",
    location: "Rockingham, NC",
  },
  {
    id: "draw-peace-selfie",
    title: "Peace Selfie",
    category: "Drawing",
    year: "2026",
    tagline: "Mirror pose in ink",
    description:
      "Figure with striped tee, peace sign, and phone—casual posture rendered in continuous line.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-peace-selfie.jpg",
    aspect: "portrait",
    series: "Line studies 2026",
  },
  {
    id: "draw-glasses-close",
    title: "Close Glasses",
    category: "Drawing",
    year: "2026",
    tagline: "Tight facial study",
    description:
      "Square crop of a face behind thick frames—freckles, lashes, and hands under the chin.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-glasses-close.jpg",
    aspect: "square",
    series: "Line studies 2026",
  },
  {
    id: "draw-shades-up",
    title: "Shades Up",
    category: "Drawing",
    year: "2026",
    tagline: "Hair and freckles",
    description:
      "Three-quarter portrait with sunglasses perched in the hair—wind in the strands, quiet gaze.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-shades-up.jpg",
    aspect: "portrait",
    series: "Line studies 2026",
  },
  {
    id: "draw-polka-shades",
    title: "Polka & Shades",
    category: "Drawing",
    year: "2026",
    tagline: "Beard and pattern",
    description:
      "Sunglassed figure in a polka-dot shirt—beard texture balanced against the field of dots.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-polka-shades.jpg",
    aspect: "square",
    series: "Line studies 2026",
  },
  {
    id: "draw-jj-gesture",
    title: "Crossed Fingers",
    category: "Drawing",
    year: "2026",
    tagline: "Gesture first",
    description:
      "Subject leaning in with a finger frame and a stitched-looking heart object—hands carry the composition.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-jj-gesture.jpg",
    aspect: "portrait",
    series: "Line studies 2026",
  },
  {
    id: "draw-long-hair",
    title: "Long Hair Study",
    category: "Drawing",
    year: "2026",
    tagline: "Soft smile, freckles",
    description:
      "Loose hair and a slight smile—simple clothing, focus on contour and facial marks.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-long-hair.jpg",
    aspect: "portrait",
    series: "Line studies 2026",
  },
  {
    id: "draw-juice-box",
    title: "Juice Box",
    category: "Drawing",
    year: "2026",
    tagline: "Rings and a straw",
    description:
      "Portrait with a juice box and stacked rings—everyday prop, careful line on hair and hands.",
    art: "linear-gradient(165deg, #faf9f6 0%, #e8e4dc 100%)",
    image: "/work/draw-juice-box.jpg",
    aspect: "portrait",
    series: "Line studies 2026",
  },
];

export const FEATURED_IDS = PROJECTS.filter((p) => p.featured).map((p) => p.id);

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
