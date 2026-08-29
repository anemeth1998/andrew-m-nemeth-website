import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIAL } from "@/data/portfolio";
import { XLogo } from "@/components/icons/x-logo";
import {
  loadXWidgets,
  preferredXTheme,
  X_WIDGET_DEFAULTS,
} from "@/lib/x-widgets";
import { cn } from "@/lib/utils";

const SCREEN = SOCIAL.x.handle.replace(/^@/, "");
const LOAD_MS = 8000;

type Status = "loading" | "ready" | "fallback";

export function XTimeline({
  height = 560,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === "ready" ? s : "fallback"));
    }, LOAD_MS);

    async function mount() {
      try {
        const twttr = await loadXWidgets();
        if (cancelled || !hostRef.current) return;
        hostRef.current.replaceChildren();
        await twttr.widgets.createTimeline(
          { sourceType: "profile", screenName: SCREEN },
          hostRef.current,
          {
            ...X_WIDGET_DEFAULTS,
            theme: preferredXTheme(),
            height,
            chrome: "nofooter noborders",
          },
        );
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    }

    void mount();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      setStatus("loading");
      void mount();
    };
    mq.addEventListener("change", onScheme);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      mq.removeEventListener("change", onScheme);
    };
  }, [height]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-bg-elevated",
        className,
      )}
    >
      {status !== "ready" && (
        <XTimelineFallback
          className="absolute inset-0 z-[1]"
          busy={status === "loading"}
        />
      )}
      <div
        ref={hostRef}
        className={cn(
          "min-h-[22rem] w-full [&_iframe]:w-full",
          status === "ready" ? "relative z-[2]" : "invisible h-0 overflow-hidden",
        )}
        style={{ minHeight: status === "ready" ? height : undefined }}
        aria-hidden={status !== "ready"}
      />
    </div>
  );
}

function XTimelineFallback({
  className,
  busy,
}: {
  className?: string;
  busy: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[22rem] flex-col justify-between p-6 md:p-8",
        className,
      )}
    >
      <div>
        <p className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
          <XLogo className="size-3.5" />
          Profile
        </p>
        <h3 className="mt-4 text-2xl font-medium tracking-tight">{SITE.name}</h3>
        <p className="mt-1 text-sm text-fg-muted">{SOCIAL.x.handle}</p>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-fg-secondary">
          {busy
            ? "Loading the live 𝕏 timeline…"
            : "The live feed didn’t load here. Open the profile on 𝕏 for notes, conversation, and articles."}
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={SOCIAL.x.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-80"
        >
          Open profile
          <ArrowUpRight className="size-3.5" />
        </a>
        <a
          href={SOCIAL.x.articlesHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-fg"
        >
          Articles
        </a>
      </div>
    </div>
  );
}

export function XFollowButton({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadXWidgets()
      .then((twttr) => {
        if (cancelled || !ref.current) return;
        ref.current.replaceChildren();
        return twttr.widgets.createFollowButton(SCREEN, ref.current, {
          ...X_WIDGET_DEFAULTS,
          size: "large",
          showCount: true,
          showScreenName: true,
        });
      })
      .then((node) => {
        if (!cancelled && node) setReady(true);
      })
      .catch(() => {
        /* native fallback stays */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={cn("min-h-[28px]", className)}>
      <div ref={ref} className="flex min-h-[28px] items-center" />
      {!ready && (
        <a
          href={SOCIAL.x.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-80"
        >
          Follow {SOCIAL.x.handle}
        </a>
      )}
    </div>
  );
}

export function XTweetButton({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const url =
      typeof window !== "undefined" ? window.location.origin : SOCIAL.x.href;

    void loadXWidgets()
      .then((twttr) => {
        if (cancelled || !ref.current) return;
        ref.current.replaceChildren();
        return twttr.widgets.createShareButton(url, ref.current, {
          ...X_WIDGET_DEFAULTS,
          size: "large",
          text: `${SITE.name} — drawing, photography, software, and hybrid work.`,
          via: SCREEN,
        });
      })
      .then((node) => {
        if (!cancelled && node) setReady(true);
      })
      .catch(() => {
        /* native fallback stays */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const shareHref = `https://x.com/intent/tweet?text=${encodeURIComponent(`${SITE.name} — drawing, photography, software, and hybrid work.`)}&via=${SCREEN}`;

  return (
    <div className={cn("min-h-[28px]", className)}>
      <div ref={ref} className="flex min-h-[28px] items-center" />
      {!ready && (
        <a
          href={shareHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-fg"
        >
          Post
        </a>
      )}
    </div>
  );
}

