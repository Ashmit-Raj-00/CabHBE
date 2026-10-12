import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { DownloadIcon } from "@/components/icons";
import { downloads } from "@/content";

export const metadata: Metadata = {
  title: "Downloads — CABHBE-26",
};

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title="Forms & Templates"
        subtitle="Everything you need to register offline or prepare your submission."
      />

      <Section>
        <div className="stagger mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {downloads.map((file) => (
            <a
              key={file.href}
              href={file.href}
              download
              className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-7 hover:border-red"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-tint text-red">
                <DownloadIcon size={22} />
              </div>
              <div className="text-lg font-bold text-ink">{file.title}</div>
              <p className="text-base leading-relaxed text-ink-mid">{file.description}</p>
              <span className="text-sm font-semibold text-red">Download PDF</span>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-dashed border-border bg-bg p-7 text-center">
          <div className="text-lg font-bold text-ink">Official Conference Brochure</div>
          <p className="mt-2 text-base text-ink-mid">
            Coming soon — check back closer to the event, or contact the organizing team for a copy.
          </p>
        </div>
      </Section>
    </>
  );
}
