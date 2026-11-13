import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// From the journey map I built for the project. `mood` is 0 (low) to 1 (high).
const STAGES = [
  {
    name: "Discovering",
    mood: 0.7,
    goal: "Find a yoga app that fits their wellness needs.",
    problem: "Hard to find a trustworthy app that stands out.",
    idea: "Targeted ads and partnerships to improve visibility.",
  },
  {
    name: "Exploring",
    mood: 0.1,
    goal: "Locate specific classes like chair yoga or meditation.",
    problem: "Overwhelmed by too many options and unclear categories.",
    idea: "Simplify content categories and use filters for clarity.",
  },
  {
    name: "Starting a trial",
    mood: 0.55,
    goal: "Try the app risk-free before committing.",
    problem: "Confusion about how the free trial or subscription works.",
    idea: "A step-by-step guide during trial sign-up.",
  },
  {
    name: "Engaging",
    mood: 0.3,
    goal: "Practise routines that match their schedule.",
    problem: "Hard to fit yoga into a busy routine.",
    idea: "Calendar scheduling, reminders and tailored recommendations.",
  },
  {
    name: "Continuing",
    mood: 0.95,
    goal: "Stay consistent in their wellness journey.",
    problem: "Risk of losing motivation without reminders.",
    idea: "Progress tracking, badges and motivational notifications.",
  },
];

const W = 500;
const H = 130;
const pts = STAGES.map((s, i) => [50 + i * 100, 18 + (1 - s.mood) * 90]);
const path = pts.reduce((d, [x, y], i) => {
  if (i === 0) return `M${x},${y}`;
  const [px, py] = pts[i - 1];
  const cx = (px + x) / 2;
  return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
}, "");

export default function JourneyMap() {
  const [active, setActive] = useState(1);
  const stage = STAGES[active];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">
        <span>Emotion across the journey</span>
        <span className="hidden sm:inline">Tap a stage</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full overflow-visible" role="img" aria-label="Emotion curve dipping at exploring and engaging, peaking at continuing">
        <line x1="20" x2={W - 20} y1={H / 2 + 8} y2={H / 2 + 8} stroke="var(--color-border)" strokeDasharray="3 5" />
        <motion.path
          d={path}
          fill="none"
          stroke="#9b6cc0"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {pts.map(([x, y], i) => (
          <g key={STAGES[i].name} onClick={() => setActive(i)} className="cursor-pointer">
            <circle cx={x} cy={y} r="18" fill="transparent" />
            <motion.circle
              cx={x}
              cy={y}
              initial={false}
              animate={{ r: i === active ? 9 : 6 }}
              fill={i === active ? "#f27f1f" : "var(--color-ink)"}
              stroke={i === active ? "#f27f1f" : "#9b6cc0"}
              strokeWidth="2.5"
            />
          </g>
        ))}
      </svg>

      <div role="tablist" aria-label="Journey stages" className="mt-3 grid grid-cols-5 gap-1">
        {STAGES.map((s, i) => (
          <button
            key={s.name}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-lg px-1 py-2 text-center text-xs leading-tight transition-colors sm:text-sm ${
              i === active
                ? "bg-[var(--color-surface-raised)] text-[var(--color-paper)]"
                : "text-[var(--color-paper-mute)] hover:text-[var(--color-paper-dim)]"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.dl
          key={stage.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid gap-6 border-t border-[var(--color-border)] pt-6 sm:grid-cols-3"
        >
          {[
            ["User goal", stage.goal],
            ["Problem", stage.problem],
            ["Design response", stage.idea],
          ].map(([label, text]) => (
            <div key={label}>
              <dt className={`text-xs uppercase tracking-[0.16em] ${label === "Design response" ? "text-[#f27f1f]" : "text-[var(--color-paper-mute)]"}`}>
                {label}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-[var(--color-paper-dim)]">{text}</dd>
            </div>
          ))}
        </motion.dl>
      </AnimatePresence>
    </div>
  );
}
