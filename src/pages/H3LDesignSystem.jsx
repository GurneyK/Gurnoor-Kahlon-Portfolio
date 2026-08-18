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

const categories = [
  "Primitives",
  "Agent UI",
  "Charts / Data Viz",
  "Dashboard / Product Patterns",
  "Data Display",
  "Data Entry",
  "Feedback",
  "Forms",
  "Foundations",
  "Layout",
  "Navigation",
  "Templates / Blocks",
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

function LiveButton({ variant = "primary", children }) {
  const variants = {
    primary: "border border-[#7F56D9] bg-[#7F56D9] text-white hover:bg-[#6941C6]",
    secondary: "border border-[#E9D7FE] bg-[#F9F5FF] text-[#6941C6] hover:bg-[#F4EBFF]",
    tertiary: "border border-transparent bg-transparent text-[#6941C6] hover:bg-[#F9F5FF]",
    destructive: "border border-[#D92D20] bg-[#D92D20] text-white hover:bg-[#B42318]",
  };
  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold shadow-sm transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default function H3LDesignSystem() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          Horizon 3 Labs ships multiple AI agent products at once, and I'm
          the sole designer across all of them. Without a shared system,
          every product drifts into its own visual language, and I end up
          redesigning the same button, the same chart legend, and the same
          empty state for the third time by the next quarter. This design
          system, which I built and now govern, is the piece of
          infrastructure everything else at H3L sits on top of. It isn't a
          side project next to the "real" design work, it is the thing that
          makes the real work sustainable at the pace H3L ships.
        </p>
      </Section>

      <Reveal className="mt-10">
        <DesktopFrame
          src={project.liveUrl}
          title="Full design system, live"
          label="gurneyk.github.io/Design-library"
        />
      </Reveal>
      <p className="mt-4 text-base text-[var(--color-paper-mute)]">
        Live and interactive above, at full desktop width, scaled to fit.
        This is the real catalog, not a screenshot. Browse it directly.
      </p>

      <Section eyebrow="By the numbers" title="Scope">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
        </div>
      </Section>

      <Section eyebrow="Key Decision" title="A schema, not just a style guide">
        <p>
          Every entry in the catalog carries the same fields: variants,
          typed props, the exact token set it consumes, explicit "use when"
          and "do not use when" guidance, and a maturity status of draft,
          review, or stable. That consistency is what makes the system
          usable by people who aren't me. An engineer implementing a
          component doesn't need to guess what "Secondary" means or ping me
          on Slack to confirm a spacing value, it's typed and documented
          identically every single time, across all 194 components.
        </p>
        <p>
          I write the component documentation directly in GitHub alongside
          coded reference files, so engineering pulls real, working code
          rather than a static image they have to translate by eye. That
          handoff format is what let me contribute directly to front-end
          implementation instead of staying purely in the design layer,
          narrowing the gap between designing something and shipping it.
        </p>
      </Section>

      <Figure
        src={buttonDetail}
        size="wide"
        caption="The real Button entry, full page. Live preview rendered with actual Habibi tokens, every variant and size, a typed props table, the token list it consumes, use when and do not use when guidance, accessibility notes, a copyable code snippet, and a full developer handoff panel with install commands and copy scripts for both PowerShell and bash."
      />

      <Section eyebrow="Key Decision" title="A handoff format built for engineers who aren't me">
        <p>
          Scroll to the bottom of any entry and there's a developer handoff
          panel: which files to copy, the install command, import alias
          conventions, and platform-specific copy scripts for PowerShell and
          bash that pull the component straight from the repository. I
          built this after watching a design handoff stall because an
          engineer had to guess which files a component actually depended
          on. Now that question has one answer, generated the same way
          every time, instead of a Slack thread.
        </p>
      </Section>

      <Figure
        src={colorTokens}
        size="wide"
        caption="Color foundation entry: brand and semantic token swatches with real hex values, paired with the same use when, accessibility, and code sections every component entry carries. Foundations and components share one schema, so a color token and a button component read identically."
      />

      <Reveal className="mt-10 rounded-xl border border-[var(--color-border)] bg-white p-8">
        <p className="mb-6 text-sm uppercase tracking-wide text-[#667085]">
          Button, live, real tokens from the system
        </p>
        <div className="flex flex-wrap gap-3">
          <LiveButton variant="primary">Primary</LiveButton>
          <LiveButton variant="secondary">Secondary</LiveButton>
          <LiveButton variant="tertiary">Tertiary</LiveButton>
          <LiveButton variant="destructive">Destructive</LiveButton>
        </div>
        <p className="mt-6 text-sm text-[#667085]">
          Rendered here with the actual brand tokens (brand 700 #7F56D9,
          brand 600 #6941C6, error 600 #D92D20), not a screenshot or a
          recreation.
        </p>
      </Reveal>

      <Section eyebrow="Key Decision" title="Building for agent products specifically">
        <p>
          Most design systems are built around forms, tables, and marketing
          pages. H3L's products are conversational and agent driven, which
          meant the catalog needed an entire category most systems don't
          have: components for showing an AI system's reasoning as it
          happens, not just its final answer. Streaming responses, tool
          calls, source citations, and a "thinking" state all needed their
          own defined patterns, because a user watching an agent work needs
          different affordances than a user filling out a form.
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

      <Section eyebrow="Key Decision" title="Governance for AI generated interfaces">
        <p>
          The part of this I'm most proud of isn't a component, it's a
          rule. The catalog is machine readable and ships with explicit
          consumption guidance: load the manifest before generating UI for
          any H3L surface, choose from existing entries by category and
          token, and never invent a new component outside the catalog
          without an approved gap proposal. As more of our internal tooling
          gets scaffolded with AI assistance, that rule is what keeps
          agent-generated interfaces from drifting away from the system the
          moment nobody is reviewing them closely.
        </p>
      </Section>

      <Section eyebrow="Reference" title="Full category breakdown">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-paper-dim)]"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Outcome" title="How other teams consume it">
        <p>
          Every H3L product team pulls from this catalog instead of
          building components from scratch, which means a new agent product
          can go from a blank screen to a coherent, on-brand interface in
          days instead of weeks. It's also the reason the three product
          case studies elsewhere on this site, CCGS Copilot and the R&D Fit
          Agent, look and behave consistently despite being built for
          completely different jobs. That consistency isn't an accident,
          it's the entire point of this system existing.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
