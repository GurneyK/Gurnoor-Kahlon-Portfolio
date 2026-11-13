import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

import ob1 from "../../assets/pagoda/onboarding-1.jpg";
import ob2 from "../../assets/pagoda/onboarding-2.jpg";
import ob3 from "../../assets/pagoda/onboarding-3.jpg";
import ob4 from "../../assets/pagoda/onboarding-4.jpg";
import ob5 from "../../assets/pagoda/onboarding-5.jpg";
import ob6 from "../../assets/pagoda/onboarding-6.jpg";

const STEPS = [
  { src: ob1, label: "Welcome", note: "A real photo of the instructor replaces the logo splash." },
  { src: ob2, label: "Meet Lee", note: "Puts a face to the content before asking for anything." },
  { src: ob6, label: "Stream & download", note: "Offline and casting, shown on an actual product screen." },
  { src: ob4, label: "Build your routine", note: "Scheduling and reminders, previewed in the calendar view." },
  { src: ob3, label: "Exclusive classes", note: "Mat, chair, Pilates and meditation in one scannable list." },
  { src: ob5, label: "Your journey", note: "Badges, goals and progress, previewed in the profile view." },
];

const DURATION = 4200;

export default function OnboardingStepper() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduce;

  const go = (next) => {
    const n = (next + STEPS.length) % STEPS.length;
    setState([n, n > index || (index === STEPS.length - 1 && n === 0) ? 1 : -1]);
  };

  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index]);

  const step = STEPS[index];

  return (
    <div
      ref={ref}
      className="mx-auto max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex gap-1.5" aria-hidden="true">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => go(i)}
            className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-border)]"
            tabIndex={-1}
          >
            <motion.span
              key={`${i}-${index}-${playing}`}
              className="block h-full rounded-full bg-[#7b3fa0]"
              initial={{ width: i < index || (i === index && !playing) ? "100%" : "0%" }}
              animate={{ width: i <= index ? "100%" : "0%" }}
              transition={i === index && playing ? { duration: DURATION / 1000, ease: "linear" } : { duration: 0.25 }}
            />
          </button>
        ))}
      </div>

      <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={step.src}
            src={step.src}
            alt={`Onboarding step ${index + 1}: ${step.label}`}
            custom={dir}
            variants={{
              enter: (d) => ({ x: `${d * 18}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d) => ({ x: `${d * -18}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div aria-live="polite">
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">
            Step {index + 1} of {STEPS.length} · {step.label}
          </p>
          <p className="mt-1.5 text-base leading-relaxed text-[var(--color-paper-dim)]">{step.note}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          {[
            [-1, "Previous step", "M15 6l-6 6 6 6"],
            [1, "Next step", "M9 6l6 6-6 6"],
          ].map(([d, label, path]) => (
            <button
              key={label}
              onClick={() => {
                setPaused(true);
                go(index + d);
              }}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-sage-bright)] hover:text-[var(--color-sage-bright)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d={path} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
