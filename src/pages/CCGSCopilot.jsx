import CaseStudyLayout, { Reveal } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

const project = projects.find((p) => p.slug === "ccgs-copilot");

const sources = [
  "Euromonitor",
  "NielsenIQ",
  "Kantar",
  "Meltwater",
  "Mintel",
  "WGSN",
  "H&A studies",
  "Historical CCGS docs",
];

export default function CCGSCopilot() {
  return (
    <CaseStudyLayout project={project}>
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          The problem
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Category Growth Strategy work means synthesizing eight-plus data
          sources — category sizing, shopper panels, social listening, trend
          forecasting, past strategy docs — into a growth narrative an
          analyst can hand to leadership. Doing that by hand doesn't scale
          past one or two categories a quarter, and quality varies with
          whoever happened to write it. CCGS Copilot is an agent that acts as
          a digital analyst: reads the sources, connects the signals, and
          drafts the narrative for a human to review, not approve blind.
        </p>
      </Reveal>

      <Reveal className="mt-10 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="ml-3 text-xs text-[var(--color-paper-mute)]">
            gurneyk.github.io/CCGS
          </span>
        </div>
        <iframe
          src={project.liveUrl}
          title="CCGS Copilot, live"
          className="h-[560px] w-full bg-white"
          loading="lazy"
        />
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          What the agent actually does
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          For a question like "what are the biggest growth opportunities in
          this category," the agent reads across sources, connects related
          signals — a category growing faster than its peers, rising social
          conversation around a specific attribute, penetration data, a
          named market gap — and turns disconnected data points into one
          structured output: an opportunity statement, the evidence behind
          it, a recommended value driver, sourced citations, sizing, and a
          draft narrative. The proof of concept scope covers UK Deodorants,
          Skin Cleansing, and Oral Care.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <p className="text-sm uppercase tracking-wide text-[var(--color-paper-mute)]">
          Sources the agent reads
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {sources.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-paper-dim)]"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Designing for a "draft, not decision" agent
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          The stakeholder definition of "done" was specific: slide-ready
          headlines and bullet points that form a narrative framework, not a
          finished recommendation. That constraint drove the UI. Every
          insight the agent surfaces has to show its supporting evidence and
          source attribution next to it, in the same view, not behind a
          click. An analyst reviewing this needs to interrogate the agent's
          reasoning as fast as they read the headline, or the tool becomes
          something people rubber-stamp instead of use.
        </p>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          I also had to design for opportunity sizing being a real
          calculation, not an illustrative estimate, tied to an existing
          validated methodology from another category team. That meant the
          UI needed to distinguish, visually, between a number the agent is
          confident citing and a number still pending validation — a
          distinction most dashboard patterns don't bother making.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Outcome
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Live as a proof of concept above — try it, the data in it is
          entirely fictional. The real version reads Unilever's licensed
          category data, which isn't something I can put on a public site.
        </p>
      </Reveal>
    </CaseStudyLayout>
  );
}
