import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const SECTION_LINKS = [
  { id: "work", label: "Work" },
  { id: "side-project", label: "Side Project" },
  { id: "about", label: "About" },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 60);
      });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-ink)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-10">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="font-[family-name:var(--font-display)] text-base tracking-tight text-[var(--color-paper)] sm:text-lg"
        >
          Gurnoor Kahlon
        </Link>

        <nav className="hidden items-center gap-8 text-base text-[var(--color-paper-dim)] md:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={goToSection(link.id)}
              className="transition-colors hover:text-[var(--color-sage-bright)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm sm:gap-5 sm:text-base">
          <a
            href="https://www.linkedin.com/in/gurnoor-kahlon/"
            target="_blank"
            rel="noreferrer"
            className="hidden text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-sage-bright)] sm:inline"
          >
            LinkedIn
          </a>
          <a
            href={`${BASE}resume/Gurnoor-Kahlon-Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--color-sage-dim)] px-3 py-1.5 text-[var(--color-sage-bright)] transition-colors hover:border-[var(--color-sage-bright)] hover:bg-[var(--color-sage-dim)]/30 sm:px-4"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] md:hidden"
          >
            <span
              className={`h-px w-4 bg-[var(--color-paper-dim)] transition-transform ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-4 bg-[var(--color-paper-dim)] transition-transform ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-border-soft)] px-4 py-4 text-base text-[var(--color-paper-dim)] md:hidden">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={goToSection(link.id)}
              className="rounded-lg px-2 py-2.5 transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-sage-bright)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/gurnoor-kahlon/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-2 py-2.5 transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-sage-bright)] sm:hidden"
          >
            LinkedIn
          </a>
        </nav>
      )}
    </header>
  );
}
