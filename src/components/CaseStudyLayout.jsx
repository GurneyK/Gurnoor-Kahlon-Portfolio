import { Children, isValidElement } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer.jsx";
import ScrollRail from "./ScrollRail.jsx";
import { slugify } from "../lib/slugify.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

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
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-sage)]">
          {eyebrow}
        </p>
      )}
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
        className={`overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] ${widths[size]}`}
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
    <main className="pt-32 pb-24">
      <ScrollRail sections={sections} />
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Link
          to="/#work"
          className="text-sm text-[var(--color-paper-mute)] transition-colors hover:text-[var(--color-sage-bright)]"
        >
          ← Back to work
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-paper-dim)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-[var(--color-paper)] md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 text-xl text-[var(--color-sage-bright)]">{project.role}</p>
          <p className="mt-1 text-base text-[var(--color-paper-mute)]">{project.dates}</p>

          <div className="mt-8 flex flex-wrap gap-4 text-base">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-sage-dim)] px-5 py-2 text-[var(--color-sage-bright)] transition-colors hover:border-[var(--color-sage-bright)] hover:bg-[var(--color-sage-dim)]/30"
              >
                View live ↗
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
            <p className="mt-8 border-l-2 border-[var(--color-sage-dim)] pl-5 text-base leading-relaxed text-[var(--color-paper-mute)]">
              This is Unilever internal product work. Every company name, submission,
              score, and data point shown here is fictional. The real product runs on
              Unilever's internal and licensed data, which I can't publish.
            </p>
          )}
        </Reveal>
      </div>

      <div className="mx-auto mt-20 max-w-4xl px-6 md:px-10">{children}</div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
