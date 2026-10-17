import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { ThemeBook } from "@/components/ThemeBook";
import { CheckIcon, MailIcon } from "@/components/icons";
import { dates, event, themes, submissionGuidelines, importantDates } from "@/content";
import { formatDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Call for Papers — CABHBE-26",
};

export default function CallForPapersPage() {
  return (
    <>
      <PageHero
        eyebrow="Call for Papers"
        title="Submit your abstract, short paper or full manuscript"
        subtitle="All submissions are peer-reviewed. The selected full papers will be published in the conference proceedings."
      />

      <Section>
        <SectionHeading title="Theme of Papers" subtitle="Choose the track that fits your work." />
        <ThemeBook
          themes={themes}
          deadline={formatDate(dates.abstractDeadline)}
          email={event.submissionEmail}
        />
      </Section>

      <Section className="border-t border-border bg-wash">
        <SectionHeading title="Submission &amp; Presentation Guidelines" align="left" />
        <ul className="stagger mx-auto grid max-w-3xl gap-4">
          {submissionGuidelines.map((line) => (
            <li key={line} className="flex items-start gap-3 text-base leading-relaxed text-ink-mid sm:text-lg">
              <CheckIcon size={22} className="mt-1 shrink-0 text-red" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-border bg-bg p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-bold text-ink">
              Attach your abstract when you register, or email it
            </div>
            <a
              href={`mailto:${event.submissionEmail}`}
              className="mt-1 flex items-center gap-2 text-lg font-semibold text-red"
            >
              <MailIcon size={20} /> {event.submissionEmail}
            </a>
          </div>
          <Button href="/registration">Register to Present</Button>
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading title="Important Dates" />
        <div className="stagger mx-auto grid max-w-3xl gap-3 sm:gap-4">
          {importantDates.map((d) => (
            <div
              key={d.label}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-border bg-white px-6 py-5"
            >
              <span className="text-lg font-semibold text-ink">{d.label}</span>
              <span className="text-lg font-bold text-red">{d.date}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
