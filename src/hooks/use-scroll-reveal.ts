import { useEffect } from "react";

/**
 * Global scroll-reveal — finds every `.reveal` element on the page
 * and adds `.reveal-in` when it intersects the viewport.
 * Mount once at the app root.
 */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)")
        .forEach((el) => io.observe(el));
    };

    scan();

    // Re-scan on DOM mutations (route changes, lazy content)
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
