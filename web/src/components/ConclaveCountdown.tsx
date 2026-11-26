"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Live days/hours/minutes/seconds countdown to an ISO timestamp. */
export function ConclaveCountdown({ to }: { to: string }) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(to).getTime();
    const tick = () => setParts(partsUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [to]);

  const cells: [keyof Parts, string][] = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Min"],
    ["seconds", "Sec"],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label="Time until the conclave begins">
      {cells.map(([key, label]) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-xl border border-white/15 bg-white/[0.06] px-2 py-3 backdrop-blur-sm"
        >
          <span className="font-heading text-3xl font-bold tabular-nums text-white sm:text-4xl">
            {parts ? String(parts[key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">{label}</span>
        </div>
      ))}
    </div>
  );
}
