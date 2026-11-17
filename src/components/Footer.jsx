import { Link } from "react-router-dom";
import { Reveal } from "./CaseStudyLayout.jsx";

const BASE = import.meta.env.BASE_URL;

export default function Footer({ linkTo = "about" }) {
  const toContact = linkTo === "contact";
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[var(--color-border-soft)] px-6 py-24 md:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 left-1/2 h-[420px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-teal)_22%,transparent),transparent)] blur-2xl" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] text-[var(--color-paper)] md:text-6xl">
            Building something people <span className="text-gradient">need to trust?</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wide text-[var(--color-paper-mute)]">Contact</p>
            <p className="mt-3 max-w-md text-lg text-[var(--color-paper-dim)] leading-relaxed">
              {toContact
                ? "Based in Toronto. Want to work together or just say hi? Head to the"
                : "Based in Toronto. For more on who I am and the work I've done, see the"}{" "}
              <Link
                to={toContact ? "/contact" : "/about"}
                className="text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4"
              >
                {toContact ? "Contact page" : "About page"}
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--color-paper-mute)]">
                Get in touch
              </p>
              <a
                href="mailto:kahlongurnoor1@gmail.com"
                className="link-draw mt-3 inline-block text-xl text-[var(--color-paper)] md:text-2xl"
              >
                kahlongurnoor1@gmail.com
              </a>
            </div>

            <div className="mt-10 flex gap-6 text-sm text-[var(--color-paper-dim)]">
              <a
                href="https://www.linkedin.com/in/gurnoor-kahlon/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--color-sage-bright)]"
              >
                LinkedIn
              </a>
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
            </div>
          </div>
        </div>

        <p className="mt-20 text-xs text-[var(--color-paper-mute)]">
          Gurnoor Kahlon, {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
