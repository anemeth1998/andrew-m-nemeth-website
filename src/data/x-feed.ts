import { SOCIAL } from "./portfolio";

export type XNote = {
  id: string;
  /** ISO 8601 */
  date: string;
  body: string;
};

export const X_SCREEN = SOCIAL.x.handle.replace(/^@/, "");

export function xStatusHref(id: string) {
  return `https://x.com/${X_SCREEN}/status/${id}`;
}

export const X_FOLLOW_HREF = `https://x.com/intent/follow?screen_name=${X_SCREEN}`;

export const X_SHARE_HREF = `https://x.com/intent/tweet?text=${encodeURIComponent(
  "Andrew M. Németh — drawing, photography, software, and hybrid work.",
)}&via=${X_SCREEN}`;

/** Recent notes from the public profile. Official timeline iframes often fail to load. */
export const X_NOTES: XNote[] = [
  {
    id: "2093657705764245702",
    date: "2026-08-29",
    body: "My boss has been housing a student for a couple years since his father called saying he wants nothing to do with him. He has nowhere to go.\n\nI learned recently that people almost always assume the worst, and while some of it is warranted, not everything is malicious.\n\nSuspicion is good, but (as someone close to me told me recently) “you look for the innocence of most actions, while others look for the trouble.”",
  },
  {
    id: "2092359271597887720",
    date: "2026-08-25",
    body: "Apple sacrificed Dolly Parton for more RAM.",
  },
  {
    id: "2091873165529997804",
    date: "2026-08-24",
    body: "Decided to try Notion rather than use Apple Notes.\n\nUsing the connector from Grok Bot to blend my notes with textbook notes has been a game changer, and it covers gaps I may have missed that were deemed important.\n\nI then can use the material to review and self-test.",
  },
  {
    id: "2088770097028501713",
    date: "2026-08-15",
    body: "Starting my Intro to C/C++ Class today!\n\nFirst Computer Science course.\n\nReady to see where this journey takes me.",
  },
  {
    id: "2087202913491853624",
    date: "2026-08-11",
    body: "Every previous technology that “destroyed” jobs and creativity eventually created more of both.\n\nPhotography was going to kill painting.\n\nRecorded music was going to kill live performance.\n\nWord processors were going to kill writers.\n\nThe people who adapted used the new tools.\n\nThe ones who spent their energy raging at the tools mostly just got left behind while still using electricity.",
  },
  {
    id: "1842015348620439615",
    date: "2024-10-04",
    body: "I walk ten miles at least once a week at 4mph, burning about 1,350 calories for reference.",
  },
];
