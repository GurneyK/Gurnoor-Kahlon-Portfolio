import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollRail from "../components/ScrollRail.jsx";
import Footer from "../components/Footer.jsx";
import KeywordMarquee from "../components/KeywordMarquee.jsx";
import AskMeAnything from "../components/AskMeAnything.jsx";
import { Reveal, Eyebrow } from "../components/CaseStudyLayout.jsx";
import { trackSpot } from "../lib/spotlight.js";
import { projects, sideProject, independentProjects } from "../data/projects.js";
import pagodaOnboarding from "../assets/pagoda/onboarding-3.jpg";
import pagodaLogo from "../assets/pagoda/logo-mark.png";
import tccHub from "../assets/tcc/hub.png";

const BASE = import.meta.env.BASE_URL;
const EASE = [0.22, 1, 0.36, 1];

/** Headline that rises in word by word; the last words carry the gradient */
function Headline({ text, highlight }) {
  const all = [...text.split(" ").map((w) => [w, false]), ...highlight.split(" ").map((w) => [w, true])];
  return (
    <h1
      aria-label={`${text} ${highlight}`}
      className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-[1.08] text-[var(--color-paper)] sm:text-5xl md:text-[4.25rem]"
    >
      {all.map(([w, isLit], i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className={`inline-block ${isLit ? "text-gradient" : ""}`}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.045 }}
          >
            {w}
          </motion.span>
          {i < all.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </h1>
  );
}

function PagodaVisual() {
  return (
    <div className="relative h-full overflow-hidden bg-[linear-gradient(145deg,#f1eaf7_0%,#dccbea_60%,#cdb6e0_100%)]">
      <img
        src={pagodaOnboarding}
        alt="Pagoda Yoga onboarding screen"
        loading="lazy"
        className="aspect-square h-full w-full object-cover mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
    </div>
  );
}

function TccVisual() {
  return (
    <div className="relative aspect-square h-full overflow-hidden bg-[linear-gradient(150deg,#eeebfa_0%,#d9d2f2_55%,#c3b7e8_100%)]">
      <img
        src={tccHub}
        alt="Treasury Command Center hub showing total cash, a stale feed warning and the 13 week forecast"
        loading="lazy"
        className="absolute left-[9%] top-[13%] w-[165%] max-w-none origin-top-left rounded-lg border border-white/80 shadow-[0_30px_60px_-24px_rgba(40,28,105,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[3%] group-hover:-translate-y-[2%]"
      />
      <div className="absolute bottom-[9%] left-[6%] flex max-w-[78%] items-start gap-2.5 rounded-xl border border-[#f5d08a] bg-[#fffaeb] px-4 py-3 text-left shadow-[0_18px_40px_-18px_rgba(40,28,105,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#b54708]" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <p className="text-sm leading-snug text-[#7a2e0e]">
          <span className="font-semibold">Approve is unavailable.</span> Bank details changed 2 days before a USD 1.84M payment.
        </p>
      </div>
    </div>
  );
}

const INDEPENDENT_VISUALS = {
  "pagoda-yoga": { Visual: PagodaVisual, logo: pagodaLogo },
  tcc: { Visual: TccVisual },
};

function IndependentCard({ project, index }) {
  const visual = INDEPENDENT_VISUALS[project.slug];
  const Visual = visual?.Visual;
  return (
    <Reveal>
      <Link
        to={`/work/${project.slug}`}
        onMouseMove={trackSpot}
        style={{ "--accent": project.accent }}
        className="spotlight group grid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_45%,var(--color-border))] hover:shadow-[0_40px_90px_-45px_color-mix(in_oklab,var(--accent)_70%,transparent)] md:grid-cols-[1fr_1.05fr]"
      >
        <div className="flex flex-col justify-between p-7 md:p-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-display)] text-base text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              {visual?.logo && <img src={visual.logo} alt="" className="h-7 w-7" />}
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-paper-dim)]">{project.summary}</p>
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="text-sm text-[var(--color-paper-mute)]">
              {project.tags.join(" · ")} · {project.role}
            </span>
            <Arrow />
          </div>
        </div>
        {Visual && <Visual />}
      </Link>
    </Reveal>
  );
}

function Arrow() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper-dim)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-[#0b0d0b]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function ProjectRow({ project, index }) {
  return (
    <Reveal>
      <Link
        to={`/work/${project.slug}`}
        onMouseMove={trackSpot}
        style={{ "--accent": project.accent }}
        className="spotlight group relative block overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)] p-6 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_40%,var(--color-border))] sm:p-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-6 left-0 w-[3px] origin-top scale-y-0 rounded-r-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="font-[family-name:var(--font-display)] text-base text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-[var(--color-paper-dim)]">{project.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[color-mix(in_oklab,var(--accent)_13%,transparent)] px-3 py-1 text-xs font-medium text-[var(--color-paper-dim)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-[var(--color-paper-mute)]">{project.role}</p>
            </div>
          </div>
          <span className="self-end sm:self-center">
            <Arrow />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <ScrollRail />
      <main>
        <section
          id="hero"
          className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
        >
          <div aria-hidden="true" className="aurora">
            <span className="a1" />
            <span className="a2" />
            <span className="a3" />
          </div>
          <div aria-hidden="true" className="hero-grid" />
          <div className="relative mx-auto w-full max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-surface)_70%,transparent)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-paper-dim)] backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-teal)] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-teal)]" />
              </span>
              Design Engineer &middot; Toronto
            </motion.p>
            <Headline
              text="I design the interface between people and the products they're"
              highlight="asked to trust."
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--color-paper-dim)]"
            >
              Currently the design lead for Horizon 3 Labs, Unilever's AI
              innovation lab. Before that, fintech and logistics products
              where the interface had to earn people's trust with their money
              and their shipments, not just their attention.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary rounded-full px-6 py-3 text-base font-medium"
              >
                See the work
              </a>
              <Link
                to="/about"
                className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)] px-6 py-3 text-base text-[var(--color-paper-dim)] backdrop-blur transition-colors hover:border-[var(--color-sage-bright)] hover:text-[var(--color-paper)]"
              >
                About
              </Link>
            </motion.div>
          </div>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
          >
            <span className="block h-12 w-px overflow-hidden bg-[var(--color-border)]">
              <span className="block h-1/2 w-px animate-[scrollcue_2.2s_ease-in-out_infinite] bg-[var(--color-sage-bright)] motion-reduce:animate-none" />
            </span>
          </motion.div>
        </section>

        <KeywordMarquee />

        <AskMeAnything />

        <section id="work" className="px-6 py-32 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-5xl">
                Work
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
                Five products. The screenshots and the repos carry most of
                this. The writing is for the parts you can't see in a
                screenshot: why I made the calls I made.
              </p>
            </Reveal>
            <div className="mt-14 space-y-4">
              {projects.map((project, index) => (
                <ProjectRow key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="side-project" className="border-t border-[var(--color-border-soft)] px-6 py-32 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Eyebrow>Independent Work</Eyebrow>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-5xl">
                Outside the day job
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
                Things I've designed and built on my own, end to end.
              </p>
            </Reveal>

            <div className="mt-14 space-y-8">
              {independentProjects.map((p, i) => (
                <IndependentCard key={p.slug} project={p} index={i} />
              ))}
            </div>

            <Reveal className="mt-20">
              <p className="font-[family-name:var(--font-display)] text-base text-[var(--color-amber)]">
                {String(independentProjects.length + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
                {sideProject.name}
              </h3>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
                {sideProject.summary} No editor, no timeline, no render farm.
                I built it because I got tired of the gap between having an
                idea for a teaser or a deck and having the two hours it
                usually takes to make one.
              </p>
              <a
                href={sideProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block text-base text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4"
              >
                View the repo ↗
              </a>
            </Reveal>

            <Reveal className="mt-14">
              <p className="text-base text-[var(--color-paper-mute)]">
                Below: a short teaser I made with this toolkit during my time
                at Horizon 3 Labs, for an internal product called Dealigence.
                One prompt, one session, no editing after the fact.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_40px_90px_-50px_color-mix(in_oklab,var(--color-amber)_70%,transparent)]">
                <video
                  src={`${BASE}dealigence/dealigence-final.mp4`}
                  poster={`${BASE}dealigence/dealigence-poster.jpg`}
                  controls
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full bg-black"
                  aria-label="Dealigence teaser video"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
