import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, className = "" }) {
  return (
    <motion.div
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

export default function CaseStudyLayout({ project, children }) {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
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
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-paper-dim)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl text-[var(--color-paper)] md:text-5xl">
            {project.name}
          </h1>
          <p className="mt-3 text-[var(--color-sage-bright)]">{project.role}</p>
          <p className="mt-1 text-sm text-[var(--color-paper-mute)]">{project.dates}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-sage-dim)] px-4 py-1.5 text-[var(--color-sage-bright)] transition-colors hover:border-[var(--color-sage-bright)] hover:bg-[var(--color-sage-dim)]/30"
              >
                View live ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-sage-bright)] hover:text-[var(--color-sage-bright)]"
              >
                View repo ↗
              </a>
            )}
          </div>

          {project.mockDataNote && (
            <p className="mt-6 border-l-2 border-[var(--color-sage-dim)] pl-4 text-sm text-[var(--color-paper-mute)]">
              This is Unilever internal product work. Everything shown here — company
              names, submissions, scores, data — is fictional. The real product
              runs on Unilever's internal data, which I can't show.
            </p>
          )}
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-6 md:px-10">{children}</div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
