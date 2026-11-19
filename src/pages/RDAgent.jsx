import CaseStudyLayout, { Section, Figure } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";
import RDAgentDemo from "../components/rd-agent/RDAgentDemo.jsx";

import submissionsList from "../assets/rd-agent/submissions-list.png";
import scoringGuideFull from "../assets/rd-agent/scoring-guide-full.png";
import submissionDetail from "../assets/rd-agent/submission-detail.png";
import insightsOverview from "../assets/rd-agent/insights-overview.png";

const project = projects.find((p) => p.slug === "rd-agent");

export default function RDAgent() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          R&D gets a steady stream of partnership pitches from outside
          companies. Screening them was manual and inconsistent: the same
          submission could get a different read depending on who triaged it,
          and there was no shared record of why. This tool scores every
          submission against one rubric, flags deal-breakers first, and
          routes each one to a tier with a set next step and response time.
        </p>
        <p>
          I designed and built all four sections: Submissions, Insights,
          Scoring Guide and Users. The screenshots are the real product;
          every company name in them is fictional demo data.
        </p>
      </Section>

      <Figure
        src={submissionsList}
        caption="Submissions: every open and closed submission with score, tier, tags and region, with the open queue first."
      />

      <Section eyebrow="Key Decision" title="Deal-breakers run before scoring, as their own step">
        <p>
          A submission that hits a hard filter, like having no path to a
          consumer product, shouldn't compete on a ten-point scale with ones
          that never risked disqualification. So disqualifiers run first, and
          "Closed, disqualified" is its own status, not just a low score. The
          Scoring Guide makes the whole rubric visible: six weighted parts,
          eight disqualifiers, and what each tier means for next steps.
        </p>
      </Section>

      <Figure
        src={scoringGuideFull}
        caption="Scoring Guide: the weighting, all eight disqualifiers, and the tier table mapping each score to an action and response time."
      />

      <Section eyebrow="Key Decision" title="A detail view that shows its work">
        <p>
          Opening a submission answers one question: can I trust this score
          enough to act on it? The score sits at the top, followed by a
          plain-language summary, one recommended next step, and a checklist
          of which checks are actually done. Nothing asks the reviewer to
          take the score on faith.
        </p>
      </Section>

      <Figure
        src={submissionDetail}
        caption="Submission detail: score, summary, next step and evidence checklist in one view."
      />

      <Section eyebrow="Key Decision" title="A separate view for whoever runs the pipeline">
        <p>
          Reviewers work one decision at a time. The person managing the
          pipeline needs trends: how fast decisions are made and where
          submissions pile up. I gave them their own Insights section rather
          than squeezing summary numbers onto the reviewer's screen.
        </p>
      </Section>

      <Figure
        src={insightsOverview}
        size="wide"
        caption="Insights: headline metrics against the prior period, a 12-month trend, the decision pipeline, score distribution and recent activity."
      />

      <Section eyebrow="Try it" title="Interactive rebuild, all four sections">
        <p>
          Switch tabs and open any submission below. It's working React, not
          an image. The real Users screen shows colleagues' names and emails,
          so that tab is rebuilt with invented people instead.
        </p>
      </Section>
      <RDAgentDemo />
    </CaseStudyLayout>
  );
}
