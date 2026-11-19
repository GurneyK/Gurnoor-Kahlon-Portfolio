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
          CustomsCity handles customs clearance for enterprise shipping
          teams. The Customs Status Checker, a core flow, had become
          confusing enough that we ran usability research before I changed
          anything. This was a research-led redesign of something real users
          were already struggling with, not a blank-page project.
        </p>
      </Section>

      <Section eyebrow="Research" title="Who uses it, and where it broke">
        <p>
          The users are logistics coordinators juggling several carriers and
          transport modes on tight deadlines. If a status screen is unclear,
          they escalate by hand, which defeats the tool. Watching them use the
          existing flow showed where it broke: transport modes that only made
          sense if you knew customs terms, a tracking field that didn't say
          which document it wanted, and status updates slow enough to erode
          trust.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={persona} caption="Primary persona: a logistics manager tracking shipments across carriers and transport modes." />
        <Figure src={userJourney} caption="Journey map: each stage's intended action and the friction users hit there, which became the redesign brief." />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Name it for what users are trying to do">
        <p>
          The screen was called Document Checker, after the system behind
          it. People expected a shipment status tool, so the name caused
          doubt right at the start. I renamed it Customs Status Checker,
          removed a company bio block that slowed people down, and turned the
          tracking field into one clear input labeled with the document it
          expects.
        </p>
      </Section>

      <Figure
        src={usabilityTesting}
        size="wide"
        caption="Before and after from usability testing: issues flagged on the original (left), each tied to a change in the redesign (right)."
      />

      <Section eyebrow="Key Decision" title="Two clear steps instead of one form">
        <p>
          Rather than hiding the four transport modes in a dropdown, I kept
          them visible and made the flow two numbered steps. A new user always
          knows there's exactly one more thing to do before they see a result.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={statusCheckerStart} size="narrow" caption="Step 1: choose the mode of transport." />
        <Figure src={trackingEntry} size="narrow" caption="Step 2: enter the tracking number, labeled by the document type each mode expects." />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Show the breakdown, not one status">
        <p>
          A shipment has many filings, each draft, sent, accepted or rejected,
          often across two customs systems at once. A single status label
          would hide which filing is the problem. A breakdown chart and a
          side-by-side table show that at a glance, and drilling into a hold
          shows its code and description without leaving the screen.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={shipmentStatusResult} size="narrow" caption="Status result: filings broken down by state and customs system." />
        <Figure src={shipmentStatusDetail} size="narrow" caption="Hold detail: code, time and description, right on the status screen." />
      </FigureGrid>

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          I designed it for web and mobile and worked directly with
          developers to keep it buildable on the existing platform. Because
          every change traced back to a research finding, sign-off was
          quick: the debate was about how to fix a documented problem, not
          whether one existed.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
