import { Children, isValidElement } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer.jsx";
import ScrollRail from "./ScrollRail.jsx";
import { slugify } from "../lib/slugify.js";

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

export function Figure({ src, caption, size = "default" }) {
  const widths = {
    default: "",
    narrow: "mx-auto max-w-md",
    wide: "",
  };
  return (
    <Reveal className="mt-10">
      <div
        className={`overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--accent,var(--color-sage))_55%,transparent)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${widths[size]}`}
      >
        <img src={src} alt={caption || ""} className="w-full" loading="lazy" />
      </div>
      {caption && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-paper-mute)]">{caption}</p>
      )}
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
          to={project.backTo || "/#work"}
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

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
