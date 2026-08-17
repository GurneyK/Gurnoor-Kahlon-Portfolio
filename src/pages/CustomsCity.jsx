import CaseStudyLayout, { Reveal } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

import statusCheckerStart from "../assets/customscity/status-checker-start.png";
import trackingEntry from "../assets/customscity/tracking-entry.png";
import shipmentStatusResult from "../assets/customscity/shipment-status-result.png";
import shipmentStatusDetail from "../assets/customscity/shipment-status-detail.png";
import userJourney from "../assets/customscity/user-journey.png";

const project = projects.find((p) => p.slug === "customscity");

function Figure({ src, caption, wide = false }) {
  return (
    <Reveal className="mt-10">
      <div
        className={`overflow-hidden rounded-xl border border-[var(--color-border)] ${
          wide ? "" : "mx-auto max-w-sm"
        }`}
      >
        <img src={src} alt={caption} className="w-full" loading="lazy" />
      </div>
      {caption && (
        <p className="mt-3 text-sm text-[var(--color-paper-mute)]">{caption}</p>
      )}
    </Reveal>
  );
}

export default function CustomsCity() {
  return (
    <CaseStudyLayout project={project}>
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          The problem
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          CustomsCity handles customs clearance and compliance for
          enterprise shipping teams. One core flow, the Customs Status
          Checker, existed already but was confusing enough that we ran
          usability research on it before touching the interface. The
          findings shaped the redesign more than any style decision did.
        </p>
      </Reveal>

      <Figure
        src={userJourney}
        wide
        caption="User journey mapping from research: users found the tracking-mode selection unpersonalized, tracking number entry unclear when fields weren't labeled by shipment type, and status updates too slow or silent to build confidence."
      />

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          What I decided, and why
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          The research called out that choosing between ABI, Air, Ocean, and
          ISF felt arbitrary to users who didn't already know the customs
          terminology. Instead of hiding that complexity, I kept the four
          modes visible but sequenced the flow as a numbered two-step
          process, so a new user always knows there's exactly one more thing
          to do before they see a result. That reduced the "am I doing this
          right" hesitation the research flagged.
        </p>
      </Reveal>

      <Figure
        src={statusCheckerStart}
        caption="Step 1: mode of transport, presented as a numbered flow rather than a form, so the next required action is never ambiguous."
      />
      <Figure
        src={trackingEntry}
        caption="Step 2: tracking number entry. Fields are labeled by the exact document type each mode expects (MBOL, HMBOL) instead of a generic 'tracking number' field, directly addressing the input confusion from research."
      />

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Communicating system state
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          A shipment status isn't one number, it's a distribution across
          draft, sent, accepted, rejected, and cancelled filings, often
          across multiple regulatory systems (AMS and ACAS) at once. A
          single status label would have hidden the thing users actually
          needed: which of their filings, specifically, was the problem. The
          donut breakdown plus the AMS/ACAS comparison table let a user see
          in one glance whether an issue was isolated to one system or
          both.
        </p>
      </Reveal>

      <Figure
        src={shipmentStatusResult}
        caption="Shipment status result: distribution across filing states, broken out by regulatory system, with flight-level detail below."
      />
      <Figure
        src={shipmentStatusDetail}
        caption="Drilling into holds surfaces the code, timestamp, and description for each hold without leaving the status screen — this was a direct response to the 'slow or missing notifications' friction point from research."
      />

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Outcome
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          I designed this across web and mobile and worked with developers
          to keep the interaction models aligned with what was technically
          feasible to ship on the existing platform. No public link here
          either — CustomsCity is enterprise software sitting behind
          customer logins.
        </p>
      </Reveal>
    </CaseStudyLayout>
  );
}
