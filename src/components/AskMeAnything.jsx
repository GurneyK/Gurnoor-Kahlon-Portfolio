import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "./CaseStudyLayout.jsx";
import { qaPairs, matchEntry, suggestionsFor } from "../data/qa.jsx";

const EASE = [0.22, 1, 0.36, 1];

function Avatar() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-sage),var(--color-teal))] p-[1.5px]">
      <span className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-[11px] font-semibold tracking-wide text-[var(--color-paper)]">
        GK
      </span>
    </span>
  );
}

function Message({ role, children }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`flex items-end gap-3 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && <Avatar />}
      <div
        className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed sm:max-w-[75%] sm:text-base ${
          isUser
            ? "bubble-user rounded-2xl rounded-br-md font-medium"
            : "bubble-bot rounded-2xl rounded-bl-md border border-[var(--color-border-soft)] text-[var(--color-paper-dim)]"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-end gap-3"
      aria-label="Gurnoor is answering"
    >
      <Avatar />
      <div className="bubble-bot flex gap-1.5 rounded-2xl rounded-bl-md border border-[var(--color-border-soft)] px-4 py-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-paper-mute)]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function QuestionChip({ question, onClick, delay = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
      className="group flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-left text-sm text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-teal)] hover:text-[var(--color-paper)]"
    >
      {question}
      <span aria-hidden="true" className="text-[var(--color-teal)] transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </motion.button>
  );
}

export default function AskMeAnything() {
  const [thread, setThread] = useState([]);
  const [asked, setAsked] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const timer = useRef(null);

  // Keep the newest message in view inside the chat, without moving the page
  useEffect(() => {
    const el = scrollRef.current;
    if (el && thread.length) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [thread, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (question, id, answer) => {
    if (typing) return;
    setThread((t) => [...t, { role: "user", text: question }]);
    setTyping(true);
    if (id) setAsked((a) => [...a, id]);
    timer.current = setTimeout(() => {
      setThread((t) => [...t, { role: "assistant", text: answer }]);
      setLastId(id);
      setTyping(false);
    }, 650);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const { id, answer } = matchEntry(trimmed);
    ask(trimmed, id, answer);
    setInput("");
  };

  const reset = () => {
    clearTimeout(timer.current);
    setThread([]);
    setAsked([]);
    setLastId(null);
    setTyping(false);
  };

  const started = thread.length > 0;
  const followUps = started && !typing ? suggestionsFor(lastId, asked) : [];

  return (
    <section id="ask" className="relative border-t border-[var(--color-border-soft)] px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Eyebrow>Ask Me Anything</Eyebrow>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
          Common interview questions, answered directly
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
          Pick a question below, or type your own about my work, background,
          or projects. No live AI behind this, just my own answers, kept
          consistent every time, ready to route you to a real conversation
          when it's worth having one.
        </p>

        {/* Gradient hairline border around a soft glass panel */}
        <div className="relative mt-10 rounded-3xl bg-[linear-gradient(140deg,color-mix(in_oklab,var(--color-sage)_55%,transparent),var(--color-border)_35%,var(--color-border)_65%,color-mix(in_oklab,var(--color-teal)_55%,transparent))] p-px shadow-[0_40px_100px_-50px_color-mix(in_oklab,var(--color-teal)_55%,transparent)]">
          <div className="chat-panel overflow-hidden rounded-[calc(1.5rem-1px)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-soft)] px-5 py-4">
              <div className="flex items-center gap-3">
                <Avatar />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-paper)]">Gurnoor Kahlon</p>
                  <p className="flex items-center gap-1.5 text-xs text-[var(--color-paper-mute)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
                    {typing ? "Answering…" : "Answers written by me"}
                  </p>
                </div>
              </div>
              {started && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-paper-mute)] transition-colors hover:border-[var(--color-paper-mute)] hover:text-[var(--color-paper)]"
                >
                  Start over
                </button>
              )}
            </div>

            <div ref={scrollRef} className="max-h-[480px] min-h-[260px] overflow-y-auto px-4 py-6 sm:px-6">
              {!started ? (
                <div>
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">
                    Pick a question to start
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {qaPairs.map((pair, i) => (
                      <motion.button
                        key={pair.id}
                        type="button"
                        onClick={() => ask(pair.question, pair.id, pair.answer)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-left text-[15px] text-[var(--color-paper-dim)] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-teal)] hover:text-[var(--color-paper)]"
                      >
                        {pair.question}
                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-[var(--color-teal)] transition-colors group-hover:bg-[var(--color-teal)] group-hover:text-[var(--color-ink)]"
                        >
                          →
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4" aria-live="polite">
                  {thread.map((m, i) => (
                    <Message key={i} role={m.role}>
                      {m.text}
                    </Message>
                  ))}
                  <AnimatePresence>{typing && <Typing />}</AnimatePresence>
                  {followUps.length > 0 && (
                    <div className="pl-12">
                      <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">
                        Keep going
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {followUps.map((s, i) => (
                          <QuestionChip
                            key={s.id}
                            question={s.question}
                            delay={0.1 + i * 0.06}
                            onClick={() => ask(s.question, s.id, s.answer)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[var(--color-border-soft)] p-3 sm:p-4">
              <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)] py-1.5 pl-5 pr-1.5 transition-colors focus-within:border-[var(--color-teal)]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your own question…"
                  aria-label="Your question"
                  className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-paper)] placeholder:text-[var(--color-paper-mute)] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!input.trim() || typing}
                  className="btn-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
