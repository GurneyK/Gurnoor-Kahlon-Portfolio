import CaseStudyLayout, { Section, Figure, FigureGrid, Reveal } from "../components/CaseStudyLayout.jsx";
import DesktopFrame from "../components/DesktopFrame.jsx";
import { projects } from "../data/projects.js";

import commandCenter from "../assets/ccgs/command-center.png";
import deckAgent from "../assets/ccgs/deck-agent.png";
import resourceLibrary from "../assets/ccgs/resource-library.png";
import deckBuilder from "../assets/ccgs/deck-builder.png";
import notifications from "../assets/ccgs/notifications.png";
import validationQueue from "../assets/ccgs/validation-queue.png";
import settings from "../assets/ccgs/settings.png";
import mobileCommand from "../assets/ccgs/mobile-command.png";

const project = projects.find((p) => p.slug === "ccgs-copilot");

const sources = [
  "Category sizing data",
  "Retail sales panel",
  "Shopper panel",
  "Social listening",
  "Trend reports",
  "Trend forecasts",
  "Consumer habits & attitudes studies",
  "Historical CCGS docs",
];

const outputParts = [
  ["Insight", "The opportunity, stated plainly"],
  ["Supporting data points", "The specific numbers behind it"],
  ["Recommended value driver", "Which category value driver (CVD) it maps to"],
  ["Source attribution", "Where every claim came from"],
  ["Opportunity sizing", "Quantified, not just described"],
  ["Draft narrative", "Slide-ready framing for the analyst to edit"],
];

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span
          key={s}
          className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-paper-dim)]"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function CCGSCopilot() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          CCGS stands for Consumer Category Growth Strategy: deciding where a
          product category, like deodorants, can grow next. An analyst pulls
          together eight or more data sources into a growth story for
          leadership. By hand, that doesn't scale past one or two categories
          a quarter, and quality depends on who wrote it. CCGS Copilot is an
          agent that reads the sources, connects the signals and drafts the
          story for a person to review critically, not approve blindly.
        </p>
      </Section>

      <Section eyebrow="How it works" title="What goes in, and what comes out">
        <p>
          The agent reads across these sources and turns related signals,
          like a fast-growing segment plus rising social conversation, into
          one structured output instead of scattered data points. The proof
          of concept covers three UK categories: deodorants, skin cleansing
          and oral care.
        </p>
        <Chips items={sources} />
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

      <Section eyebrow="Key Decision" title="Evidence and confidence next to every claim">
        <p>
          Stakeholders wanted slide-ready headlines an analyst builds on, not
          a finished answer to forward. So every insight shows its evidence
          and source in the same view, not behind a click, and every sizing
          number carries its own review status, so a figure still waiting on
          validation never looks final. If checking the reasoning is slow,
          people start rubber-stamping it.
        </p>
      </Section>

      <Figure
        src={commandCenter}
        size="wide"
        caption="Command Center: run status, source readiness, signals, opportunity sizing and the draft narrative on one screen."
      />

      <Section eyebrow="Key Decision" title="A status board and a workspace, kept apart">
        <p>
          Command Center is built for scanning. Deck Agent is where an
          analyst works with the agent, asking for a sharper point or another
          chart and seeing what it found and why. Combining them would have
          made both worse.
        </p>
      </Section>

      <Figure
        src={deckAgent}
        size="wide"
        caption="Deck Agent: the conversation, what's been drafted so far, and the four build stages (gather, synthesize, package, review)."
      />

      <Section eyebrow="Key Decision" title="Always clear what's ready to use">
        <p>
          The agent produces a lot along the way: text, charts, image briefs,
          attachments. Resource Library gives each one a status, like Ready
          or Needs validation. Deck Builder does the same per slide, so a
          partly finished deck never looks more done than it is.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={resourceLibrary} caption="Resource Library: every asset with its readiness status." />
        <Figure src={deckBuilder} caption="Deck Builder: eight slides, each with its resources, owner and status." />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Approval gates built in">
        <p>
          Before a deck counts as business-ready, open questions have to be
          answered and the right people have to sign off. Notifications route
          each item to its owner, and Settings defines who can approve what,
          and can block export until legal review clears.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={notifications} caption="Notifications, grouped by who owns the next action." />
        <Figure src={validationQueue} caption="Validation Queue: open questions and approval gates." />
      </FigureGrid>
      <FigureGrid>
        <Figure src={settings} caption="Settings: who can approve what, plus export controls." />
        <Figure src={mobileCommand} size="narrow" caption="The same app on mobile, restacked into one column." />
      </FigureGrid>

      <Section eyebrow="Try it" title="Live and clickable">
        <p>
          This is the deployed app, the same build as the screenshots. Use
          the sidebar to move between every section.
        </p>
      </Section>

      <Reveal className="mt-10">
        <DesktopFrame src={project.liveUrl} title="CCGS Copilot, live" label="gurneyk.github.io/CCGS-Dashboard" />
      </Reveal>

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          Everything here runs on fictional data: sources are shown as
          generic types and every figure is a mock value, because the real
          version reads Unilever's licensed category data. The interaction
          model, structure and approval flow are the real product's.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
