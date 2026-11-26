"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { startupConclave } from "@/content";
import { ArrowRightIcon, CalendarIcon, CloseIcon, PinIcon } from "./icons";

const STORAGE_KEY = "conclave-popup-dismissed";

/**
 * Promo window for the Biotech Startup Conclave, shown once per browser session
 * a moment after the home page loads. Closes on the ✕ button, "Maybe later",
 * the backdrop, or Escape.
 */
export function ConclavePopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const s = startupConclave;

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const id = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="popup-fade fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="conclave-popup-title"
        className="popup-rise relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-[#120b10] text-white shadow-[0_40px_120px_-20px_rgba(184,22,43,0.6)] ring-1 ring-white/10 sm:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-red via-[#7a0f1f] to-[#120b10] p-7 sm:flex">
          <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative w-fit rounded-xl bg-white p-2.5">
            <Image src={s.supporter.logo} alt="BIRAC" width={128} height={100} className="h-12 w-auto" />
          </div>
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Save the date</div>
            <div className="mt-1 font-heading text-5xl font-bold leading-none">7–8</div>
            <div className="font-heading text-2xl">December 2026</div>
            <div className="mt-4 text-sm text-white/75">Supported by BIRAC · Organized by E-YUVA Center, GIET University</div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red/40 blur-3xl"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <CloseIcon size={18} />
          </button>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden />
              Now open · Startups
            </span>
            <h2 id="conclave-popup-title" className="mt-4 font-heading text-3xl leading-tight sm:text-4xl">
              Biotech Startup Conclave <span className="text-[#ff8a9a]">&amp; Workshop</span>
            </h2>
            <p className="mt-3 text-base text-white/75">
              {s.tagline}. Exhibit your startup, pitch your journey to 500+ delegates, and meet investors, industry
              leaders and mentors.
            </p>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-white/90">
              <li className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-[#ff8a9a]" /> {s.dates}
              </li>
              <li className="flex items-center gap-2">
                <PinIcon size={18} className="text-[#ff8a9a]" /> {s.venue}
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/startup-conclave"
                onClick={() => sessionStorage.setItem(STORAGE_KEY, "1")}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-red px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-dark"
              >
                Explore the Conclave <ArrowRightIcon size={20} />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="h-12 rounded-xl px-4 font-semibold text-white/70 transition hover:text-white"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
