import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import {
  bankDetails,
  conclaveAccommodation,
  conclaveArrangements,
  conclaveReplyChecklist,
  conclaveAudience,
  conclaveHighlights,
  conclavePartners,
  conclaveStallFee,
  startupConclave,
} from "@/content";
import { CalendarIcon, CheckIcon, PinIcon, ArrowRightIcon, DnaIcon, UsersIcon, LeafIcon, GlobeIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Biotech Startup Conclave & Workshop — CABHBE-26",
  description: `${startupConclave.name}, ${startupConclave.dates}, ${startupConclave.venue}. Supported by BIRAC.`,
};

const highlightIcons = [DnaIcon, UsersIcon, LeafIcon, GlobeIcon];

export default function StartupConclavePage() {
  const s = startupConclave;
  return (
    <>
      <PageHero eyebrow={`${s.dates} · Gunupur, Odisha`} title={s.name} subtitle={`${s.tagline} — ${s.pillars.join(" · ")}`} />

      {/* Supported by / organized by */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-5 rounded-2xl border border-border bg-white p-5">
            <Image src={s.supporter.logo} alt="BIRAC" width={128} height={100} className="h-16 w-auto shrink-0" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Supported by</div>
              <div className="mt-1 font-semibold text-ink">{s.supporter.name}</div>
              <div className="text-sm text-ink-mid">{s.supporter.detail}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-border bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Organized by</div>
            <div className="mt-1 font-semibold text-ink">{s.organizer}</div>
            <div className="text-sm text-ink-mid">{s.organizerDetail}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-lg font-semibold text-ink">
          <span className="flex items-center gap-2"><CalendarIcon size={22} className="text-red" /> {s.dates}</span>
          <span className="flex items-center gap-2"><PinIcon size={22} className="text-red" /> {s.venue}</span>
        </div>
        <p className="mt-4 max-w-3xl text-base text-ink-mid">
          Organised by the {s.organizerName}, held alongside the {s.alongside}, at GIET University, Gunupur.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {s.registration.map((r, i) => (
            <Button key={r.href} href={r.href} variant={i === 0 ? "primary" : "outline"}>
              {r.label} <ArrowRightIcon size={20} />
            </Button>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-wash">
        <SectionHeading title="Key Highlights" />
        <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {conclaveHighlights.map((h, i) => {
            const Icon = highlightIcons[i % highlightIcons.length];
            return (
              <div key={h.title} className="flex flex-col rounded-2xl border border-border bg-white p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-red-tint text-red">
                  <Icon size={24} />
                </div>
                <h3 className="font-heading text-xl text-ink">{h.title}</h3>
                <p className="mt-2 text-base text-ink-mid">{h.body}</p>
                {h.note && (
                  <span className="mt-4 w-fit rounded-full bg-red px-3 py-1 text-sm font-semibold text-white">{h.note}</span>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading title="Opportunity to Connect" subtitle="Meet the people who move biotech ideas into the market." />
        <ul className="stagger flex flex-wrap justify-center gap-3">
          {conclaveAudience.map((a) => (
            <li key={a} className="rounded-full border border-border bg-white px-4 py-2 text-base font-semibold text-ink-mid">
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading
          title="For Participating Startups"
          subtitle="Arrangements for startups that have confirmed their participation."
        />
        <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conclaveArrangements.map((a) => (
            <div key={a.title} className="rounded-2xl border border-border bg-white p-6">
              <h3 className="font-heading text-xl text-ink">{a.title}</h3>
              <p className="mt-2 text-base text-ink-mid">{a.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-red-tint p-6">
          <h3 className="font-heading text-xl text-ink">After registering, email the organizers with</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {conclaveReplyChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-ink-mid">
                <CheckIcon size={20} className="mt-0.5 shrink-0 text-red" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Fee + how to pay */}
      <Section className="border-t border-border bg-wash">
        <SectionHeading title="Startup Stall Exhibition" align="left" />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6">
            <div className="text-sm font-semibold text-ink-soft">Exhibition fee</div>
            <div className="mt-1 font-heading text-4xl text-red">
              ₹{conclaveStallFee.amount}
              <span className="ml-2 font-sans text-base font-semibold text-ink-mid">{conclaveStallFee.per}</span>
            </div>
            <div className="mt-5 text-sm font-semibold text-ink-soft">Fee includes</div>
            <ul className="mt-2 flex flex-col gap-2">
              {conclaveStallFee.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-base text-ink-mid">
                  <CheckIcon size={20} className="mt-0.5 shrink-0 text-red" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6">
            <div className="text-sm font-semibold text-ink-soft">How to pay — bank / online transfer (startup exhibitors)</div>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-base">
              <dt className="text-ink-soft">Bank</dt><dd className="font-semibold text-ink">{bankDetails.bankName}</dd>
              <dt className="text-ink-soft">Branch</dt><dd className="font-semibold text-ink">{bankDetails.branch}</dd>
              <dt className="text-ink-soft">IFSC</dt><dd className="font-semibold text-ink">{bankDetails.ifsc}</dd>
              <dt className="text-ink-soft">Account name</dt><dd className="font-semibold text-ink">{bankDetails.accountName}</dd>
              <dt className="text-ink-soft">Account no.</dt><dd className="font-semibold text-ink">{bankDetails.accountNumber}</dd>
            </dl>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading title="Accommodation" align="left" />
            <ul className="flex flex-col gap-3">
              {conclaveAccommodation.map((a) => (
                <li key={a.text} className="rounded-2xl border border-border bg-white p-5 text-base text-ink-mid">
                  {a.text} <span className="font-semibold text-ink">({a.price})</span>.
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-3 rounded-2xl bg-red p-6 text-white">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Queries & accommodation</div>
            <div className="text-lg">
              <span className="font-semibold">{s.contact.name}</span>, {s.contact.role}
              <div className="text-sm text-white/80">{s.contact.title}</div>
            </div>
            <a href={`tel:${s.contact.phone.replace(/\s/g, "")}`} className="font-heading text-3xl hover:underline">
              {s.contact.phone}
            </a>
            {s.contact.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="flex items-center gap-2 hover:underline">
                <MailIcon size={20} /> {e}
              </a>
            ))}
            <Button href={s.registration[0].href} variant="cream" className="mt-2 w-fit">
              Register for the Conclave <ArrowRightIcon size={20} />
            </Button>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-wash">
        <SectionHeading title="Industry Partners" subtitle="The conclave is sponsored by our industry partners and supported by BIRAC." />
        <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-3">
          {conclavePartners.map((p) => (
            <div key={p.name} className="grid h-32 place-items-center rounded-2xl border border-border bg-white p-4">
              <Image src={p.logo} alt={p.name} width={p.width} height={p.height} className="max-h-20 w-auto" />
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading title="Event Poster" />
        <a href={s.poster} target="_blank" rel="noopener" className="mx-auto block max-w-md overflow-hidden rounded-2xl border border-border">
          <Image src={s.poster} alt={`${s.name} poster — ${s.dates}, ${s.venue}`} width={840} height={1429} className="h-auto w-full" />
        </a>
      </Section>
    </>
  );
}
