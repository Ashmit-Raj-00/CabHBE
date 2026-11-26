import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ConclaveCountdown } from "@/components/ConclaveCountdown";
import {
  bankDetails,
  conclaveAccommodation,
  conclaveArrangements,
  conclaveAudience,
  conclaveHighlights,
  conclavePartners,
  conclaveReplyChecklist,
  conclaveStallFee,
  conclaveStats,
  startupConclave,
} from "@/content";
import {
  ArrowRightIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  DnaIcon,
  GlobeIcon,
  LeafIcon,
  MailIcon,
  PinIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Biotech Startup Conclave & Workshop 2026 — GIET University",
  description: `${startupConclave.name}, ${startupConclave.dates}, ${startupConclave.venue}. Supported by BIRAC.`,
};

const DARK = "bg-[#0f0a0e]";
const highlightIcons = [DnaIcon, UsersIcon, LeafIcon, GlobeIcon];
const audienceIcons = [DnaIcon, BuildingIcon, GlobeIcon, BuildingIcon, UsersIcon, LeafIcon];

/* ── Small building blocks ─────────────────────────────────────────────── */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] ${
        light ? "text-[#ff8a9a]" : "text-red"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-[#ff8a9a]" : "bg-red"}`} aria-hidden />
      {children}
    </div>
  );
}

function Heading({ eyebrow, title, sub, light = false, center = false }: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`font-heading text-3xl leading-tight sm:text-[42px] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-3 text-lg ${light ? "text-white/70" : "text-ink-mid"}`}>{sub}</p>}
    </div>
  );
}

function Block({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden py-16 sm:py-24 ${className}`}>
      <Reveal className="relative mx-auto max-w-6xl px-6 sm:px-8">{children}</Reveal>
    </section>
  );
}

function CtaLink({ href, children, tone = "red" }: { href: string; children: ReactNode; tone?: "red" | "ghost" | "white" }) {
  const tones = {
    red: "bg-red text-white hover:bg-red-dark shadow-[0_12px_40px_-12px_rgba(184,22,43,0.8)]",
    ghost: "border border-white/25 bg-white/5 text-white hover:bg-white/15",
    white: "bg-white text-red hover:bg-red-tint",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`inline-flex h-13 items-center gap-2 rounded-xl px-6 text-base font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tones[tone]}`}
    >
      {children}
    </a>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function StartupConclavePage() {
  const s = startupConclave;
  const [conclaveForm, conferenceForm] = s.registration;

  return (
    <>
      {/* HERO */}
      <section className={`relative overflow-hidden ${DARK} text-white`}>
        <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_85%_20%,rgba(184,22,43,0.55),transparent_65%),radial-gradient(50%_60%_at_0%_100%,rgba(184,22,43,0.35),transparent_60%)]"
        />
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          fill="none"
          className="animate-floaty pointer-events-none absolute -left-24 top-20 h-96 w-96 opacity-[0.12]"
        >
          <path d="M140 20c0 60 120 60 120 120s-120 60-120 120s120 60 120 120" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <path d="M260 20c0 60-120 60-120 120s120 60 120 120s-120 60-120 120" stroke="#ff8a9a" strokeWidth="5" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="hero-in flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-red px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden />
                Registrations open
              </span>
              <span className="text-sm font-semibold text-white/70">Supported by BIRAC · Govt. of India</span>
            </div>

            <h1 className="font-heading text-[40px] font-bold leading-[1.02] tracking-tight sm:text-[64px]">
              Biotech
              <br />
              <span className="bg-gradient-to-r from-[#ff6b80] via-[#ff9aa8] to-white bg-clip-text text-transparent">
                Startup Conclave
              </span>
              <br />
              <span className="text-white/90">&amp; Workshop 2026</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              <span className="font-semibold text-white">{s.tagline}.</span> {s.pillars.join(" · ")}.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold">
              <span className="flex items-center gap-2"><CalendarIcon size={20} className="text-[#ff8a9a]" /> {s.dates}</span>
              <span className="flex items-center gap-2"><PinIcon size={20} className="text-[#ff8a9a]" /> {s.venue}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <CtaLink href={conclaveForm.href}>
                Register for the Conclave <ArrowRightIcon size={20} />
              </CtaLink>
              <CtaLink href={conferenceForm.href} tone="ghost">
                Free CABHBE-2026 pass
              </CtaLink>
            </div>
          </div>

          <div className="hero-card-in relative">
            <div aria-hidden className="absolute -inset-4 rounded-[32px] bg-red/30 blur-3xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Conclave begins in</div>
              <div className="mt-4">
                <ConclaveCountdown to={s.startsAt} />
              </div>
              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white p-4">
                <Image src={s.supporter.logo} alt="BIRAC" width={128} height={100} className="h-14 w-auto shrink-0" />
                <div className="text-ink">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">Supported by</div>
                  <div className="text-sm font-semibold leading-snug">{s.supporter.name}</div>
                </div>
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Organized by</div>
                <div className="mt-1 font-semibold">{s.organizer}</div>
                <div className="text-sm text-white/60">{s.organizerDetail}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner strip */}
        <div className="relative border-t border-white/10 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:gap-10 sm:px-8">
            <div className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">Industry partners</div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-12 gap-y-4 sm:justify-around">
              {conclavePartners.map((p) => (
                <Image key={p.name} src={p.logo} alt={p.name} width={p.width} height={p.height} className="h-12 w-auto sm:h-14" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-red text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-white/20 px-6 sm:px-8 lg:grid-cols-4 lg:divide-x">
          {conclaveStats.map((st) => (
            <div key={st.label} className="px-4 py-8 text-center">
              <div className="font-heading text-4xl font-bold sm:text-5xl">{st.value}</div>
              <div className="mt-2 text-sm text-white/80">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / ALONGSIDE */}
      <Block>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Heading eyebrow="About the conclave" title={<>Where biotech ideas meet <span className="text-red">the market</span></>} />
            <p className="text-lg leading-relaxed text-ink-mid">
              Organised by the {s.organizerName}, the conclave is held alongside the {s.alongside}, at GIET University,
              Gunupur. It brings startups face to face with industry leaders, investors, policymakers and scientists from
              healthcare, animal health, vaccines, life sciences and agriculture.
            </p>
          </div>
          <div className="stagger grid gap-4 sm:grid-cols-2">
            {conclaveHighlights.map((h, i) => {
              const Icon = highlightIcons[i % highlightIcons.length];
              return (
                <div
                  key={h.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red/40 hover:shadow-[0_24px_50px_-24px_rgba(184,22,43,0.45)]"
                >
                  <span className="absolute right-4 top-3 font-heading text-5xl font-bold text-red/[0.07]" aria-hidden>
                    0{i + 1}
                  </span>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-red to-[#6e0c1a] text-white shadow-lg shadow-red/30 transition-transform group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-ink">{h.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-mid">{h.body}</p>
                  {h.note && (
                    <span className="mt-3 inline-block rounded-full bg-red-tint px-3 py-1 text-xs font-bold text-red">{h.note}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Block>

      {/* WHO YOU'LL MEET */}
      <Block className={`${DARK} text-white`}>
        <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <Heading
          light
          center
          eyebrow="Opportunity to connect"
          title="Everyone who moves biotech forward, in one room"
        />
        <div className="stagger grid grid-cols-2 gap-4 md:grid-cols-3">
          {conclaveAudience.map((a, i) => {
            const Icon = audienceIcons[i % audienceIcons.length];
            return (
              <div
                key={a}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#ff8a9a]/50 hover:bg-white/[0.08]"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red/20 text-[#ff8a9a]">
                  <Icon size={22} />
                </div>
                <span className="font-semibold leading-snug">{a}</span>
              </div>
            );
          })}
        </div>
      </Block>

      {/* FOR PARTICIPATING STARTUPS */}
      <Block className="bg-wash">
        <Heading
          eyebrow="For participating startups"
          title={<>Everything is <span className="text-red">taken care of</span></>}
          sub="Arrangements for startups that have confirmed their participation."
        />
        <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conclaveArrangements.map((a, i) => (
            <div
              key={a.title}
              className="relative rounded-2xl border border-border bg-white p-6 pl-7 transition hover:shadow-[0_20px_40px_-24px_rgba(20,20,22,0.3)]"
            >
              <span className="absolute left-0 top-6 h-10 w-1 rounded-r-full bg-red" aria-hidden />
              <div className="text-xs font-bold tracking-[0.18em] text-red">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-1 font-heading text-xl font-semibold text-ink">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-mid">{a.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 rounded-3xl bg-ink p-7 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="font-heading text-2xl">After registering, email the organizers with:</h3>
            <ul className="mt-4 space-y-2">
              {conclaveReplyChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/85">
                  <CheckIcon size={20} className="mt-0.5 shrink-0 text-[#ff8a9a]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={`mailto:${s.contact.emails[0]}?subject=${encodeURIComponent("Biotech Startup Conclave 2026 — participation details")}`}
            className="inline-flex h-13 items-center gap-2 justify-self-start rounded-xl bg-red px-6 font-semibold transition hover:-translate-y-0.5 hover:bg-red-dark"
          >
            <MailIcon size={20} /> Email the organizers
          </a>
        </div>
      </Block>

      {/* FEE + PAY */}
      <Block>
        <Heading eyebrow="Exhibit with us" title="Startup stall exhibition" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red to-[#5c0a16] p-8 text-white">
            <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">Exhibition fee</div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-heading text-6xl font-bold">₹{conclaveStallFee.amount}</span>
                <span className="text-lg text-white/80">{conclaveStallFee.per}</span>
              </div>
              <div className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-white/70">Includes</div>
              <ul className="mt-3 space-y-2.5">
                {conclaveStallFee.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-red">
                      <CheckIcon size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-ink-soft">How to pay</div>
            <p className="mt-1 text-ink-mid">Bank / online account transfer (for startup exhibitors)</p>
            <dl className="mt-6 divide-y divide-border">
              {[
                ["Bank", bankDetails.bankName],
                ["Branch", bankDetails.branch],
                ["IFSC", bankDetails.ifsc],
                ["Account name", bankDetails.accountName],
                ["Account no.", bankDetails.accountNumber],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap justify-between gap-2 py-3">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="font-semibold text-ink tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Block>

      {/* PARTNERS */}
      <Block className="border-y border-border bg-wash">
        <Heading
          center
          eyebrow="Industry partners"
          title="Backed by industry"
          sub="The conclave is sponsored by our industry partners and supported by BIRAC."
        />
        <div className="stagger grid gap-5 sm:grid-cols-3">
          {conclavePartners.map((p) => (
            <div
              key={p.name}
              className="group grid h-44 place-items-center rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(20,20,22,0.35)]"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="max-h-24 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Block>

      {/* ACCOMMODATION + POSTER */}
      <Block>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Heading eyebrow="Stay" title="Accommodation" />
            <div className="space-y-4">
              {conclaveAccommodation.map((a) => (
                <div key={a.text} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-tint text-red">
                    <BuildingIcon size={20} />
                  </div>
                  <p className="text-ink-mid">
                    {a.text}. <span className="font-semibold text-ink">{a.price}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <a
            href={s.poster}
            target="_blank"
            rel="noopener"
            className="group mx-auto block max-w-sm overflow-hidden rounded-3xl border border-border shadow-[0_30px_60px_-30px_rgba(20,20,22,0.45)] transition hover:-translate-y-1"
          >
            <Image
              src={s.poster}
              alt={`${s.name} poster — ${s.dates}, ${s.venue}`}
              width={840}
              height={1429}
              className="h-auto w-full"
            />
          </a>
        </div>
      </Block>

      {/* FINAL CTA */}
      <section className={`relative overflow-hidden ${DARK} text-white`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgba(184,22,43,0.7),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
          <h2 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">Be part of the biotech revolution</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Questions, stalls or accommodation? Reach {s.contact.name}, {s.contact.role}, {s.contact.title}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink href={conclaveForm.href}>
              Register now <ArrowRightIcon size={20} />
            </CtaLink>
            <a
              href={`tel:${s.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex h-13 items-center rounded-xl border border-white/25 bg-white/5 px-6 font-semibold transition hover:bg-white/15"
            >
              {s.contact.phone}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70">
            {s.contact.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="flex items-center gap-2 hover:text-white">
                <MailIcon size={18} /> {e}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
