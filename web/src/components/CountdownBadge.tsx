"use client";

import { useEffect, useState } from "react";
import { event } from "@/content";

export function CountdownBadge({ compact = false }: { compact?: boolean }) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(event.startDate).getTime();
    const update = () => {
      const diff = target - Date.now();
      setDaysLeft(Math.max(0, Math.ceil(diff / 86_400_000)));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`animate-pulsy flex flex-col items-center justify-center rounded-2xl border-2 border-red bg-white ${
        compact ? "h-[84px] w-24" : "h-24 w-[118px]"
      }`}
      aria-live="polite"
    >
      <div className={`font-heading font-bold text-red ${compact ? "text-3xl" : "text-4xl"}`}>
        {daysLeft ?? "—"}
      </div>
      <div className="text-xs font-semibold text-ink-mid">Days To Go</div>
    </div>
  );
}
