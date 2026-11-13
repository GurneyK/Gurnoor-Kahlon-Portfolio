import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

import wordmark from "../../assets/pagoda/logo-wordmark.png";
import bannerYoga from "../../assets/pagoda/banner-yoga.jpg";
import bannerFitness from "../../assets/pagoda/banner-fitness.jpg";
import bannerPilates from "../../assets/pagoda/banner-pilates.jpg";
import bannerMeditation from "../../assets/pagoda/banner-meditation.jpg";
import bannerChair from "../../assets/pagoda/banner-chair-yoga.jpg";
import bannerMat from "../../assets/pagoda/banner-mat-yoga.jpg";
import detox3 from "../../assets/pagoda/detox-day3.jpg";
import detox5 from "../../assets/pagoda/detox-day5.jpg";

const PURPLE = "#6a2a8c";

// Titles and durations are taken from the live app's category screens.
const TABS = [
  {
    id: "Home",
    banner: bannerYoga,
    kind: "home",
  },
  {
    id: "Yoga",
    banner: bannerYoga,
    kind: "tiles",
    tiles: [
      { src: bannerChair, label: "Chair Yoga" },
      { src: bannerMat, label: "Mat Yoga" },
    ],
  },
  {
    id: "Fitness",
    banner: bannerFitness,
    kind: "list",
    items: [
      { title: "10 Minutes Post Workout Stretch || Full Body Recovery", time: "9:56" },
      { title: "After Workout Yoga Stretch" },
    ],
  },
  {
    id: "Pilates",
    banner: bannerPilates,
    kind: "list",
    items: [
      { title: "30 Mins Pilates Yoga Workout | Full Body Flexibility", time: "33:34" },
      { title: "Yoga + Pilates" },
    ],
  },
  {
    id: "Meditation",
    banner: bannerMeditation,
    kind: "list",
    items: [
      { title: "7 Minutes Meditation Yoga", time: "7:23" },
      { title: "Gentle Full Body Stretch & Meditation" },
    ],
  },
];

const Icon = {
  menu: (
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" strokeLinecap="round" />
    </>
  ),
  bell: (
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 4a2 2 0 0 0 4 0" strokeLinejoin="round" />
  ),
  home: <path d="M4 11 12 4l8 7v9H4v-9Z" strokeLinejoin="round" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M4 10h16M8 3.5v4M16 3.5v4" strokeLinecap="round" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="10" r="2.5" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M14.5 15c2.6-.4 5 .8 6 4" strokeLinecap="round" />
    </>
  ),
  list: <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" strokeLinecap="round" />,
  profile: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" strokeLinecap="round" />
    </>
  ),
  play: <path d="M9 7.5v9l7.5-4.5L9 7.5Z" strokeLinejoin="round" />,
};

function Svg({ name, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      {Icon[name]}
    </svg>
  );
}

function TabContent({ tab }) {
  if (tab.kind === "home") {
    return (
      <div className="px-3 pb-4">
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-neutral-700">Exclusive Series</p>
          <p className="text-[9px] text-neutral-500">View All</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            { src: detox3, title: "10 Day Yoga Detox Challenge", sub: "Day 3" },
            { src: detox5, title: "10 Day Yoga Detox Challenge", sub: "Day 5" },
          ].map((c) => (
            <div key={c.sub}>
              <img src={c.src} alt="" className="aspect-video w-full rounded-md object-cover" />
              <p className="mt-1 text-[9px] leading-tight text-neutral-700">
                {c.title} · {c.sub}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-white p-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <p className="text-[10px] text-neutral-600">Continue your series</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
            <motion.div
              className="h-full rounded-full"
              style={{ background: PURPLE }}
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="mt-1 text-right text-[9px]" style={{ color: PURPLE }}>
            30% Complete
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 pb-4">
      <div className="mt-2 flex gap-4 border-b border-neutral-200 text-[10px]">
        <span className="relative pb-1.5 font-medium text-neutral-800">
          Items
          <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full" style={{ background: PURPLE }} />
        </span>
        <span className="pb-1.5 text-neutral-400">Comments (0)</span>
      </div>

      {tab.kind === "tiles" ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {tab.tiles.map((t) => (
            <div key={t.label}>
              <img src={t.src} alt="" className="aspect-video w-full rounded-md object-cover" />
              <p className="mt-1 text-[9px] text-neutral-700">{t.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-2 divide-y divide-neutral-200">
          {tab.items.map((item) => (
            <li key={item.title} className="flex items-center gap-2.5 py-2.5">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: PURPLE }}
              >
                <Svg name="play" className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 text-[10px] leading-snug text-neutral-700">{item.title}</span>
              <span className="text-[9px] tabular-nums text-neutral-400">{item.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PhoneMock({ autoplay = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const tab = TABS[index];

  useEffect(() => {
    if (!autoplay || touched || !inView || reduce) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % TABS.length), 3200);
    return () => clearInterval(t);
  }, [autoplay, touched, inView, reduce]);

  const select = (i) => {
    setTouched(true);
    setIndex(i);
  };

  return (
    <div ref={ref} className="relative mx-auto w-[280px] select-none sm:w-[300px]">
      <div className="relative rounded-[46px] bg-[#151515] p-[10px] shadow-[0_30px_80px_-20px_rgba(60,20,90,0.55),inset_0_0_0_1.5px_#3a3a3a]">
        <div className="relative flex h-[580px] flex-col overflow-hidden rounded-[37px] bg-[#f8f6f3] sm:h-[620px]">
          {/* status bar */}
          <div className="relative flex items-center justify-between bg-[#ece7e1] px-6 pb-1 pt-3 text-[11px] font-semibold text-neutral-900">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[1.5px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[2.5px] rounded-sm bg-neutral-900" style={{ height: h }} />
                ))}
              </span>
              <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-neutral-900 p-[1.5px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-neutral-900" />
              </span>
            </span>
          </div>

          {/* app header */}
          <div className="bg-[#ece7e1] px-3 pb-0 pt-2" style={{ color: PURPLE }}>
            <div className="flex items-center justify-between">
              <Svg name="menu" className="h-5 w-5" />
              <img src={wordmark} alt="Pagoda Yoga" className="h-5 w-auto" />
              <span className="flex gap-2">
                <Svg name="search" />
                <Svg name="bell" />
              </span>
            </div>
            <div role="tablist" aria-label="App categories" className="mt-2 flex justify-between">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => select(i)}
                  className={`relative px-1 pb-2 pt-1 text-[11px] transition-colors ${
                    i === index ? "font-semibold text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {t.id}
                  {i === index && (
                    <motion.span
                      layoutId="pagoda-tab-underline"
                      className="absolute inset-x-1 bottom-0 h-[2.5px] rounded-full"
                      style={{ background: PURPLE }}
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* scrollable content */}
          <div className="relative flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {tab.kind === "home" && (
                  <p className="px-3 pt-3 text-[11px] font-semibold text-neutral-700">New Releases</p>
                )}
                <div className={tab.kind === "home" ? "px-3 pt-2" : ""}>
                  <motion.img
                    src={tab.banner}
                    alt={`${tab.id} category banner`}
                    className={`aspect-[1980/1080] w-full object-cover ${tab.kind === "home" ? "rounded-lg" : ""}`}
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <TabContent tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* bottom nav */}
          <div className="grid grid-cols-5 border-t border-neutral-200 bg-white px-1 pb-4 pt-2" style={{ color: PURPLE }}>
            {[
              ["home", "Home"],
              ["calendar", "Calendar"],
              ["community", "Community"],
              ["list", "Playlists"],
              ["profile", "Profile"],
            ].map(([icon, label]) => (
              <span key={label} className="flex flex-col items-center gap-0.5 text-[8px] uppercase tracking-wide">
                <Svg name={icon} className="h-[18px] w-[18px]" />
                {label}
              </span>
            ))}
          </div>
          <span className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
        </div>
      </div>
    </div>
  );
}
