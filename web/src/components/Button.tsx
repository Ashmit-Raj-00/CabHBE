import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "cream" | "outline" | "outline-light" | "ghost" | "link";

const variantClasses: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark",
  cream: "bg-cream text-forest hover:bg-red-tint",
  outline: "bg-white text-ink border-2 border-ink hover:bg-red hover:border-red hover:text-white",
  "outline-light": "bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-red",
  ghost: "bg-transparent text-ink hover:bg-black/5",
  link: "h-auto px-0 text-base bg-transparent text-red underline underline-offset-4 hover:text-red-dark",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red active:scale-[0.98]";

/** Sizing lives outside `base` so the link variant isn't forced to button height. */
const sizing = "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const lift = variant === "link" ? "" : "hover:-translate-y-0.5 hover:shadow-md";
  const size = variant === "link" ? "" : sizing;
  const classes = `${base} ${size} ${variantClasses[variant]} ${lift} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
