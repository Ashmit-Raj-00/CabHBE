// ─────────────────────────────────────────────────────────────────────────────
// CONFERENCE — the core facts: dates, name, contacts, fees, bank details,
// themes and paper guidelines. Most day-to-day edits happen in this file.
//
// Write every date once, below, as "YYYY-MM-DD". The site turns it into
// "30 November 2026" and reuses it everywhere: home page, Call for Papers,
// fee cards, the registration form, the FAQ, the countdown and the share image.
// ─────────────────────────────────────────────────────────────────────────────

import { formatDate, formatDateRange } from "@/lib/dates";

export const dates = {
  conferenceStart: "2026-12-10",
  conferenceEnd: "2026-12-12",
  abstractDeadline: "2026-11-15",
  acceptanceNotice: "2026-11-20",
  fullPaperDeadline: "2026-11-30",
  /** Early-bird fees apply through the end of this day; the standard fee applies after. */
  earlyBirdDeadline: "2026-11-30",
};

export const event = {
  shortName: "CABHBE-26",
  fullName:
    "2nd International Conference on Advancement of Biotechnology in Healthcare, Bioproducts and Environmental Research",
  edition: "2nd International Conference",
  dates: formatDateRange(dates.conferenceStart, dates.conferenceEnd),
  datesShort: formatDateRange(dates.conferenceStart, dates.conferenceEnd, false),
  startDate: `${dates.conferenceStart}T00:00:00`,
  venue: "GIET University, Gunupur, Odisha",
  venueFull: "GIET University, Gunupur, Odisha – 765022, India",
  organizer: "Department of Biotechnology, GIET University",
  associate: "DBT-BIRAC E-YUVA Center",
  submissionEmail: "conferencebiotech@giet.edu",
  website: "https://www.gietu.com/cabhbe-2026",
  conveners: [
    { role: "Convener", name: "Dr. Manoja Das", detail: "Associate Professor, Department of Biotechnology; Chief Coordinator, BIRAC E-YUVA Center, GIET University, Gunupur" },
    { role: "Co-Convener", name: "Dr. B. Rabi Prasad", detail: "Associate Professor & HoD, Department of Biotechnology, GIET University, Gunupur" },
  ],
  whatsapp: ["+91 94377 71065", "+91 94374 39725"],
};

export const importantDates = [
  { label: "Last date for Abstract Submission", date: formatDate(dates.abstractDeadline) },
  { label: "Notification of Acceptance", date: formatDate(dates.acceptanceNotice) },
  { label: "Submission of Full Paper", date: formatDate(dates.fullPaperDeadline) },
  { label: "Last date for Early-Bird Registration", date: formatDate(dates.earlyBirdDeadline) },
  { label: "Spot Registration", date: "Available at the venue" },
];

export const earlyBirdDeadline = {
  label: formatDate(dates.earlyBirdDeadline),
  short: formatDate(dates.earlyBirdDeadline, "short"),
  iso: `${dates.earlyBirdDeadline}T23:59:59`,
};

// Fees — `before` is the early-bird rate, `after` the standard rate. The
// registration form's category dropdown is built from this list.
export type FeeTier = {
  category: string;
  before: string;
  after: string;
  currency: "INR" | "USD";
};

export const feeTiers: FeeTier[] = [
  { category: "Academicians / Delegates", before: "2,500", after: "3,000", currency: "INR" },
  { category: "Research Scholar (Ph.D. / M.Tech. / M.Sc.)", before: "1,500", after: "2,000", currency: "INR" },
  { category: "Industry / R&D / Startup Organizations", before: "4,000", after: "5,000", currency: "INR" },
  { category: "Foreign Delegates", before: "300", after: "350", currency: "USD" },
  { category: "Members from Nepal, Bhutan, Sri Lanka and Bangladesh", before: "100", after: "150", currency: "USD" },
  { category: "Student (B.Tech. / B.Sc. / M.Sc. / M.Tech. / BE / Diploma)", before: "1,000", after: "1,200", currency: "INR" },
];

export const registrationCategories = feeTiers.map((f) => f.category);

export const bankDetails = {
  bankName: "State Bank of India",
  branch: "GIET University Campus",
  ifsc: "SBIN0017769",
  accountName: "Gandhi Institute of Engineering Technology",
  accountNumber: "38307594449",
};

export const themes = [
  {
    slug: "healthcare",
    title: "Healthcare & Biomedical Technologies",
    short: "Healthcare & Biomedical",
    description:
      "Advances in diagnostics, therapeutics and biomedical innovation for human health.",
    image: "/images/themes/healthcare.webp",
    alt: "Researcher examining a sample under a microscope in a laboratory",
  },
  {
    slug: "agriculture",
    title: "Sustainable Agriculture",
    short: "Sustainable Agriculture",
    description:
      "Biotechnological solutions for resilient crops, soil health and food security.",
    image: "/images/themes/agriculture.webp",
    alt: "Grower harvesting spring onions among leafy crops inside a polytunnel",
  },
  {
    slug: "environmental",
    title: "Environmental Biotechnology",
    short: "Environmental Biotech",
    description:
      "Bioremediation, waste valorisation and technologies for a cleaner environment.",
    image: "/images/themes/environmental.webp",
    alt: "Gloved hand pipetting into a test tube holding a green plant cutting",
  },
];

export const submissionGuidelines = [
  "Submissions in the form of abstracts, short papers and full manuscripts are welcomed.",
  "Abstract should be between 250–300 words, Arial font, 12 pt, with single line spacing. Title should be in 14 pt Arial, bold.",
  "Author's names, affiliation, complete address (including email) are required, Arial font 12 pt.",
  "Underline the name of the presenting author.",
  `Abstracts should be sent by email to the Convener, Organizing Committee (${event.submissionEmail}).`,
  "All submitted papers will be peer-reviewed, and the selected full papers shall be published in the conference proceedings.",
  "It is the responsibility of the corresponding author to confirm that the work has not been presented or published earlier.",
  "Only registered participants are permitted to present.",
  "Dimensions of posters should not exceed 4 ft × 3 ft.",
];

export const conferenceAudience = [
  "Academic scientists",
  "Faculty members",
  "Research scholars",
  "Healthcare professionals",
  "Technologists",
  "Entrepreneurs & innovators",
  "Policymakers",
  "Environmental scientists",
  "Government representatives",
  "Students",
];

export const trustBadges = [
  "NAAC Accredited",
  "AICTE Approved",
  "UGC Recognized",
  "DBT-BIRAC E-YUVA Center",
  "Peer-Reviewed Proceedings",
];

// Files on the Downloads page. Put the PDF in public/downloads/ and add a block here.
export const downloads = [
  {
    title: "Offline Registration Form",
    description: "Print and fill this out by hand if you'd rather not use the online form.",
    href: "/downloads/cabhbe26-registration-form.pdf",
  },
  {
    title: "Abstract Template",
    description: "A ready-to-use template matching the required formatting for abstract submissions.",
    href: "/downloads/cabhbe26-abstract-template.pdf",
  },
];
