import CaseStudyLayout, { Section, Figure, FigureGrid } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

import commandCenter from "../assets/ccgs/command-center.png";
import deckAgent from "../assets/ccgs/deck-agent.png";
import resourceLibrary from "../assets/ccgs/resource-library.png";
import deckBuilder from "../assets/ccgs/deck-builder.png";
import notifications from "../assets/ccgs/notifications.png";
import validationQueue from "../assets/ccgs/validation-queue.png";
import settings from "../assets/ccgs/settings.png";
import mobileCommand from "../assets/ccgs/mobile-command.png";
import liveAnalystWorkspace from "../assets/ccgs/live-analyst-workspace.png";

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

const sidebarSections = [
  ["Command Center", "The live workspace: run status, connected sources, signal synthesis, opportunity sizing, and the draft narrative in one screen."],
  ["Deck Agent", "The conversational workspace where the agent explains what it found and what it recommends doing next."],
  ["Resource Library", "Every text block, chart, image brief, and attachment the agent has produced, searchable and filterable."],
  ["Deck Builder", "An eight-slide outline with resources mapped to each section and a live slide preview."],
  ["Notifications", "Business, source, and approval events that affect the deck build, routed to the right owner."],
  ["Validation Queue", "Open questions and approval gates that have to clear before a deck is business-ready."],
  ["Settings", "Role matrix and export controls: who can approve what, and what's required before a deck can be exported."],
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
        <p>
          This is a full application, not a single screen. Seven sections
          below cover the whole thing: a live command center, a
          conversational agent workspace, a resource library, a deck
          builder, notifications, a business validation queue, and access
          settings. Every screenshot here is the real interface, screenshot
          directly, running on a fictional UK Deodorants scenario.
        </p>
      </Section>

      <Section eyebrow="Reference" title="What's in the sidebar">
        <div className="grid gap-3 sm:grid-cols-2">
          {sidebarSections.map(([title, desc]) => (
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

      <Figure
        src={commandCenter}
        size="wide"
        caption="Command Center, the default landing screen. Run status, connected source readiness, the agent brief, signal synthesis, opportunity sizing, the recommended category value driver, and the draft narrative, all visible without navigating away."
      />

      <Section eyebrow="Key Decision" title="The agent explains itself in its own workspace">
        <p>
          Deck Agent is a separate conversational surface from Command
          Center on purpose. Command Center is a status board, built for
          scanning. Deck Agent is where an analyst actually works with the
          agent: asking for a sharper retailer implication, requesting
          another chart option, watching the agent report what it found and
          why. Collapsing these into one screen would have forced a choice
          between a clean status view and a workable conversation, so I
          kept them separate and let each one do its job well.
        </p>
      </Section>

      <Figure
        src={deckAgent}
        size="wide"
        caption="Deck Agent: the working conversation, a resource tray showing what the agent has drafted so far, an agent checklist of remaining build steps, and the four-stage pipeline (gather, synthesize, package, review) the agent moves through."
      />

      <Section eyebrow="Key Decision" title="Every asset the agent produces lives in one searchable library">
        <p>
          An agent drafting a deck produces a lot of intermediate output:
          text blocks, chart specs, image briefs, source extracts,
          attachments. Without a central library, that output would be
          scattered across whatever screen happened to generate it, and an
          analyst would lose track of what was ready to use versus what
          still needed validation. Resource Library gives every asset a
          status, Ready, Needs validation, Queued, Attached, Mapped, and Review, so an
          analyst can filter straight to what's usable right now.
        </p>
      </Section>

      <Figure
        src={resourceLibrary}
        size="wide"
        caption="Resource Library: 24 resources across text blocks, charts, image briefs, and attachments, each carrying its own readiness status and a full attachment inventory below."
      />

      <Section eyebrow="Key Decision" title="A deck outline that shows resource coverage per slide">
        <p>
          Deck Builder answers a specific question an analyst kept asking
          during early testing: which slides are actually ready to send,
          and which ones are still blocked on something. Each of the eight
          slides shows its resource count, its owner, and a status,
          Draft ready, Evidence linked, Needs validation, or In progress,
          so a partial deck is never presented as more finished than it
          actually is.
        </p>
      </Section>

      <Figure
        src={deckBuilder}
        size="wide"
        caption="Deck Builder: eight-slide outline with resource counts and status per slide, plus a live preview of the selected slide showing the actual chart and headline that will ship."
      />

      <FigureGrid>
        <Figure
          src={notifications}
          caption="Notifications, prioritized by who owns the next action: Finance, Creative, Legal, CMI, each with their own open item and timestamp."
        />
        <Figure
          src={validationQueue}
          caption="Validation Queue: open business questions captured from the working session, plus the approval gates that must clear before a deck is considered business-ready."
        />
      </FigureGrid>

      <Figure
        src={settings}
        caption="Settings: a role matrix defining who can approve narrative content, data interpretation, sizing models, and third-party data use, plus export controls that can block a deck from exporting until legal review clears."
      />

      <Section eyebrow="Reference" title="Responsive, not just desktop">
        <p>
          The full application collapses to a single-column mobile layout
          rather than a stripped-down companion view, the same status
          cards, the same signal synthesis, the same narrative draft, just
          restacked for a narrow screen.
        </p>
      </Section>

      <Figure src={mobileCommand} size="narrow" caption="Command Center on mobile." />

      <Section eyebrow="Reference" title="An earlier deployed build, still live">
        <p>
          Everything above is from a further iteration built on top of
          this. The version actually live at the link in the header is an
          earlier pass, Analyst Workspace framing instead of Command
          Center, but the same underlying product: source readiness,
          growth opportunities ranked by confidence, and a drafted
          narrative with citations. Worth clicking through directly rather
          than embedding here, the sidebar navigation doesn't render
          correctly inside an iframe on this particular build.
        </p>
      </Section>

      <Figure
        src={liveAnalystWorkspace}
        size="wide"
        caption="The live build at gurneyk.github.io/CCGS. Source readiness, ranked growth opportunities with confidence levels, and a drafted narrative with source attribution, all visible without navigating away."
      />

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
        </p>
      </Section>

      <Section eyebrow="Key Decision" title="Distinguishing confidence, not just showing numbers">
        <p>
          I also had to design for opportunity sizing being a real
          calculation in most cases, tied to an existing validated
          methodology from another category team, rather than a rough
          estimate. That meant the interface needed a visual way to
          distinguish a number the agent is confident citing from a number
          still pending validation against that methodology, which is why
          the sizing model on Command Center is explicitly labeled "HC
          model to validate" rather than presented as final.
        </p>
      </Section>

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          Both the screenshots above and the live embed show the real
          product, running on fictional data. The real version reads
          Unilever's licensed category data, which isn't something I can
          put on a public site. What's demonstrated here is the actual
          interaction model, information architecture, and governance
          structure (approval gates, role matrix, export controls) from the
          real product, just running on invented inputs.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
