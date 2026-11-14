export default function BrowserShot({ src, alt, url = "gurneyk.github.io/TCC", className = "", eager = false }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_40px_80px_-40px_rgba(30,22,80,0.55)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-black/[0.07] bg-[#f6f5fb] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfee]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfee]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfee]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-xs text-[#6b6880]">{url}</span>
      </div>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="block w-full" width="1440" height="1000" />
    </div>
  );
}
