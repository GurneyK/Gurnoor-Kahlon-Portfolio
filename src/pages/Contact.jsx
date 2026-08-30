import { Link } from "react-router-dom";
import { Reveal } from "../components/CaseStudyLayout.jsx";
import Footer from "../components/Footer.jsx";
import profilePhoto from "../assets/profile.jpg";

const BASE = import.meta.env.BASE_URL;

function ProfilePhoto() {
  return (
    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] sm:h-24 sm:w-24">
      <img
        src={profilePhoto}
        alt="Gurnoor Kahlon"
        className="h-full w-full object-cover"
        style={{ objectPosition: "50% 32%", transform: "scale(1.35)", transformOrigin: "50% 32%" }}
      />
    </div>
  );
}

export default function Contact() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <ProfilePhoto />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-sage)]">Contact</p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] sm:text-4xl">
              Let's connect
            </h1>
          </div>
        </Reveal>

        <Reveal className="mt-10 space-y-5 text-lg leading-relaxed text-[var(--color-paper-dim)]">
          <p>
            I'm <span className="text-[var(--color-paper)]">Gurnoor Kahlon</span>, a
            design engineer based in Toronto, currently the design lead for{" "}
            <span className="text-[var(--color-paper)]">Horizon 3 Labs</span>, Unilever's
            AI innovation lab. I design and build interfaces for AI products,
            with a background spanning fintech and logistics before that. More
            on the work is on the{" "}
            <Link
              to="/about"
              className="text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4"
            >
              About page
            </Link>
            .
          </p>
          <p>
            I'm always glad to hear from people working on AI products, design
            systems, or anything where the two intersect, whether that's a
            role, a project, or just a good conversation. Email or LinkedIn
            are the fastest ways to reach me.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:kahlongurnoor1@gmail.com"
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-sage-bright)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-sage-dim)] text-[var(--color-sage-bright)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--color-paper-mute)]">Email</p>
              <p className="mt-2 text-lg text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-sage-bright)]">
                kahlongurnoor1@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/gurnoor-kahlon/"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-sage-bright)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-sage-dim)] text-[var(--color-sage-bright)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--color-paper-mute)]">LinkedIn</p>
              <p className="mt-2 text-lg text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-sage-bright)]">
                in/gurnoor-kahlon ↗
              </p>
            </div>
          </a>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--color-paper-dim)]">
          <a
            href={`${BASE}resume/Gurnoor-Kahlon-Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[var(--color-sage-bright)]"
          >
            Resume
          </a>
          <a
            href="https://github.com/GurneyK"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[var(--color-sage-bright)]"
          >
            GitHub
          </a>
        </Reveal>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
