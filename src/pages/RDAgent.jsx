import CaseStudyLayout, { Reveal } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";
import RDAgentDemo from "../components/rd-agent/RDAgentDemo.jsx";

const project = projects.find((p) => p.slug === "rd-agent");

export default function RDAgent() {
  return (
    <CaseStudyLayout project={project}>
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          The problem
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          R&D fields a constant stream of inbound partnership submissions
          from outside companies pitching technology, ingredients, or
          platforms. Screening them against R&D fit criteria was manual and
          inconsistent — the same submission could get a different read
          depending on who triaged it. This tool scores every submission
          against the same rubric, flags hard disqualifiers before anyone
          spends time on fit scoring, and routes the result to a tier with a
          defined SLA.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <p className="mb-3 text-sm text-[var(--color-paper-mute)]">
          Interactive rebuild below — switch tabs, this is real React, not an image.
        </p>
        <RDAgentDemo />
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          What I decided, and why
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Disqualifiers run before scoring, and the UI keeps that sequence
          visible rather than folding it into a single composite score. A
          submission that hits a hard filter — say, no viable consumer
          product pathway — shouldn't have to compete on a 10-point scale
          against submissions that were never at risk of disqualification.
          Showing "Closed (DQ)" as a distinct status, not just a low score,
          keeps the reviewer's mental model matched to how the system
          actually evaluates a submission.
        </p>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          The Scoring Guide is read-only by design and lives one click from
          the submissions list. Reviewers kept asking "why did this score
          what it scored" often enough that burying the rubric in a wiki
          somewhere wasn't good enough — it needed to be in the product,
          next to the thing it explains.
        </p>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Tier and score are always shown together, never one without the
          other. A tier alone hides the margin (was this a clean Tier 1 or a
          borderline one), and a score alone makes a reviewer do the
          tier-lookup math in their head on every single row.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          On the rebuild
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          The real product isn't public — it runs inside Unilever's admin
          tooling on real submission data. What's embedded above is a full
          React rebuild of the actual screens (Submissions, Scoring Guide,
          Users), matched to the real layout and interaction model, running
          on entirely fictional companies and people. I chose to rebuild
          rather than screenshot because a working rebuild proves I can
          ship the front end, not just design it.
        </p>
        {/* TODO GURNEY: if you push a standalone build to
            github.com/GurneyK/research-and-development-agent, link the
            live deploy here alongside the embedded demo. */}
      </Reveal>
    </CaseStudyLayout>
  );
}
