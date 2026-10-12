"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Advisor } from "@/content";

function initials(name: string) {
  const parts = name
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(?:Prof|Dr|Mr|Ms|Mrs)\.?/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
}

function AdvisorCard({ advisor, tint }: { advisor: Advisor; tint: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `bio-${advisor.name.replace(/[^a-z]/gi, "").toLowerCase()}-${tint}`;

  return (
    <figure
      className={`speaker-card w-72 shrink-0 overflow-hidden rounded-[18px] border border-border bg-white ${
        open ? "is-open" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {advisor.image ? (
          <Image
            src={advisor.image}
            alt={`Portrait of ${advisor.name}`}
            fill
            sizes="288px"
            quality={90}
            className="object-cover"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${
              tint % 2 === 0 ? "bg-red-tint text-red" : "bg-cyan-tint text-cyan-dark"
            }`}
          >
            <span className="font-heading text-5xl font-bold">{initials(advisor.name)}</span>
          </div>
        )}

        {advisor.bio && (
          <div
            id={panelId}
            className="speaker-panel absolute inset-x-0 top-0 bg-forest/95 p-5 backdrop-blur-sm"
          >
            <div className="pr-20 text-sm font-bold leading-snug text-gold">{advisor.name}</div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-white/90">{advisor.bio}</p>
          </div>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-xs font-bold text-ink-mid">
          {advisor.country}
        </span>
      </div>
      <figcaption className="flex flex-col gap-3 p-5">
        <div>
          <div className="text-[17px] font-bold leading-snug text-ink">{advisor.name}</div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-mid">{advisor.detail}</p>
        </div>
        {advisor.bio && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[13px] font-semibold text-red transition-colors hover:border-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            {open ? "Close" : "About"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="m6 15 6-6 6 6" />
            </svg>
          </button>
        )}
      </figcaption>
    </figure>
  );
}

const AUTO_PX_PER_S = 40;
const JUMP_MS = 450;
const HOLD_AFTER_INTERACTION_MS = 5000;

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const wrap = (v: number, m: number) => (m > 0 ? ((v % m) + m) % m : 0);

export function AdvisorMarquee({ advisors }: { advisors: Advisor[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dupRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const holdUntil = useRef(0);
  const offset = useRef(0);
  const period = useRef(0);
  const stepPx = useRef(312);
  const tween = useRef<{ from: number; to: number; start: number } | null>(null);
  const reduced = useRef(false);
  const dragX = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const dup = dupRef.current;
    if (!track || !dup) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One loop = distance from the first card to the first card of the duplicate set.
    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      const second = first?.nextElementSibling as HTMLElement | null;
      if (!first) return;
      period.current = dup.getBoundingClientRect().left - first.getBoundingClientRect().left;
      if (second) stepPx.current = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let inView = true;
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    io.observe(track);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const t = tween.current;
      if (t) {
        const p = Math.min(1, (now - t.start) / JUMP_MS);
        offset.current = t.from + (t.to - t.from) * easeOut(p);
        if (p >= 1) {
          tween.current = null;
          offset.current = wrap(offset.current, period.current);
        }
      } else if (inView && !reduced.current && !hovered.current && now > holdUntil.current) {
        offset.current = wrap(offset.current + AUTO_PX_PER_S * dt, period.current);
      }
      if (inView) track.style.transform = `translateX(${-wrap(offset.current, period.current)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const jump = (dir: 1 | -1) => {
    holdUntil.current = performance.now() + HOLD_AFTER_INTERACTION_MS;
    const from = tween.current ? tween.current.to : offset.current;
    // Snap to a card edge so repeated presses always land on whole cards.
    const base = Math.round(from / stepPx.current) * stepPx.current;
    const to = base + dir * stepPx.current;
    if (reduced.current) {
      tween.current = null;
      offset.current = wrap(to, period.current);
      return;
    }
    tween.current = { from: offset.current, to, start: performance.now() };
  };

  return (
    <div className="relative -mx-6 sm:-mx-8">
      <div
        className="marquee"
        role="region"
        aria-roledescription="carousel"
        aria-label="Guest speakers"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hovered.current = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") hovered.current = false;
        }}
        onFocusCapture={() => (hovered.current = true)}
        onBlurCapture={() => (hovered.current = false)}
        onClickCapture={() => (holdUntil.current = performance.now() + HOLD_AFTER_INTERACTION_MS)}
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 40) jump(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (dragX.current = null)}
      >
        <div ref={trackRef} className="marquee-track py-1">
          {advisors.map((a, i) => (
            <AdvisorCard key={a.name} advisor={a} tint={i} />
          ))}
          {/* Second copy exists only to make the loop seamless; inert keeps it out of
              the tab order and the accessibility tree. */}
          <div ref={dupRef} className="flex gap-6" aria-hidden inert>
            {advisors.map((a, i) => (
              <AdvisorCard key={`dup-${a.name}`} advisor={a} tint={i + advisors.length} />
            ))}
          </div>
        </div>
      </div>

      <ScrollButton side="left" onClick={() => jump(-1)} />
      <ScrollButton side="right" onClick={() => jump(1)} />
    </div>
  );
}

function ScrollButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous speaker" : "Next speaker"}
      className={`absolute top-37 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-ink shadow-[0_10px_24px_-10px_rgba(120,20,32,0.4)] transition-all hover:scale-105 hover:border-red hover:text-red active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={side === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
      </svg>
    </button>
  );
}
