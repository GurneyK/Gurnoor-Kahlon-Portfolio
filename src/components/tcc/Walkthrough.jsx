import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrowserShot from "./BrowserShot.jsx";

/**
 * Tabbed walk through the six beats of the demo story.
 * Tabs follow the ARIA tabs pattern: arrow keys move between them.
 */
export default function Walkthrough({ steps }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const step = steps[active];

  const onKeyDown = (e) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Demo story"
        onKeyDown={onKeyDown}
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0"
      >
        {steps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => (tabs.current[i] = el)}
              role="tab"
              id={`tcc-tab-${s.id}`}
              aria-selected={selected}
              aria-controls="tcc-walkthrough-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-xl border px-4 py-3 text-left transition-colors ${
                selected
                  ? "border-[var(--color-sage)] bg-[var(--color-surface-raised)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-sage-dim)]"
              }`}
            >
              <span className="block font-[family-name:var(--font-display)] text-sm text-[var(--color-paper-mute)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`mt-1 block whitespace-nowrap text-base ${selected ? "text-[var(--color-paper)]" : "text-[var(--color-paper-dim)]"}`}>
                {s.label}
              </span>
              {selected && (
                <motion.span
                  layoutId="tcc-tab-bar"
                  className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[var(--color-sage)]"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="tcc-walkthrough-panel"
        role="tabpanel"
        aria-labelledby={`tcc-tab-${step.id}`}
        className="mt-6 grid gap-8 rounded-3xl bg-[linear-gradient(150deg,#eeebfa_0%,#d9d2f2_55%,#c3b7e8_100%)] p-5 sm:p-8"
      >
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrowserShot src={step.image} alt={step.alt} url={`gurneyk.github.io/TCC/#${step.path}`} />
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4b3a9c]">Viewing as {step.persona}</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug text-[#1f1745] md:text-3xl">{step.title}</p>
              <p className="mt-3 text-base leading-relaxed text-[#3d3760] md:text-lg">{step.body}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActive((active - 1 + steps.length) % steps.length)}
                aria-label="Previous step"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f1745]/20 text-[#1f1745] transition-colors hover:bg-white/60"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % steps.length)}
                aria-label="Next step"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f1745] text-white transition-transform hover:translate-x-0.5"
              >
                →
              </button>
              <span className="text-sm text-[#3d3760]">
                {active + 1} of {steps.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
