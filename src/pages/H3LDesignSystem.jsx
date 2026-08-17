import CaseStudyLayout, { Reveal } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

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

function LiveButton({ variant = "primary", children }) {
  const variants = {
    primary: "border border-[#7F56D9] bg-[#7F56D9] text-white hover:bg-[#6941C6]",
    secondary: "border border-[#E9D7FE] bg-[#F9F5FF] text-[#6941C6] hover:bg-[#F4EBFF]",
    tertiary: "border border-transparent bg-transparent text-[#6941C6] hover:bg-[#F9F5FF]",
  };
  return (
    <button
      className={`inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold shadow-sm transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default function H3LDesignSystem() {
  return (
    <CaseStudyLayout project={project}>
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          The problem
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Horizon 3 Labs ships multiple AI agent products at once, and I'm
          the only designer across all of them. Without a shared system,
          every product would drift into its own visual language, and I'd
          be redesigning the same button and the same chart legend for the
          third time by Q2. Habibi is the design system that keeps that from
          happening, and it's the piece of infrastructure everything else at
          H3L is built on top of.
        </p>
      </Reveal>

      <Reveal className="mt-10 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="ml-3 text-xs text-[var(--color-paper-mute)]">
            gurneyk.github.io/Design-library
          </span>
        </div>
        <iframe
          src={project.liveUrl}
          title="Habibi design system, live"
          className="h-[560px] w-full bg-white"
          loading="lazy"
        />
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center"
          >
            <div className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-sage-bright)]">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-[var(--color-paper-mute)]">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Component architecture, not just a style guide
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Every entry in the catalog carries the same schema: variants,
          typed props, the token set it consumes, explicit useWhen and
          doNotUseWhen guidance, and a status (draft, review, stable). That
          consistency is what makes the system usable by people who aren't
          me — an engineer implementing a component doesn't need to guess
          what "Secondary" means, it's typed and documented the same way
          every time.
        </p>
      </Reveal>

      <Reveal className="mt-10 rounded-xl border border-[var(--color-border)] bg-white p-8">
        <p className="mb-6 text-xs uppercase tracking-wide text-[#667085]">
          Button — live, real Habibi tokens
        </p>
        <div className="flex flex-wrap gap-3">
          <LiveButton variant="primary">Primary</LiveButton>
          <LiveButton variant="secondary">Secondary</LiveButton>
          <LiveButton variant="tertiary">Tertiary</LiveButton>
        </div>
      </Reveal>
      <p className="mt-3 text-sm text-[var(--color-paper-mute)]">
        Rendered here with the actual brand tokens from the system
        (brand-700 #7F56D9, brand-600 #6941C6), not a screenshot.
      </p>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Governance: the system constrains AI-generated UI too
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          The part of this I'm most proud of isn't a component, it's a
          rule. The catalog is machine-readable and ships with explicit
          consumption guidance: load the manifest before generating UI for
          any H3L surface, choose from existing entries by category and
          token, and don't invent a new component outside the catalog
          without an approved gap proposal. As more of our internal tooling
          gets scaffolded with AI assistance, that rule is what keeps
          agent-generated interfaces from drifting away from the system the
          moment nobody's looking.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <p className="text-sm uppercase tracking-wide text-[var(--color-paper-mute)]">
          Categories in the catalog
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-paper-dim)]"
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          How other teams consume it
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          I write the component documentation directly in GitHub alongside
          coded reference files, so engineering can pull real, working code
          rather than translate a static spec. That handoff format is what
          let me contribute directly to front-end implementation instead of
          staying purely in the design layer — the line between "designed
          it" and "shipped it" is thinner here than anywhere else I've
          worked.
        </p>
      </Reveal>
    </CaseStudyLayout>
  );
}
