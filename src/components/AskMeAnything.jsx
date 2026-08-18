import { useState, useRef, useEffect } from "react";
import { qaPairs, fallbackAnswer } from "../data/qa.js";

const KEYWORD_MAP = [
  ["apart", "different", "stand out", "unique"],
  ["proud", "proudest", "best work", "favorite project", "favourite project"],
  ["pushback", "disagree", "conflict", "criticism", "feedback"],
  ["process", "workflow", "approach", "how do you design"],
  ["marketing", "why did you", "background", "brock"],
  ["next role", "looking for", "opportunit", "what kind of team", "hiring"],
];

function matchAnswer(input) {
  const normalized = input.toLowerCase();
  for (let i = 0; i < qaPairs.length; i++) {
    if (KEYWORD_MAP[i].some((kw) => normalized.includes(kw))) {
      return qaPairs[i].answer;
    }
  }
  return fallbackAnswer;
}

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isUser
            ? "bg-[var(--color-surface-raised)] text-[var(--color-paper)]"
            : "bg-[var(--color-sage-dim)] text-[var(--color-sage-bright)]"
        }`}
      >
        {isUser ? "You" : "GK"}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
          isUser
            ? "bg-[var(--color-sage)] text-white"
            : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-paper-dim)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function AskMeAnything() {
  const [thread, setThread] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [thread]);

  const ask = (question, answer) => {
    setThread((t) => [...t, { role: "user", text: question }, { role: "assistant", text: answer }]);
  };

  const handlePreset = (pair) => ask(pair.question, pair.answer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    ask(trimmed, matchAnswer(trimmed));
    setInput("");
  };

  return (
    <section id="ask" className="border-t border-[var(--color-border-soft)] px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-sage)]">Ask Me Anything</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
          Common interview questions, answered directly
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
          Questions I'm asked in most interviews, answered here directly.
          No live AI behind this, just my own answers, kept consistent
          every time.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
            <span className="text-sm text-[var(--color-paper-mute)]">
              {thread.length === 0 ? "Pick a question to start" : "Conversation"}
            </span>
            {thread.length > 0 && (
              <button
                onClick={() => setThread([])}
                className="text-sm text-[var(--color-paper-mute)] transition-colors hover:text-[var(--color-sage-bright)]"
              >
                ✕ Clear chat
              </button>
            )}
          </div>

          <div className="max-h-[420px] min-h-[220px] space-y-4 overflow-y-auto px-5 py-6">
            {thread.length === 0 ? (
              <div className="flex flex-col gap-2.5">
                {qaPairs.map((pair) => (
                  <button
                    key={pair.question}
                    onClick={() => handlePreset(pair)}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-left text-base text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-sage)] hover:text-[var(--color-paper)]"
                  >
                    {pair.question}
                  </button>
                ))}
              </div>
            ) : (
              thread.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.text}
                </Bubble>
              ))
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[var(--color-border)] p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask one of the questions above, or type your own..."
              className="flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-2.5 text-base text-[var(--color-paper)] placeholder:text-[var(--color-paper-mute)] focus:border-[var(--color-sage)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)] text-white transition-colors hover:bg-[var(--color-sage-bright)]"
            >
              →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
