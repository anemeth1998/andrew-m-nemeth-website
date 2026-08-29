import { useEffect, useRef } from "react";

/** Adds `.is-visible` when the element (or its `.reveal` children) enter the viewport. */
export function useReveal<T extends HTMLElement = HTMLElement>(
  rootMargin = "0px 0px -6% 0px",
  /** Re-scan when this key changes (e.g. filter). */
  watchKey?: string | number,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mark = (node: Element) => node.classList.add("is-visible");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (el.classList.contains("reveal")) mark(el);
      el.querySelectorAll(".reveal").forEach(mark);
      return;
    }

    const collect = () => {
      const set = new Set<Element>();
      if (el.classList.contains("reveal")) set.add(el);
      el.querySelectorAll(".reveal").forEach((n) => set.add(n));
      return Array.from(set);
    };

    const inView = (node: Element) => {
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.98 && r.bottom > 0;
    };

    let targets = collect().filter((n) => !n.classList.contains("is-visible"));
    targets.forEach((n) => {
      if (inView(n)) mark(n);
    });
    targets = collect().filter((n) => !n.classList.contains("is-visible"));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            mark(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    targets.forEach((t) => observer.observe(t));

    const mo = new MutationObserver(() => {
      collect()
        .filter((n) => !n.classList.contains("is-visible"))
        .forEach((n) => {
          if (inView(n)) mark(n);
          else observer.observe(n);
        });
    });
    mo.observe(el, { childList: true, subtree: true });

    const failsafe = window.setTimeout(() => {
      collect().forEach(mark);
    }, 600);

    return () => {
      observer.disconnect();
      mo.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [rootMargin, watchKey]);

  return ref;
}
