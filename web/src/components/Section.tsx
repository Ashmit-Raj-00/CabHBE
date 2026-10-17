import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-5 sm:mb-7 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <h2 className="font-heading text-[26px] leading-tight text-ink sm:text-[34px]">{title}</h2>
      {subtitle && <p className="mt-2 text-base text-ink-mid sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-7 sm:py-11 ${className}`}>
      <Reveal className="mx-auto max-w-6xl px-6 sm:px-8">{children}</Reveal>
    </section>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="relative overflow-hidden bg-forest">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_90%_at_90%_0%,rgba(255,255,255,0.14),transparent_60%)]"
      />
      <div className="hero-in relative mx-auto max-w-6xl px-6 py-6 sm:px-8 sm:py-10">
        {eyebrow && (
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-white/10 px-3 py-1 text-sm font-semibold text-cream/90 sm:mb-3 sm:px-3.5 sm:py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {eyebrow}
          </div>
        )}
        <h1 className="font-heading max-w-3xl text-[27px] leading-[1.15] text-cream sm:text-[40px] sm:leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-base text-cream/85 sm:mt-3 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
