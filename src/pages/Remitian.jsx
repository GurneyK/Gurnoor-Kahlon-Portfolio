import CaseStudyLayout, { Reveal } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

import firmDashboard from "../assets/remitian/firm-dashboard.png";
import taxFiles from "../assets/remitian/tax-files.png";
import taxPayments from "../assets/remitian/tax-payments.png";
import taxPaymentsV2 from "../assets/remitian/tax-payments-v2.png";
import addPaymentEntity from "../assets/remitian/add-payment-entity.png";
import editingScreen from "../assets/remitian/editing-screen.png";

const project = projects.find((p) => p.slug === "remitian");

function Figure({ src, caption }) {
  return (
    <Reveal className="mt-10">
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
        <img src={src} alt={caption} className="w-full" loading="lazy" />
      </div>
      {caption && (
        <p className="mt-3 text-sm text-[var(--color-paper-mute)]">{caption}</p>
      )}
    </Reveal>
  );
}

export default function Remitian() {
  return (
    <CaseStudyLayout project={project}>
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          The problem
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Remitian is tax remittance software built for accounting firms, not
          for the taxpayer. That distinction shaped almost every decision.
          The user isn't managing one tax situation, they're managing thirty
          or more client accounts at once, each with its own filing forms,
          due dates, and approval status. The old workflow lived across
          spreadsheets and email threads. A missed payment date isn't a UX
          annoyance here, it's a client relationship problem and sometimes a
          compliance one.
        </p>
      </Reveal>

      <Figure
        src={firmDashboard}
        caption="Firm dashboard: every client, every payment, one table. Filters live in a persistent right rail instead of a modal, because filtering isn't an occasional action here, it's how the firm works all day."
      />

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          What I decided, and why
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          The client list stays pinned on the left across every screen, with
          a status badge — Active, Invited, Pending, Sent — visible at a
          glance. An accountant working through thirty clients needs to know
          where each one stands without opening a single record. That
          persistent status affordance came out of watching how firms
          actually triaged their day: they don't process clients in order,
          they process by urgency.
        </p>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          Inside a client record, I split Tax Payments, Tax Files, and Tax
          Accounts into tabs instead of one long scroll. Payments, uploaded
          documents, and account details don't get referenced together, and
          a firm reviewing files shouldn't have to scroll past a payment
          table to get there.
        </p>
      </Reveal>

      <Figure
        src={taxFiles}
        caption="Tax file processing has its own status pipeline, distinct from payment status: Processing, In Review, Sent to Client. Keeping these two status systems visually separate mattered, since conflating them was the single most common confusion in early feedback."
      />

      <Figure
        src={taxPayments}
        caption="Tax Payments tab, same client. Status color-coding (queued, pending client approval, processed, skipped) has to be scannable across dozens of rows without reading every cell."
      />

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Motion, used sparingly
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          This is a high-stakes financial workflow, so I kept microinteractions
          functional rather than decorative: confirmation toasts on
          irreversible actions like sending an invite link, and inline
          loading states on file uploads so a firm never wonders whether a
          1120 actually made it into the system.
        </p>
      </Reveal>

      <Figure
        src={addPaymentEntity}
        caption="Adding a new payment entity. Long forms in a financial tool get abandoned or rushed, so fields are grouped by what the accountant actually knows at each stage rather than by database schema."
      />

      <Figure src={editingScreen} caption="Inline editing on an existing record." />
      <Figure
        src={taxPaymentsV2}
        caption="A later iteration of the payments table, refined after firm feedback on column density."
      />

      <Reveal className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
          Outcome
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-paper-dim)]">
          I led this end to end across web and mobile, working directly with
          engineering to keep design and build in sync through iterative
          releases. The product is live with accounting firms today; it
          doesn't have a public marketing site to link to, which is normal
          for B2B fintech at this stage.
        </p>
      </Reveal>
    </CaseStudyLayout>
  );
}
