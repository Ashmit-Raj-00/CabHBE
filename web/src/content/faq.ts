// ─────────────────────────────────────────────────────────────────────────────
// FAQ — questions and answers on the Contact page.
//
// Dates, rates, the email address and WhatsApp numbers are filled in from the
// other content files (the ${...} parts), so they never go out of date here.
// To add a question, copy a { question, answer } block.
// ─────────────────────────────────────────────────────────────────────────────

import { formatDate } from "@/lib/dates";
import { dates, earlyBirdDeadline, event } from "./conference";
import { accommodation } from "./venue";

export const faqs = [
  {
    question: `Who can register for ${event.shortName}?`,
    answer:
      "Academicians, research scholars, industry and R&D professionals, students, and international delegates are all welcome. Registration categories and fees vary by group — see the Registration page for details.",
  },
  {
    question: "How do I submit an abstract or paper?",
    answer: `Attach your abstract as a PDF when you register to present (choose Oral or Poster on the registration form), or email your abstract, short paper, or full manuscript to ${event.submissionEmail}, following the formatting guidelines on the Call for Papers page (250–300 words, Arial 12pt for the body, Arial 14pt bold for the title). Only registered participants may present.`,
  },
  {
    question: "Do I need to register before submitting an abstract?",
    answer:
      "You can submit your abstract first — but presenting at the conference requires completed registration and payment before the event.",
  },
  {
    question: "What are the important deadlines?",
    answer: `Abstract submission closes ${formatDate(dates.abstractDeadline)} and notification of acceptance follows on ${formatDate(dates.acceptanceNotice)}. Full papers are due ${formatDate(dates.fullPaperDeadline)}, and early-bird registration closes ${earlyBirdDeadline.label}. Spot registration is available at the venue.`,
  },
  {
    question: "How do I pay the registration fee?",
    answer: `Pay by bank / online transfer to the account shown on the Registration page, then enter your transaction ID and date in the registration form and attach a screenshot of the payment. You'll get an email with your registration ID straight away, and another once the organizing committee has verified your payment. If you register offline, send a scan of the completed form with proof of payment to ${event.submissionEmail}.`,
  },
  {
    question: "What if I register after the early-bird deadline?",
    answer: `You can still register — the standard (after ${earlyBirdDeadline.label}) fee applies instead of the early-bird rate. See the fee table on the Registration page for exact amounts per category.`,
  },
  {
    question: "Is accommodation available?",
    answer: `Yes. Limited on-campus student hostel accommodation is available at ${accommodation.hostelRate} per day on a first-come-first-served basis. Participants may also opt for a hotel in Gunupur (low budget: ${accommodation.hotelRate} per day) — contact the Organizing Secretary for help.`,
  },
  {
    question: "How do I get to GIET University?",
    answer:
      "GIET University is in Gunupur, Odisha. Delegates typically travel via Visakhapatnam or Bhubaneswar with onward road connectivity to Gunupur. See the Venue & Travel page for a map and directions, and contact the Organizing Secretary for detailed travel guidance closer to the dates.",
  },
  {
    question: "Can I present a poster instead of an oral presentation?",
    answer:
      "Yes — indicate your preference (Oral or Poster) on the registration form. Poster dimensions should not exceed 4 ft × 3 ft.",
  },
  {
    question: "Will the papers be published?",
    answer:
      "All submitted papers are peer-reviewed, and the selected full papers are published in the conference proceedings.",
  },
  {
    question: "Who do I contact with other questions?",
    answer: `Reach the organizing team at ${event.submissionEmail} or via WhatsApp at ${event.whatsapp.join(" or ")} — full contact details are at the top of this page.`,
  },
];
