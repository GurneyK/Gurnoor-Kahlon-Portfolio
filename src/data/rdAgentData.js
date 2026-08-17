// All data below is fictional, built for portfolio demonstration only.
// The real R&D Fit Agent runs on Unilever's internal submission data.

export const submissions = {
  open: [
    {
      id: "1",
      name: "GreenShield Surfactant Platform",
      company: "GreenShield Bio B.V.",
      status: "In Admin Review",
      score: "8.9",
      tier: 1,
      tags: ["Home Care", "Personal Care"],
      region: "Europe",
      date: "4/7/2026",
    },
    {
      id: "2",
      name: "Fermento Base",
      company: "Fermento Base GmbH",
      status: "On Hold",
      score: "7.8",
      tier: 2,
      tags: ["Foods"],
      region: "Europe",
      date: "4/9/2026",
    },
    {
      id: "3",
      name: "SkinAI Diagnostic Platform",
      company: "SkinAI Labs Inc.",
      status: "On Hold",
      score: "5.3",
      tier: 3,
      tags: ["Beauty & Wellbeing", "Digital R&D"],
      region: "North America",
      date: "3/28/2026",
    },
  ],
  closed: [
    {
      id: "4",
      name: "NanoCarrier Drug Delivery System",
      company: "NanoPharma Ltd.",
      status: "Closed (DQ)",
      score: "0.0",
      tier: 5,
      tags: ["Beauty & Wellbeing"],
      region: "Middle East & Africa",
      date: "4/3/2026",
    },
  ],
};

export const scoringComponents = [
  {
    id: "C1",
    name: "Unilever Category Fit",
    max: 2.5,
    description:
      "How directly the solution fits Unilever categories, brands, and active innovation priorities",
    signals:
      "Company stated target markets and current customer base, primary application vs. theoretical extensions, published innovation priorities",
  },
  {
    id: "C2",
    name: "Solution Value & Defensibility",
    max: 2,
    description:
      "Differentiation, defensibility, scalability, and strategic value of the proposed solution",
    signals: "Patent portfolio, application mapping, competitive landscape, barriers to replication",
  },
  {
    id: "C3",
    name: "Regulatory / Claims Pathway",
    max: 1.5,
    description: "Complexity and timeline of regulatory, claims, and market access pathway in key jurisdictions",
    signals: "Regulatory classification, existing approvals, comparable precedents, timeline estimates",
  },
  {
    id: "C4",
    name: "Commercial Validation",
    max: 2,
    description: "Evidence of commercial traction and market validation with brand customers",
    signals: "Published partnership announcements, products in market, revenue figures, named pilot partners",
  },
  {
    id: "C5",
    name: "Partnership Readiness",
    max: 1,
    description: "Organizational capacity and willingness to engage in strategic partnership",
    signals: "Team structure, response time, partnership materials, funding, exclusivity",
  },
  {
    id: "C6",
    name: "Company Stage & Resourcing Fit",
    max: 1,
    description: "Alignment between company maturity, funding, team capacity, and preferred partnership profile",
    signals: "Funding history, employee count, press releases, investor composition",
  },
];

export const disqualifiers = [
  { id: "DQ-1", name: "Pharmaceutical / Therapeutic Focus", description: "Primary focus on pharmaceutical / therapeutic drug development with majority of pipeline in clinical trial pathway" },
  { id: "DQ-2", name: "Competitor Acquisition / Exclusivity", description: "Acquired by or in exclusive partnership with a direct competitor" },
  { id: "DQ-3", name: "Oncology / Gene Therapy / Cell Therapy Core", description: "Core technology platform with no consumer product application" },
  { id: "DQ-4", name: "No Consumer Product Pathway", description: "No identifiable consumer product application pathway achievable within 7 years" },
  { id: "DQ-5", name: "Legal / Financial Distress", description: "Company in bankruptcy, dissolution, or active litigation affecting core IP" },
  { id: "DQ-6", name: "Prescription / Class III Regulatory Requirement", description: "Technology requires prescription-only or highest-class device approval in target markets" },
  { id: "DQ-7", name: "Geographic Rights Unavailable", description: "Exclusive geographic rights unavailable in two or more key markets" },
  { id: "DQ-8", name: "Customer Model Mismatch", description: "Primary customer base is distributors or intermediaries with no willingness to work directly with brands" },
];

export const tierOutcomes = [
  { tier: "Tier 1", range: "8–10", label: "Strategic Priority", action: "Immediate outreach, escalate to category leadership", sla: "48 hours" },
  { tier: "Tier 2", range: "6.5–7.9", label: "High Potential", action: "Proactive outreach within 2 weeks, assign category owner", sla: "2 weeks" },
  { tier: "Tier 3", range: "5–6.4", label: "Monitor & Develop", action: "Add to watch list, quarterly review", sla: "1 week ack." },
  { tier: "Tier 4", range: "3–4.9", label: "Low Priority", action: "Archive for future reference", sla: "1 week" },
  { tier: "Tier 5", range: "0–2.9", label: "Not Aligned", action: "Polite decline, do not add to active tracking", sla: "1 week" },
];

export const users = [
  { name: "Jordan Reyes", email: "jordan.reyes@example.com", role: "Owner", status: "Active", lastLogin: "7/13/2026, 3:36 PM" },
  { name: "Priya Nandan", email: "priya.nandan@example.com", role: "Owner", status: "Active", lastLogin: "Never" },
  { name: "Marcus Cole", email: "marcus.cole@example.com", role: "Admin", status: "Active", lastLogin: "Never" },
  { name: "Elena Fischer", email: "elena.fischer@example.com", role: "Admin", status: "Active", lastLogin: "6/29/2026, 7:54 AM" },
  { name: "Ravi Shenoy", email: "ravi.shenoy@example.com", role: "Admin", status: "Active", lastLogin: "Never" },
  { name: "Demo Reviewer", email: "demo.reviewer@example.com", role: "Reviewer", status: "Active", lastLogin: "Never" },
];
