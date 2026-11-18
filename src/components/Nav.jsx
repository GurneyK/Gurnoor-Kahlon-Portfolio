import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const NAV_LINKS = [
  { id: "ask", label: "Ask Me", type: "anchor" },
  { id: "work", label: "Work", type: "anchor" },
  { id: "side-project", label: "Independent Work", type: "anchor" },
  { to: "/about", label: "About", type: "route" },
  { to: "/contact", label: "Contact", type: "route" },
];

function LinkedInIcon({ className = "" }) {
  return (
    <a
      href="https://www.linkedin.com/in/gurnoor-kahlon/"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn profile (opens in new tab)"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-sage-dim)] text-[var(--color-paper-dim)] transition-colors hover:border-[var(--color-sage-bright)] hover:bg-[var(--color-sage-dim)]/30 hover:text-[var(--color-sage-bright)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    </a>
  );
}

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // From any other page: go home and land directly on the section
    navigate("/", { state: { section: id } });
  };

  const renderLink = (link, className) =>
    link.type === "route" ? (
      <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)} className={className}>
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={`#${link.id}`} onClick={goToSection(link.id)} className={className}>
        {link.label}
      </a>
    );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-500 ${
        scrolled || menuOpen
          ? "border-[var(--color-border-soft)] bg-[color-mix(in_oklab,var(--color-ink)_82%,transparent)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-sage-bright),var(--color-teal),var(--color-amber))]"
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-[family-name:var(--font-display)] text-base tracking-tight text-[var(--color-paper)] sm:text-lg"
          >
            Gurnoor Kahlon
          </Link>
          <ThemeToggle />
        </div>

        <nav
          className="hidden items-center gap-1 text-[15px] text-[var(--color-paper-dim)] md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <span key={link.label} className="relative" onMouseEnter={() => setHovered(link.label)}>
              {hovered === link.label && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-[var(--color-surface-raised)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {renderLink(link, "relative block rounded-full px-4 py-2 transition-colors hover:text-[var(--color-paper)]")}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <LinkedInIcon />
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
          {NAV_LINKS.map((link) =>
            renderLink(
              link,
              "rounded-lg px-2 py-2.5 transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-sage-bright)]"
            )
          )}
        </nav>
      )}
    </header>
  );
}
