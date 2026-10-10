import type { ReactNode } from "react";
import { CountUp } from "./CountUp";
import { earlyBirdDeadline, type FeeTier } from "@/lib/data";

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="hover-lift rounded-2xl border border-border bg-white px-4 py-5 text-center sm:px-5 sm:py-7">
      <div className="font-heading text-3xl font-bold text-ink sm:text-4xl">
        <CountUp value={value} />
      </div>
      <div className="mt-1 text-sm font-semibold text-ink-mid sm:mt-1.5 sm:text-base">{label}</div>
    </div>
  );
}

const stepTones = ["bg-red", "bg-blue", "bg-red", "bg-blue", "bg-red-dark"];

export function DateTimeline({ items }: { items: { label: string; date: string }[] }) {
  return (
    <div className="relative">
      {/* connector sits behind the markers, spanning first to last */}
      <span
        aria-hidden
        className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-linear-to-r from-red via-blue to-red-dark sm:block"
      />
      <ol className="stagger relative grid gap-8 sm:grid-cols-5 sm:gap-5">
        {items.map((item, i) => (
          <li
            key={item.label}
            className="group relative flex items-start gap-5 sm:block sm:text-center"
          >
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="absolute left-7 top-16 h-[calc(100%-2rem)] w-0.5 bg-border sm:hidden"
              />
            )}
            <span
              className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-xl font-bold text-white ring-4 ring-wash transition-transform group-hover:scale-110 sm:mx-auto ${
                stepTones[i % stepTones.length]
              }`}
            >
              {i + 1}
            </span>
            <span className="block sm:mt-4">
              <span className="block text-lg font-bold leading-snug text-ink">{item.date}</span>
              <span className="mt-1 block text-[15px] leading-relaxed text-ink-mid">
                {item.label}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FeeCard({
  fee,
  dark = false,
  className = "",
}: {
  fee: FeeTier;
  dark?: boolean;
  className?: string;
}) {
  const symbol = fee.currency === "INR" ? "₹" : "$";
  if (dark) {
    return (
      <div className={`hover-lift rounded-[18px] bg-forest p-6 sm:p-7 ${className}`}>
        <div className="mb-4 text-lg font-bold text-white">{fee.category}</div>
        <div className="font-heading text-3xl font-bold text-cyan-bright">
          {symbol}{fee.before}
        </div>
        <div className="mb-3.5 mt-1 text-sm text-white/75">before {earlyBirdDeadline.short}</div>
        <div className="text-xl font-semibold text-white">
          {symbol}{fee.after} <span className="text-sm font-medium text-white/75">after</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`hover-lift rounded-[18px] border border-border bg-white p-6 sm:p-7 ${className}`}>
      <div className="mb-4 text-lg font-bold text-ink">{fee.category}</div>
      <div className="font-heading text-3xl font-bold text-red">
        {symbol}{fee.before}
      </div>
      <div className="mb-3.5 mt-1 text-sm text-ink-soft">before {earlyBirdDeadline.short}</div>
      <div className="text-xl font-semibold text-ink-mid">
        {symbol}{fee.after} <span className="text-sm font-medium text-ink-soft">after</span>
      </div>
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink-mid sm:px-5 sm:py-2.5 sm:text-[15px]">
      {children}
    </span>
  );
}
