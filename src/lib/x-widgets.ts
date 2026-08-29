const SCRIPT_ID = "twitter-wjs";
const SCRIPT_SRC = "https://platform.twitter.com/widgets.js";

export type XWidgetsApi = {
  ready: (cb: () => void) => void;
  widgets: {
    load: (el?: HTMLElement) => Promise<unknown>;
    createTimeline: (
      source: { sourceType: "profile"; screenName: string },
      element: HTMLElement,
      options?: Record<string, unknown>,
    ) => Promise<HTMLElement>;
    createFollowButton: (
      screenName: string,
      element: HTMLElement,
      options?: Record<string, unknown>,
    ) => Promise<HTMLElement>;
    createShareButton: (
      url: string,
      element: HTMLElement,
      options?: Record<string, unknown>,
    ) => Promise<HTMLElement>;
  };
};

declare global {
  interface Window {
    twttr?: XWidgetsApi;
  }
}

export function preferredXTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Load official widgets.js once; resolve when the factory is ready. */
export function loadXWidgets(): Promise<XWidgetsApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("ssr"));
  }

  const existing = window.twttr;
  if (existing?.widgets?.createTimeline) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve, reject) => {
    const finish = () => {
      const api = window.twttr;
      if (!api?.widgets) {
        reject(new Error("X widgets unavailable"));
        return;
      }
      if (typeof api.ready === "function") {
        api.ready(() => resolve(api));
      } else {
        resolve(api);
      }
    };

    const prev = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (prev) {
      if (window.twttr?.widgets) {
        finish();
        return;
      }
      prev.addEventListener("load", finish, { once: true });
      prev.addEventListener(
        "error",
        () => reject(new Error("X widgets failed to load")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.onload = finish;
    script.onerror = () => reject(new Error("X widgets failed to load"));
    document.head.appendChild(script);
  });
}

export const X_WIDGET_DEFAULTS = {
  dnt: true,
  lang: "en",
} as const;
