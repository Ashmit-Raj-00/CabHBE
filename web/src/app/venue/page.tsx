import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { accommodation, campusGallery, campusLocation, event } from "@/content";
import {
  BuildingIcon,
  PinIcon,
  ArrowRightIcon,
  PlaneIcon,
  TrainIcon,
  RoadIcon,
} from "@/components/icons";
export const metadata: Metadata = {
  title: "Venue & Travel — CABHBE-26",
};

export default function VenuePage() {
  return (
    <>
      <PageHero
        eyebrow="Venue & Travel"
        title="GIET University, Gunupur, Odisha"
        subtitle="Set in the Eastern Ghats, close to the sacred Niyamgiri Hills and Odisha's tribal heartland."
      />

      <Section>
        <SectionHeading title="The Campus" align="left" />
        <div className="stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {campusGallery.map((photo, index) => (
            <figure
              key={photo.src}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="relative aspect-3/2 w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <figcaption className="px-3 py-2 text-sm font-semibold text-ink-mid">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-wash">
        <SectionHeading title="About GIET University" align="left" />
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <p className="text-lg leading-relaxed text-ink-mid">
            Gandhi Institute of Engineering and Technology University (GIETU) is a professionally
            managed, UGC &amp; AICTE-approved university established in 2018 under an Act of the
            State of Odisha. With state-of-the-art infrastructure and around 6,000 students, GIETU
            is committed to quality education, research and innovation, with recognition and
            accreditation from NBA, NAAC, ICAR and DSIR. The 113-acre campus hosts modern academic
            blocks, a mega auditorium, research and innovation centers, and residential facilities
            for students and visiting delegates.
          </p>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-bg p-6">
            <div className="text-sm font-semibold text-ink-soft">Want the full picture?</div>
            <p className="text-base text-ink-mid">
              Read more about the Department of Biotechnology and the BIRAC E-YUVA Center hosting
              CABHBE-26.
            </p>
            <Button href="/about" variant="outline" className="w-fit">
              About the University <ArrowRightIcon size={20} />
            </Button>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-heading mb-3 text-[26px] leading-tight text-ink sm:text-[34px]">Getting there</h2>
            <p className="text-lg leading-relaxed text-ink-mid">
              Gunupur, Odisha sits in the Eastern Ghats — reach it by air or rail via
              Visakhapatnam, Bhubaneswar, or Rayagada, then a short road stretch in.
            </p>
            <div className="mt-6 flex items-center gap-3 text-lg font-semibold text-ink">
              <PinIcon size={22} />
              {event.venueFull}
            </div>
            <Button href={campusLocation.directionsUrl} variant="outline" className="mt-6 w-fit">
              Get Directions
            </Button>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-border">
            <iframe
              title="Map showing GIET University, Gunupur, Odisha"
              src={campusLocation.embedUrl}
              className="h-56 w-full sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div role="region" aria-label="Ways to get here" tabIndex={0} className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-red sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 mt-8 sm:grid-cols-3">
          <TravelCard
            icon={<PlaneIcon size={22} />}
            title="By Air"
            illustration={<FlightPathArt />}
            routes={[
              { name: "Visakhapatnam (VTZ)", meta: "~200 km" },
              { name: "Bhubaneswar (BBI)", meta: "~320 km" },
              { name: "Utkela (UKE)", meta: "~130 km" },
            ]}
          />
          <TravelCard
            icon={<TrainIcon size={22} />}
            title="By Train"
            illustration={<RailTrackArt />}
            routes={[
              { name: "Gunupur (GNPR)", meta: "In town" },
              { name: "Rayagada Jn.", meta: "~65 km" },
            ]}
          />
          <TravelCard
            icon={<RoadIcon size={22} />}
            title="By Road"
            illustration={<RoadRouteArt />}
            routes={[
              { name: "Visakhapatnam", meta: "~4 hrs" },
              { name: "Bhubaneswar", meta: "~5–6 hrs" },
              { name: "Rayagada / Berhampur", meta: "~1.5 hrs" },
            ]}
          />
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-ink-soft sm:hidden">Swipe for more →</p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-bg p-5 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-lg font-bold text-ink">Need help planning your trip?</div>
            <p className="mt-1 text-base text-ink-mid">
              Contact the Convener or Organizing Secretary closer to the dates.
            </p>
          </div>
          <Button href="/contact" variant="link" className="shrink-0">
            Contact the Convener
          </Button>
        </div>
      </Section>

      <Section className="border-t border-border bg-wash">
        <SectionHeading title="Accommodation" align="left" />
        <div className="stagger grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg p-5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-tint text-blue">
              <BuildingIcon size={24} />
            </div>
            <div className="mb-2 text-lg font-bold text-ink">On-Campus Student Accommodation</div>
            <p className="text-base leading-relaxed text-ink-mid">{accommodation.onCampus}</p>
          </div>
          <div className="rounded-2xl border border-border bg-bg p-5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-tint text-red">
              <BuildingIcon size={24} />
            </div>
            <div className="mb-2 text-lg font-bold text-ink">Off-Campus</div>
            <p className="text-base leading-relaxed text-ink-mid">{accommodation.offCampus}</p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="overflow-hidden rounded-[20px] border border-border bg-white">
          <div className="relative h-36 w-full sm:h-44">
            <Image
              src="/images/culture/niyamgiri-hills.webp"
              alt="Forested ridges of the Eastern Ghats rising behind paddy fields near Gunupur"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-red">
                Beyond the conference hall
              </div>
              <h2 className="font-heading mt-2 text-3xl leading-tight text-ink">
                Explore the Land of Heritage
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-mid">
                Sacred Niyamgiri, the Dongria Kondh and Lanjia Saura, painted village walls and
                weekly hill markets — all within a few hours of campus.
              </p>
            </div>
            <Button href="/explore" className="w-fit lg:justify-self-end">
              Explore the Region <ArrowRightIcon size={20} />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function TravelCard({
  icon,
  title,
  illustration,
  routes,
}: {
  icon: ReactNode;
  title: string;
  illustration: ReactNode;
  routes: { name: string; meta: string }[];
}) {
  return (
    <div className="hover-lift w-[80%] shrink-0 snap-center sm:w-auto overflow-hidden rounded-2xl border border-border bg-bg">
      <div className="relative h-14 w-full overflow-hidden bg-blue-tint text-blue/50">
        {illustration}
        <div className="absolute left-4 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue shadow-sm">
          {icon}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 text-lg font-bold text-ink">{title}</div>
        <ul className="space-y-2">
          {routes.map((route) => (
            <li
              key={route.name}
              className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-t-0 first:pt-0"
            >
              <span className="text-sm font-semibold text-ink">{route.name}</span>
              <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-ink-soft">
                {route.meta}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FlightPathArt() {
  return (
    <svg
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="M-10 65 Q 90 15 150 45 T 310 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="14" cy="61" r="3.5" fill="currentColor" />
      <circle cx="286" cy="24" r="3.5" fill="currentColor" />
    </svg>
  );
}

function RailTrackArt() {
  return (
    <svg
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <line x1="-10" y1="30" x2="310" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="-10" y1="46" x2="310" y2="46" stroke="currentColor" strokeWidth="1.5" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={i}
          x1={-10 + i * 21}
          y1="26"
          x2={-10 + i * 21}
          y2="50"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function RoadRouteArt() {
  return (
    <svg
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="M-10 70 C 60 20, 110 80, 170 35 S 280 5, 310 15"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M-10 70 C 60 20, 110 80, 170 35 S 280 5, 310 15"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
