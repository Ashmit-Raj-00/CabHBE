"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades content up into place the first time it scrolls into view.
 * Starts fully visible on the server/first paint (safe if JS never runs),
 * then — once mounted — hides briefly and reveals on intersection.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "visible">("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    // Deferred to the next frame so the initial "hidden" state lands after the
    // idle-state paint, rather than as a same-tick setState-in-effect.
    const raf = requestAnimationFrame(() => {
      setState("hidden");
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const motion =
    state === "hidden"
      ? "opacity-0 translate-y-6"
      : state === "visible"
        ? "opacity-100 translate-y-0"
        : "";

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={`transition-all duration-700 ease-out ${motion} ${className}`}
    >
      {children}
    </div>
  );
}
