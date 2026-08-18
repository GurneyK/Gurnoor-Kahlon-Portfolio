import { useState } from "react";
import {
  submissions,
  scoringComponents,
  disqualifiers,
  tierOutcomes,
  users as seedUsers,
  recentActivity,
  insightStats,
  tierBreakdown,
  scoreDistribution,
} from "../../data/rdAgentData.js";

const NAV_ITEMS = ["Submissions", "Insights", "Scoring Guide", "Users"];
const RANGES = ["All Time", "7 Days", "30 Days", "90 Days"];

// Anchored to the seed data's latest date (not real wall-clock time) so the
// fictional 2026 dataset stays internally consistent regardless of when
// someone views this demo, and so newly added manual submissions land
// "today" within that same fictional timeline instead of jumping to the
// real current date.
const SEED_NOW = [...submissions.open, ...submissions.closed].reduce(
  (latest, s) => (new Date(s.date) > latest ? new Date(s.date) : latest),
  new Date(0)
);

const statusStyles = {
  "In Admin Review": "bg-[#EFF4FF] text-[#155EEF]",
  "On Hold": "bg-[#F2F4F7] text-[#667085]",
  "Closed (DQ)": "bg-[#FEF3F2] text-[#B42318]",
  Submitted: "bg-[#152238] text-[#7B9EFF]",
};
const fallbackStatusStyle = "bg-[#1E2A3D] text-[#8B98AC]";

function daysBetween(a, b) {
  return Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-white">{title}</p>
          <button onClick={onClose} className="text-[#8B98AC] hover:text-white">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalField({ label, ...props }) {
  return (
    <label className="mt-4 block">
      <span className="text-xs text-[#8B98AC]">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg border border-[#1E2A3D] bg-[#0B1220] px-3 py-2 text-sm text-white placeholder:text-[#5B6B85] focus:border-[#155EEF] focus:outline-none"
      />
    </label>
  );
}

function ScoreBadge({ score }) {
  if (score == null) {
    return (
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${fallbackStatusStyle}`}>
        Pending score
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#0B3B2E] px-2.5 py-1 text-xs font-medium text-[#3DD68C]">
      {score}/10
    </span>
  );
}

function SubmissionRow({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="block w-full border-b border-[#1E2A3D] px-6 py-5 text-left transition-colors last:border-b-0 hover:bg-[#101A2C]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[15px] font-semibold text-white">{item.name}</span>
          <span className="text-[#8B98AC]"> · {item.company}</span>
        </div>
        <span className="text-xs text-[#8B98AC]">{item.date}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status] || fallbackStatusStyle}`}>
          {item.status}
        </span>
        <ScoreBadge score={item.score} />
        {item.tier != null && (
          <span className="rounded-full bg-[#1E2A3D] px-2.5 py-1 text-xs font-medium text-[#8B98AC]">
            Tier: {item.tier}
          </span>
        )}
        {item.tags.map((t) => (
          <span key={t} className="rounded-full bg-[#152238] px-2.5 py-1 text-xs text-[#A6B4C9]">
            {t}
          </span>
        ))}
        <span className="text-xs text-[#8B98AC]">{item.region}</span>
      </div>
    </button>
  );
}

function NewSubmissionModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;
    onCreate({
      id: `manual-${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      status: "Submitted",
      score: null,
      tier: null,
      tags: ["Manual entry"],
      region: "Unspecified",
      date: SEED_NOW.toLocaleDateString("en-US"),
      reviewerSummary: "Awaiting AI evidence extraction and first-pass disqualifier screening.",
      nextStep: "Run hard-filter checks and assign a category owner.",
      evidence: [],
    });
    onClose();
  };

  return (
    <Modal title="New manual submission" onClose={onClose}>
      <form onSubmit={submit}>
        <ModalField
          label="Submission name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. AquaClear Filtration System"
          autoFocus
        />
        <ModalField
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. AquaClear Technologies Inc."
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[#155EEF] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1249C9]"
        >
          Add to queue
        </button>
      </form>
    </Modal>
  );
}

function SubmissionsView({ onOpen }) {
  const [openList, setOpenList] = useState(submissions.open);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("All Time");
  const [sortBy, setSortBy] = useState("date");
  const [showNewModal, setShowNewModal] = useState(false);

  const filterAndSort = (list) => {
    const q = query.trim().toLowerCase();
    const days = range === "7 Days" ? 7 : range === "30 Days" ? 30 : range === "90 Days" ? 90 : null;
    const filtered = list.filter((item) => {
      const matchesQuery =
        !q || item.name.toLowerCase().includes(q) || item.company.toLowerCase().includes(q);
      const matchesRange = days == null || daysBetween(SEED_NOW, new Date(item.date)) <= days;
      return matchesQuery && matchesRange;
    });
    return [...filtered].sort((a, b) =>
      sortBy === "score" ? (b.score ?? -1) - (a.score ?? -1) : new Date(b.date) - new Date(a.date)
    );
  };

  const filteredOpen = filterAndSort(openList);
  const filteredClosed = filterAndSort(submissions.closed);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
        <h2 className="text-xl font-semibold text-white">Submissions</h2>
        <button
          onClick={() => setShowNewModal(true)}
          className="rounded-lg bg-[#155EEF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1249C9]"
        >
          + New manual submission
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-[#1E2A3D] px-6 pb-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or company…"
          className="w-full rounded-md border border-[#1E2A3D] bg-[#0B1220] px-3 py-1.5 text-sm text-white placeholder:text-[#5B6B85] focus:border-[#155EEF] focus:outline-none sm:max-w-[220px]"
        />
        <div className="flex items-center gap-2 overflow-x-auto text-sm text-[#8B98AC]">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 transition-colors ${
                range === r ? "bg-[#155EEF] text-white" : "hover:bg-[#152238]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#8B98AC] sm:ml-auto">
          <span className="shrink-0 whitespace-nowrap text-xs uppercase tracking-wide">Sort</span>
          <button
            onClick={() => setSortBy("date")}
            className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 transition-colors ${
              sortBy === "date" ? "bg-[#152238] text-white" : "hover:bg-[#152238]"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("score")}
            className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 transition-colors ${
              sortBy === "score" ? "bg-[#152238] text-white" : "hover:bg-[#152238]"
            }`}
          >
            Highest score
          </button>
        </div>
      </div>

      <p className="px-6 pt-4 text-xs text-[#8B98AC]">Click any submission to open its review.</p>

      <div className="px-6 pb-2 pt-5 text-xs uppercase tracking-wide text-[#8B98AC]">
        Open · {filteredOpen.length}
      </div>
      {filteredOpen.length === 0 ? (
        <p className="px-6 pb-6 text-sm text-[#8B98AC]">No open submissions match these filters.</p>
      ) : (
        filteredOpen.map((item) => <SubmissionRow key={item.id} item={item} onOpen={onOpen} />)
      )}

      <div className="px-6 pb-2 pt-6 text-xs uppercase tracking-wide text-[#8B98AC]">
        Closed · {filteredClosed.length}
      </div>
      {filteredClosed.length === 0 ? (
        <p className="px-6 pb-6 text-sm text-[#8B98AC]">No closed submissions match these filters.</p>
      ) : (
        filteredClosed.map((item) => <SubmissionRow key={item.id} item={item} onOpen={onOpen} />)
      )}

      {showNewModal && (
        <NewSubmissionModal
          onClose={() => setShowNewModal(false)}
          onCreate={(item) => setOpenList((prev) => [item, ...prev])}
        />
      )}
    </div>
  );
}

function SubmissionDrawer({ item, onClose }) {
  const [notesByItem, setNotesByItem] = useState({});
  const [draft, setDraft] = useState("");

  if (!item) return null;

  const notes = notesByItem[item.id] || [];

  const addNote = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setNotesByItem((prev) => ({
      ...prev,
      [item.id]: [{ text: draft.trim(), time: "Just now" }, ...(prev[item.id] || [])],
    }));
    setDraft("");
  };

  return (
    <div className="absolute inset-0 z-20 flex justify-end bg-black/50" onClick={onClose}>
      <aside
        className="h-full w-full max-w-sm overflow-y-auto border-l border-[#1E2A3D] bg-[#0F1A2B] p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <p className="text-xs uppercase tracking-wide text-[#8B98AC]">{item.company}</p>
          <button onClick={onClose} className="text-[#8B98AC] hover:text-white">
            ✕
          </button>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold text-white">{item.name}</h3>

        <div className="mt-7 flex justify-center">
          <div
            className={`relative flex h-32 w-32 items-center justify-center rounded-full border-4 ${
              item.score != null ? "border-[#3DD68C]" : "border-[#1E2A3D]"
            }`}
          >
            {item.score != null ? (
              <span className="text-2xl font-bold text-white">
                {item.score}
                <span className="text-sm text-[#8B98AC]">/10</span>
              </span>
            ) : (
              <span className="px-4 text-center text-xs font-medium text-[#8B98AC]">Not yet scored</span>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status] || fallbackStatusStyle}`}>
            {item.status}
          </span>
          {item.tier != null && (
            <span className="rounded-full bg-[#1E2A3D] px-2.5 py-1 text-xs font-medium text-[#8B98AC]">
              Tier {item.tier}
            </span>
          )}
          <span className="rounded-full bg-[#152238] px-2.5 py-1 text-xs text-[#A6B4C9]">{item.region}</span>
        </div>

        <div className="mt-9 border-t border-[#1E2A3D] pt-6">
          <p className="text-sm font-semibold text-white">Reviewer summary</p>
          <p className="mt-2 text-sm leading-relaxed text-[#A6B4C9]">{item.reviewerSummary}</p>
        </div>
        <div className="mt-7 border-t border-[#1E2A3D] pt-6">
          <p className="text-sm font-semibold text-white">Recommended next step</p>
          <p className="mt-2 text-sm leading-relaxed text-[#A6B4C9]">{item.nextStep}</p>
        </div>
        <div className="mt-7 border-t border-[#1E2A3D] pt-6">
          <p className="text-sm font-semibold text-white">Evidence readiness</p>
          {item.evidence.length === 0 ? (
            <p className="mt-2 text-sm text-[#8B98AC]">No evidence recorded yet.</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {item.evidence.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-[#A6B4C9]">
                  <span className="mt-0.5 text-[#3DD68C]">✓</span>
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-7 border-t border-[#1E2A3D] pt-6">
          <p className="text-sm font-semibold text-white">Internal notes</p>
          <form onSubmit={addNote} className="mt-3 flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a note for this review…"
              className="flex-1 rounded-lg border border-[#1E2A3D] bg-[#0B1220] px-3 py-2 text-sm text-white placeholder:text-[#5B6B85] focus:border-[#155EEF] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-[#155EEF] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1249C9]"
            >
              Add
            </button>
          </form>
          {notes.length > 0 && (
            <ul className="mt-4 space-y-3">
              {notes.map((n, i) => (
                <li key={i} className="rounded-lg border border-[#1E2A3D] bg-[#0B1220] p-3">
                  <p className="text-sm text-[#D0D5DD]">{n.text}</p>
                  <p className="mt-1 text-xs text-[#5B6B85]">{n.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}

function InsightsView() {
  const maxCount = Math.max(...scoreDistribution.map((s) => s.count));
  return (
    <div className="px-6 py-7">
      <h2 className="text-xl font-semibold text-white">Insights</h2>
      <p className="mt-1.5 text-sm text-[#8B98AC]">Portfolio-level view across all submissions.</p>

      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {insightStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-5">
            <p className="text-xs text-[#8B98AC]">{s.label}</p>
            <p className="mt-1.5 text-lg font-semibold text-white">{s.value}</p>
            <p className={`mt-1 text-xs ${s.delta.startsWith("-") ? "text-[#F97066]" : "text-[#3DD68C]"}`}>
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-6">
          <p className="text-sm font-semibold text-white">Score Distribution</p>
          <p className="text-xs text-[#8B98AC]">Submissions grouped by score band</p>
          <div className="mt-6 flex h-32 items-end gap-2">
            {scoreDistribution.map((s) => (
              <div key={s.band} className="group flex flex-1 flex-col items-center gap-1.5">
                <div
                  title={`${s.count} submissions`}
                  className="w-full rounded-t bg-[#155EEF] transition-colors group-hover:bg-[#7B9EFF]"
                  style={{ height: `${(s.count / maxCount) * 100}%` }}
                />
                <span className="text-[10px] text-[#8B98AC]">{s.band}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-6">
          <p className="text-sm font-semibold text-white">Tier Breakdown</p>
          <p className="text-xs text-[#8B98AC]">Submissions by tier classification</p>
          <div className="mt-6 space-y-4">
            {tierBreakdown.map((t) => (
              <div key={t.tier}>
                <div className="flex justify-between text-xs text-[#A6B4C9]">
                  <span>{t.tier}</span>
                  <span>
                    {t.count} ({t.pct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-[#1E2A3D]">
                  <div className="h-1.5 rounded-full bg-[#7B9EFF]" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-6">
        <p className="text-sm font-semibold text-white">Recent Activity</p>
        <p className="text-xs text-[#8B98AC]">Latest decisions and status changes</p>
        <div className="mt-5 space-y-5">
          {recentActivity.map((a, i) => (
            <div
              key={a.title}
              className={`flex items-center justify-between gap-4 ${i > 0 ? "border-t border-[#1E2A3D] pt-5" : ""}`}
            >
              <div>
                <p className="text-sm font-medium text-white">{a.title}</p>
                <p className="text-xs text-[#8B98AC]">{a.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-[#8B98AC]">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoringComponentCard({ c, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-5">
      <button onClick={onToggle} className="block w-full text-left">
        <div className="flex items-center justify-between">
          <span className="rounded bg-[#152238] px-2 py-0.5 text-xs text-[#8B98AC]">{c.id}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{c.max} max</span>
            <span className={`text-xs text-[#5B6B85] transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
          </div>
        </div>
        <p className="mt-2.5 text-sm font-medium text-white">{c.name}</p>
        <p className="mt-1.5 text-xs text-[#8B98AC]">{c.description}</p>
      </button>
      {isOpen && (
        <div className="mt-3 border-t border-[#1E2A3D] pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5B6B85]">Signals we look for</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#A6B4C9]">{c.signals}</p>
        </div>
      )}
    </div>
  );
}

function ScoringGuideView() {
  const [openIds, setOpenIds] = useState(new Set());
  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <div className="px-6 py-7">
      <h2 className="text-xl font-semibold text-white">Scoring Guide</h2>
      <p className="mt-1.5 text-sm text-[#8B98AC]">Read-only guide to the active UFS scoring framework</p>

      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ["Framework", "v1 active"],
          ["Maximum UFS", "10 points"],
          ["Components", "6 scored"],
          ["Disqualifiers", "8 hard filters"],
        ].map(([label, val]) => (
          <div key={label} className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-5">
            <p className="text-xs text-[#8B98AC]">{label}</p>
            <p className="mt-1.5 text-lg font-semibold text-white">{val}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-[#8B98AC]">
        Components <span className="normal-case text-[#5B6B85]">— click a card for scoring signals</span>
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {scoringComponents.map((c) => (
          <ScoringComponentCard key={c.id} c={c} isOpen={openIds.has(c.id)} onToggle={() => toggle(c.id)} />
        ))}
      </div>

      <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-[#8B98AC]">Disqualifiers</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {disqualifiers.map((d) => (
          <div key={d.id} className="rounded-xl border border-[#3A1F1F] bg-[#1A1010] p-5">
            <span className="rounded bg-[#3A1F1F] px-2 py-0.5 text-xs text-[#F97066]">{d.id}</span>
            <p className="mt-2.5 text-sm font-medium text-white">{d.name}</p>
            <p className="mt-1.5 text-xs text-[#8B98AC]">{d.description}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-[#8B98AC]">Tier Outcomes</h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[#1E2A3D]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0F1A2B] text-xs uppercase text-[#8B98AC]">
            <tr>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">SLA</th>
            </tr>
          </thead>
          <tbody>
            {tierOutcomes.map((t) => (
              <tr key={t.tier} className="border-t border-[#1E2A3D] text-[#D0D5DD]">
                <td className="px-4 py-4 font-medium text-white">{t.tier}</td>
                <td className="px-4 py-4">{t.range}</td>
                <td className="px-4 py-4">{t.label}</td>
                <td className="px-4 py-4">{t.action}</td>
                <td className="px-4 py-4">{t.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ROLE_STYLES = {
  Owner: "bg-[#152238] text-[#7B9EFF]",
  Admin: "bg-[#0B3B2E] text-[#3DD68C]",
  Reviewer: "bg-[#2B2410] text-[#F7B955]",
};

function NewUserModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Reviewer");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onCreate({ name: name.trim(), email: email.trim(), role, status: "Active", lastLogin: "Never" });
    onClose();
  };

  return (
    <Modal title="New user" onClose={onClose}>
      <form onSubmit={submit}>
        <ModalField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Rivera"
          autoFocus
        />
        <ModalField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex.rivera@example.com"
        />
        <label className="mt-4 block">
          <span className="text-xs text-[#8B98AC]">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#1E2A3D] bg-[#0B1220] px-3 py-2 text-sm text-white focus:border-[#155EEF] focus:outline-none"
          >
            <option>Owner</option>
            <option>Admin</option>
            <option>Reviewer</option>
          </select>
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[#155EEF] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1249C9]"
        >
          Add user
        </button>
      </form>
    </Modal>
  );
}

function UsersView() {
  const [userList, setUserList] = useState(seedUsers);
  const [showNewModal, setShowNewModal] = useState(false);

  return (
    <div className="px-6 py-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Users</h2>
          <p className="mt-1.5 text-sm text-[#8B98AC]">Manage account access, profile details, and roles.</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="rounded-lg bg-[#155EEF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1249C9]"
        >
          + New user
        </button>
      </div>
      <div className="mt-7 overflow-x-auto rounded-xl border border-[#1E2A3D]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0F1A2B] text-xs uppercase text-[#8B98AC]">
            <tr>
              <th className="px-4 py-3.5">User</th>
              <th className="px-4 py-3.5">Role</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Last login</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((u) => (
              <tr key={u.email} className="border-t border-[#1E2A3D]">
                <td className="px-4 py-4">
                  <p className="font-medium text-white">{u.name}</p>
                  <p className="text-xs text-[#8B98AC]">{u.email}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[u.role] || fallbackStatusStyle}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-4 text-[#3DD68C]">{u.status}</td>
                <td className="px-4 py-4 text-[#8B98AC]">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNewModal && (
        <NewUserModal
          onClose={() => setShowNewModal(false)}
          onCreate={(u) => setUserList((prev) => [...prev, u])}
        />
      )}
    </div>
  );
}

export default function RDAgentDemo() {
  const [active, setActive] = useState("Submissions");
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="relative flex h-[72vh] max-h-[680px] min-h-[460px] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#0B1220] text-sm sm:flex-row">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[#1E2A3D] bg-[#0B1220] py-6 sm:flex">
        <p className="px-5 font-[family-name:var(--font-display)] text-base text-white">R&amp;D Fit Agent</p>
        <p className="px-5 mt-1 text-[10px] uppercase tracking-wide text-[#8B98AC]">Admin</p>
        <nav className="mt-9 flex flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                active === item ? "bg-[#155EEF] text-white" : "text-[#8B98AC] hover:bg-[#152238]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex shrink-0 flex-col gap-2.5 border-b border-[#1E2A3D] px-4 py-3 sm:hidden">
        <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-sm text-white">
          R&amp;D Fit Agent
        </p>
        <div className="flex gap-1.5 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                active === item ? "bg-[#155EEF] text-white" : "bg-[#152238] text-[#8B98AC]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="hidden items-center justify-end gap-3 border-b border-[#1E2A3D] px-6 py-3.5 text-xs text-[#8B98AC] sm:flex">
          <span>Jordan Reyes</span>
        </div>
        {active === "Submissions" && <SubmissionsView onOpen={setOpenItem} />}
        {active === "Insights" && <InsightsView />}
        {active === "Scoring Guide" && <ScoringGuideView />}
        {active === "Users" && <UsersView />}
      </div>

      <SubmissionDrawer item={openItem} onClose={() => setOpenItem(null)} />
    </div>
  );
}
