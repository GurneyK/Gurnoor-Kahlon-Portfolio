import CaseStudyLayout, { Section, Figure, FigureGrid, Reveal } from "../components/CaseStudyLayout.jsx";
import DesktopFrame from "../components/DesktopFrame.jsx";
import { projects } from "../data/projects.js";

import submissionsList from "../assets/rd-agent/submissions-list.png";
import scoringGuideFull from "../assets/rd-agent/scoring-guide-full.png";
import detailOpen from "../assets/rd-agent/detail-open.png";
import detailClosed from "../assets/rd-agent/detail-closed.png";
import insightsOverview from "../assets/rd-agent/insights-overview.png";
import notifications from "../assets/rd-agent/notifications.png";

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
        caption="Submissions: the open queue first, newest on top, with status, score, tier, category and region on every card."
      />

      <Section eyebrow="Key Decision" title="Deal-breakers run before scoring, as their own step">
        <p>
          A submission that hits a hard filter, like having no path to a
          consumer product, shouldn't compete on a ten-point scale with ones
          that never risked disqualification. So disqualifiers run first. The
          Scoring Guide makes the whole rubric visible: six weighted parts,
          eight disqualifiers, and what each tier means for next steps.
        </p>
      </Section>

      <Figure
        src={scoringGuideFull}
        caption="Scoring Guide: the weighting, all eight disqualifiers, and the tier table mapping each score to an action and response time."
      />

      <Section eyebrow="Key Decision" title="A detail view that shows its work, open or closed">
        <p>
          Opening a submission answers one question: can I trust this score
          enough to act on it? An open case shows the score, a plain-language
          summary, one next step, and which checks are actually done.
        </p>
        <p>
          Closed cases keep a decision record instead, so nobody has to ask
          why a company was turned away. There are two outcomes, kept
          separate on purpose: Declined, when a scored submission was passed
          on, and Disqualified, when a hard filter stopped it before scoring.
          Each record shows when it closed, who decided, which filter
          triggered, and what the company was told.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={detailOpen} size="narrow" caption="An open case: score, summary, next step and evidence checklist." />
        <Figure src={detailClosed} size="narrow" caption="A disqualified case: the filter that triggered, the date, and the partner update." />
      </FigureGrid>

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

      <Section eyebrow="Key Decision" title="Notifications that take you to the work">
        <p>
          Every notification is tied to a submission: a new pitch to screen,
          a response deadline coming up, a colleague asking for input. Clicking
          one opens that submission directly, so an alert is never a dead end.
        </p>
      </Section>

      <Figure
        src={notifications}
        caption="Notifications: unread items first, each opening the submission it's about."
      />

      <Section eyebrow="Try it" title="Live and clickable">
        <p>
          This is the deployed app, the same build as the screenshots. Switch
          between the sections, open the closed list at the bottom of
          Submissions, and try the notifications and profile menu.
        </p>
      </Section>

      <Reveal className="mt-10">
        <DesktopFrame
          src={project.liveUrl}
          title="R&D Fit Agent, live"
          label="gurneyk.github.io/research-and-development-agent"
          designWidth={1280}
          designHeight={820}
        />
      </Reveal>
      <p className="mt-4 text-base text-[var(--color-paper-mute)]">
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4">
          Open it full screen ↗
        </a>{" "}
        for the best view, especially on a phone.
      </p>
    </CaseStudyLayout>
  );
}
