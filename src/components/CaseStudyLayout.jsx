import { Children, isValidElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./Footer.jsx";
import ScrollRail from "./ScrollRail.jsx";
import { slugify } from "../lib/slugify.js";
import { projects, independentProjects } from "../data/projects.js";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/** Eyebrow label with a short accent line that draws in */
export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent ${className}`}>
      <motion.span
        aria-hidden="true"
        className="block h-px w-8 origin-left bg-[linear-gradient(90deg,var(--accent,var(--color-sage-bright)),var(--color-teal))]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      />
      {children}
    </p>
  );
}

export function Reveal({ children, className = "", id }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

export function Section({ eyebrow, title, children, className = "" }) {
  const id = title ? slugify(title) : undefined;
  return (
    <Reveal id={id} className={`mt-24 scroll-mt-32 first:mt-0 ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
          {title}
        </h2>
      )}
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-[var(--color-paper-dim)]">
        {children}
      </div>
    </Reveal>
  );
}

/** Full-screen viewer so dense screenshots can be read at their real size */
function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={caption || "Enlarged image"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] overflow-y-auto bg-[rgba(8,10,8,0.92)] backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        autoFocus
        aria-label="Close"
        className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white/15 sm:right-6 sm:top-6"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="mx-auto flex min-h-full max-w-[1500px] flex-col items-center justify-center px-4 py-16 sm:px-10">
        <motion.img
          src={src}
          alt={caption || ""}
          initial={{ scale: 0.97, y: 8 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          className="h-auto w-auto max-w-full rounded-lg shadow-2xl"
        />
        {caption && (
          <p onClick={(e) => e.stopPropagation()} className="mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/70">
            {caption}
          </p>
        )}
      </div>
    </motion.div>,
    document.body
  );
}

export function Figure({ src, caption, size = "default" }) {
  const [open, setOpen] = useState(false);
  const widths = {
    default: "",
    narrow: "mx-auto max-w-md",
    wide: "",
  };
  return (
    <Reveal className="mt-10">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image${caption ? ": " + caption : ""}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-left shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--accent,var(--color-sage))_55%,transparent)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${widths[size]}`}
      >
        <img src={src} alt={caption || ""} className="w-full" loading="lazy" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          View full size
        </span>
      </button>
      {caption && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-paper-mute)]">{caption}</p>
      )}
      <AnimatePresence>{open && <Lightbox src={src} caption={caption} onClose={() => setOpen(false)} />}</AnimatePresence>
    </Reveal>
  );
}

export function FigureGrid({ children }) {
  return <div className="mt-10 grid gap-8 sm:grid-cols-2">{children}</div>;
}

function collectSections(children) {
  const sections = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Section && child.props.title) {
      sections.push({ id: slugify(child.props.title), label: child.props.title });
    }
  });
  return sections;
}

/** The 20-second version of the case study: problem, what I did, outcome */
function AtAGlance({ glance }) {
  if (!glance) return null;
  const rows = [
    ["The problem", glance.problem],
    ["What I did", glance.did],
    ["Outcome", glance.outcome],
  ];
  const stats = glance.stats || [];
  const hasEstimate = stats.some((s) => s.estimate);
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-surface)_75%,transparent)]">
      <div className="grid md:grid-cols-3">
        {rows.map(([label, text], i) => (
          <div
            key={label}
            className={`p-6 ${i > 0 ? "border-t border-[var(--color-border-soft)] md:border-l md:border-t-0" : ""}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${label === "Outcome" ? "text-accent" : "text-[var(--color-paper-mute)]"}`}>
              {label}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-paper-dim)]">{text}</p>
          </div>
        ))}
      </div>

      {stats.length > 0 && (
        <dl className="grid grid-cols-1 border-t border-[var(--color-border-soft)] sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-baseline gap-3 px-6 py-5 sm:block ${i > 0 ? "border-t border-[var(--color-border-soft)] sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="shrink-0 font-[family-name:var(--font-display)] text-3xl text-accent md:text-4xl">{s.value}</dd>
              <dd className="text-sm leading-snug text-[var(--color-paper-mute)] sm:mt-1.5">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {glance.team && (
        <div className="border-t border-[var(--color-border-soft)] px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">Team & handoff</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-paper-dim)]">{glance.team}</p>
        </div>
      )}

      {hasEstimate && (
        <p className="border-t border-[var(--color-border-soft)] px-6 py-3 text-xs text-[var(--color-paper-mute)]">
          ~ Estimated impact, not a measured result.
        </p>
      )}
    </div>
  );
}

/** Section jump list for screens without the side rail */
function OnThisPage({ sections }) {
  if (sections.length < 3) return null;
  return (
    <details className="group mt-6 rounded-xl border border-[var(--color-border-soft)] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-sm text-[var(--color-paper-dim)] [&::-webkit-details-marker]:hidden">
        <span>
          On this page <span className="text-[var(--color-paper-mute)]">· {sections.length} sections</span>
        </span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <ol className="border-t border-[var(--color-border-soft)] px-5 py-3">
        {sections.map(({ id, label }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                e.currentTarget.closest("details").open = false;
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex gap-3 py-2 text-[15px] text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
            >
              <span className="w-5 shrink-0 text-[var(--color-paper-mute)]">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

/** End-of-page navigation: back to the right list, or straight on to the next project */
function CaseStudyEndNav({ project }) {
  const group = independentProjects.some((p) => p.slug === project.slug) ? independentProjects : projects;
  const section = group === independentProjects ? "side-project" : "work";
  const i = group.findIndex((p) => p.slug === project.slug);
  const next = group[(i + 1) % group.length];

  return (
    <nav aria-label="More work" className="relative mx-auto mt-28 max-w-4xl px-6 md:px-10">
      <div className="grid gap-4 border-t border-[var(--color-border-soft)] pt-10 sm:grid-cols-2">
        <Link
          to="/"
          state={{ section }}
          className="group flex flex-col justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 transition-colors hover:border-[var(--accent,var(--color-sage-bright))]"
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">Back to</span>
          <span className="mt-1 text-lg text-[var(--color-paper)]">
            <span aria-hidden="true" className="mr-2 inline-block transition-transform group-hover:-translate-x-1">←</span>
            {section === "work" ? "All work" : "Independent work"}
          </span>
        </Link>
        {next && next.slug !== project.slug && (
          <Link
            to={`/work/${next.slug}`}
            style={{ "--accent": next.accent }}
            className="group flex flex-col items-end justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 text-right transition-colors hover:border-[var(--accent,var(--color-sage-bright))]"
          >
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-paper-mute)]">Next project</span>
            <span className="mt-1 text-lg text-[var(--color-paper)]">
              {next.name}
              <span aria-hidden="true" className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function CaseStudyLayout({ project, children }) {
  const sections = collectSections(children);

  return (
    <main className="relative pt-32 pb-24" style={{ "--accent": project.accent }}>
      <ScrollRail sections={sections} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent,var(--color-sage))_30%,transparent),transparent)] blur-2xl" />
        <div className="hero-grid" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <Link
          to="/"
          state={{ section: project.backSection || "work" }}
          className="text-sm text-[var(--color-paper-mute)] transition-colors hover:text-[var(--color-sage-bright)]"
        >
          {project.backLabel || "← Back to work"}
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[color-mix(in_oklab,var(--accent,var(--color-sage))_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--accent,var(--color-sage))_8%,transparent)] px-3 py-1 text-sm text-[var(--color-paper-dim)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-[var(--color-paper)] md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 text-xl text-accent">{project.role}</p>
          <p className="mt-1 text-base text-[var(--color-paper-mute)]">{project.dates}</p>

          <div className="mt-8 flex flex-wrap gap-4 text-base">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary rounded-full px-5 py-2 font-medium"
              >
                {project.liveLabel || "View live ↗"}
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-border)] px-5 py-2 text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-sage-bright)] hover:text-[var(--color-sage-bright)]"
              >
                View repo ↗
              </a>
            )}
          </div>

          <AtAGlance glance={project.glance} />
          <OnThisPage sections={sections} />

          {project.mockDataNote && (
            <p className="mt-8 border-l-2 border-[color-mix(in_oklab,var(--accent,var(--color-sage))_60%,transparent)] pl-5 text-base leading-relaxed text-[var(--color-paper-mute)]">
              This is Unilever internal product work. Every company name, submission,
              score, and data point shown here is fictional. The real product runs on
              Unilever's internal and licensed data, which I can't publish.
            </p>
          )}
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 max-w-4xl px-6 md:px-10">{children}</div>

      <CaseStudyEndNav project={project} />

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
