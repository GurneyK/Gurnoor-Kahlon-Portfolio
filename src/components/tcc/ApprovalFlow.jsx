import { motion } from "framer-motion";

const STAGES = [
  { who: "Priya, Analyst", what: "Creates and submits", tone: "maker" },
  { who: "Payment Risk agent", what: "Checks and explains", tone: "agent" },
  { who: "Daniel, Treasurer", what: "Approves or rejects", tone: "checker" },
  { who: "Bank", what: "Released and acknowledged", tone: "bank" },
];

const TONE = {
  maker: "bg-[#e9e5fb] text-[#3b2c8a]",
  agent: "bg-[#fff4dc] text-[#8a4b08]",
  checker: "bg-[#e3f3e6] text-[#24563a]",
  bank: "bg-[#e8eef7] text-[#2c4466]",
};

/** Maker, agent, checker, bank. Every arrow writes to the audit trail. */
export default function ApprovalFlow() {
  return (
    <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
      <ol className="grid gap-4 md:grid-cols-4 md:gap-0">
        {STAGES.map((s, i) => (
          <motion.li
            key={s.who}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center gap-4 md:flex-col md:items-start md:pr-6"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-base ${TONE[s.tone]}`}>
              {i + 1}
            </span>
            {i < STAGES.length - 1 && (
              <motion.span
                aria-hidden="true"
                className="absolute left-14 right-2 top-[22px] hidden h-px origin-left bg-[var(--color-border)] md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              />
            )}
            <div className="md:mt-4">
              <p className="text-base font-medium text-[var(--color-paper)]">{s.who}</p>
              <p className="mt-0.5 text-sm text-[var(--color-paper-mute)]">{s.what}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <div className="mt-8 grid gap-3 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-paper-dim)] sm:grid-cols-3">
        <p>
          <span className="text-[var(--color-paper)]">Nobody approves their own payment.</span> The button explains why it's disabled.
        </p>
        <p>
          <span className="text-[var(--color-paper)]">An open critical finding blocks approval</span> until a person resolves it.
        </p>
        <p>
          <span className="text-[var(--color-paper)]">Every step is an audit event</span> with actor, time, target and reason.
        </p>
      </div>
    </div>
  );
}
