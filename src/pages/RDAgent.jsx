import CaseStudyLayout, { Section, Figure } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";
import RDAgentDemo from "../components/rd-agent/RDAgentDemo.jsx";

import submissionsList from "../assets/rd-agent/submissions-list.png";
import scoringGuideFull from "../assets/rd-agent/scoring-guide-full.png";
import submissionDetail from "../assets/rd-agent/submission-detail.png";

const project = projects.find((p) => p.slug === "rd-agent");

export default function RDAgent() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          R&D fields a constant stream of inbound partnership submissions
          from outside companies pitching technology, ingredients, or
          platforms for potential collaboration. Screening them against R&D
          fit criteria was manual and inconsistent: the same submission
          could get a different read depending on who triaged it that week,
          and there was no shared record of why a company had been passed
          on or prioritized. This tool scores every submission against the
          same rubric, flags hard disqualifiers before anyone spends time on
          fit scoring, and routes the result to a tier with a defined
          service level agreement.
        </p>
        <p>
          I designed and built this as a full four section product:
          Submissions, Insights, Scoring Guide, and Users, with a detail
          view for every submission that shows a reviewer exactly why the
          agent scored what it scored. The three screens below are the
          actual product, screenshot directly, not a recreation. The
          company names showing in these screens are fictional seed data
          used for demos, no real submitter data is shown anywhere on this
          page.
        </p>
      </Section>

      <Figure
        src={submissionsList}
        caption="Submissions, the default view. Every open and closed submission with company, score, tier, category tags, and region, grouped so the open queue is always the first thing a reviewer sees. Ten submissions are seeded here for demo purposes."
      />

      <Section eyebrow="Reference" title="The scoring guide, in full">
        <p>
          This is the actual Scoring Guide screen from the shipped product,
          not a partial mockup. Framework stats, the six weighted
          components with their point allocation, all eight hard
          disqualifiers, and the tier outcomes table that maps a final score
          to a concrete required action and SLA.
        </p>
      </Section>

      <Figure
        src={scoringGuideFull}
        caption="Scoring Guide: framework stats, weighted score allocation across six components, all eight disqualifiers with their verification criteria, and the tier outcomes table mapping score to action and SLA."
      />

      <Section eyebrow="Key Decision" title="A detail view that shows its work">
        <p>
          Clicking into any submission opens a review panel built around one
          question: can a reviewer trust this score fast enough to act on
          it. The score sits in a large circular gauge at the top, followed
          by a plain-language reviewer summary, a single recommended next
          step, and an evidence readiness checklist showing exactly which
          verification steps have actually been completed. Nothing here
          asks a reviewer to take the score on faith. Everything that fed
          into it is visible in the same panel.
        </p>
      </Section>

      <Figure
        src={submissionDetail}
        caption="Submission detail panel: score gauge, reviewer summary, recommended next step, and an evidence readiness checklist, all in one view so a reviewer never has to hunt for the reasoning behind a score."
      />

      <Section eyebrow="Key Decision" title="Disqualifiers run before scoring, and stay visible as a separate step">
        <p>
          A submission that hits a hard filter, no viable consumer product
          pathway, for example, shouldn't have to compete on a ten-point
          scale against submissions that were never at risk of
          disqualification in the first place. I kept that sequence visible
          in the interface rather than folding everything into a single
          composite score. Showing "Closed, disqualified" as its own
          distinct status, not just a low number, keeps a reviewer's mental
          model matched to how the system actually evaluates a submission
          underneath the hood.
        </p>
      </Section>

      <Section eyebrow="Key Decision" title="An Insights view for the person managing the whole pipeline, not just one submission">
        <p>
          Submissions and Scoring Guide serve a reviewer working one
          decision at a time. Insights serves a different job entirely:
          someone who needs to know how the whole pipeline is trending,
          whether review velocity is improving, and where submissions are
          piling up by tier. I built this as its own section rather than
          bolting summary numbers onto the Submissions screen, because the
          two audiences look at this tool at completely different
          altitudes and conflating them would have served neither one well.
        </p>
      </Section>

      <Section eyebrow="Try it" title="Interactive rebuild, all four sections">
        <p>
          Switch tabs below, this is real React state, not an image or a
          video. Submissions, Insights, Scoring Guide, and Users, plus the
          full submission detail panel on click, all rebuilt as working
          components with entirely fictional data.
        </p>
      </Section>
      <RDAgentDemo />

      <Section eyebrow="On the rebuild" title="Why the Users tab is rebuilt instead of screenshotted">
        <p>
          The real product isn't public, it runs inside Unilever's admin
          tooling on real submission data, and the real Users screen shows
          actual colleagues' names and email addresses, which I won't
          publish under any circumstances. Submissions, Insights, and the
          Scoring Guide were safe to screenshot directly because they don't
          expose anyone's personal information. Users required a full
          rebuild instead, matched to the real layout and interaction
          model, populated with data I invented for this purpose.
        </p>
      </Section>

      <Section eyebrow="Outcome" title="Where this stands">
        <p>
          The interactive rebuild above is embedded directly in this
          portfolio rather than deployed as a separate standalone
          repository. That is a real scope tradeoff I made given the time
          available to build this entire site, not an oversight. If a
          standalone deployed build at its own repository would be useful,
          it's a straightforward follow-up from here.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
