import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--color-border-soft)] px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] md:text-4xl">
              Contact
            </h2>
            <p className="mt-6 max-w-md text-lg text-[var(--color-paper-dim)] leading-relaxed">
              Based in Toronto. For more on who I am and the work I've done,
              see the{" "}
              <Link
                to="/about"
                className="text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4"
              >
                About page
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
                className="mt-3 block text-xl text-[var(--color-paper)] transition-colors hover:text-[var(--color-sage-bright)]"
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
