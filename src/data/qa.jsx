// Preset questions shown as buttons before the visitor types anything.
export const qaPairs = [
  {
    id: "apart",
    question: "What sets you apart from other designers?",
    answer:
      "I ship. I write my own component documentation and coded reference files, and at H3L I contribute directly to front-end implementation as well as handoff files. Being able to take a design most of the way to production myself changes how closely I can work with engineering and how fast it actually ships.",
  },
  {
    id: "proud",
    question: "What work are you most proud of?",
    answer:
      "The design system I built at H3L. It goes beyond a component library sitting in Figma: every entry ships with real, working React and Tailwind code, documented well enough that any team can pull it directly into their own project and use it immediately. That's the part I'm proudest of. It isn't a portfolio piece, it's infrastructure other people actually build on.",
  },
  {
    id: "pushback",
    question: "How do you handle pushback on a design decision?",
    answer:
      "I ask what problem the pushback is actually about. If it's a real constraint, technical, timeline, or a use case I missed, I'd rather know now and adjust. If it's a preference with no evidence behind it, I bring evidence of my own. On CustomsCity, a redesign I proposed traced back to specific usability findings rather than taste, which kept the conversation focused on the problem instead of on differing opinions.",
  },
  {
    id: "process",
    question: "What does your design process actually look like?",
    answer:
      "I start by understanding the workflow before I open Figma. For Remitian that meant mapping how an accounting firm actually processes thirty clients, not how the existing screens assumed they would. From there: wireframes, high-fidelity prototypes, and validation with real users where I can get it. I use AI-assisted workflows to move faster through exploration, but the judgment calls are still mine.",
  },
  {
    id: "marketing",
    question: "Why did you move from marketing into UX?",
    answer:
      "I studied marketing at Brock because I was interested in how people actually make decisions. UX turned out to be the same question asked more precisely, with a feedback loop I could see and test. SpringBoard gave me the craft. The marketing background still shows up in how I work: I think about positioning and audience alongside usability on every project.",
  },
  {
    id: "next",
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
    id: "apart",
    keywords: ["apart", "different from other", "stand out", "unique", "differentiate"],
    answer: qaPairs[0].answer,
  },
  {
    id: "proud",
    keywords: ["proud", "proudest", "best work", "favorite project", "favourite project", "best project"],
    answer: qaPairs[1].answer,
  },
  {
    id: "pushback",
    keywords: ["pushback", "disagree", "conflict", "criticism", "feedback on a design", "handle feedback"],
    answer: qaPairs[2].answer,
  },
  {
    id: "process",
    keywords: ["design process", "workflow", "your approach", "how do you design", "how do you work"],
    answer: qaPairs[3].answer,
  },
  {
    id: "marketing",
    keywords: ["marketing", "why did you", "brock", "into ux", "into design", "career change"],
    answer: qaPairs[4].answer,
  },
  {
    id: "next",
    keywords: ["next role", "looking for", "opportunit", "what kind of team", "hiring", "job search"],
    answer: qaPairs[5].answer,
  },
  {
    id: "h3l",
    keywords: ["h3l", "horizon 3", "design system", "component librar", "unilever", "224"],
    answer:
      "At Horizon 3 Labs, Unilever's AI innovation lab, I'm the sole designer building and governing the full design system every agent product runs on: 224 cataloged entries, each shipped with real React and Tailwind code, not just Figma components. I've been there since December 2025, owning UX and UI across multiple AI agent products end to end.",
  },
  {
    id: "ccgs",
    keywords: ["ccgs", "copilot", "category strategy", "category growth"],
    answer:
      "CCGS Copilot is one of the AI agent products I design at H3L: it reads eight data sources and drafts the category growth narrative an analyst used to write by hand. I designed the dashboard and the agent interaction end to end. There's a live demo and case study on the CCGS Copilot page.",
  },
  {
    id: "rd",
    keywords: ["r&d agent", "rd agent", "research and development", "innovation scouting", "fit agent", "r and d"],
    answer:
      "The R&D Fit Agent is a scoring tool I designed at H3L that screens external innovation submissions against Unilever's R&D fit criteria and explains why a submission scores the way it does to the reviewer, not just a number. It's on GitHub as research-and-development-agent, with a case study on the site.",
  },
  {
    id: "remitian",
    keywords: ["remitian", "tax remittance", "accounting firm"],
    answer:
      "Remitian was a fintech startup building tax remittance software for accounting firms, where I was Lead Product Designer for web and mobile, February to October 2025. I owned it end to end: mapping how firms actually manage dozens of clients at once, interviewing accountants directly, and shipping motion-based microinteractions that built confidence in a high-stakes financial workflow.",
  },
  {
    id: "customscity",
    keywords: ["customscity", "customs city", "customs", "logistics", "clearance"],
    answer:
      "CustomsCity is customs clearance and compliance software for enterprise shipping teams. I was UX/UI Designer there from June 2024 to February 2025, redesigning core flows around findings from real usability research rather than assumptions.",
  },
  {
    id: "pagoda",
    keywords: ["pagoda", "yoga", "wellness app", "onboarding completion"],
    answer:
      "Pagoda Yoga is an independent project: a subscription yoga app for iOS and Android, and I was the only designer on it, from research through launch (November 2024 to January 2025). It is still live. The full case study is in the Independent Work section.",
  },
  {
    id: "tcc",
    keywords: ["tcc", "treasury", "treasury command center", "maker checker", "audit trail", "banking"],
    answer:
      "Treasury Command Center is an independent concept I designed and built on my own in November 2026: a working treasury hub where four agents watch bank, ERP and FX data and explain every finding, while people make every decision that moves money. It uses maker and checker approvals, a full audit trail and data freshness checks, all on synthetic data, and it is built on my Design System. The live demo and case study are in the Independent Work section.",
  },
  {
    id: "velocity",
    keywords: ["velocity tech", "velocity", "recruiting platform", "erp"],
    answer:
      "At Velocity Tech I designed dashboards and flows for a platform connecting engineers with companies hiring for specialized technical roles, simplifying dense ERP data through visual hierarchy and accessible UI structure. That was a five-month engagement in 2024.",
  },
  {
    id: "video",
    keywords: ["video prompting", "video toolkit", "prompting toolkit", "dealigence video", "html video", "side project"],
    answer:
      "The Video Prompting Toolkit is a side project: a way to go from a written prompt to a shippable content asset (walkthroughs, teasers, pitch decks) without touching a traditional video editor. I used it to make the Dealigence teaser you can watch on the site. It's open source at github.com/GurneyK/Video-prompting.",
  },
  {
    id: "skills",
    keywords: ["skills", "tools", "tech stack", "what do you use", "figma", "react", "tailwind", "software"],
    answer:
      "Day to day: Figma for design systems, wireframing, and prototyping; React and Tailwind CSS to ship real front-end code alongside the design; Claude Code, Codex, and Lovable for AI-assisted workflows; plus usability testing, journey mapping, accessibility, and stakeholder facilitation as the non-visual half of the job.",
  },
  {
    id: "location",
    keywords: ["where are you based", "location", "toronto", "remote", "time zone"],
    answer: "I'm based in Toronto, and currently working as design lead at Horizon 3 Labs, Unilever's AI innovation lab.",
  },
  {
    id: "education",
    keywords: ["school", "university", "study", "degree", "springboard", "education"],
    answer:
      "I studied marketing at Brock University, then trained in UX at SpringBoard. The marketing background still shapes how I work: I think about positioning and audience alongside usability on every project.",
  },
  {
    id: "role",
    keywords: ["what do you do", "current role", "job title", "currently working", "what's your role"],
    answer:
      "I'm a Design Engineer at Horizon 3 Labs, Unilever's AI innovation lab: sole designer and design lead across several AI agent products, from discovery through production-ready UI, and owner of the design system all of them run on.",
  },
  {
    id: "resume",
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

/** Best matching entry for free text: { id, answer }. id is null when nothing matches. */
export function matchEntry(input) {
  const normalized = normalize(input);
  if (SENSITIVE_KEYWORDS.some((kw) => normalized.includes(kw))) {
    return { id: null, answer: fallbackAnswer };
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

  return bestScore > 0 ? { id: best.id, answer: best.answer } : { id: null, answer: fallbackAnswer };
}

export function matchAnswer(input) {
  return matchEntry(input).answer;
}

// The question each topic is offered as, when it's suggested as a follow-up
const QUESTION = {
  apart: qaPairs[0].question,
  proud: qaPairs[1].question,
  pushback: qaPairs[2].question,
  process: qaPairs[3].question,
  marketing: qaPairs[4].question,
  next: qaPairs[5].question,
  h3l: "Tell me about the design system you built",
  ccgs: "What is CCGS Copilot?",
  rd: "What does the R&D Fit Agent do?",
  remitian: "What did you do at Remitian?",
  customscity: "What did you work on at CustomsCity?",
  pagoda: "Tell me about Pagoda Yoga",
  tcc: "What is the Treasury Command Center?",
  velocity: "What did you do at Velocity Tech?",
  video: "What is the Video Prompting Toolkit?",
  skills: "What tools do you use day to day?",
  location: "Where are you based?",
  education: "What's your education background?",
  role: "What's your current role?",
  resume: "Where can I find your resume?",
};

// Related follow-ups for each topic, most relevant first
const NEXT = {
  apart: ["h3l", "skills", "process"],
  proud: ["ccgs", "tcc", "process"],
  pushback: ["customscity", "process", "apart"],
  process: ["remitian", "skills", "pushback"],
  marketing: ["education", "process", "next"],
  next: ["role", "location", "resume"],
  h3l: ["ccgs", "rd", "skills"],
  ccgs: ["rd", "h3l", "process"],
  rd: ["ccgs", "h3l", "tcc"],
  remitian: ["customscity", "process", "pushback"],
  customscity: ["remitian", "pushback", "process"],
  pagoda: ["tcc", "process", "proud"],
  tcc: ["h3l", "pagoda", "skills"],
  velocity: ["customscity", "remitian", "skills"],
  video: ["skills", "tcc", "h3l"],
  skills: ["h3l", "video", "apart"],
  location: ["next", "role", "resume"],
  education: ["marketing", "skills", "next"],
  role: ["h3l", "ccgs", "next"],
  resume: ["next", "location", "role"],
  none: ["apart", "proud", "next"],
};
const ORDER = ["apart", "proud", "process", "next", "h3l", "ccgs", "tcc", "skills", "remitian", "pushback", "rd", "customscity", "pagoda", "marketing", "role", "location", "education", "video", "velocity", "resume"];

/** Up to n follow-up questions after topic lastId, skipping anything already asked */
export function suggestionsFor(lastId, askedIds, n = 3) {
  const asked = new Set(askedIds);
  const picks = [];
  for (const id of [...(NEXT[lastId || "none"] || []), ...ORDER]) {
    if (!asked.has(id) && !picks.includes(id)) picks.push(id);
    if (picks.length === n) break;
  }
  const byId = Object.fromEntries(knowledgeBase.map((e) => [e.id, e]));
  return picks.map((id) => ({ id, question: QUESTION[id], answer: byId[id].answer }));
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
