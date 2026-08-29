/**
 * Owned-read timeline for @AndrewMNemeth.
 * Uses GET /2/users/{id}/tweets with a user OAuth token so X bills
 * owned reads (~$0.001/post), not search.
 *
 * Set on Vercel (never commit):
 *   X_ACCESS_TOKEN  OAuth 2.0 user access token for @AndrewMNemeth
 *   X_USER_ID       optional; defaults to this account
 */

const DEFAULT_USER_ID = "565008162";
const HANDLE = "AndrewMNemeth";
const CACHE_MS = 15 * 60 * 1000;
const MAX = 8;

export type OwnedPost = {
  id: string;
  text: string;
  createdAt: string;
  href: string;
};

export type OwnedFeed = {
  configured: boolean;
  posts: OwnedPost[];
  fetchedAt: string | null;
};

type Cache = { at: number; feed: OwnedFeed };

let cache: Cache | null = null;

function token(): string | undefined {
  return process.env.X_ACCESS_TOKEN || process.env.X_BEARER_TOKEN;
}

function userId(): string {
  return process.env.X_USER_ID || DEFAULT_USER_ID;
}

function empty(configured: boolean): OwnedFeed {
  return { configured, posts: [], fetchedAt: null };
}

export async function getOwnedFeed(): Promise<OwnedFeed> {
  const t = token();
  if (!t) return empty(false);

  if (cache && Date.now() - cache.at < CACHE_MS) return cache.feed;

  const params = new URLSearchParams({
    max_results: String(MAX),
    exclude: "replies,retweets",
    "tweet.fields": "created_at,note_tweet",
  });

  const url = `https://api.x.com/2/users/${userId()}/tweets?${params}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${t}`,
      "User-Agent": "andrewmnemeth.com",
    },
  });

  if (!res.ok) {
    if (cache) return cache.feed;
    return empty(true);
  }

  const body = (await res.json()) as {
    data?: Array<{
      id: string;
      text: string;
      created_at?: string;
      note_tweet?: { text?: string };
    }>;
  };

  const posts: OwnedPost[] = (body.data ?? []).map((p) => ({
    id: p.id,
    text: (p.note_tweet?.text || p.text || "").trim(),
    createdAt: p.created_at ?? "",
    href: `https://x.com/${HANDLE}/status/${p.id}`,
  }));

  const feed: OwnedFeed = {
    configured: true,
    posts,
    fetchedAt: new Date().toISOString(),
  };
  cache = { at: Date.now(), feed };
  return feed;
}
