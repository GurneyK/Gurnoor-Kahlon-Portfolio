import CaseStudyLayout, { Section, Reveal, Figure } from "../components/CaseStudyLayout.jsx";
import DesktopFrame from "../components/DesktopFrame.jsx";
import { projects } from "../data/projects.js";
import buttonDetail from "../assets/h3l/button-detail.png";
import colorTokens from "../assets/h3l/color-tokens.png";

const project = projects.find((p) => p.slug === "h3l-design-system");

const stats = [
  { label: "Cataloged entries", value: "224" },
  { label: "Components", value: "194" },
  { label: "Templates", value: "16" },
  { label: "Categories", value: "13" },
];

const agentComponents = [
  "Chat Surface",
  "Chat Message",
  "Composer",
  "Suggestion Chips",
  "Streaming State",
  "Citation Chip",
  "Tool Call Card",
  "Source Drawer",
  "Agent Avatar",
  "Thinking State",
  "Trace Panel",
  "Evidence List",
  "Agent Status Bar",
  "Agent Manifest",
];

export default function H3LDesignSystem() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          Horizon 3 Labs ships several AI agent products at once, and I'm the
          only designer across all of them. Without a shared system, each
          product drifts into its own look, and I'd redesign the same button,
          chart legend and empty state every quarter. I built and govern the
          H3L Design System so every product starts from the same parts.
        </p>
      </Section>

      <Section eyebrow="Try it" title="The live catalog">
        <p>This is the real catalog, not a screenshot. Browse it directly.</p>
      </Section>

      <Reveal className="mt-10">
        <DesktopFrame src={project.liveUrl} title="H3L Design System, live" label="gurneyk.github.io/Design-library" />
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center"
          >
            <div className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-sage-bright)]">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-[var(--color-paper-mute)]">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <Section eyebrow="Key Decision" title="Every entry documented the same way, with real code">
        <p>
          Every entry has the same fields: variants, typed props, the tokens
          it uses, "use when" and "do not use when" guidance, and a status of
          draft, review or stable. Engineers don't have to guess what
          "Secondary" means or message me to check a spacing value.
        </p>
        <p>
          The docs live in GitHub next to working code, and each entry ends
          with a developer handoff panel: which files to copy, the install
          command and copy scripts. I added it after a handoff stalled
          because an engineer had to guess a component's dependencies.
        </p>
      </Section>

      <Figure
        src={buttonDetail}
        size="wide"
        caption="The Button entry, full page: live preview, variants, props, tokens, usage guidance, accessibility notes, code and the developer handoff panel."
      />
      <Figure
        src={colorTokens}
        size="wide"
        caption="The Color entry: foundations use the same layout as components, so a color token and a button read the same way."
      />

      <Section eyebrow="Key Decision" title="Parts for showing an agent's work">
        <p>
          Most design systems are built around forms and tables. H3L's
          products are agents, so the system has a whole category for showing
          an AI's reasoning as it happens, not just its final answer:
          streaming, tool calls, source citations and a thinking state.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {agentComponents.map((c) => (
            <span
              key={c}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-paper-dim)]"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Key Decision" title="Rules for AI-generated interfaces">
        <p>
          The part I'm most proud of is a rule, not a component. The catalog
          is machine-readable and tells AI coding tools how to use it: load
          the catalog first, pick from existing entries, and never invent a
          new component without an approved proposal. As more internal tools
          are built with AI help, that keeps them on-system even when nobody
          is reviewing closely.
        </p>
      </Section>

      <Section eyebrow="Outcome" title="How teams use it">
        <p>
          Every H3L product team builds from this catalog, so a new agent
          product goes from a blank screen to a consistent interface in days
          instead of weeks. It's why CCGS Copilot and the R&D Fit Agent look
          and behave alike despite doing completely different jobs.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
