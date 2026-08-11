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
};

export const CATEGORIES: MediaCategory[] = [
  "Drawing",
  "Photography",
  "Software",
  "Video",
  "Mixed",
];

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
    featured: true,
    aspect: "landscape",
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
  },
  {
    id: "orbit-solver",
    title: "Orbit Solver",
    category: "Software",
    year: "2025",
    tagline: "Numerical experiments in motion",
    description:
      "A browser tool for visualizing simple orbital mechanics—built while bridging humanities habits with quantitative practice.",
    art: "linear-gradient(145deg, #1d1d1f 0%, #2c3e50 50%, #5d6d7e 100%)",
    featured: true,
    aspect: "landscape",
    stack: ["TypeScript", "Canvas", "Math"],
    links: [
      { label: "GitHub", href: "https://github.com/AndrewMNemeth", kind: "github" },
      { label: "Live demo", href: "#contact", kind: "demo" },
    ],
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
    featured: true,
    aspect: "portrait",
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
  },
  {
    id: "lattice",
    title: "Lattice",
    category: "Software",
    year: "2025",
    tagline: "Discrete structures, made visible",
    description:
      "Interactive sketches of graphs and lattices—small programs that make abstract course material tangible.",
    art: "linear-gradient(140deg, #0f1419 0%, #1e3a4c 55%, #3d6b7a 100%)",
    aspect: "landscape",
    stack: ["Python", "React", "SVG"],
    links: [
      { label: "GitHub", href: "https://github.com/AndrewMNemeth", kind: "github" },
      { label: "Case notes", href: "#contact", kind: "case" },
    ],
  },
  {
    id: "threshold",
    title: "Threshold",
    category: "Video",
    year: "2024",
    tagline: "Short study in light and interruption",
    description:
      "A brief video essay on doorways, chalk dust, and the moments between periods—teaching as a visual rhythm.",
    art: "linear-gradient(170deg, #1a1a1c 0%, #3d3a36 55%, #6b6358 100%)",
    aspect: "wide",
    duration: "2:14",
  },
  {
    id: "signal-map",
    title: "Signal Map",
    category: "Mixed",
    year: "2025",
    tagline: "Photo, code, and drawn overlays",
    description:
      "Photographs of local infrastructure with hand-drawn annotation and a lightweight map built in code—one object, three languages.",
    art: "linear-gradient(148deg, #dfe6ea 0%, #9aabb8 35%, #3e4f5c 70%, #1d1d1f 100%)",
    aspect: "landscape",
    stack: ["Photography", "Ink", "JS"],
    links: [{ label: "View notes", href: "#contact", kind: "external" }],
  },
  {
    id: "gradebook-cli",
    title: "Gradebook CLI",
    category: "Software",
    year: "2024",
    tagline: "Small tool, daily use",
    description:
      "A terminal helper for sorting marks and notes—software as a quiet extension of teaching work.",
    art: "linear-gradient(145deg, #121412 0%, #1f2a1f 45%, #3d4f3d 100%)",
    aspect: "landscape",
    stack: ["Rust", "CLI"],
    links: [
      { label: "GitHub", href: "https://github.com/AndrewMNemeth", kind: "github" },
    ],
  },
];

export const FEATURED_IDS = PROJECTS.filter((p) => p.featured).map((p) => p.id);

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

/**
 * Primary nav text links — Contact is the blue button only.
 * Root-relative hashes so section jumps work from /blog routes too.
 */
export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#blog", label: "Blog" },
  { href: "/#skills", label: "Skills" },
] as const;

/** Footer navigate still lists Contact as a section jump. */
export const FOOTER_NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#blog", label: "Blog" },
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

export const NOW = {
  items: [
    "Teaching high school in North Carolina",
    "Second bachelor’s: computer science, applied physics, mathematics",
    "Longer writing lives on the Blog—first essay up",
  ],
};

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
    "The portfolio is one practice, not several: drawing, photography, software, video, and hybrid work sit next to each other because that’s how the thinking actually moves. Longer writing lives on the Blog; shorter notes and threads still appear on 𝕏.",
  ],
};
