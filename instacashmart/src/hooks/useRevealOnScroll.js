import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".reveal:not(.revealed), .reveal-group > :not(.revealed)";

const REVEAL_STAGGER_MS = 90;

const REVEAL_MAX_STEPS = 6;

export function useRevealOnScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      const a = () =>
        document
          .querySelectorAll(REVEAL_SELECTOR)
          .forEach((i) => i.classList.add("revealed"));
      a();
      const n = new MutationObserver(a);
      n.observe(document.body, {
        childList: true,
        subtree: true,
      });
      return () => n.disconnect();
    }
    const e = new IntersectionObserver(
      (a) => {
        a.filter((n) => n.isIntersecting).forEach((n, i) => {
          n.target.style.setProperty(
            "--reveal-delay",
            `${Math.min(i, REVEAL_MAX_STEPS) * REVEAL_STAGGER_MS}ms`,
          );
          n.target.classList.add("revealed");
          e.unobserve(n.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
      },
    );
    const t = () =>
      document.querySelectorAll(REVEAL_SELECTOR).forEach((a) => e.observe(a));
    t();
    const r = new MutationObserver(t);
    r.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      r.disconnect();
      e.disconnect();
    };
  }, []);
}
