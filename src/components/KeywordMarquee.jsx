import { keywords } from "../data/keywords.js";

const DOTS = ["var(--color-sage-bright)", "var(--color-teal)", "var(--color-amber)", "var(--color-violet)"];

export default function KeywordMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-border-soft)] bg-[var(--color-surface)] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-surface)] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-surface)] to-transparent sm:w-32" />
      <div className="marquee-track flex w-max items-center">
        {[...keywords, ...keywords].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-6 pr-6 font-[family-name:var(--font-display)] text-lg text-[var(--color-paper-dim)] sm:text-xl"
          >
            {word}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: DOTS[i % DOTS.length] }} />
          </span>
        ))}
      </div>
    </div>
  );
}
