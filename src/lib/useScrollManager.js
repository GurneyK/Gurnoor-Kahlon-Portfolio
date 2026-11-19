import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Scroll position per history entry, so the browser Back button returns
// people to where they were (e.g. the project card they clicked).
const positions = new Map();

const pageNode = () => document.querySelector("[data-page]");

/**
 * One place that decides where the window scrolls after a navigation:
 * - navigate(path, { state: { section: "work" } })  -> that section
 * - browser Back / Forward                            -> the saved position (wins)
 * - anything else                                     -> the top
 * It waits for the outgoing page's exit animation, so the jump happens on
 * the new page, never on the one fading out.
 */
export default function useScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const lastPath = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // Remember the scroll position of the current history entry
  useEffect(() => {
    const key = location.key;
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key]);

  useEffect(() => {
    const saved = navType === "POP" ? positions.get(location.key) : undefined;
    // On Back/Forward, where the visitor actually was beats the original target
    const section = saved == null ? location.state?.section : undefined;
    const samePage = lastPath.current === location.pathname;
    lastPath.current = location.pathname;
    const oldNode = pageNode();
    const start = performance.now();
    let raf;
    let settledAt = 0;

    const apply = (behavior) => {
      if (section) {
        const el = document.getElementById(section);
        if (!el) return false;
        // Home sections carry their own top padding, so no nav offset is needed
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior });
        return true;
      }
      // A lazily loaded page may still be too short to reach the saved spot
      if (saved && document.documentElement.scrollHeight < saved + window.innerHeight * 0.5) return false;
      window.scrollTo({ top: saved ?? 0, behavior });
      return true;
    };

    if (samePage) {
      apply("smooth");
      return;
    }

    const tick = () => {
      const t = performance.now() - start;
      const node = pageNode();
      // Wait until the new page has mounted (or give up waiting after 1.2s)
      if (node === oldNode && t < 1200) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!apply("instant") && t < 2500) {
        raf = requestAnimationFrame(tick);
        return;
      }
      // Re-apply for a short while so late-loading images can't knock us off target
      if (!settledAt) settledAt = t;
      if (t - settledAt < 700 && (section || saved)) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Stop correcting as soon as the visitor scrolls themselves
    const cancel = () => cancelAnimationFrame(raf);
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, { passive: true, once: true });
    window.addEventListener("keydown", cancel, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps
}
