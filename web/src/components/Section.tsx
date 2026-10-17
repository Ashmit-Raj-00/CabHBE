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
      className={`mb-7 sm:mb-9 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <h2 className="font-heading text-[28px] leading-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-ink-mid sm:text-lg">{subtitle}</p>}
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
    <section id={id} className={`py-9 sm:py-14 ${className}`}>
      <Reveal className="mx-auto max-w-6xl px-6 sm:px-8">{children}</Reveal>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Less padding, for pages where the content below should start higher (e.g. a form). */
  compact?: boolean;
}) {
  return (
    <div className="relative overflow-hidden bg-forest">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_90%_at_90%_0%,rgba(255,255,255,0.14),transparent_60%)]"
      />
      <div
        className={`hero-in relative mx-auto max-w-6xl px-6 sm:px-8 ${compact ? "py-7 sm:py-10" : "py-9 sm:py-16"}`}
      >
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-cream/90 sm:mb-4 sm:px-4 sm:py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {eyebrow}
          </div>
        )}
        <h1 className="font-heading max-w-3xl text-[30px] leading-[1.15] text-cream sm:text-5xl sm:leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-cream/85 sm:mt-4 sm:text-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
