import { Link, useNavigate, useLocation } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => (e) => {
    e.preventDefault();
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-ink)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--color-paper)]"
        >
          Gurnoor Kahlon
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[var(--color-paper-dim)] md:flex">
          <a href="#work" onClick={goToSection("work")} className="transition-colors hover:text-[var(--color-sage-bright)]">
            Work
          </a>
          <a href="#side-project" onClick={goToSection("side-project")} className="transition-colors hover:text-[var(--color-sage-bright)]">
            Side Project
          </a>
          <a href="#about" onClick={goToSection("about")} className="transition-colors hover:text-[var(--color-sage-bright)]">
            About
          </a>
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <a
            href="https://www.linkedin.com/in/gurnoor-kahlon/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-sage-bright)]"
          >
            LinkedIn
          </a>
          <a
            href={`${BASE}resume/Gurnoor-Kahlon-Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--color-sage-dim)] px-4 py-1.5 text-[var(--color-sage-bright)] transition-colors hover:border-[var(--color-sage-bright)] hover:bg-[var(--color-sage-dim)]/30"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
