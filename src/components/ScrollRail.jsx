import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "ask", label: "Ask Me" },
  { id: "work", label: "Work" },
  { id: "side-project", label: "Side Project" },
  { id: "about", label: "About" },
];

export default function ScrollRail() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => jumpTo(id)}
            className="group flex items-center gap-3"
            aria-label={`Jump to ${label}`}
          >
            <span
              className={`text-xs tracking-wide transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-[var(--color-sage-bright)] opacity-100"
                  : "translate-x-2 text-[var(--color-paper-mute)] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-[var(--color-sage-bright)]"
                  : "h-1.5 w-1.5 bg-[var(--color-border)] group-hover:bg-[var(--color-sage)]"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
