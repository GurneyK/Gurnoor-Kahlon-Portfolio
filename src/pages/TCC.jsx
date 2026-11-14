import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CaseStudyLayout, { Section, Reveal } from "../components/CaseStudyLayout.jsx";
import DesktopFrame from "../components/DesktopFrame.jsx";
import BrowserShot from "../components/tcc/BrowserShot.jsx";
import Walkthrough from "../components/tcc/Walkthrough.jsx";
import ApprovalFlow from "../components/tcc/ApprovalFlow.jsx";
import { independentProjects } from "../data/projects.js";

import hub from "../assets/tcc/hub.png";
import exceptions from "../assets/tcc/exceptions.png";
import payments from "../assets/tcc/payments.png";
import forecast from "../assets/tcc/forecast.png";
import fx from "../assets/tcc/fx.png";
import audit from "../assets/tcc/audit.png";

const project = independentProjects.find((p) => p.slug === "tcc");

const META = [
  ["Role", "Solo designer and engineer"],
  ["Scope", "9 screens, 4 agents, 3 roles"],
  ["Stack", "React, TypeScript, Tailwind, Zustand"],
  ["Timeline", "November 2026"],
];

const STATS = [
  ["34", "unit and store tests"],
  ["14", "end to end tests"],
  ["0", "axe violations on 9 routes"],
  ["25", "Design System components promoted"],
];

const PROBLEMS = [
  ["Which numbers can I trust?", "A bank feed that quietly stopped yesterday still shows a balance. Nothing on screen says it's old."],
  ["Risk hides in volume.", "One fraudulent bank detail change sits among hundreds of routine payments waiting for approval."],
  ["Automation feels unsafe.", "Nobody wants a bot that moves money, and auditors need to know exactly who decided what."],
];

const PERSONAS = [
  { initials: "PS", name: "Priya Shah", role: "Treasury Analyst", body: "Works the exceptions queue, records callbacks, creates and submits payments." },
  { initials: "DO", name: "Daniel Okafor", role: "Group Treasurer", body: "Approves, rejects and releases payments. Books hedges. Can't approve his own." },
  { initials: "ML", name: "Mei Lin", role: "Internal Auditor", body: "Sees every record and the full trail. Has no action buttons at all." },
];

const STEPS = [
  {
    id: "hub",
    label: "Hub",
    path: "/",
    link: "/?as=analyst",
    persona: "Priya",
    image: hub,
    alt: "Hub with USD 4.53B total cash, a stale Crestwood Trust warning, 18 open findings and the group forecast",
    title: "4.5 billion USD, and one feed you shouldn't trust.",
    body: "Crestwood Trust is 26 hours stale. Every total built on it carries a Stale badge, so nobody makes a call on old data without knowing.",
  },
  {
    id: "exceptions",
    label: "Exceptions",
    path: "/exceptions",
    link: "/exceptions?as=analyst&f=pr-pay-s1-orchard",
    persona: "Priya",
    image: exceptions,
    alt: "Exceptions queue with a critical finding, its reasons, evidence chips and agent trace",
    title: "The agent shows its working.",
    body: "Orchard Packaging changed bank details two days before a 1.84M payment. Each finding lists plain reasons, the records behind them and every step the agent took.",
  },
  {
    id: "payments",
    label: "Approval",
    path: "/payments",
    link: "/payments?as=treasurer&p=pay-s1-orchard",
    persona: "Daniel",
    image: payments,
    alt: "Payment drawer where Approve is disabled with the reason: open critical finding",
    title: "Approve is off, and it says why.",
    body: "Daniel can't approve while a critical finding is open. Priya records the callback as not confirmed and the payment rejects itself.",
  },
  {
    id: "forecast",
    label: "Forecast",
    path: "/forecast",
    link: "/forecast?as=analyst&entity=ent-br",
    persona: "Priya",
    image: forecast,
    alt: "13 week forecast for Brazil dropping below its minimum balance in week 6, with a drivers waterfall",
    title: "Brazil runs short in week 6.",
    body: "The forecast agent spots the breach and recommends an exact BRL top up. Accepting it creates a draft funding payment, never a transfer.",
  },
  {
    id: "fx",
    label: "FX",
    path: "/fx",
    link: "/fx?as=analyst",
    persona: "Priya",
    image: fx,
    alt: "FX exposure screen with hedge coverage per currency against a 70 percent target",
    title: "EUR is 48% hedged. Policy says 60 to 80.",
    body: "The agent sizes a forward to reach 70%. Priya raises the hedge request and a second person has to book it.",
  },
  {
    id: "audit",
    label: "Audit",
    path: "/audit",
    link: "/audit?as=auditor",
    persona: "Mei",
    image: audit,
    alt: "Audit log listing actor, action, target and details for every event, with filters and CSV export",
    title: "Who did what, and why.",
    body: "Mei filters today's trail. Every agent finding and every human decision, append only, exportable to CSV.",
  },
];

const AGENTS = [
  ["Payment Risk", "Watches payments waiting for approval.", "Bank details changed 2 days ago. Critical. Hold and verify by callback."],
  ["Reconciliation", "Matches bank lines to open invoices.", "107 matched, 3 short pays with deduction cases, 14 bank fees, 8 exceptions."],
  ["Cash Forecast", "Projects 13 weeks per entity, base and stress.", "Brazil breaches its minimum in week 6. Fund it with an exact BRL amount."],
  ["FX Exposure", "Compares 90 day exposure to hedges.", "EUR only 48% hedged against policy. Book a forward to reach 70%."],
];

const A11Y = [
  "Skip link, landmarks, one h1 per route and focus moved to it on navigation",
  "Drawers and modals trap focus, close on Escape and hand focus back",
  "Every chart has a text takeaway and a View as table toggle",
  "Severity always has a label and an icon, never color alone",
  "One polite live region, throttled so the live feed never floods a screen reader",
  "Reduced motion respected throughout",
];

function Showcase() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#eeebfa_0%,#d9d2f2_55%,#c3b7e8_100%)] px-5 pt-10 sm:px-12 md:pt-14">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#8f7cf0]/30 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative max-w-xl">
          <p className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[#1f1745] md:text-4xl">
            Agents flag the risk. People make every call that moves money.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#3d3760]">
            A working treasury hub for a fictional global consumer goods group. Bank, ERP and FX data
            update live, and every decision is audited.
          </p>
        </div>
        <motion.div
          className="relative mt-10"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-h-[30rem] overflow-hidden rounded-t-xl md:max-h-[34rem]">
            <BrowserShot src={hub} alt="Treasury Command Center hub" eager className="rounded-b-none" />
          </div>
          <motion.div
            className="absolute -bottom-0 right-2 hidden w-72 rounded-xl border border-[#f5d08a] bg-[#fffaeb] p-4 shadow-[0_24px_50px_-20px_rgba(40,28,105,0.55)] sm:block md:right-6 md:top-24 md:bottom-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b54708]">Critical finding</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-[#7a2e0e]">
              Bank details changed 2 days before a USD 1.84M payment
            </p>
            <p className="mt-1.5 text-sm leading-snug text-[#93370d]">Approve is unavailable until a callback is recorded.</p>
          </motion.div>
        </motion.div>
      </div>
    </Reveal>
  );
}

const PROTO_LINKS = [
  ["Take the 6 step tour", "#/?tour=1&as=analyst", "Two minutes, guided"],
  ["Open the fraud finding", "#/exceptions?as=analyst&f=pr-pay-s1-orchard", "As Priya, the analyst"],
  ["Try to approve it", "#/payments?as=treasurer&p=pay-s1-orchard", "As Daniel, the treasurer"],
];

function Prototype({ url }) {
  return (
    <Reveal className="mt-16">
      <div className="grid gap-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the clickable prototype in a new tab"
          className="group relative block overflow-hidden rounded-xl border border-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-sage)]"
        >
          <img src={exceptions} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
          <span className="absolute inset-0 flex items-center justify-center bg-[#1f1745]/0 transition-colors duration-300 group-hover:bg-[#1f1745]/35">
            <span className="translate-y-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1f1745] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Open prototype ↗
            </span>
          </span>
        </a>
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-sage)]">Clickable prototype</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--color-paper)] md:text-3xl">
            Click through the real thing.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-paper-dim)]">
            Every screen works with live data. Switch user in the bottom left to see what each role can do.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-5 py-2.5 text-base font-medium text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
          >
            Open the prototype ↗
          </a>
        </div>
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {PROTO_LINKS.map(([label, hash, note]) => (
              <li key={label}>
                <a href={url + hash} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-3">
                  <span>
                    <span className="block text-base text-[var(--color-paper)] group-hover:text-[var(--color-sage-bright)]">{label}</span>
                    <span className="block text-sm text-[var(--color-paper-mute)]">{note}</span>
                  </span>
                  <span aria-hidden="true" className="text-[var(--color-paper-mute)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-sage-bright)]">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function MetaGrid() {
  return (
    <Reveal className="mt-16">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[var(--color-border)] py-8 md:grid-cols-4">
        {META.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">{k}</dt>
            <dd className="mt-2 text-base text-[var(--color-paper)]">{v}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function Problems() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {PROBLEMS.map(([title, body], i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        >
          <span className="font-[family-name:var(--font-display)] text-sm text-[var(--color-sage)]">0{i + 1}</span>
          <p className="mt-3 text-lg font-medium text-[var(--color-paper)]">{title}</p>
          <p className="mt-2 text-base leading-relaxed text-[var(--color-paper-mute)]">{body}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Personas() {
  return (
    <Reveal className="mt-10">
      <div className="grid gap-4 md:grid-cols-3">
        {PERSONAS.map((p) => (
          <div key={p.name} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9e5fb] font-[family-name:var(--font-display)] text-base text-[#3b2c8a]">
                {p.initials}
              </span>
              <div>
                <p className="text-base font-medium text-[var(--color-paper)]">{p.name}</p>
                <p className="text-sm text-[var(--color-paper-mute)]">{p.role}</p>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-paper-dim)]">{p.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Agents() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {AGENTS.map(([name, watches, example], i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        >
          <p className="text-lg font-medium text-[var(--color-paper)]">{name}</p>
          <p className="mt-1 text-sm text-[var(--color-paper-mute)]">{watches}</p>
          <p className="mt-5 border-l-2 border-[var(--color-sage-dim)] pl-4 text-base leading-relaxed text-[var(--color-paper-dim)]">
            "{example}"
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function Stats() {
  return (
    <Reveal className="mt-10">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-4">
        {STATS.map(([n, label]) => (
          <div key={label} className="bg-[var(--color-surface)] p-6">
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="block font-[family-name:var(--font-display)] text-4xl text-[var(--color-paper)]">{n}</span>
              <span className="mt-2 block text-sm text-[var(--color-paper-mute)]">{label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export default function TCC() {
  return (
    <CaseStudyLayout project={project}>
      <Showcase />
      <MetaGrid />
      <Prototype url={project.liveUrl} />

      <Section eyebrow="The problem" title="Treasury runs on trust">
        <p>
          A group treasury team runs cash for a dozen entities across five banks. Every morning they
          rebuild the picture from bank portals, an ERP extract and a rates screen. I wanted to design
          the tool I'd want in that seat, and to prove agents can help there without ever touching
          the money.
        </p>
      </Section>
      <Problems />

      <Section eyebrow="Users" title="Three roles, one rule">
        <p>
          The rule is separation of duties. Whoever makes a payment can't approve it, and the auditor
          can see everything but change nothing. Switching user in the bottom left of the app changes
          what each person is allowed to do, and the UI always says why something is off limits.
        </p>
      </Section>
      <Personas />

      <Section eyebrow="Walkthrough" title="The two minute story">
        <p>
          The demo is built around six moments a treasurer would recognise. The app has a guided tour
          that walks the same path. Step through it here.
        </p>
      </Section>
      <Walkthrough steps={STEPS} />

      <Section eyebrow="Agents" title="Agents that show their working">
        <p>
          Each agent is a pure function: same data in, same findings out. Every finding carries plain
          reasons, the records behind them, a confidence score and a trace of each step. Accepting a
          recommendation creates a draft, a hedge request or a confirmed match. A person with the
          right role does the rest.
        </p>
      </Section>
      <Agents />

      <Section eyebrow="Controls" title="Bank grade by default">
        <p>
          Maker and checker approvals, blocking findings, callback checks and an append only audit
          trail. Data freshness is part of every number: when a feed misses its window, everything
          built on it is marked stale until someone retries the sync or uploads a statement.
        </p>
      </Section>
      <ApprovalFlow />
      <Reveal className="mt-10">
        <BrowserShot src={audit} alt="Audit log with filters and CSV export" url="gurneyk.github.io/TCC/#/audit" />
        <p className="mt-4 text-base leading-relaxed text-[var(--color-paper-mute)]">
          The audit log, viewed as Mei. Overnight agent runs, submissions and approvals, all filterable
          and exportable.
        </p>
      </Reveal>

      <Section eyebrow="Accessibility" title="WCAG 2.2 AA from the first screen">
        <p>
          Finance tools get used all day, often by keyboard. Accessibility was a requirement from
          screen one, and Playwright runs axe against every route on every change.
        </p>
        <ul className="grid gap-3 pt-2 sm:grid-cols-2">
          {A11Y.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-snug">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-sage)]" />
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <Stats />

      <Section eyebrow="Design System" title="Built on my Design System">
        <p>
          Every screen is built from my{" "}
          <Link to="/work/h3l-design-system" className="text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4">
            Design System
          </Link>
          , with no new tokens and no raw colors. Many of its components were demos with hardcoded
          data, so I promoted 25 of them with typed props and kept the old data as defaults. Several
          picked up fixes on the way: focus trapping, keyboard rows, a stronger focus outline and
          contrast. Each change is logged, ready to go back into the system.
        </p>
      </Section>

      <Section eyebrow="Try it" title="Use it right here">
        <p>
          This is the real app, not a recording. Switch user in the bottom left, press Start tour in the
          banner, or import the sample bank statement on Data sources. Reset data puts everything back.
        </p>
      </Section>
      <Reveal className="mt-10">
        <div className="hidden md:block">
          <DesktopFrame src={project.liveUrl} title="Treasury Command Center live demo" designHeight={900} label="gurneyk.github.io/TCC" />
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full border border-[var(--color-sage-dim)] px-5 py-2 text-base text-[var(--color-sage-bright)] md:hidden"
        >
          Open the live demo ↗
        </a>
        <p className="mt-3 text-sm text-[var(--color-paper-mute)] md:hidden">Best on a laptop or desktop screen.</p>
      </Reveal>

      <Section eyebrow="Next" title="What I'd do next">
        <p>
          Run a full screen reader pass by hand, add a command palette for power users, and build an
          Ask Treasury assistant that answers questions with citations back to the same records the
          agents use. The open question I'd take to a real compliance team: should escalating a
          critical finding unblock approval, or should it stay blocked until compliance clears it?
        </p>
        <p className="text-base text-[var(--color-paper-mute)]">
          Concept project. Every company, bank, person and number is fictional.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
