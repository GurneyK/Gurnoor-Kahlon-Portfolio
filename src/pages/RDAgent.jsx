import CaseStudyLayout, { Section, Figure, FigureGrid } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";
import RDAgentDemo from "../components/rd-agent/RDAgentDemo.jsx";

import scoringGuideTop from "../assets/rd-agent/scoring-guide-top.png";
import scoringComponents from "../assets/rd-agent/scoring-components.png";
import disqualifiers from "../assets/rd-agent/disqualifiers.png";
import tierOutcomes from "../assets/rd-agent/tier-outcomes.png";

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
      </Section>

      <Section eyebrow="Reference" title="The real interface">
        <p>
          These four screens are the actual product I designed, screenshot
          directly, not a recreation. The scoring criteria and disqualifier
          logic shown here are the real methodology, this is evaluation
          framework design, not confidential submission data, so I'm able
          to show it as built.
        </p>
      </Section>

      <FigureGrid>
        <Figure
          src={scoringGuideTop}
          caption="Scoring Guide overview: framework version, maximum score, component count, and disqualifier count, surfaced as stat cards before any detail."
        />
        <Figure
          src={scoringComponents}
          caption="The six weighted scoring components, each with its description and the specific verification signals a reviewer checks."
        />
        <Figure
          src={disqualifiers}
          caption="Eight hard disqualifiers, each with a verification method and the concrete signals that trigger it, checked before any component scoring happens."
        />
        <Figure
          src={tierOutcomes}
          caption="Tier outcomes table: score range mapped directly to label, required action, and SLA, so a score always resolves to a concrete next step."
        />
      </FigureGrid>

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

      <Section eyebrow="Key Decision" title="The rubric lives in the product, not a wiki somewhere">
        <p>
          The Scoring Guide is read-only by design and sits one click from
          the submissions list. Reviewers kept asking "why did this score
          what it scored" often enough in early feedback that burying the
          rubric in a separate document wasn't good enough. It needed to be
          in the product, next to the thing it explains, so a reviewer can
          check their own judgment against the documented criteria in the
          same session, not go looking for a reference doc afterward.
        </p>
      </Section>

      <Section eyebrow="Key Decision" title="Tier and score are shown together, never one without the other">
        <p>
          A tier alone hides the margin, was this a clean Tier 1 or a
          borderline one sitting right at the cutoff, and a score alone
          forces a reviewer to do the tier lookup math in their head on
          every single row of a long list. Pairing them removes that mental
          overhead entirely and makes the list scannable at the speed
          reviewers actually work at, which in practice meant triaging
          dozens of submissions in a single sitting.
        </p>
      </Section>

      <Section eyebrow="Try it" title="Interactive rebuild">
        <p>
          Switch tabs below, this is real React state, not an image or a
          video. It reproduces the Submissions list, the Scoring Guide, and
          the Users table from the actual product, running on entirely
          fictional companies and people.
        </p>
      </Section>
      <RDAgentDemo />

      <Section eyebrow="On the rebuild" title="Why I rebuilt this instead of just screenshotting it">
        <p>
          The real product isn't public, it runs inside Unilever's admin
          tooling on real submission data, and some of the screens I have
          access to show real colleagues' names and email addresses, which
          I won't publish under any circumstances. Rather than crop around
          that problem, I rebuilt the Submissions and Users screens from
          scratch as working React components, matched to the real layout
          and interaction model, and populated them with data I invented
          for this purpose. I chose to rebuild rather than stop at a
          screenshot because a working rebuild proves I can ship the front
          end myself, not just hand off a design file and hope it survives
          implementation.
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
