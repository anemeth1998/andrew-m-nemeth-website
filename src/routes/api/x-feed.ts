import { createFileRoute } from "@tanstack/react-router";
import { getOwnedFeed } from "@/lib/x-owned-feed";

export const Route = createFileRoute("/api/x-feed")({
  server: {
    handlers: {
      GET: async () => {
        const feed = await getOwnedFeed();
        return new Response(JSON.stringify(feed), {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": feed.configured
              ? "public, s-maxage=900, stale-while-revalidate=1800"
              : "public, max-age=60",
          },
        });
      },
    },
  },
});
