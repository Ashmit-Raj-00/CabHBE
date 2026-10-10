"use client";

import { useEffect, useRef } from "react";

/**
 * Three soft, animated blobs behind the whole site. Sized in vw/clamp so they
 * scale down on small screens instead of overwhelming the viewport, and they
 * drift slightly toward the cursor on devices that actually have one.
 */
export function BackgroundBlobs() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduceMotion) return;

    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--parallax-x1", `${x * 18}px`);
        el.style.setProperty("--parallax-y1", `${y * 18}px`);
        el.style.setProperty("--parallax-x2", `${x * -14}px`);
        el.style.setProperty("--parallax-y2", `${y * -14}px`);
        el.style.setProperty("--parallax-x3", `${x * 10}px`);
        el.style.setProperty("--parallax-y3", `${y * -10}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="blob-parallax absolute -left-[18vw] -top-[18vw]"
        style={{ transform: "translate(var(--parallax-x1, 0), var(--parallax-y1, 0))" }}
      >
        <div className="animate-blob-a h-[clamp(220px,42vw,520px)] w-[clamp(220px,42vw,520px)] rounded-full bg-red/10 blur-3xl" />
      </div>
      <div
        className="blob-parallax absolute -right-[16vw] top-1/3"
        style={{ transform: "translate(var(--parallax-x2, 0), var(--parallax-y2, 0))" }}
      >
        <div className="animate-blob-b h-[clamp(180px,36vw,440px)] w-[clamp(180px,36vw,440px)] rounded-full bg-red/8 blur-3xl" />
      </div>
      <div
        className="blob-parallax absolute -bottom-[18vw] left-1/4"
        style={{ transform: "translate(var(--parallax-x3, 0), var(--parallax-y3, 0))" }}
      >
        <div className="animate-blob-c h-[clamp(200px,38vw,480px)] w-[clamp(200px,38vw,480px)] rounded-full bg-red-tint blur-3xl" />
      </div>
    </div>
  );
}
