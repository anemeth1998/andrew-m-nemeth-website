import type { Project } from "./portfolio";

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
    annotations: [
      {
        x: 28,
        y: 42,
        label: "Branch lattice",
        body: "The geometry does more work than any single leaf.",
      },
      {
        x: 72,
        y: 58,
        label: "Edge density",
        body: "Leaves packed to the frame edge keep the red from floating.",
      },
    ],
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
    annotations: [
      {
        x: 48,
        y: 22,
        label: "Quiet face",
        body: "No hatching on the head — density lives on the garment.",
      },
      {
        x: 52,
        y: 55,
        label: "Heart pause",
        body: "One solid shape breaks the vertical of the neck.",
      },
      {
        x: 70,
        y: 68,
        label: "Web density",
        body: "Pattern only on textile so the contour stays primary.",
      },
    ],
  },
];
