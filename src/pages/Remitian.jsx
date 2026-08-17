import CaseStudyLayout, { Section, Figure, FigureGrid } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

import firmDashboard from "../assets/remitian/firm-dashboard.png";
import importTaxFiles from "../assets/remitian/import-tax-files.png";
import taxFiles from "../assets/remitian/tax-files.png";
import taxFormReview from "../assets/remitian/tax-form-review.png";
import taxPayments from "../assets/remitian/tax-payments.png";
import taxPaymentsV2 from "../assets/remitian/tax-payments-v2.png";
import newPaymentModal from "../assets/remitian/new-payment-modal.png";
import addPaymentEntity from "../assets/remitian/add-payment-entity.png";
import editingScreen from "../assets/remitian/editing-screen.png";

const project = projects.find((p) => p.slug === "remitian");

export default function Remitian() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          Remitian is tax remittance software built for accounting firms, not
          for the taxpayer directly. That single fact shaped almost every
          decision in the product. The person using this software isn't
          managing one tax situation, they're managing thirty or more client
          accounts at once, each with its own filing forms, due dates, and
          approval status. Before Remitian, that work lived across
          spreadsheets, email threads, and whatever tracking system each firm
          had cobbled together. A missed payment date here isn't a minor UX
          annoyance, it's a client relationship problem and sometimes a
          compliance one.
        </p>
        <p>
          I was Lead Product Designer on Remitian for eight months, covering
          both the web platform accounting firms use daily and the mobile
          companion app. I worked directly with engineering through
          iterative releases, which meant most of what's below wasn't
          designed once and handed off. It was designed, shipped, watched,
          and adjusted.
        </p>
      </Section>

      <Section eyebrow="Research & Approach" title="Understanding who actually uses this">
        <p>
          Firm partners and staff accountants are not casual software users.
          Most had spent years inside dense, form-heavy tools built for
          compliance work, and had strong, specific opinions about what
          wasted their time. I mapped the actual workflow a firm goes
          through per client, intake, document collection, filing
          preparation, payment scheduling, client approval, and payment
          execution, and interviewed accountants at industry conferences and
          product demos to find where that workflow broke down in practice.
        </p>
        <p>
          The recurring pattern: firms weren't struggling with any single
          step, they were struggling with visibility across all of their
          clients at once. That reframed the core design problem. This
          wasn't a form-filling product, it was a triage product. Every
          screen needed to answer "where do I need to look next" before it
          answered anything else.
        </p>
      </Section>

      <Section eyebrow="Key Decision" title="A firm-wide view, not just a client view">
        <p>
          The dashboard shows every client and every payment in one table,
          with filtering that lives in a persistent right-hand rail instead
          of a modal. That placement matters more than it looks. Firms don't
          filter occasionally, they filter constantly, by due date, by tax
          authority, by status, sometimes several times in one sitting while
          triaging a backlog. A filter panel that closes after every use
          would have turned a five-second glance into a repeated chore.
        </p>
        <p>
          The client list on the left stays pinned across every screen in
          the product, with a status badge, Active, Invited, Pending, Sent,
          visible without opening a single record. An accountant working
          through thirty clients doesn't process them in order, they
          process by urgency, and that requires seeing status at a glance
          rather than after a click.
        </p>
      </Section>

      <Figure
        src={firmDashboard}
        caption="Firm dashboard. Every client and every payment across the entire firm in one table, with due date, amount, status, and authority filters pinned in a persistent right rail rather than a modal."
      />

      <Section eyebrow="Key Decision" title="Two altitudes of the same table">
        <p>
          The payments table on the firm dashboard and the payments table
          inside a single client's record use the same columns, the same
          status colors, and the same filter logic. That consistency was
          deliberate. An accountant zooming from "all clients" down to "this
          one client" shouldn't have to relearn how to read a table they
          were just looking at thirty seconds earlier. The only thing that
          changes is scope, not structure.
        </p>
      </Section>

      <Figure
        src={taxPayments}
        caption="Tax Payments tab, scoped to a single client. Same table structure as the firm dashboard, same status color language: queued, pending client approval, processed, skipped."
      />

      <Section eyebrow="Key Decision" title="Two upload paths for two real workflows">
        <p>
          Firms bring documents into Remitian two different ways, and I
          designed for both instead of forcing one. A staff accountant
          working a single client uploads directly from that client's Tax
          Files tab. But firm admins doing bulk intake across many new
          clients at once needed something faster: pick the accountant
          owner, pick the client, drop a batch of files, and let the system
          route them. Collapsing these into one generic uploader would have
          made the common case slower to save engineering effort on the
          rare case. I kept them separate on purpose.
        </p>
      </Section>

      <FigureGrid>
        <Figure
          src={taxFiles}
          caption="Per-client upload, inside a client's record. Each file gets its own status pipeline: Processing, In Review, Sent to Client, distinct from payment status so the two systems never get visually confused."
        />
        <Figure
          src={importTaxFiles}
          caption="Bulk import, for firm admins onboarding several clients at once. Accountant owner and client are selected up front, then files drop into a shared queue."
        />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Letting a human verify what the system extracted">
        <p>
          This is the screen I'm most proud of in the product. Once a tax
          form is uploaded, Remitian extracts structured data from it,
          business name, EIN, address, payment line items, automatically.
          Automated extraction is only trustworthy if the person relying on
          it can verify it fast, so I designed the review screen as a
          split view: the actual source PDF on the left, at real page
          controls a reviewer can page through, and the extracted fields on
          the right, editable inline. Nothing here asks an accountant to
          trust a black box. It asks them to confirm what the system read,
          with the original document one glance away the entire time.
        </p>
      </Section>

      <Figure
        src={taxFormReview}
        caption="Tax Form Details. Source PDF and extracted fields side by side, so a reviewer verifies against the original document instead of trusting extracted data blind."
      />

      <Section eyebrow="Key Decision" title="Forms that adapt to what they're for">
        <p>
          Creating a new payment looks like a single modal, but it's
          actually two, one for personal tax entities and one for corporate,
          with different fields underneath depending on which entity type is
          selected. A corporate 1120 payment needs a period end date and a
          corporate income category. A personal 1040 payment needs neither.
          Showing every possible field regardless of entity type would have
          meant accountants scanning past irrelevant inputs on every single
          payment they created, which in a high-volume workflow adds up
          fast.
        </p>
      </Section>

      <FigureGrid>
        <Figure
          src={newPaymentModal}
          caption="New payment, personal entity: Tax Entity, Tax Authority, Reason for Payment, Apply Payment To, Period, Payment Date, Payment Amount."
        />
        <Figure
          src={addPaymentEntity}
          caption="New payment, corporate entity: the same modal, but Period becomes Period End Date and Apply Payment To reflects corporate income categories."
        />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Editing without losing context">
        <p>
          Once payment line items are tied to an uploaded file, editing them
          needed to happen without navigating away from that file. The edit
          view keeps the source document name and upload metadata visible at
          the top, tabs by form type when a single upload covers more than
          one form, and supports bulk selection for line items that all need
          the same change. Small detail, but it meant an accountant editing
          four estimated tax payments never lost track of which document
          they were working from.
        </p>
      </Section>

      <Figure
        src={editingScreen}
        caption="Edit Tax Payments, tabbed by form type (1120, Form 940), with bulk selection for line items tied to the same uploaded file."
      />

      <Section eyebrow="Motion" title="Motion that confirms, not decorates">
        <p>
          This is a high-stakes financial workflow, so I kept
          microinteractions functional rather than ornamental:
          confirmation toasts on actions that are hard to undo, like
          resending a client invite, and inline loading states on file
          uploads so a firm never has to wonder whether a form actually
          made it into the system before they navigate away.
        </p>
      </Section>

      <Figure
        src={taxPaymentsV2}
        caption="A confirmation toast after resending an invite link. Small, but in a workflow where accountants are moving fast across dozens of clients, an unclear confirmation state is how mistakes happen."
      />

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          I led this end to end, web and mobile, working directly with
          engineering to keep design and build in sync across iterative
          releases rather than one big handoff. The product is live with
          accounting firms today. It doesn't have a public marketing site to
          link to here, which is normal for B2B fintech at this stage,
          the product exists behind a login for paying customers, not a
          demo environment.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
