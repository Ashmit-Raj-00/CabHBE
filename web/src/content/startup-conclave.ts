// ─────────────────────────────────────────────────────────────────────────────
// BIOTECH STARTUP CONCLAVE & WORKSHOP — content for /startup-conclave.
// The page is linked only from the footer. Dates are written once as "YYYY-MM-DD".
// ─────────────────────────────────────────────────────────────────────────────

import { formatDateRange } from "@/lib/dates";

const conclaveDates = { start: "2026-12-07", end: "2026-12-08" };

export const startupConclave = {
  name: "Biotech Startup Conclave and Workshop",
  tagline: "From Ideas to Impact",
  pillars: ["Connecting Innovators", "Empowering Startups", "Building a Sustainable Bioeconomy"],
  dates: formatDateRange(conclaveDates.start, conclaveDates.end),
  // Conclave opens 9:00 IST on day one; used by the countdown.
  startsAt: `${conclaveDates.start}T09:00:00+05:30`,
  venue: "GIET University, Gunupur, Odisha, India",
  organizer: "E-YUVA Center, GIET University",
  organizerDetail: "A Biotech Pre-incubation Center of BIRAC at GIET University, Odisha",
  supporter: {
    name: "Biotechnology Industry Research Assistance Council (BIRAC)",
    detail: "A Govt. of India Enterprise",
    logo: "/images/startup/birac.png",
  },
  website: "https://www.gietubio.com/startupconclave",
  websiteLabel: "www.gietubio.com/startupconclave",
  organizerName: "DBT-BIRAC E-YUVA Centre, GIET University",
  alongside:
    "DBT, Govt. of India sponsored 2nd International Conference on Advancement of Biotechnology in Healthcare, Bioproducts and Environmental Research (CABHBE-2026), 6–8 December 2026",
  contact: {
    role: "Organizing Secretary",
    name: "Dr. Sudipta Maity",
    title: "Centre Coordinator, E-YUVA Center, GIET University",
    phone: "+91 72052 32542",
    emails: ["coordinator.eyuva@giet.edu", "birac.eyuva@giet.edu"],
  },
  registration: [
    {
      label: "Biotech Startup Conclave Registration",
      href: "https://forms.gle/nnXnMdtgNpMBdyAZ7",
    },
    {
      label: "CABHBE-2026 Conference Registration (complimentary for startups)",
      href: "https://forms.gle/6yFkVbmC4J3s4v4w9",
    },
  ],
  // The saved poster still shows the old 9–10 Dec dates. Export the 7–8 Dec flyer
  // to this path and set `poster` back to it to show it on the page again.
  poster: "" as string, // e.g. "/images/startup/conclave-poster.webp"
};

export const conclaveHighlights = [
  {
    title: "Startup Exhibition",
    body: "Showcase innovative biotech startups and emerging technologies.",
    note: "Stall size: 2 m × 2 m",
  },
  {
    title: "Panel Discussion",
    body: "Insights from industry leaders, investors and policymakers.",
  },
  {
    title: "Workshop",
    body: "Hands-on sessions with domain experts and mentors.",
  },
  {
    title: "Opportunity Connect",
    body: "Networking with stakeholders across biotech domains.",
  },
];

export const conclaveAudience = [
  "Researchers & Academicians",
  "Industry Experts",
  "Investors & Funding Agencies",
  "Policy Makers & Government Bodies",
  "Startups & Innovators",
  "Incubators & Accelerators",
];

export const conclaveStallFee = {
  amount: "1,000",
  per: "per person",
  includes: [
    "Lunch & dinner",
    "Space to exhibit (2 m × 2 m stall)",
    "Exhibition kit",
    "Complimentary access to the International Conference (CABHBE-2026)",
  ],
};

export const conclaveAccommodation = [
  {
    text: "Limited on-campus accommodation is available on a first-come, first-served basis at very reasonable rates",
    price: "₹600 – ₹800 per day",
  },
  {
    text: "Participants may also opt for a hotel in Gunupur — contact the Organizing Secretary to arrange it",
    price: "low budget: ₹1,000 – ₹1,200 per day",
  },
];

// What confirmed startup participants receive (from the organizers' participant email).
export const conclaveArrangements = [
  {
    title: "Exhibition Stall",
    body: "Each startup gets a 6 ft × 6 ft stall with one table and chairs. Power points and electricity connections are provided on request.",
  },
  {
    title: "Accommodation",
    body: "Arranged on the GIET University campus from 6 to 8 December 2026.",
  },
  {
    title: "Transportation",
    body: "Travel from Bhubaneswar to Gunupur is coordinated by Dr. Nivedita Jena (COO, ILS Bioincubator), who will accompany the startup teams.",
  },
  {
    title: "Complimentary Conference Registration",
    body: "All startup representatives are entitled to complimentary registration for CABHBE-2026.",
  },
  {
    title: "Startup Journey Talk",
    body: "Share your entrepreneurial story with an audience of 500+ students, researchers, faculty and delegates. Send the title of your talk to the organizers.",
  },
  {
    title: "Full Paper Publication",
    body: "Register for the conference at no extra cost and submit an abstract. Shortlisted full papers will be published in Springer Nature Group journals (Cureus Journals), subject to peer review.",
  },
  {
    title: "Networking",
    body: "Meet industry leaders and scientists from healthcare, animal health, vaccines, life sciences and agriculture — for mentorship, collaborations and market linkages.",
  },
];

// Details startups should email back to the organizers after registering.
export const conclaveReplyChecklist = [
  "Names and contact numbers of the team members attending",
  "Whether you need a power point or electricity connection at your stall",
  "Title of your startup journey talk (if interested)",
];

// Headline numbers for the stats band.
export const conclaveStats = [
  { value: "2", label: "Days of exhibition, talks & workshops" },
  { value: "500+", label: "Students, researchers, faculty & delegates" },
  { value: "6", label: "Stakeholder groups under one roof" },
  { value: "₹1,000", label: "Stall fee, with meals & conference access" },
];

// Industry partners sponsoring the conclave. Put the logo in public/images/startup/.
export const conclavePartners = [
  { name: "Panacea Biotec", logo: "/images/startup/panacea-biotec.png", width: 324, height: 210 },
  { name: "Ceramat", logo: "/images/startup/ceramat.png", width: 360, height: 114 },
  { name: "RR Animal Health Care Ltd.", logo: "/images/startup/rr-animal-health-care.png", width: 420, height: 192 },
];
