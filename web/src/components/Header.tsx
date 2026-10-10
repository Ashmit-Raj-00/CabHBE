"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DnaIcon, MenuIcon, CloseIcon } from "./icons";
import { event } from "@/lib/data";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/call-for-papers", label: "Call for Papers" },
  { href: "/venue", label: "Venue" },
  { href: "/explore", label: "Explore" },
  { href: "/contact", label: "Contact" },
];

/** The phone menu has room for the pages the desktop bar leaves to the footer. */
const mobileLinks = [
  ...navLinks.slice(0, 2),
  { href: "/registration", label: "Registration" },
  ...navLinks.slice(2),
  { href: "/downloads", label: "Downloads" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel on route change. Adjusting state during render
  // (comparing against the previous render's pathname) avoids a setState-in-effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/92 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:min-h-23 sm:gap-4 sm:px-8 sm:py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <DnaIcon size={32} className="shrink-0 text-red sm:size-9.5" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-heading whitespace-nowrap text-lg font-bold text-ink sm:text-xl">
              {event.shortName}
            </span>
            <span className="hidden whitespace-nowrap text-xs text-ink-soft sm:block">
              GIET University, Odisha
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-x-7 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link relative py-1 text-[17px] font-semibold ${
                  active ? "text-red" : "text-ink hover:text-red"
                }`}
              >
                {link.label}
                <span className={`nav-underline ${active ? "nav-underline-active" : ""}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <RegisterButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-ink transition-colors hover:border-red hover:text-red sm:h-11 sm:w-11 lg:hidden"
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
          open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 sm:px-8">
            {mobileLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-3 text-base font-semibold transition-colors ${
                    active ? "bg-red-tint text-red" : "text-ink hover:bg-red-tint"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

function RegisterButton() {
  return (
    <Link
      href="/registration"
      className="inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-red px-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-red-dark hover:shadow-lg active:translate-y-0 sm:h-13 sm:px-7 sm:text-base"
    >
      <span className="sm:hidden">Register</span>
      <span className="hidden sm:inline">Register Now</span>
    </Link>
  );
}
