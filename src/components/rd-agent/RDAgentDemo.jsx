import { useState } from "react";
import {
  submissions,
  scoringComponents,
  disqualifiers,
  tierOutcomes,
  users,
  recentActivity,
  insightStats,
  tierBreakdown,
  scoreDistribution,
} from "../../data/rdAgentData.js";

const NAV_ITEMS = ["Submissions", "Insights", "Scoring Guide", "Users"];

const statusStyles = {
  "In Admin Review": "bg-[#EFF4FF] text-[#155EEF]",
  "On Hold": "bg-[#F2F4F7] text-[#667085]",
  "Closed (DQ)": "bg-[#FEF3F2] text-[#B42318]",
};

function SubmissionRow({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="block w-full border-b border-[#1E2A3D] px-6 py-4 text-left transition-colors last:border-b-0 hover:bg-[#101A2C]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[15px] font-semibold text-white">{item.name}</span>
          <span className="text-[#8B98AC]"> · {item.company}</span>
        </div>
        <span className="text-xs text-[#8B98AC]">{item.date}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}>
          {item.status}
        </span>
        <span className="rounded-full bg-[#0B3B2E] px-2.5 py-1 text-xs font-medium text-[#3DD68C]">
          {item.score}/10
        </span>
        <span className="rounded-full bg-[#1E2A3D] px-2.5 py-1 text-xs font-medium text-[#8B98AC]">
          Tier: {item.tier}
        </span>
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

function SubmissionsView({ onOpen }) {
  return (
    <div>
      <div className="flex items-center justify-between px-6 pt-6">
        <h2 className="text-xl font-semibold text-white">Submissions</h2>
        <button className="rounded-lg bg-[#155EEF] px-4 py-2 text-sm font-medium text-white">
          + New manual submission
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2 border-b border-[#1E2A3D] px-6 pb-4 text-sm text-[#8B98AC]">
        <span className="rounded-md bg-[#155EEF] px-3 py-1.5 text-white">All Time</span>
        <span className="px-3 py-1.5">7 Days</span>
        <span className="px-3 py-1.5">30 Days</span>
        <span className="px-3 py-1.5">90 Days</span>
      </div>
      <p className="px-6 pt-3 text-xs text-[#8B98AC]">Click any submission to open its review.</p>
      <div className="px-6 py-3 text-xs uppercase tracking-wide text-[#8B98AC]">
        Open · {submissions.open.length}
      </div>
      {submissions.open.map((item) => (
        <SubmissionRow key={item.id} item={item} onOpen={onOpen} />
      ))}
      <div className="px-6 py-3 text-xs uppercase tracking-wide text-[#8B98AC]">
        Closed · {submissions.closed.length}
      </div>
      {submissions.closed.map((item) => (
        <SubmissionRow key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}

function SubmissionDrawer({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="absolute inset-0 z-20 flex justify-end bg-black/50" onClick={onClose}>
      <aside
        className="h-full w-full max-w-sm overflow-y-auto border-l border-[#1E2A3D] bg-[#0F1A2B] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <p className="text-xs uppercase tracking-wide text-[#8B98AC]">{item.company}</p>
          <button onClick={onClose} className="text-[#8B98AC] hover:text-white">
            ✕
          </button>
        </div>
        <h3 className="mt-1 text-lg font-semibold text-white">{item.name}</h3>

        <div className="mt-6 flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#3DD68C]">
            <span className="text-2xl font-bold text-white">
              {item.score}
              <span className="text-sm text-[#8B98AC]">/10</span>
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}>
            {item.status}
          </span>
          <span className="rounded-full bg-[#1E2A3D] px-2.5 py-1 text-xs font-medium text-[#8B98AC]">
            Tier {item.tier}
          </span>
          <span className="rounded-full bg-[#152238] px-2.5 py-1 text-xs text-[#A6B4C9]">{item.region}</span>
        </div>

        <div className="mt-8 border-t border-[#1E2A3D] pt-5">
          <p className="text-sm font-semibold text-white">Reviewer summary</p>
          <p className="mt-2 text-sm leading-relaxed text-[#A6B4C9]">{item.reviewerSummary}</p>
        </div>
        <div className="mt-6 border-t border-[#1E2A3D] pt-5">
          <p className="text-sm font-semibold text-white">Recommended next step</p>
          <p className="mt-2 text-sm leading-relaxed text-[#A6B4C9]">{item.nextStep}</p>
        </div>
        <div className="mt-6 border-t border-[#1E2A3D] pt-5">
          <p className="text-sm font-semibold text-white">Evidence readiness</p>
          <ul className="mt-2 space-y-1.5">
            {item.evidence.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm text-[#A6B4C9]">
                <span className="mt-0.5 text-[#3DD68C]">✓</span>
                {e}
              </li>
            ))}
          </ul>
        </div>
        <button className="mt-8 w-full rounded-lg bg-[#155EEF] py-2.5 text-sm font-medium text-white">
          Open diligence workspace
        </button>
      </aside>
    </div>
  );
}

function InsightsView() {
  const maxCount = Math.max(...scoreDistribution.map((s) => s.count));
  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-semibold text-white">Insights</h2>
      <p className="mt-1 text-sm text-[#8B98AC]">Portfolio-level view across all submissions.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {insightStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-4">
            <p className="text-xs text-[#8B98AC]">{s.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{s.value}</p>
            <p className={`mt-0.5 text-xs ${s.delta.startsWith("-") ? "text-[#F97066]" : "text-[#3DD68C]"}`}>
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-5">
          <p className="text-sm font-semibold text-white">Score Distribution</p>
          <p className="text-xs text-[#8B98AC]">Submissions grouped by score band</p>
          <div className="mt-5 flex h-32 items-end gap-2">
            {scoreDistribution.map((s) => (
              <div key={s.band} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t bg-[#155EEF]"
                  style={{ height: `${(s.count / maxCount) * 100}%` }}
                />
                <span className="text-[10px] text-[#8B98AC]">{s.band}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-5">
          <p className="text-sm font-semibold text-white">Tier Breakdown</p>
          <p className="text-xs text-[#8B98AC]">Submissions by tier classification</p>
          <div className="mt-5 space-y-3">
            {tierBreakdown.map((t) => (
              <div key={t.tier}>
                <div className="flex justify-between text-xs text-[#A6B4C9]">
                  <span>{t.tier}</span>
                  <span>
                    {t.count} ({t.pct}%)
                  </span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[#1E2A3D]">
                  <div className="h-1.5 rounded-full bg-[#7B9EFF]" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-5">
        <p className="text-sm font-semibold text-white">Recent Activity</p>
        <p className="text-xs text-[#8B98AC]">Latest decisions and status changes</p>
        <div className="mt-4 space-y-4">
          {recentActivity.map((a) => (
            <div key={a.title} className="flex items-center justify-between border-t border-[#1E2A3D] pt-4 first:border-t-0 first:pt-0">
              <div>
                <p className="text-sm font-medium text-white">{a.title}</p>
                <p className="text-xs text-[#8B98AC]">{a.detail}</p>
              </div>
              <span className="text-xs text-[#8B98AC]">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoringGuideView() {
  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-semibold text-white">Scoring Guide</h2>
      <p className="mt-1 text-sm text-[#8B98AC]">Read-only guide to the active UFS scoring framework</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Framework", "v1 active"],
          ["Maximum UFS", "10 points"],
          ["Components", "6 scored"],
          ["Disqualifiers", "8 hard filters"],
        ].map(([label, val]) => (
          <div key={label} className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-4">
            <p className="text-xs text-[#8B98AC]">{label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{val}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[#8B98AC]">Components</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {scoringComponents.map((c) => (
          <div key={c.id} className="rounded-xl border border-[#1E2A3D] bg-[#0F1A2B] p-4">
            <div className="flex items-center justify-between">
              <span className="rounded bg-[#152238] px-2 py-0.5 text-xs text-[#8B98AC]">{c.id}</span>
              <span className="text-sm font-semibold text-white">{c.max} max</span>
            </div>
            <p className="mt-2 text-sm font-medium text-white">{c.name}</p>
            <p className="mt-1 text-xs text-[#8B98AC]">{c.description}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[#8B98AC]">Disqualifiers</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {disqualifiers.map((d) => (
          <div key={d.id} className="rounded-xl border border-[#3A1F1F] bg-[#1A1010] p-4">
            <span className="rounded bg-[#3A1F1F] px-2 py-0.5 text-xs text-[#F97066]">{d.id}</span>
            <p className="mt-2 text-sm font-medium text-white">{d.name}</p>
            <p className="mt-1 text-xs text-[#8B98AC]">{d.description}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[#8B98AC]">Tier Outcomes</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-[#1E2A3D]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0F1A2B] text-xs uppercase text-[#8B98AC]">
            <tr>
              <th className="px-4 py-2">Tier</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">SLA</th>
            </tr>
          </thead>
          <tbody>
            {tierOutcomes.map((t) => (
              <tr key={t.tier} className="border-t border-[#1E2A3D] text-[#D0D5DD]">
                <td className="px-4 py-3 font-medium text-white">{t.tier}</td>
                <td className="px-4 py-3">{t.range}</td>
                <td className="px-4 py-3">{t.label}</td>
                <td className="px-4 py-3">{t.action}</td>
                <td className="px-4 py-3">{t.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Users</h2>
          <p className="mt-1 text-sm text-[#8B98AC]">Manage account access, profile details, and roles.</p>
        </div>
        <button className="rounded-lg bg-[#155EEF] px-4 py-2 text-sm font-medium text-white">+ New user</button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-[#1E2A3D]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0F1A2B] text-xs uppercase text-[#8B98AC]">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-t border-[#1E2A3D]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{u.name}</p>
                  <p className="text-xs text-[#8B98AC]">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      u.role === "Owner"
                        ? "bg-[#152238] text-[#7B9EFF]"
                        : u.role === "Admin"
                        ? "bg-[#0B3B2E] text-[#3DD68C]"
                        : "bg-[#2B2410] text-[#F7B955]"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#3DD68C]">{u.status}</td>
                <td className="px-4 py-3 text-[#8B98AC]">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RDAgentDemo() {
  const [active, setActive] = useState("Submissions");
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="relative flex h-[70vh] max-h-[640px] min-h-[420px] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#0B1220] text-sm sm:flex-row">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[#1E2A3D] bg-[#0B1220] py-5 sm:flex">
        <p className="px-5 font-[family-name:var(--font-display)] text-base text-white">R&amp;D Fit Agent</p>
        <p className="px-5 mt-0.5 text-[10px] uppercase tracking-wide text-[#8B98AC]">Admin</p>
        <nav className="mt-8 flex flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                active === item ? "bg-[#155EEF] text-white" : "text-[#8B98AC] hover:bg-[#152238]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#1E2A3D] px-4 py-3 sm:hidden">
        <p className="font-[family-name:var(--font-display)] text-sm text-white">R&amp;D Fit Agent</p>
        <div className="flex gap-1 overflow-x-auto">
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
        <div className="hidden items-center justify-end gap-3 border-b border-[#1E2A3D] px-6 py-3 text-xs text-[#8B98AC] sm:flex">
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
