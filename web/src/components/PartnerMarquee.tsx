import Image from "next/image";
import { conclavePartners } from "@/content";

/**
 * Infinite, floating logo slider for the conclave's industry partners.
 * Scrolls continuously, pauses on hover, and lifts the logo under the pointer.
 * The track holds the list twice so the -50% loop is seamless.
 */
export function PartnerMarquee() {
  // Repeat so the track is wider than any screen even with only a few partners.
  const half = Array.from({ length: 4 }, () => conclavePartners).flat();
  const track = [...half, ...half];

  return (
    <div className="group/marquee relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul style={{ animationDuration: "45s" }} className="animate-marquee flex w-max items-center gap-5 group-hover/marquee:[animation-play-state:paused]">
        {track.map((p, i) => {
          const card = (
            <div className="relative grid h-24 w-60 place-items-center rounded-2xl border border-white/60 bg-white px-6 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.06] hover:shadow-[0_28px_60px_-18px_rgba(255,77,103,0.75)] sm:h-28 sm:w-72">
              <Image
                src={p.logo}
                alt={i < conclavePartners.length ? p.name : ""}
                width={p.width}
                height={p.height}
                className={`h-auto max-h-16 w-auto max-w-full object-contain sm:max-h-[72px] ${p.fit}`}
              />
            </div>
          );
          return (
            <li key={i} aria-hidden={i >= conclavePartners.length || undefined} className="shrink-0">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener" tabIndex={i >= conclavePartners.length ? -1 : undefined}>
                  {card}
                </a>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
