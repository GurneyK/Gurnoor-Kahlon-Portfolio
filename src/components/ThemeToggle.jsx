import { useEffect, useState } from "react";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`relative flex h-7 w-[52px] items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-1 transition-colors ${className}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-sage)] text-[10px] text-white transition-transform ${
          isLight ? "translate-x-[24px]" : "translate-x-0"
        }`}
      >
        {isLight ? "☀" : "☾"}
      </span>
    </button>
  );
}
