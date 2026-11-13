import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CaseStudyLayout, { Section, Reveal } from "../components/CaseStudyLayout.jsx";
import PhoneMock from "../components/pagoda/PhoneMock.jsx";
import PhoneRow from "../components/pagoda/PhoneRow.jsx";
import JourneyMap from "../components/pagoda/JourneyMap.jsx";
import { independentProjects } from "../data/projects.js";
import { slugify } from "../lib/slugify.js";

import logoMark from "../assets/pagoda/logo-mark.png";
import categoryScreens from "../assets/pagoda/category-screens.jpg";
import liveScreens from "../assets/pagoda/live-screens.jpg";
import before1 from "../assets/pagoda/before-1.jpg";
import before2 from "../assets/pagoda/before-2.jpg";
import before3 from "../assets/pagoda/before-3.jpg";
import before4 from "../assets/pagoda/before-4.jpg";
import after1 from "../assets/pagoda/onboarding-1.jpg";
import after2 from "../assets/pagoda/onboarding-6.jpg";
import after3 from "../assets/pagoda/onboarding-4.jpg";
import after4 from "../assets/pagoda/onboarding-3.jpg";

const project = independentProjects.find((p) => p.slug === "pagoda-yoga");

const BEFORE_SCREENS = [
  { src: before1, label: "Splash" },
  { src: before2, label: "Free content" },
  { src: before3, label: "Recommendations" },
  { src: before4, label: "Offline" },
];

const AFTER_SCREENS = [
  { src: after1, label: "Welcome" },
  { src: after2, label: "Stream & download" },
  { src: after3, label: "Build your routine" },
  { src: after4, label: "Exclusive classes" },
];

const T = {
  research: "Research & discovery",
  journey: "Mapping the journey",
  visual: "Visual direction",
  testing: "Testing & iteration",
  final: "Final design",
  outcome: "Outcome",
};

const PROCESS = [
  { n: "01", title: "Research & discovery", body: "Competitor review, team surveys, personas.", target: T.research },
  { n: "02", title: "Wireframe & prototype", body: "Journey map and core flows, built with the dev team.", target: T.journey },
  { n: "03", title: "Design testing", body: "Internal usability rounds on onboarding and colour.", target: T.testing },
  { n: "04", title: "Final design", body: "Shipped to the App Store and Google Play.", target: T.final },
];

const META = [
  ["Role", "Sole product designer"],
  ["Platform", "iOS & Android"],
  ["Tools", "Figma, Miro, Vidapp, Canva Pro"],
  ["Timeline", "Nov 2024 to Jan 2025"],
];

const SWATCHES = [
  { hex: "#6A0B8A", role: "Primary", ink: "#fff" },
  { hex: "#F27F1F", role: "Accent", ink: "#fff" },
  { hex: "#E8E4DE", role: "Surface", ink: "#3b3540" },
];

function Showcase() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#f1eaf7_0%,#dccbea_55%,#cdb6e0_100%)] px-6 py-12 sm:px-12 md:py-16">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#f6b98a]/40 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#9b6cc0]/35 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div className="max-w-sm">
            <img src={logoMark} alt="" className="h-14 w-14" />
            <p className="mt-6 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#2d1840] md:text-4xl">
              Calm, simple yoga for people who don't live on their phones.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#4d3d5c]">
              This phone is interactive. Tap through the categories the way a
              member would. The banners are the app's real artwork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-white/70 px-4 py-2 text-[#4d2a66] backdrop-blur">Live on iOS & Android</span>
              <span className="rounded-full bg-white/70 px-4 py-2 text-[#4d2a66] backdrop-blur">Sole designer</span>
            </div>
          </div>
          <motion.div
            initial={{ y: 30, opacity: 0, rotate: 2 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneMock />
          </motion.div>
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

function ProcessStrip() {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS.map((p, i) => (
        <motion.button
          key={p.n}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => document.getElementById(slugify(p.target))?.scrollIntoView({ behavior: "smooth" })}
          className="group flex flex-col items-start justify-start rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left transition-colors hover:border-[#9b6cc0]"
        >
          <span className="font-[family-name:var(--font-display)] text-sm text-[#9b6cc0]">{p.n}</span>
          <p className="mt-3 text-base font-medium text-[var(--color-paper)]">{p.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-paper-mute)]">{p.body}</p>
          <span className="mt-auto pt-4 inline-block text-sm text-[var(--color-paper-mute)] transition-transform group-hover:translate-x-1 group-hover:text-[#9b6cc0]">
            ↓
          </span>
        </motion.button>
      ))}
    </div>
  );
}

function Persona() {
  const cols = [
    ["Goals", ["Short, effective sessions that fit a daily routine.", "Reduce stress and improve overall well-being."]],
    ["Needs", ["A beginner-friendly, easy app interface.", "Reliable video streaming and clear session types."]],
    ["Pain points", ["Overwhelmed by cluttered app interfaces.", "Can't find sessions that fit a limited schedule."]],
  ];
  return (
    <Reveal className="mt-10">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex flex-col gap-5 border-b border-[var(--color-border)] p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#dccbea] font-[family-name:var(--font-display)] text-2xl text-[#4d2a66]">
            ST
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">Primary persona</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)]">
              Sarah Thompson, 42
            </p>
            <p className="mt-1 text-base text-[var(--color-paper-dim)]">
              Working mother in Toronto. Wants to practise at home, on her own time.
            </p>
          </div>
          <p className="font-[family-name:var(--font-display)] text-lg italic text-[#9b6cc0] sm:ml-auto sm:max-w-[200px] sm:text-right">
            "Finding balance in a busy life."
          </p>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
          {cols.map(([title, items]) => (
            <div key={title}>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">{title}</p>
              <ul className="mt-3 space-y-2">
                {items.map((t) => (
                  <li key={t} className="flex gap-2 text-base leading-snug text-[var(--color-paper-dim)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9b6cc0]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function VisualDirection() {
  const [copied, setCopied] = useState(null);
  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Reveal className="mt-10">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="grid grid-cols-3 gap-3">
          {SWATCHES.map((s, i) => (
            <motion.button
              key={s.hex}
              onClick={() => copy(s.hex)}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex aspect-[3/4] flex-col justify-end rounded-2xl p-4 text-left shadow-sm"
              style={{ background: s.hex, color: s.ink }}
              aria-label={`Copy ${s.role} colour ${s.hex}`}
            >
              <span className="text-xs uppercase tracking-[0.16em] opacity-80">{s.role}</span>
              <span className="mt-1 font-mono text-sm">{copied === s.hex ? "Copied" : s.hex}</span>
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">Headings</p>
            <p className="mt-2 text-4xl text-[var(--color-paper)]" style={{ fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700 }}>
              Rethink Sans
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">Body</p>
            <p className="mt-2 text-2xl text-[var(--color-paper-dim)]" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Work Sans Regular
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-base text-[var(--color-paper-mute)]">
        Purple and orange come straight from the lotus logo. The warm stone
        surface keeps long video lists from feeling clinical. Tap a swatch to copy it.
      </p>
    </Reveal>
  );
}

function BeforeAfter() {
  const [view, setView] = useState("after");
  const changes = {
    before: [
      "Four screens built around cut-out illustrations on pink blobs.",
      "Green buttons that didn't belong to the brand.",
      "Benefits described in paragraphs, with no product shown.",
    ],
    after: [
      "Brand purple throughout, with a Skip button on every step.",
      "Each step previews the real screen it's describing.",
      "Short checklists instead of paragraphs, plus a real intro to the instructor.",
    ],
  };

  return (
    <Reveal className="mt-10">
      <div role="tablist" aria-label="Onboarding version" className="relative inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
        {[
          ["before", "Before testing"],
          ["after", "After testing"],
        ].map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={view === id}
            onClick={() => setView(id)}
            className={`relative z-10 rounded-full px-5 py-2 text-sm transition-colors ${
              view === id ? "text-white" : "text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]"
            }`}
          >
            {view === id && (
              <motion.span
                layoutId="pagoda-ba-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[#7b3fa0]"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <PhoneRow screens={view === "before" ? BEFORE_SCREENS : AFTER_SCREENS} variant={view} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {changes[view].map((c) => (
              <li key={c} className="border-l-2 border-[#9b6cc0] pl-4 text-base leading-relaxed text-[var(--color-paper-dim)]">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </Reveal>
  );
}

function Principles() {
  const items = [
    ["Simplicity", "A calm interface with nothing extra on screen."],
    ["Personalization", "Schedule classes and keep track of your practice."],
    ["Community", "A simple space for members to talk and share progress."],
    ["Accessibility", "Chair yoga and gentle flows, so every level has a way in."],
  ];
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map(([t, d], i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.07 }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
        >
          <p className="text-base font-medium text-[var(--color-paper)]">{t}</p>
          <p className="mt-1.5 text-base leading-relaxed text-[var(--color-paper-dim)]">{d}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ScreensFigure({ src, caption }) {
  return (
    <Reveal className="mt-10">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white px-4 py-6 sm:px-10 sm:py-10">
        <img src={src} alt={caption} loading="lazy" className="mx-auto w-full max-w-3xl" />
      </div>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-paper-mute)]">{caption}</p>
    </Reveal>
  );
}

export default function PagodaYoga() {
  return (
    <CaseStudyLayout project={project}>
      <Showcase />
      <MetaGrid />

      <Section eyebrow="Overview" title="The brief">
        <p>
          Pagoda Yoga had a loyal YouTube audience and no product of its own.
          The goal was a subscription app for chair and mat yoga, Pilates and
          meditation, aimed mostly at women aged 30 to 55 who want to practise
          at home. I was the only designer on the team, so I owned every
          decision from research to the screens that shipped.
        </p>
      </Section>
      <ProcessStrip />

      <Section eyebrow="01 · Research" title={T.research}>
        <p>
          I studied Boho Beautiful and Yoga with Kassandra to see what this
          audience already trusted. The team ran surveys that confirmed who
          we were designing for. The pattern was clear: these users don't
          want more features. They want less friction between opening the
          app and starting a class.
        </p>
        <p>
          Beyond the primary persona I designed for new yogis, Pilates and
          meditation fans, and chair-yoga members with limited mobility.
        </p>
      </Section>
      <Persona />

      <Section eyebrow="02 · Wireframe & prototype" title={T.journey}>
        <p>
          I mapped how someone discovers, tries and sticks with the app. The
          biggest dips were exploring the content and fitting practice into
          a busy week, so onboarding and retention became the focus of the
          wireframes I built with the development team.
        </p>
      </Section>
      <Reveal className="mt-10">
        <JourneyMap />
      </Reveal>

      <Section eyebrow="Brand" title={T.visual}>
        <p>
          The visuals had to feel calming and familiar to an audience that
          isn't always comfortable with technology: soft contrast, generous
          type and one clear accent for actions.
        </p>
      </Section>
      <VisualDirection />

      <Section eyebrow="03 · Testing" title={T.testing}>
        <p>
          We couldn't recruit outside testers, so I ran internal usability
          rounds with the development team. The feedback centred on
          onboarding and the colour scheme. The first version explained the
          app. The second shows it. Switch
          between the two versions to compare.
        </p>
      </Section>
      <BeforeAfter />

      <Section eyebrow="04 · Ship" title={T.final}>
        <p>
          The shipped app keeps every category one tap away, keeps video front
          and centre, and keeps scheduling, playlists and community in a
          fixed bottom bar.
        </p>
      </Section>
      <Principles />
      <ScreensFigure
        src={categoryScreens}
        size="wide"
        caption="Fitness, Meditation and Pilates in the live app. Each category gets the same banner, the same Items and Comments tabs, and the same list rhythm, so learning one teaches you all of them."
      />
      <ScreensFigure
        src={liveScreens}
        size="wide"
        caption="Home, notifications and the side menu in production. Notifications double as gentle daily motivation, which answers the 'losing motivation' dip from the journey map."
      />

      <Section eyebrow="Outcome" title={T.outcome}>
        <p>
          The app launched on iOS and Android, and members praised how easy it
          was to use and how smoothly Pagoda Yoga's content carried over. It's
          still live today.
        </p>
        <p>
          The main lesson: even limited feedback is worth chasing. With an
          audience that isn't always confident with technology, every extra
          step in onboarding costs you people. Next time I'd push to get real
          members into testing earlier.
        </p>
      </Section>
    </CaseStudyLayout>
  );
}
