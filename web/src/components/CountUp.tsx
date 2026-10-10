"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/** Splits "~6,000" / "11,000+" / "100%" into prefix, number and suffix. */
function parse(value: string) {
  const m = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!m) return null;
  // A bare four-digit year reads oddly counting up from zero; leave it static.
  if (/^\d{4}$/.test(value)) return null;
  return { prefix: m[1], target: Number(m[2].replace(/,/g, "")), suffix: m[3], grouped: m[2].includes(",") };
}

/**
 * Counts a stat up from zero the first time it scrolls into view. Renders the
 * final value on the server and first paint, so it reads correctly without JS.
 */
export function CountUp({ value }: { value: string }) {
  const parts = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!parts || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    // Drop to zero while still off screen, so the count never visibly jumps back.
    // Deferred a frame to keep the setState out of the effect body.
    const pre = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top > window.innerHeight) setShown(0);
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(parts.target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(pre);
      cancelAnimationFrame(raf);
    };
    // parts is derived from value; re-run only when the value itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!parts || shown === null) return <span ref={ref}>{value}</span>;
  const num = parts.grouped ? shown.toLocaleString("en-IN") : String(shown);
  return (
    <span ref={ref} className="tabular-nums">
      {parts.prefix}
      {num}
      {parts.suffix}
    </span>
  );
}
