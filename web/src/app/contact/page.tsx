import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { MailIcon, WhatsappIcon, PinIcon } from "@/components/icons";
import { event } from "@/lib/data";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Contact & FAQ — CABHBE-26",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & FAQ"
        title="Get in touch"
        subtitle="Reach the organizing team directly — or check the answers below first."
      />

      <Section>
        <div className="stagger grid gap-4 sm:grid-cols-2 sm:gap-6">
          {event.conveners.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border bg-white p-7">
              <div className="text-sm font-bold uppercase tracking-wide text-red">{c.role}</div>
              <div className="mt-2 text-xl font-bold text-ink">{c.name}</div>
              <p className="mt-2 text-base leading-relaxed text-ink-mid">{c.detail}</p>
            </div>
          ))}
        </div>

        <div className="stagger mt-4 grid gap-4 sm:mt-6 sm:grid-cols-3 sm:gap-6">
          <a
            href={`mailto:${event.submissionEmail}`}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-white p-6 text-lg font-semibold text-ink hover:border-red hover:text-red"
          >
            <MailIcon size={24} className="shrink-0" />
            <span className="min-w-0 wrap-break-word">{event.submissionEmail}</span>
          </a>
          {event.whatsapp.map((num) => (
            <a
              key={num}
              href={`https://wa.me/${num.replace(/[^\d]/g, "")}`}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-white p-6 text-lg font-semibold text-ink hover:border-red hover:text-red"
            >
              <WhatsappIcon size={24} className="shrink-0" />
              <span className="min-w-0 wrap-break-word">{num}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-white p-6 text-lg font-semibold text-ink">
          <PinIcon size={24} className="mt-0.5 shrink-0" />
          {event.venueFull}
        </div>
      </Section>

      <Section id="faq" className="scroll-mt-28 border-t border-border bg-wash">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Quick answers about registration, submissions, payment and travel."
        />
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {faqs.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink marker:content-none">
                {item.question}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none text-red transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-ink-mid">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
