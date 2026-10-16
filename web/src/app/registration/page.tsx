import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { FeeCard } from "@/components/cards";
import { RegistrationForm } from "@/components/RegistrationForm";
import { bankDetails, earlyBirdDeadline, event, feeTiers } from "@/content";

export const metadata: Metadata = {
  title: "Registration — CABHBE-26",
};

export default function RegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration"
        title="Register for CABHBE-26"
        subtitle={`Simple, transparent pricing — register on or before ${earlyBirdDeadline.label} for early-bird rates.`}
      />

      <Section>
        <SectionHeading title="Registration Fees" align="left" />
        <div className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {feeTiers.map((fee) => (
            <FeeCard
              key={fee.category}
              fee={fee}
              dark={fee.category === "Foreign Delegates"}
              className="w-[82%] shrink-0 snap-center sm:w-auto"
            />
          ))}
        </div>
        <p className="mt-1 text-center text-sm font-semibold text-ink-soft sm:hidden">
          Swipe for more categories →
        </p>
      </Section>

      <Section className="border-t border-border bg-wash">
        <SectionHeading title="Registration Form" align="left" />
        <RegistrationForm />
      </Section>

      <Section className="border-t border-border">
        <SectionHeading title="How to Pay" align="left" />
        <div className={`grid gap-8 ${bankDetails.qrImage ? "lg:grid-cols-[1fr_320px]" : ""}`}>
          <div className="rounded-2xl border border-border bg-white p-5 sm:p-7">
            <div className="mb-4 text-lg font-bold text-ink">Bank / Online Account Transfer</div>
            <dl className="grid gap-3 text-base text-ink-mid sm:grid-cols-2">
              <div>
                <dt className="text-sm text-ink-soft">Bank Name</dt>
                <dd className="font-semibold text-ink">{bankDetails.bankName}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Branch</dt>
                <dd className="font-semibold text-ink">{bankDetails.branch}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">IFSC Code</dt>
                <dd className="font-semibold text-ink">{bankDetails.ifsc}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Account Name</dt>
                <dd className="font-semibold text-ink">{bankDetails.accountName}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-ink-soft">Account No.</dt>
                <dd className="font-semibold text-ink">{bankDetails.accountNumber}</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm text-ink-soft">
              After payment, enter your transaction ID in the form above and attach a screenshot or
              PDF of the payment. Already registered? Email your transaction ID and payment proof to{" "}
              <span className="font-semibold text-ink">{event.submissionEmail}</span>, quoting your
              registration ID.
            </p>
          </div>

          {bankDetails.qrImage && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-7 text-center">
              <Image
                src={bankDetails.qrImage}
                alt={`QR code to pay ${bankDetails.accountName}`}
                width={200}
                height={200}
                className="h-50 w-50 rounded-xl"
              />
              <p className="mt-4 text-sm text-ink-soft">Scan with any UPI app to pay.</p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
