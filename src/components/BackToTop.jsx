import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Floating "back to top" button, shown once the visitor has scrolled a screen or so */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Back to top"
          className="group fixed bottom-4 right-4 z-40 flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-surface-raised)_88%,transparent)] px-3.5 text-sm text-[var(--color-paper-dim)] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:border-[var(--color-teal)] hover:text-[var(--color-paper)] sm:bottom-6 sm:right-6"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-teal)] transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
          <span className="hidden sm:inline">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
