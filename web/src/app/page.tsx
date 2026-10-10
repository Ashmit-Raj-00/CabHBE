import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CountdownBadge } from "@/components/CountdownBadge";
import { Section, SectionHeading } from "@/components/Section";
import { StatCard, DateTimeline, Badge, FeeCard } from "@/components/cards";
import { ThemeBook } from "@/components/ThemeBook";
import { AdvisorMarquee } from "@/components/AdvisorMarquee";
import {
  CalendarIcon,
  PinIcon,
  ArrowRightIcon,
  DnaIcon,
  CheckIcon,
  MailIcon,
  DownloadIcon,
} from "@/components/icons";
import {
  event,
  themes,
  importantDates,
  trustBadges,
  advisoryPanel,
  feeTiers,
  earlyBirdDeadline,
} from "@/lib/data";

const abstractDeadline =
  importantDates.find((d) => d.label.includes("Abstract"))?.date ?? "";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-forest py-10 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_10%,rgba(255,255,255,0.16),transparent_60%),radial-gradient(70%_60%_at_0%_100%,rgba(255,255,255,0.08),transparent_60%)]"
        />
        <svg
          className="animate-floaty pointer-events-none absolute -right-24 top-10 h-105 w-105 opacity-[0.18] sm:h-130 sm:w-130"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden
        >
          <path
            d="M140 20c0 60 120 60 120 120s-120 60-120 120s120 60 120 120"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M260 20c0 60-120 60-120 120s120 60 120 120s-120 60-120 120"
            stroke="#FFD6DC"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="140" cy="20" r="7" fill="#FFFFFF" />
          <circle cx="260" cy="140" r="7" fill="#FFD6DC" />
          <circle cx="140" cy="260" r="7" fill="#FFFFFF" />
          <circle cx="260" cy="380" r="7" fill="#FFD6DC" />
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div className="hero-in flex flex-col gap-4 sm:gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/30 bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-cream/90 sm:px-4.5 sm:py-2.5 sm:text-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
              Department of Biotechnology &nbsp;·&nbsp; in association with {event.associate}
            </div>

            <h1 className="font-heading text-[28px] leading-[1.15] text-cream sm:text-[42px] sm:leading-[1.1]">
              2<sup className="text-[0.5em]">nd</sup> International Conference on{" "}
              <span className="text-gold">Biotechnology</span> in Healthcare, Bioproducts &amp;
              Environmental Research
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-xl">
              Three days in the Eastern Ghats bringing together academicians, researchers, industry
              leaders and students to share advances shaping the future of biotechnology.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:mt-1 sm:gap-4">
              <Button href="/registration" variant="cream">
                Register Now
              </Button>
              <Button href="/call-for-papers" variant="outline-light">
                Submit Your Abstract
              </Button>
            </div>
          </div>

          <div className="hero-card-in rounded-[22px] bg-cream p-6 shadow-[0_40px_80px_-30px_rgba(90,8,20,0.55)] sm:p-7">
            <div className="flex items-center gap-5 border-b border-border pb-6">
              <CountdownBadge />
              <div>
                <div className="text-sm font-semibold text-ink-soft">Conference begins</div>
                <div className="font-heading text-2xl leading-tight text-ink">{event.dates}</div>
              </div>
            </div>
            <dl className="mt-6 space-y-5">
              <GlanceRow
                icon={<PinIcon size={20} />}
                label="Venue"
                value={event.venue}
                tone="blue"
              />
              <GlanceRow
                icon={<CalendarIcon size={20} />}
                label="Abstract deadline"
                value={abstractDeadline}
              />
              <GlanceRow
                icon={<DnaIcon size={20} />}
                label="Tracks"
                value="3 paper themes"
                tone="blue"
              />
              <GlanceRow
                icon={<CheckIcon size={20} />}
                label="Proceedings"
                value="Peer-reviewed; selected full papers published"
              />
            </dl>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <Section className="py-9">
        <div className="stagger grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          <StatCard value="3" label="Days of Conference" />
          <StatCard value="3" label="Paper Themes" />
          <StatCard value="2nd" label="Edition of CABHBE" />
          <StatCard value="100%" label="Peer-Reviewed" />
        </div>
      </Section>

      {/* THEME OF PAPERS */}
      <Section className="border-t border-border bg-wash">
        <SectionHeading
          title="Theme of Papers"
          subtitle="Three focus tracks welcoming abstracts, short papers and full manuscripts. Turn the pages, or pick a track."
        />
        <ThemeBook themes={themes} deadline={abstractDeadline} email={event.submissionEmail} />
      </Section>

      {/* CALL FOR PAPERS */}
      <Section className="bg-forest">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wider text-cyan-bright">
              Call for Papers
            </div>
            <h2 className="font-heading text-[28px] leading-tight text-white sm:text-4xl">
              Present your work in Gunupur
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              Abstracts, short papers and full manuscripts are all welcome. Every submission is
              peer-reviewed, and the selected full papers will be published in the conference
              proceedings.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="/call-for-papers" variant="cream">
                Submission Guidelines <ArrowRightIcon size={20} />
              </Button>
              <Button href="/downloads" variant="outline-light">
                <DownloadIcon size={20} /> Abstract Template
              </Button>
            </div>
          </div>

          <div className="stagger grid gap-3 sm:gap-4">
            <SpecRow label="Abstract length" value="250–300 words, Arial 12 pt" />
            <SpecRow label="Poster size" value="No larger than 4 ft × 3 ft" />
            <SpecRow label="Submit to" value={event.submissionEmail} icon />
            <SpecRow label="Deadline" value={abstractDeadline} highlight />
          </div>
        </div>
      </Section>

      {/* GUEST SPEAKERS */}
      <Section>
        <SectionHeading
          title="Guest Speakers"
          subtitle="Joining CABHBE-26 from India, Indonesia, Ireland, Vietnam, Bangladesh and Taiwan. Tap About on any card to read more."
        />
        <AdvisorMarquee advisors={advisoryPanel} />
        <div className="mt-9 text-center">
          <Button href="/about#committee" variant="outline">
            See the Full Committee <ArrowRightIcon size={20} />
          </Button>
        </div>
      </Section>

      {/* IMPORTANT DATES */}
      <Section className="relative overflow-hidden border-y border-border bg-wash">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-tint blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-red-tint blur-3xl"
        />
        <div className="relative">
          <SectionHeading
            title="Important Dates"
            subtitle="Four deadlines between now and December — and spot registration if you miss them."
          />
          <DateTimeline items={importantDates} />
        </div>
      </Section>

      {/* REGISTRATION */}
      <Section>
        <SectionHeading
          title="Registration"
          subtitle={`Early-bird rates hold until ${earlyBirdDeadline.label} — the standard fee applies after that.`}
        />
        <div className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-3 sm:gap-6">
          {feeTiers.slice(0, 3).map((fee, i) => (
            <FeeCard key={fee.category} fee={fee} dark={i === 1} className="w-[82%] shrink-0 snap-center sm:w-auto" />
          ))}
        </div>
        <p className="mt-1 text-center text-sm font-semibold text-ink-soft sm:hidden">
          Swipe for more categories →
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-base text-ink-mid">
            Foreign delegates, students and SAARC-region participants have their own rates — the
            full table is on the registration page, along with bank details.
          </p>
          <Button href="/registration">
            See All Fees &amp; Register <ArrowRightIcon size={20} />
          </Button>
        </div>
      </Section>

      {/* VENUE TEASER */}
      <Section className="border-t border-border bg-wash">
        <div className="grid items-center gap-8 sm:gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-heading text-[28px] leading-tight text-ink sm:text-4xl">
              Gunupur, Odisha — where biotechnology meets heritage
            </h2>
            <p className="mt-4.5 mb-6 text-lg leading-relaxed text-ink-mid">
              GIET University sits amid the Eastern Ghats, an hour or two from sacred Niyamgiri,
              painted Soura villages and the weekly hill markets of the Dongria Kondh. Delegates
              arrive by air or rail via Visakhapatnam, Bhubaneswar or Rayagada, with the last
              stretch covered by road.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/explore">Explore the Land</Button>
              <Button href="/venue" variant="outline">
                Plan Your Visit
              </Button>
            </div>
          </div>
          <div className="relative h-70 overflow-hidden rounded-[20px]">
            <Image
              src="/images/venue/hostel-block.jpg"
              alt="GIET University campus with the Eastern Ghats hills in the background"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4.5 left-4.5 rounded-lg bg-white/90 px-3.5 py-2 text-sm font-semibold text-ink">
              GIET University Campus, Gunupur
            </div>
          </div>
        </div>
      </Section>

      {/* CLOSING */}
      <Section className="border-t border-border">
        <div className="rounded-3xl border border-border bg-white px-5 py-10 text-center sm:px-8 sm:py-12">
          <h2 className="font-heading mx-auto max-w-2xl text-[28px] leading-tight text-ink sm:text-4xl">
            Join us in Gunupur this December
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-mid">
            Registration is open now, and spot registration will also be available at the venue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/registration">Register Now</Button>
            <Button href="/contact" variant="outline">
              <MailIcon size={20} /> Ask a Question
            </Button>
          </div>
          <div className="stagger mt-10 flex flex-wrap justify-center gap-2.5 border-t border-border pt-9 sm:gap-3.5">
            {trustBadges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function GlanceRow({
  icon,
  label,
  value,
  tone = "green",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone?: "green" | "blue";
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          tone === "blue" ? "bg-blue-tint text-blue" : "bg-red-tint text-red"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <dt className="text-sm font-semibold text-ink-soft">{label}</dt>
        <dd className="text-[17px] font-bold leading-snug text-ink">{value}</dd>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  highlight = false,
  icon = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl border px-6 py-5 ${
        highlight ? "border-white/60 bg-white/15" : "border-white/25 bg-white/10"
      }`}
    >
      <span className="text-sm font-semibold uppercase tracking-wider text-white/75">{label}</span>
      <span
        className={`flex min-w-0 items-center gap-2 text-[17px] font-bold wrap-break-word ${
          highlight ? "text-cyan-bright" : "text-white"
        }`}
      >
        {icon && <MailIcon size={18} className="shrink-0" />}
        {value}
      </span>
    </div>
  );
}
