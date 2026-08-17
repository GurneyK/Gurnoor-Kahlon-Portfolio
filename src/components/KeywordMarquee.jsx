import { keywords } from "../data/keywords.js";

export default function KeywordMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-border-soft)] bg-[var(--color-surface)] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-surface)] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-surface)] to-transparent sm:w-32" />
      <div className="marquee-track flex w-max items-center gap-3">
        {[...keywords, ...keywords].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="shrink-0 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-paper-dim)] sm:text-base"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
