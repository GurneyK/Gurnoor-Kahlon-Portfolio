import { useEffect, useState } from "react";

const HOME_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "ask", label: "Ask Me" },
  { id: "work", label: "Work" },
  { id: "side-project", label: "Side Project" },
  { id: "contact", label: "Contact" },
];

export default function ScrollRail({ sections }) {
  const list = sections && sections.length ? sections : HOME_SECTIONS;
  const [activeId, setActiveId] = useState(list[0]?.id);

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

    list.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [list]);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden max-w-[240px] -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {list.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => jumpTo(id)}
            className="group flex items-center gap-3"
            aria-label={`Jump to ${label}`}
          >
            <span
              className={`truncate text-right text-xs tracking-wide transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-[var(--color-sage-bright)] opacity-100"
                  : "translate-x-2 text-[var(--color-paper-mute)] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`block shrink-0 rounded-full transition-all duration-300 ${
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
