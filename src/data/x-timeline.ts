/**
 * Snapshot of @AndrewMNemeth's recent original posts on 𝕏.
 *
 * Fetched via the X API v2 owned-read endpoint (`GET /2/users/:id/tweets`,
 * excluding replies and reposts) — reading your own posts bills at the
 * owned-data rate. Refresh by asking an agent with the X connection to
 * re-run the fetch and update this file; the site needs no API keys.
 */

export type XPostMedia = {
  /** pbs.twimg.com image URL (append `?name=small` for a thumbnail variant) */
  url: string;
  width: number;
  height: number;
  alt?: string;
};

export type XPostLink = {
  /** The t.co token exactly as it appears in `text` */
  token: string;
  /** Human-readable label, e.g. "nytimes.com/2026/08/27/tec…" */
  display: string;
  href: string;
  /** Media/article placeholders are removed from the rendered text */
  hidden?: boolean;
};

export type XPost = {
  id: string;
  /** Raw post text; t.co tokens are swapped for readable links at render time */
  text: string;
  /** ISO timestamp */
  createdAt: string;
  likes: number;
  reposts: number;
  replies: number;
  /** Set when the post announces an 𝕏 Article */
  articleTitle?: string;
  links?: XPostLink[];
  media?: XPostMedia[];
};

export type XTimelineSnapshot = {
  /** X username without the @ */
  handle: string;
  /** ISO timestamp of when the snapshot was fetched */
  fetchedAt: string;
  posts: XPost[];
};

export const X_TIMELINE: XTimelineSnapshot = {
  handle: "AndrewMNemeth",
  fetchedAt: "2026-08-30T03:14:00.000Z",
  posts: [
    {
      id: "2093816860814827665",
      createdAt: "2026-08-29T21:43:35.000Z",
      text: "Starting to see items delisted… \n\nPossibly consolidating the merchandise shops. https://t.co/9FVgXQvQkC",
      likes: 0,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/9FVgXQvQkC",
          display: "x.com/andrewmnemeth/…",
          href: "https://x.com/AndrewMNemeth/status/2092361050318393746",
        },
      ],
    },
    {
      id: "2093465312557482375",
      createdAt: "2026-08-28T22:26:39.000Z",
      text: "Cannot wait for Grok 4.7.",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2093355319082512450",
      createdAt: "2026-08-28T15:09:35.000Z",
      text: "Ordering the chick fil a waffle bacon sandwich and a side of macaroni and putting the macaroni on the sandwich with the s’mores milkshake as the drink. https://t.co/QOBWaTbeLU",
      likes: 2,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/QOBWaTbeLU",
          display: "pic.x.com/QOBWaTbeLU",
          href: "https://x.com/AndrewMNemeth/status/2093355319082512450/photo/1",
          hidden: true,
        },
      ],
      media: [
        {
          url: "https://pbs.twimg.com/media/HQ0XkZVXEAAEFIC.jpg",
          width: 420,
          height: 420,
        },
      ],
    },
    {
      id: "2093300525345161556",
      createdAt: "2026-08-28T11:31:51.000Z",
      text: "Hate the new 𝕏 money UI. \n\nI prefer seeing all my accounts on the home page.",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2093159014339129841",
      createdAt: "2026-08-28T02:09:32.000Z",
      text: "Judge Rules Trump Administration’s Blacklisting of Anthropic Was Illegal https://t.co/3nuQBodeOs via @NYTimes",
      likes: 0,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/3nuQBodeOs",
          display: "nytimes.com/2026/08/27/tec…",
          href: "https://www.nytimes.com/2026/08/27/technology/anthropic-government-blacklisting-ruling.html?unlocked_article_code=1.81A.oZX7.dWSX4eq4lipk&smid=nytcore-ios-share",
        },
      ],
    },
    {
      id: "2092649258142814385",
      createdAt: "2026-08-26T16:23:57.000Z",
      text: "Feeling happy to be an Xbox fan more each day. https://t.co/Y8a87uVFGF",
      likes: 0,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/Y8a87uVFGF",
          display: "x.com/asha_shar/stat…",
          href: "https://x.com/asha_shar/status/2092621209955635606",
        },
      ],
    },
    {
      id: "2092361050318393746",
      createdAt: "2026-08-25T21:18:43.000Z",
      text: "Most of the items on the 𝕏 shop are sold out!\n\nWhen can we expect a restock?",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2092359271597887720",
      createdAt: "2026-08-25T21:11:39.000Z",
      text: "Apple sacrificed Dolly Parton for more RAM.",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2091925702790582471",
      createdAt: "2026-08-24T16:28:48.000Z",
      text: "Big back, big back…\n\n@ChickfilA https://t.co/NKu9JablbG",
      likes: 3,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/NKu9JablbG",
          display: "pic.x.com/NKu9JablbG",
          href: "https://x.com/AndrewMNemeth/status/2091925702790582471/photo/1",
          hidden: true,
        },
      ],
      media: [
        {
          url: "https://pbs.twimg.com/media/HQgDSn6WUAAFHIr.jpg",
          width: 3072,
          height: 4096,
        },
      ],
    },
    {
      id: "2091873165529997804",
      createdAt: "2026-08-24T13:00:02.000Z",
      text: "Decided to try Notion rather than use Apple Notes.\n\nUsing the connector from Grok Bot to blend my notes with textbook notes has been a game changer, and it covers gaps I may have missed that were deemed important.\n\nI then can use the material to review and self-test. \n\nAmazing.",
      likes: 1,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2091712263673503970",
      createdAt: "2026-08-24T02:20:40.000Z",
      text: "Amazing artist. https://t.co/8tzReVGtlE",
      likes: 0,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/8tzReVGtlE",
          display: "x.com/caydeplanet/st…",
          href: "https://x.com/caydeplanet/status/2091670763522986299",
        },
      ],
    },
    {
      id: "2091679559733158313",
      createdAt: "2026-08-24T00:10:43.000Z",
      text: "I really enjoy Grok, but Claude Design is a whole nother ball game of editing.",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2091657872899710986",
      createdAt: "2026-08-23T22:44:32.000Z",
      text: "Is topical ointment only topical if it’s currently relevant?\n\nIf it’s expired, does it become perennial ointment?",
      likes: 1,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2091362360002769048",
      createdAt: "2026-08-23T03:10:16.000Z",
      text: "A letter to @SpaceXAI https://t.co/T5DYihjan8",
      likes: 0,
      reposts: 0,
      replies: 0,
      articleTitle: "A Wishlist for Grok",
      links: [
        {
          token: "https://t.co/T5DYihjan8",
          display: "x.com/i/article/2091…",
          href: "https://x.com/AndrewMNemeth/status/2091362360002769048",
          hidden: true,
        },
      ],
    },
    {
      id: "2091189874355270105",
      createdAt: "2026-08-22T15:44:53.000Z",
      text: "A year ago today, I lost my Tesla. 💔\n\nI miss being able to pre-condition my car.\n\nI miss FSD.\n\nI miss the comfort of road trips in it.\n\nHoping to see the Cybercab launch to the public next month. https://t.co/6aaxiu4z7v",
      likes: 1,
      reposts: 0,
      replies: 0,
      links: [
        {
          token: "https://t.co/6aaxiu4z7v",
          display: "pic.x.com/6aaxiu4z7v",
          href: "https://x.com/AndrewMNemeth/status/2091189874355270105/photo/1",
          hidden: true,
        },
      ],
      media: [
        {
          url: "https://pbs.twimg.com/media/HQVlFZSXUAAMfRe.jpg",
          width: 3072,
          height: 4096,
        },
        {
          url: "https://pbs.twimg.com/media/HQVlFZOWMAAttpZ.jpg",
          width: 3072,
          height: 4096,
        },
        {
          url: "https://pbs.twimg.com/media/HQVlFZNXkAEEbM9.jpg",
          width: 3072,
          height: 4096,
        },
      ],
    },
    {
      id: "2090891408282632260",
      createdAt: "2026-08-21T19:58:53.000Z",
      text: "Why I subscribe to SuperGrok Heavy. https://t.co/IhBQHw2onP",
      likes: 2,
      reposts: 1,
      replies: 2,
      articleTitle:
        "One Subscription, Multiple Surfaces: Why SuperGrok Heavy Is the Best Current Consumer AI Bundle",
      links: [
        {
          token: "https://t.co/IhBQHw2onP",
          display: "x.com/i/article/2090…",
          href: "https://x.com/AndrewMNemeth/status/2090891408282632260",
          hidden: true,
        },
      ],
    },
    {
      id: "2090883665156821186",
      createdAt: "2026-08-21T19:28:07.000Z",
      text: "𝕏 money is awesome.\n\nAs a teacher, I get paid once a month. Coming back from summer vacation, the stretch is rough. \n\nI was able to get paid 4 days early! \n\nDefinitely sticking with this place for my finances.\n\nCan’t wait to see loans and stock trading implemented!",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
    {
      id: "2090869623033860555",
      createdAt: "2026-08-21T18:32:19.000Z",
      text: "Who else is still planning to try and nab the 25th anniversary Xbox Series X despite the price tag?",
      likes: 0,
      reposts: 0,
      replies: 0,
    },
  ],
};

export function xPostUrl(post: XPost): string {
  return `https://x.com/${X_TIMELINE.handle}/status/${post.id}`;
}
