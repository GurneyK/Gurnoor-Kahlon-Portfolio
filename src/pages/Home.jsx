import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollRail from "../components/ScrollRail.jsx";
import Footer from "../components/Footer.jsx";
import KeywordMarquee from "../components/KeywordMarquee.jsx";
import AskMeAnything from "../components/AskMeAnything.jsx";
import { Reveal } from "../components/CaseStudyLayout.jsx";
import { projects, sideProject, independentProjects } from "../data/projects.js";
import pagodaOnboarding from "../assets/pagoda/onboarding-3.jpg";
import pagodaLogo from "../assets/pagoda/logo-mark.png";
import tccHub from "../assets/tcc/hub.png";

const BASE = import.meta.env.BASE_URL;

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
        className="group grid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-sage-dim)] md:grid-cols-[1fr_1.05fr]"
      >
        <div className="flex flex-col justify-between p-7 md:p-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-display)] text-base text-[var(--color-paper-mute)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {visual?.logo && <img src={visual.logo} alt="" className="h-7 w-7" />}
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-sage-bright)] md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-paper-dim)]">{project.summary}</p>
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="text-sm text-[var(--color-paper-mute)]">
              {project.tags.join(" · ")} · {project.role}
            </span>
            <span className="shrink-0 text-xl text-[var(--color-sage)] transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
        {Visual && <Visual />}
      </Link>
    </Reveal>
  );
}

function ProjectRow({ project, index }) {
  return (
    <Reveal>
      <Link
        to={`/work/${project.slug}`}
        className={`group block border-b border-[var(--color-border-soft)] py-14 transition-colors ${
          index === 0 ? "pt-0" : ""
        }`}
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-baseline gap-6">
            <span className="font-[family-name:var(--font-display)] text-base text-[var(--color-paper-mute)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-sage-bright)] md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-sm text-[var(--color-paper-mute)]">
                    {tag}
                    {" · "}
                  </span>
                ))}
                <span className="text-sm text-[var(--color-paper-mute)]">{project.role}</span>
              </div>
            </div>
          </div>
          <span className="shrink-0 self-start text-xl text-[var(--color-sage)] transition-transform group-hover:translate-x-1 md:self-center">
            →
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
          className="flex min-h-screen flex-col justify-center px-6 pt-24 md:px-10"
        >
          <div className="mx-auto w-full max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm uppercase tracking-[0.2em] text-[var(--color-sage)]"
            >
              Design Engineer &middot; Toronto
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-[1.1] text-[var(--color-paper)] sm:text-5xl md:text-6xl"
            >
              I design the interface between people and the AI products
              they're asked to trust.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
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
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full bg-[var(--color-sage-dim)] px-6 py-3 text-base text-[var(--color-paper)] transition-colors hover:bg-[var(--color-sage)]"
              >
                See the work
              </a>
              <Link
                to="/about"
                className="rounded-full border border-[var(--color-border)] px-6 py-3 text-base text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-sage-bright)] hover:text-[var(--color-sage-bright)]"
              >
                About
              </Link>
            </motion.div>
          </div>
        </section>

        <KeywordMarquee />

        <AskMeAnything />

        <section id="work" className="px-6 py-32 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
                Work
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-paper-dim)]">
                Five products. The screenshots and the repos carry most of
                this. The writing is for the parts you can't see in a
                screenshot: why I made the calls I made.
              </p>
            </Reveal>
            <div className="mt-14">
              {projects.map((project, index) => (
                <ProjectRow key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="side-project" className="border-t border-[var(--color-border-soft)] px-6 py-32 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-sage)]">
                Independent Work
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
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
              <p className="font-[family-name:var(--font-display)] text-base text-[var(--color-paper-mute)]">
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
                Below: the actual site, teaser, and deck for Dealigence, an
                AI negotiation-practice platform I built with this toolkit
                during my time at Horizon 3 Labs, Unilever's AI innovation
                lab. Same toolkit, same session, no manual editing after the
                fact, three assets, one hour, zero feedback rounds.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
                  <span className="ml-3 text-xs text-[var(--color-paper-mute)]">
                    dealigence-website.html
                  </span>
                </div>
                <iframe
                  src={`${BASE}dealigence/dealigence-website.html`}
                  title="Dealigence website demo"
                  className="h-[380px] w-full bg-white sm:h-[520px]"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-base">
                <a
                  href={`${BASE}dealigence/dealigence-final.mp4`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-paper-dim)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:text-[var(--color-sage-bright)]"
                >
                  Open showcased teaser ↗
                </a>
                <a
                  href={`${BASE}dealigence/dealigence-deck.html`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-paper-dim)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:text-[var(--color-sage-bright)]"
                >
                  Open pitch deck ↗
                </a>
                <a
                  href={`${BASE}dealigence/dealigence-walkthrough.html`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-paper-dim)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:text-[var(--color-sage-bright)]"
                >
                  Watch the full team walkthrough ↗
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
