// Preset questions shown as buttons before the visitor types anything.
export const qaPairs = [
  {
    question: "What sets you apart from other designers?",
    answer:
      "I ship. I write my own component documentation and coded reference files, and at H3L I contribute directly to front-end implementation as well as handoff files. Being able to take a design most of the way to production myself changes how closely I can work with engineering and how fast it actually ships.",
  },
  {
    question: "What work are you most proud of?",
    answer:
      "The design system I built at H3L. It goes beyond a component library sitting in Figma: every entry ships with real, working React and Tailwind code, documented well enough that any team can pull it directly into their own project and use it immediately. That's the part I'm proudest of. It isn't a portfolio piece, it's infrastructure other people actually build on.",
  },
  {
    question: "How do you handle pushback on a design decision?",
    answer:
      "I ask what problem the pushback is actually about. If it's a real constraint, technical, timeline, or a use case I missed, I'd rather know now and adjust. If it's a preference with no evidence behind it, I bring evidence of my own. On CustomsCity, a redesign I proposed traced back to specific usability findings rather than taste, which kept the conversation focused on the problem instead of on differing opinions.",
  },
  {
    question: "What does your design process actually look like?",
    answer:
      "I start by understanding the workflow before I open Figma. For Remitian that meant mapping how an accounting firm actually processes thirty clients, not how the existing screens assumed they would. From there: wireframes, high-fidelity prototypes, and validation with real users where I can get it. I use AI-assisted workflows to move faster through exploration, but the judgment calls are still mine.",
  },
  {
    question: "Why did you move from marketing into UX?",
    answer:
      "I studied marketing at Brock because I was interested in how people actually make decisions. UX turned out to be the same question asked more precisely, with a feedback loop I could see and test. SpringBoard gave me the craft. The marketing background still shows up in how I work: I think about positioning and audience alongside usability on every project.",
  },
  {
    question: "What are you looking for in your next role?",
    answer:
      "A team building ambitious AI products, ideally in the space I'm already spending my time in, where design and engineering aren't handed off between departments but built together. I want to keep being someone who can design the interface and help ship it, not choose between the two.",
  },
];

const CONTACT_EMAIL = "kahlongurnoor1@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/gurnoor-kahlon/";

const LINK_CLASS =
  "text-[var(--color-sage-bright)] underline decoration-[var(--color-sage-dim)] underline-offset-4";

// Free-text matching runs against this broader set. Each entry is scored by how
// many of its keyword phrases appear in the visitor's question; highest score
// above the threshold wins. Ties keep earlier entries (roughly most-common questions first).
export const knowledgeBase = [
  {
    keywords: ["apart", "different from other", "stand out", "unique", "differentiate"],
    answer: qaPairs[0].answer,
  },
  {
    keywords: ["proud", "proudest", "best work", "favorite project", "favourite project", "best project"],
    answer: qaPairs[1].answer,
  },
  {
    keywords: ["pushback", "disagree", "conflict", "criticism", "feedback on a design", "handle feedback"],
    answer: qaPairs[2].answer,
  },
  {
    keywords: ["design process", "workflow", "your approach", "how do you design", "how do you work"],
    answer: qaPairs[3].answer,
  },
  {
    keywords: ["marketing", "why did you", "brock", "into ux", "into design", "career change"],
    answer: qaPairs[4].answer,
  },
  {
    keywords: ["next role", "looking for", "opportunit", "what kind of team", "hiring", "job search"],
    answer: qaPairs[5].answer,
  },
  {
    keywords: ["h3l", "horizon 3", "design system", "component librar", "unilever", "224"],
    answer:
      "At Horizon 3 Labs, Unilever's AI innovation lab, I'm the sole designer building and governing the full design system every agent product runs on: 224 cataloged entries, each shipped with real React and Tailwind code, not just Figma components. I've been there since December 2025, owning UX and UI across multiple AI agent products end to end.",
  },
  {
    keywords: ["ccgs", "copilot", "category strategy", "category growth"],
    answer:
      "CCGS Copilot is one of the AI agent products I design at H3L: it reads eight data sources and drafts the category growth narrative an analyst used to write by hand. I designed the dashboard and the agent interaction end to end. There's a live demo and case study on the CCGS Copilot page.",
  },
  {
    keywords: ["r&d agent", "rd agent", "research and development", "innovation scouting", "fit agent", "r and d"],
    answer:
      "The R&D Fit Agent is a scoring tool I designed at H3L that screens external innovation submissions against Unilever's R&D fit criteria and explains why a submission scores the way it does to the reviewer, not just a number. It's on GitHub as research-and-development-agent, with a case study on the site.",
  },
  {
    keywords: ["remitian", "tax remittance", "accounting firm"],
    answer:
      "Remitian was a fintech startup building tax remittance software for accounting firms, where I was Lead Product Designer for web and mobile, February to October 2025. I owned it end to end: mapping how firms actually manage dozens of clients at once, interviewing accountants directly, and shipping motion-based microinteractions that built confidence in a high-stakes financial workflow.",
  },
  {
    keywords: ["customscity", "customs city", "customs", "logistics", "clearance"],
    answer:
      "CustomsCity is customs clearance and compliance software for enterprise shipping teams. I was UX/UI Designer there from June 2024 to February 2025, redesigning core flows around findings from real usability research rather than assumptions.",
  },
  {
    keywords: ["pagoda", "yoga", "wellness app", "onboarding completion"],
    answer:
      "At Pagoda Yoga I was Lead Product Designer for four months, designing the onboarding and scheduling experience for a mobile wellness product. Usability testing and behavioral analysis I ran increased onboarding completion by 15 percent.",
  },
  {
    keywords: ["velocity tech", "velocity", "recruiting platform", "erp"],
    answer:
      "At Velocity Tech I designed dashboards and flows for a platform connecting engineers with companies hiring for specialized technical roles, simplifying dense ERP data through visual hierarchy and accessible UI structure. That was a five-month engagement in 2024.",
  },
  {
    keywords: ["video prompting", "video toolkit", "prompting toolkit", "dealigence video", "html video", "side project"],
    answer:
      "The Video Prompting Toolkit is a side project: a way to go from a written prompt to a shippable content asset (walkthroughs, teasers, pitch decks) without touching a traditional video editor. I used it to build the Dealigence walkthrough and teaser you can find linked from the site. It's open source at github.com/GurneyK/Video-prompting.",
  },
  {
    keywords: ["skills", "tools", "tech stack", "what do you use", "figma", "react", "tailwind", "software"],
    answer:
      "Day to day: Figma for design systems, wireframing, and prototyping; React and Tailwind CSS to ship real front-end code alongside the design; Claude Code, Codex, and Lovable for AI-assisted workflows; plus usability testing, journey mapping, accessibility, and stakeholder facilitation as the non-visual half of the job.",
  },
  {
    keywords: ["where are you based", "location", "toronto", "remote", "time zone"],
    answer: "I'm based in Toronto, and currently working as design lead at Horizon 3 Labs, Unilever's AI innovation lab.",
  },
  {
    keywords: ["school", "university", "study", "degree", "springboard", "education"],
    answer:
      "I studied marketing at Brock University, then trained in UX at SpringBoard. The marketing background still shapes how I work: I think about positioning and audience alongside usability on every project.",
  },
  {
    keywords: ["what do you do", "current role", "job title", "currently working", "what's your role"],
    answer:
      "I'm a Design Engineer at Horizon 3 Labs, Unilever's AI innovation lab: sole designer and design lead across several AI agent products, from discovery through production-ready UI, and owner of the design system all of them run on.",
  },
  {
    keywords: ["resume", "cv", "portfolio pdf"],
    answer: "There's a downloadable resume linked in the footer below, right next to LinkedIn and GitHub.",
  },
];

// Questions that touch these are routed straight to contact, even if they also
// happen to mention a topic keyword (e.g. "confidential Unilever revenue figures").
const SENSITIVE_KEYWORDS = [
  "salary",
  "compensation",
  "pay range",
  "how much do you make",
  "confidential",
  "proprietary",
  "revenue",
  "nda",
  "married",
  "relationship",
  "religion",
  "politic",
  "visa",
  "sponsorship",
  "immigration",
  "age",
  "disability",
];

function normalize(str) {
  return str.toLowerCase().replace(/[^\w\s&']/g, " ");
}

export function matchAnswer(input) {
  const normalized = normalize(input);

  if (SENSITIVE_KEYWORDS.some((kw) => normalized.includes(kw))) {
    return fallbackAnswer;
  }

  let best = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce(
      (count, kw) => count + (normalized.includes(kw) ? 1 : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best.answer : fallbackAnswer;
}

export const fallbackAnswer = (
  <>
    That's more detailed than what's covered here, so I'd rather not guess. Best way to get
    a real answer:{" "}
    <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>
      email me
    </a>{" "}
    or connect on{" "}
    <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
      LinkedIn
    </a>
    , both linked in the footer too.
  </>
);
