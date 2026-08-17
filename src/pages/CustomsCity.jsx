import CaseStudyLayout, { Section, Figure, FigureGrid } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

import persona from "../assets/customscity/persona.jpg";
import userJourney from "../assets/customscity/user-journey.png";
import usabilityTesting from "../assets/customscity/usability-testing.png";
import statusCheckerStart from "../assets/customscity/status-checker-start.png";
import trackingEntry from "../assets/customscity/tracking-entry.png";
import shipmentStatusResult from "../assets/customscity/shipment-status-result.png";
import shipmentStatusDetail from "../assets/customscity/shipment-status-detail.png";

const project = projects.find((p) => p.slug === "customscity");

export default function CustomsCity() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          CustomsCity handles customs clearance and compliance for
          enterprise shipping teams. My focus was the Customs Status
          Checker, a core flow that already existed in the product but had
          accumulated enough confusion that we ran formal usability
          research on it before I touched a single pixel. That's an
          important distinction from a lot of portfolio work: this wasn't a
          greenfield design, it was a research-led redesign of something
          real users were already struggling with.
        </p>
      </Section>

      <Section eyebrow="Research & Ideation" title="Who this is actually for">
        <p>
          I built this persona from interviews with logistics coordinators
          managing shipments across air, ocean, and ground transport for
          enterprise freight clients. The core tension across every
          conversation: these users are managing multiple carriers and
          transport modes at once, on a tight schedule, and their tolerance
          for ambiguity in a status screen is close to zero. If the app
          can't tell them clearly what's happening with a shipment, they
          escalate manually, which defeats the entire purpose of the tool.
        </p>
      </Section>

      <Figure
        src={persona}
        size="wide"
        caption="Primary persona built from research: a logistics manager tracking shipments across multiple carriers and transport modes, whose main pain points were inconsistent tracking experiences and cluttered interfaces that buried the information they actually needed."
      />

      <Section eyebrow="Research & Ideation" title="Mapping where the flow actually broke">
        <p>
          I walked the existing flow step by step and mapped where users
          hesitated, backtracked, or gave up. Four friction points came out
          clearly: the transport-mode selection felt arbitrary to anyone who
          didn't already know customs terminology, tracking number entry
          fields were unclear about which document type they expected, and
          status updates were slow or silent enough to erode trust in the
          tool entirely. None of this was guesswork. It came directly from
          watching people use the existing screen and get stuck.
        </p>
      </Section>

      <Figure
        src={userJourney}
        size="wide"
        caption="User journey mapping from research. Each stage documents both the intended action and the specific friction users hit there, which became the brief for the redesign rather than a general 'make it better' direction."
      />

      <Section eyebrow="Key Decision" title="What the before and after actually changed">
        <p>
          The original screen was called Document Checker, a name that
          described the underlying system rather than what the user was
          trying to do. Usability sessions confirmed this mismatch directly:
          people expected a shipment status tool, not a document tool, and
          the name created a moment of doubt right at the entry point. I
          renamed it Customs Status Checker to match user intent, not
          internal architecture.
        </p>
        <p>
          I also removed a company bio block that had been sitting on the
          entry screen. It added visual weight without adding decision
          value, and testing showed it delayed people from reaching the
          actual task. The tracking number field, which had caused a
          confusing line break in the original layout, was cleaned up into
          a single clear input labeled by the document type it expected.
        </p>
      </Section>

      <Figure
        src={usabilityTesting}
        size="wide"
        caption="Annotated before and after from usability testing. Left: the original Document Checker screen with the issues flagged in orange. Right: the redesign, with each change tied directly to a specific finding rather than a general polish pass."
      />

      <Section eyebrow="Key Decision" title="A two-step flow instead of a form">
        <p>
          Choosing between ABI, Air, Ocean, and ISF felt arbitrary to users
          who didn't already know the customs terminology behind each
          option. Instead of hiding that complexity behind tooltips or
          collapsing it into a dropdown, I kept all four modes visible but
          sequenced the flow as a clearly numbered two-step process. A new
          user always knows there is exactly one more thing to do before
          they see a result, which directly addressed the hesitation
          research had flagged around this step.
        </p>
      </Section>

      <FigureGrid>
        <Figure
          src={statusCheckerStart}
          size="narrow"
          caption="Step 1: mode of transport, presented as a numbered flow rather than an unstructured form."
        />
        <Figure
          src={trackingEntry}
          size="narrow"
          caption="Step 2: tracking number entry, labeled by the exact document type each mode expects (MBOL, HMBOL) instead of a generic 'tracking number' field."
        />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Showing a distribution, not a single status">
        <p>
          A shipment's status isn't one number, it's a distribution across
          draft, sent, accepted, rejected, and cancelled filings, often
          across two regulatory systems, AMS and ACAS, at once. A single
          status label would have hidden the thing users actually needed to
          know: which of their filings, specifically, was the problem, and
          whether an issue was isolated to one system or affecting both. The
          donut breakdown plus the side-by-side comparison table let a user
          see that in one glance instead of clicking into each filing
          individually.
        </p>
      </Section>

      <FigureGrid>
        <Figure
          src={shipmentStatusResult}
          size="narrow"
          caption="Shipment status result: distribution across filing states, broken out by regulatory system, with flight-level detail below."
        />
        <Figure
          src={shipmentStatusDetail}
          size="narrow"
          caption="Drilling into a hold surfaces the code, timestamp, and description without leaving the status screen, a direct response to the 'slow or missing notifications' friction point from research."
        />
      </FigureGrid>

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          I designed this across web and mobile and worked directly with
          developers to keep the interaction model aligned with what was
          technically feasible on the existing platform. Because the
          redesign traced back to specific research findings rather than
          aesthetic preference, it was easier to get stakeholder buy-in
          quickly, there wasn't a debate about whether a change was needed,
          only about how to solve the documented problem. CustomsCity is
          enterprise software sitting behind customer logins, so there's no
          public link to include here.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
