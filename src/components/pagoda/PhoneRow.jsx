import { motion } from "framer-motion";

/*
 * A row of phones on a transparent background, so it sits cleanly on
 * both the dark and light themes. `variant` decides how a screen image
 * is placed inside the frame:
 *  - "before": the screen crop already contains the full UI, placed under the island.
 *  - "after": square artboards from the final onboarding, with the progress
 *    dots and Skip control the redesign added drawn on top.
 */
function Screen({ screen, variant, index, total }) {
  if (variant === "before") {
    return (
      <div className="absolute inset-0 bg-white pt-[14%]">
        <img src={screen.src} alt={screen.label} className="w-full" loading="lazy" draggable={false} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div className="flex items-center justify-between px-[9%] pb-[3%] pt-[17%]">
        <span className="flex gap-[3px]" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-[4px] rounded-full ${i === index ? "w-[10px] bg-[#7b3fa0]" : "w-[4px] bg-neutral-300"}`}
            />
          ))}
        </span>
        <span className="rounded-[4px] bg-[#7b3fa0] px-[6px] py-[2px] text-[8px] font-semibold tracking-wide text-white">
          SKIP
        </span>
      </div>
      <img
        src={screen.src}
        alt={screen.label}
        className="min-h-0 w-full flex-1 object-cover object-center"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

export default function PhoneRow({ screens, variant }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
      {screens.map((screen, i) => (
        <motion.figure
          key={screen.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="mx-auto w-full max-w-[200px]"
        >
          <div className="relative aspect-[9/19.5] rounded-[30px] bg-[#141414] p-[5px] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55),inset_0_0_0_1px_#3a3a3a]">
            <div className="relative h-full w-full overflow-hidden rounded-[25px]">
              <Screen screen={screen} variant={variant} index={i} total={screens.length} />
              <span className="absolute left-1/2 top-[2.2%] h-[3.6%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
              <span className="absolute bottom-[1.6%] left-1/2 h-[4px] w-[36%] -translate-x-1/2 rounded-full bg-neutral-900/80" />
            </div>
          </div>
          <figcaption className="mt-4 text-center text-sm text-[var(--color-paper-mute)]">{screen.label}</figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
