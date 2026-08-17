import { useEffect, useRef, useState } from "react";

export default function DesktopFrame({
  src,
  title,
  designWidth = 1440,
  designHeight = 900,
  label,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      if (width > 0) setScale(width / designWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [designWidth]);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {label && (
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
          <span className="ml-3 text-xs text-[var(--color-paper-mute)]">{label}</span>
        </div>
      )}
      <div ref={containerRef} className="w-full bg-white" style={{ height: designHeight * scale }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          style={{
            width: designWidth,
            height: designHeight,
            border: "none",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}
