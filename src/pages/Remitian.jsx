import CaseStudyLayout, { Section, Figure, FigureGrid } from "../components/CaseStudyLayout.jsx";
import { projects } from "../data/projects.js";

import firmDashboard from "../assets/remitian/firm-dashboard.png";
import importTaxFiles from "../assets/remitian/import-tax-files.png";
import taxFiles from "../assets/remitian/tax-files.png";
import taxFormReview from "../assets/remitian/tax-form-review.png";
import taxPayments from "../assets/remitian/tax-payments.png";
import newPaymentModal from "../assets/remitian/new-payment-modal.png";
import addPaymentEntity from "../assets/remitian/add-payment-entity.png";
import editingScreen from "../assets/remitian/editing-screen.png";
import mobileHome from "../assets/remitian/mobile-home.png";
import mobileReview from "../assets/remitian/mobile-review.png";
import mobileBank from "../assets/remitian/mobile-bank-accounts.png";
import mobileSignup from "../assets/remitian/mobile-signup.png";

const mobileScreens = [
  { src: mobileHome, label: "Home", note: "Alerts first, then each account's next payment and status." },
  { src: mobileReview, label: "Review a payment", note: "Approve, skip or edit right on the card." },
  { src: mobileBank, label: "Bank accounts", note: "Choose which account a payment comes from." },
  { src: mobileSignup, label: "Sign up", note: "One short form to get started." },
];

function PhoneScreens({ screens }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
      {screens.map((s) => (
        <figure key={s.label}>
          <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-[var(--color-surface-raised)] bg-white shadow-[0_30px_70px_-40px_color-mix(in_oklab,var(--accent,var(--color-sage))_60%,transparent)]">
            <img src={s.src} alt={"Remitian mobile app, " + s.label + " screen"} className="block aspect-[393/852] w-full object-cover object-top" loading="lazy" />
          </div>
          <figcaption className="mt-3 text-sm leading-snug">
            <span className="block font-medium text-[var(--color-paper)]">{s.label}</span>
            <span className="text-[var(--color-paper-mute)]">{s.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

const project = projects.find((p) => p.slug === "remitian");

export default function Remitian() {
  return (
    <CaseStudyLayout project={project}>
      <Section eyebrow="Overview" title="The problem">
        <p>
          Remitian is tax payment software for accounting firms. One
          accountant manages 30 or more clients, each with their own forms,
          due dates and approvals, and before Remitian that work lived in
          spreadsheets and email. A missed payment date isn't a small UX
          problem here. It's a client relationship problem, and sometimes a
          compliance one.
        </p>
      </Section>

      <Section eyebrow="Research & Approach" title="A triage product, not a form-filling one">
        <p>
          I mapped a firm's workflow from client intake to payment, and
          interviewed accountants at industry conferences and product demos.
          No single step was the problem. Seeing across every client at once
          was. So every screen answers "where do I look next" before
          anything else.
        </p>
      </Section>

      <Section eyebrow="Key Decision" title="One firm-wide view, with filters always open">
        <p>
          Every client and payment sits in one table. Filters live in a
          pinned right-hand rail instead of a modal, because firms filter
          constantly, by due date, tax authority and status. Each client's
          status badge stays visible in the pinned list, so accountants can
          work by urgency without opening records.
        </p>
        <p>
          Inside a single client, the payments table keeps the same columns
          and status colors. Zooming from all clients to one changes the
          scope, not how to read the table.
        </p>
      </Section>

      <Figure
        src={firmDashboard}
        caption="Firm dashboard: every client and payment in one table, with filters pinned in a right rail."
      />
      <Figure
        src={taxPayments}
        caption="One client's payments: the same table and status colors, scoped down."
      />

      <Section eyebrow="Key Decision" title="Two upload paths for two real workflows">
        <p>
          A staff accountant working one client uploads from that client's
          Tax Files tab. Admins onboarding many clients at once needed a bulk
          import instead. One generic uploader would have slowed down the
          common case, so I kept them separate.
        </p>
      </Section>

      <FigureGrid>
        <Figure
          src={taxFiles}
          caption="Per-client upload, with each file's own status: Processing, In Review, Sent to Client."
        />
        <Figure
          src={importTaxFiles}
          caption="Bulk import for admins: pick the accountant and client, then drop in a batch of files."
        />
      </FigureGrid>

      <Section eyebrow="Key Decision" title="Letting a person check what the system read">
        <p>
          The screen I'm most proud of. Remitian pulls data out of each
          uploaded tax form automatically: business name, EIN, address and
          payment lines. That's only useful if someone can verify it fast,
          so the review screen is a split view, the original PDF on the
          left and the extracted fields on the right, editable inline.
        </p>
      </Section>

      <Figure
        src={taxFormReview}
        caption="Tax Form Details: the source PDF and extracted fields side by side."
      />

      <Section eyebrow="Key Decision" title="Forms that only ask what's needed">
        <p>
          Creating a payment looks like one form, but its fields change with
          the entity type. A corporate payment needs a period end date and an
          income category; a personal one doesn't. When editing payments
          from an uploaded file, the file name stays pinned at the top, with
          tabs per form type and bulk selection, so accountants never lose
          track of which document they're in.
        </p>
      </Section>

      <FigureGrid>
        <Figure src={newPaymentModal} caption="New payment, personal entity." />
        <Figure src={addPaymentEntity} caption="New payment, corporate entity: different fields, same form." />
      </FigureGrid>
      <Figure
        src={editingScreen}
        caption="Editing payments from one uploaded file, tabbed by form type, with bulk selection."
      />

      <Section eyebrow="Mobile" title="A smaller app, just for clients">
        <p>
          The web platform is for accounting firms. The mobile app is for
          their clients: a smaller, focused version for checking payments,
          tax accounts and bank details at a glance, without any of the
          firm tools.
        </p>
        <p>
          To decide what made the cut, we asked people directly, with live
          questions at trade show events and conversations with clients
          already using the web app. Clients didn't want to manage anything
          on their phone; they wanted to know quickly whether anything
          needed them. So the home screen leads with alerts, then each
          account's next payment and status, using the same components and
          status colors as the web app.
        </p>
      </Section>

      <PhoneScreens screens={mobileScreens} />

      <Section eyebrow="Outcome" title="Where this landed">
        <p>
          Remitian is live with accounting firms. I worked in parallel with a
          full-stack developer and shipped updates in rounds, so most of
          what's here was designed, shipped, watched and adjusted rather
          than handed off once.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
