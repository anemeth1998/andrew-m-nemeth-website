import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIAL } from "@/data/portfolio";
import {
  X_NOTES,
  xStatusHref,
} from "@/data/x-feed";
import { XLogo } from "@/components/icons/x-logo";
import { cn } from "@/lib/utils";

const PROFILE_HREF =
  "https://x.com/AndrewMNemeth?ref_src=twsrc%5Etfw";
const WIDGETS_SRC = "https://platform.x.com/widgets.js";
const SCRIPT_ID = "twitter-wjs";
const TIMELINE_HEIGHT = 620;

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (el?: HTMLElement) => void;
      };
    };
  }
}

function preferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function ensureWidgetsScript(): Promise<void> {
  if (window.twttr?.widgets?.load) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.twttr?.widgets?.load) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("widgets")), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = WIDGETS_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("widgets"));
    document.body.appendChild(script);
  });
}

/** Official profile timeline from publish.x.com — exact widget markup. */
export function XTimeline({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const theme = preferredTheme();
    host.innerHTML = `<a class="twitter-timeline" href="${PROFILE_HREF}" data-height="${TIMELINE_HEIGHT}" data-theme="${theme}" data-chrome="nofooter noborders" data-dnt="true">Posts by AndrewMNemeth</a>`;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      if (!host.querySelector("iframe")) setFailed(true);
    }, 12000);

    const mo = new MutationObserver(() => {
      if (host.querySelector("iframe")) setFailed(false);
    });
    mo.observe(host, { childList: true, subtree: true });

    void ensureWidgetsScript()
      .then(() => {
        if (cancelled) return;
        window.twttr?.widgets?.load(host);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      const next = preferredTheme();
      host.innerHTML = `<a class="twitter-timeline" href="${PROFILE_HREF}" data-height="${TIMELINE_HEIGHT}" data-theme="${next}" data-chrome="nofooter noborders" data-dnt="true">Posts by AndrewMNemeth</a>`;
      window.twttr?.widgets?.load(host);
    };
    mq.addEventListener("change", onScheme);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      mo.disconnect();
      mq.removeEventListener("change", onScheme);
    };
  }, []);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-bg-elevated",
        className,
      )}
    >
      <div
        ref={hostRef}
        className="w-full [&_iframe]:w-full"
        style={{ minHeight: failed ? undefined : TIMELINE_HEIGHT }}
      />
      {failed && <NativeNotesFallback />}
    </div>
  );
}

function NativeNotesFallback() {
  return (
    <div className="border-t border-border">
      <div className="px-5 py-4">
        <p className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
          <XLogo className="size-3.5" />
          Notes
        </p>
        <p className="mt-2 text-sm text-fg-secondary">
          The live 𝕏 widget didn’t attach. Recent notes from the profile:
        </p>
      </div>
      <ul>
        {X_NOTES.slice(0, 4).map((note) => (
          <li key={note.id} className="border-t border-border">
            <a
              href={xStatusHref(note.id)}
              target="_blank"
              rel="noreferrer"
              className="group block px-5 py-4 hover:bg-bg-subtle"
            >
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-fg">
                {note.body}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-fg-muted group-hover:text-fg">
                Open on 𝕏
                <ArrowUpRight className="size-3" />
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function XFollowButton({ className }: { className?: string }) {
  return (
    <a
      href={`https://x.com/intent/follow?screen_name=AndrewMNemeth`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-10 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-80",
        className,
      )}
    >
      Follow {SOCIAL.x.handle}
    </a>
  );
}

export function XTweetButton({ className }: { className?: string }) {
  const href = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `${SITE.name} — drawing, photography, software, and hybrid work.`,
  )}&via=AndrewMNemeth`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-fg",
        className,
      )}
    >
      Share
    </a>
  );
}
