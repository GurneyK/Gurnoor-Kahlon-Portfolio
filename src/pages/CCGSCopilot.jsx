import CaseStudyLayout, { Section, Reveal } from "../components/CaseStudyLayout.jsx";
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

const outputParts = [
  ["Insight", "The opportunity, stated plainly"],
  ["Supporting data points", "The specific numbers behind it"],
  ["Recommended CVD", "Which category value driver it maps to"],
  ["Source attribution", "Where every claim came from"],
  ["Opportunity sizing", "Quantified, not just described"],
  ["Draft narrative", "Slide-ready framing for the analyst to edit"],
];

export default function CCGSCopilot() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          Category Growth Strategy work means synthesizing eight or more
          data sources, category sizing, shopper panels, social listening,
          trend forecasting, past strategy documents, into a growth
          narrative an analyst can hand to leadership. Doing that by hand
          doesn't scale past one or two categories a quarter, and the
          quality of the output depends heavily on whoever happened to
          write it that cycle. CCGS Copilot is an agent that acts as a
          digital analyst. It reads the sources, connects the signals, and
          drafts the narrative for a human to review critically, not
          approve blindly.
        </p>
      </Section>

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
          className="h-[420px] w-full bg-white sm:h-[620px]"
          loading="lazy"
        />
      </Reveal>
      <p className="mt-4 text-base text-[var(--color-paper-mute)]">
        Live and interactive above. Try it directly, every category and
        every data point in it is fictional.
      </p>

      <Section eyebrow="Research & Approach" title="What the agent actually does">
        <p>
          For a question like "what are the biggest growth opportunities in
          this category," the agent reads across sources and connects
          related signals: a category growing faster than its peers, rising
          social conversation around a specific attribute, penetration data
          among a target consumer group, a named gap in the competitive
          landscape. Instead of surfacing those as disconnected data points,
          it turns them into one structured output. The proof of concept
          scope covers three categories in the UK market: deodorants, skin
          cleansing, and oral care.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {outputParts.map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <p className="text-base font-semibold text-[var(--color-paper)]">{title}</p>
              <p className="mt-1 text-sm text-[var(--color-paper-mute)]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reference" title="Sources the agent reads">
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-paper-dim)]"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Key Decision" title="Evidence next to the claim, always">
        <p>
          The stakeholder definition of "done" for this tool was specific:
          slide-ready headlines and bullet points that form a narrative
          framework, not a finished recommendation an analyst just forwards
          along. That constraint drove the interface directly. Every
          insight the agent surfaces shows its supporting evidence and
          source attribution in the same view, not behind a click or a
          separate tab. An analyst reviewing this output needs to
          interrogate the agent's reasoning as fast as they read the
          headline, or the tool quietly becomes something people
          rubber-stamp instead of something they actually use critically.
          That distinction matters enormously in a strategy function where
          the output informs real spending decisions.
        </p>
      </Section>

      <Section eyebrow="Key Decision" title="Distinguishing confidence, not just showing numbers">
        <p>
          I also had to design for opportunity sizing being a real
          calculation in most cases, tied to an existing validated
          methodology from another category team, rather than a rough
          estimate. That meant the interface needed a visual way to
          distinguish a number the agent is confident citing from a number
          still pending validation against that methodology. Most dashboard
          patterns don't bother making this distinction, they present every
          number with equal visual confidence. For a tool feeding strategic
          decisions, that equivalence is actually misleading, so I built
          status indicators that separate validated figures from
          provisional ones at a glance.
        </p>
      </Section>

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          Live as a proof of concept above, try it, the data in it is
          entirely fictional. The real version reads Unilever's licensed
          category data, which isn't something I can put on a public site.
          What's demonstrated here is the actual interaction model and
          information architecture from the real product, just running on
          invented inputs.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
