import { Reveal } from "../components/CaseStudyLayout.jsx";
import Footer from "../components/Footer.jsx";
import { experience } from "../data/experience.js";

const BASE = import.meta.env.BASE_URL;

// TODO GURNEY: drop your photo in src/assets/profile.jpg, then swap this
// placeholder for: <img src={profilePhoto} alt="Gurnoor Kahlon" className="h-full w-full object-cover" />
function ProfilePhoto() {
  return (
    <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] sm:h-40 sm:w-40">
      <span className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-sage-bright)]">
        GK
      </span>
    </div>
  );
}

export default function About() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <ProfilePhoto />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-sage)]">About</p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-paper)] sm:text-4xl">
              Gurnoor Kahlon
            </h1>
          </div>
        </Reveal>

        <Reveal className="mt-10 space-y-5 text-lg leading-relaxed text-[var(--color-paper-dim)]">
          <p>
            Hi, I'm Gurnoor. I design and build interfaces for AI products,
            currently as the design lead for{" "}
            <span className="text-[var(--color-paper)]">Horizon 3 Labs</span>,
            Unilever's AI innovation lab, where I own UX and UI across
            several agent products and built the design system all of them
            run on. Before that I led product design at{" "}
            <span className="text-[var(--color-paper)]">Remitian</span>, a
            fintech startup building tax remittance software, and designed
            for <span className="text-[var(--color-paper)]">CustomsCity</span>,
            an enterprise logistics platform, and{" "}
            <span className="text-[var(--color-paper)]">Velocity Tech</span>,
            a SaaS recruiting platform.
          </p>
          <p>
            I studied marketing at Brock University before training in UX
            at SpringBoard, and I still think like a marketer as much as a
            designer, positioning and audience shape almost every decision
            I make. These days I split my time between product design and
            writing enough front-end code to ship what I design myself.
          </p>
          <p>
            Always up for a conversation about design, AI products, or how
            the two are colliding right now. LinkedIn and email are both in
            the footer below.
          </p>
          <a
            href={`${BASE}resume/Gurnoor-Kahlon-Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-base text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4"
          >
            Download resume (PDF) ↗
          </a>
        </Reveal>

        <Reveal className="mt-20">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-paper)] sm:text-3xl">
            Experience
          </h2>
          <div className="mt-8 divide-y divide-[var(--color-border-soft)]">
            {experience.map((role) => (
              <div key={role.title} className="grid gap-2 py-8 sm:grid-cols-[100px_1fr] sm:gap-8">
                <p className="text-base text-[var(--color-paper-mute)]">{role.year}</p>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-paper)]">{role.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-paper-mute)]">{role.duration}</p>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-paper-dim)]">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
