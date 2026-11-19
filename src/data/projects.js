export const projects = [
  {
    slug: "h3l-design-system",
    glance: {
      problem: "As the sole designer across several AI agent products at once, every product was drifting into its own visual language.",
      did: "Built and now govern a 224-entry component library, with an engineer-ready handoff format and rules for AI-generated interfaces.",
      outcome: "Every H3L product team builds from it, so a new agent product reaches a consistent, on-brand interface in days instead of weeks.",
    },
    accent: "#6f9cff",
    name: "Full Design System",
    role: "Senior Front-end UX/UI Designer, Horizon 3 Labs (Unilever)",
    dates: "December 2025 to Present",
    tags: ["Design System", "AI Agent Products", "Infrastructure"],
    summary:
      "The component library and design infrastructure behind every H3L agent product. 224 cataloged entries, built and governed by one person.",
    liveUrl: "https://gurneyk.github.io/Design-library/",
    repoUrl: "https://github.com/GurneyK/Design-library",
    mockDataNote: true,
  },
  {
    slug: "ccgs-copilot",
    glance: {
      problem: "Analysts built category growth narratives by hand from eight or more data sources, and quality depended on who wrote it that cycle.",
      did: "Designed a seven-section agent workspace, from command center to deck builder, with evidence and sources next to every claim and approval gates before export.",
      outcome: "A live, clickable product, shown here on fictional data, covering three UK categories in the proof of concept.",
    },
    accent: "#4fb68a",
    name: "CCGS Copilot",
    role: "Senior Front-end UX/UI Designer, Horizon 3 Labs (Unilever)",
    dates: "December 2025 to Present",
    tags: ["AI Agent", "Category Strategy", "Dashboard"],
    summary:
      "An agent that reads eight data sources and drafts the category growth narrative an analyst used to write by hand.",
    liveUrl: "https://gurneyk.github.io/CCGS-Dashboard/",
    repoUrl: "https://github.com/GurneyK/CCGS-Dashboard",
    mockDataNote: true,
  },
  {
    slug: "rd-agent",
    glance: {
      problem: "Inbound partnership submissions were screened by hand, so the same company could get a different read depending on who triaged it.",
      did: "Designed and built a four-section tool that runs hard disqualifiers first, scores everything against one rubric, and shows reviewers why.",
      outcome: "Every submission lands in a tier with a defined next step and service level. An interactive rebuild is on this page.",
    },
    accent: "#e0a458",
    name: "R&D Fit Agent",
    role: "Senior Front-end UX/UI Designer, Horizon 3 Labs (Unilever)",
    dates: "December 2025 to Present",
    tags: ["AI Agent", "Innovation Scouting", "Admin Tooling"],
    summary:
      "A scoring tool that screens external innovation submissions against Unilever's R&D fit criteria, and tells a reviewer why.",
    repoUrl: "https://github.com/GurneyK/research-and-development-agent",
    mockDataNote: true,
    rebuiltNote: true,
  },
  {
    slug: "remitian",
    glance: {
      problem: "Accounting firms tracked tax payments for 30 or more clients across spreadsheets and email, where a missed date is a compliance risk.",
      did: "Led web and mobile design for eight months, from research to shipped UI, in iterative releases alongside engineering.",
      outcome: "Live with accounting firms today, built around a firm-wide view that answers \"where do I look next\" first.",
    },
    accent: "#5ec2c9",
    name: "Remitian",
    role: "Lead Product Designer",
    dates: "February 2025 to October 2025",
    tags: ["Fintech", "Web + Mobile", "0 to 1"],
    summary:
      "Tax remittance software for accounting firms. I owned web and mobile end to end, from research through shipped UI.",
  },
  {
    slug: "customscity",
    glance: {
      problem: "The Customs Status Checker, a core flow, had become confusing enough that it needed formal usability research.",
      did: "Ran the research, mapped where the flow broke, and redesigned it as a two-step flow across web and mobile with the developers.",
      outcome: "Because every change traced back to a research finding, stakeholders signed off quickly.",
    },
    accent: "#e57b6a",
    name: "CustomsCity",
    role: "UX/UI Designer",
    dates: "June 2024 to February 2025",
    tags: ["Logistics", "Mobile + Web", "Research-Led"],
    summary:
      "Customs clearance and compliance software for enterprise shipping teams, redesigned around real usability research.",
  },
];

export const sideProject = {
  name: "Video Prompting Toolkit",
  summary:
    "A toolkit for going from a written prompt to a shippable content asset without touching a video editor.",
  repoUrl: "https://github.com/GurneyK/Video-prompting",
};

export const independentProjects = [
  {
    slug: "pagoda-yoga",
    glance: {
      problem: "Pagoda Yoga had a loyal YouTube audience and no product of its own.",
      did: "Sole designer, from research, journey mapping and testing to the screens that shipped on iOS and Android.",
      outcome: "Launched and still live, with members praising how easy it is to use.",
    },
    accent: "#b48ee0",
    name: "Pagoda Yoga",
    role: "Sole Product Designer",
    dates: "November 2024 to January 2025",
    tags: ["Mobile App", "iOS + Android", "Shipped"],
    summary:
      "A subscription yoga app that turns a YouTube instructor's library into a calm, easy-to-navigate mobile product. I was the only designer, from research to launch, and it's still live.",
    liveUrl: "https://apps.apple.com/app/id6738764405",
    liveLabel: "View on the App Store ↗",
    backSection: "side-project",
    backLabel: "← Back to independent work",
  },
  {
    slug: "tcc",
    glance: {
      problem: "Treasury teams rebuild their cash picture every morning from bank portals, ERP extracts and rate screens.",
      did: "Designed and built a working hub where four agents flag and explain risks, people approve every payment, and every decision is audited.",
      outcome: "A working concept, accessible to WCAG 2.2 AA, that you can use live on the page.",
    },
    accent: "#8b84f5",
    name: "Treasury Command Center",
    role: "Designer and engineer, solo concept",
    dates: "November 2026",
    tags: ["Fintech", "AI Agents", "Web App"],
    summary:
      "A working treasury hub where four agents watch bank, ERP and FX data and explain every risk they flag. People approve every payment, and every decision is audited.",
    liveUrl: "https://gurneyk.github.io/TCC/",
    liveLabel: "Try the live demo ↗",
    repoUrl: "https://github.com/GurneyK/TCC",
    backSection: "side-project",
    backLabel: "← Back to independent work",
  },
];
