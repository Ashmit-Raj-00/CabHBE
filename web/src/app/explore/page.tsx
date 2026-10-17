import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import {
  artForms,
  communities,
  craftInUse,
  dayTrips,
  heritageHighlights,
  natureNotes,
  visitingNotes,
} from "@/content";
import { SauraFrieze } from "@/components/tribal-art";
import { CountUp } from "@/components/CountUp";
import { ArrowRightIcon, LeafIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Explore the Land of Heritage — CABHBE-26",
  description:
    "The hills, art and communities around GIET University, Gunupur — Niyamgiri, the Dongria Kondh and Lanjia Saura, and the tribal art of southern Odisha.",
};

export default function ExplorePage() {
  return (
    <>
      {/* HERO */}
      <div className="relative overflow-hidden bg-forest">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-25">
          <SauraFrieze className="h-full w-full" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-8 px-6 pb-16 pt-8 sm:gap-10 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="hero-in">
            <div className="mb-3 inline-flex rounded-full border border-white/25 px-3.5 py-1.5 text-sm font-semibold text-white/80">
              Beyond the conference hall
            </div>
            <h1 className="font-heading text-[32px] leading-tight text-white sm:text-5xl">
              A land that still keeps its own <span className="text-cyan-bright">stories</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              GIET University sits in Rayagada district, where the Eastern Ghats fold into some of
              India&apos;s oldest living cultures. Come for the conference — stay a day longer for
              the hills, the art and the people who never left their roots.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="#gallery" variant="outline-light">
                Enter the Gallery
              </Button>
              <Button href="/venue" variant="outline-light">
                Plan Your Visit
              </Button>
            </div>
          </div>
          <figure className="hero-card-in mx-auto w-full max-w-72 sm:max-w-sm lg:mr-0 lg:max-w-[400px]">
            <div className="relative aspect-5/6 w-full overflow-hidden rounded-[18px] border border-white/15 bg-white/95">
              <Image
                src="/images/culture/saura-mandala.webp"
                alt="Ink drawing in the tribal folk idiom: rings of dancing figures circling a drummer, framed by geometric borders and rows of musicians"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/55">
              The circle dance — ink on paper, in the tribal folk idiom
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ORIENTATION */}
      <Section className="border-b border-border bg-wash py-11">
        <div className="stagger grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Figure value="62" label="Scheduled Tribes in Odisha" />
          <Figure value="13" label="Particularly Vulnerable Groups" />
          <Figure value="1,500 m+" label="Niyamgiri ridge line" />
          <Figure value="4" label="Living art traditions nearby" />
        </div>
      </Section>

      {/* ART GALLERY */}
      <Section id="gallery">
        <SectionHeading
          title="A gallery of living art"
          subtitle="Four traditions still made by hand within a few hours of campus — for use, for worship, and for each other, rarely for sale."
        />
        <div role="region" aria-label="Art gallery" tabIndex={0} className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-red sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 sm:gap-6">
          {artForms.map((art) => (
            <figure
              key={art.slug}
              className="hover-lift group w-[85%] shrink-0 snap-center sm:w-auto overflow-hidden rounded-[20px] border border-border bg-white"
            >
              <div className="relative overflow-hidden border-b border-border bg-bg p-4">
                <div className="relative h-44 w-full sm:h-52">
                  <Image
                    src={art.image}
                    alt={art.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
                  {art.community}
                </div>
              </div>
              <figcaption className="p-5">
                <div className="text-sm font-semibold uppercase tracking-wider text-red">
                  {art.tagline}
                </div>
                <h3 className="font-heading mt-1 text-2xl text-ink">{art.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-mid">{art.description}</p>
                <dl className="mt-4 space-y-1.5 border-t border-border pt-4">
                  {art.facts.map((fact) => (
                    <div key={fact.label} className="flex gap-4 text-sm">
                      <dt className="w-28 shrink-0 font-semibold text-ink-soft">{fact.label}</dt>
                      <dd className="font-semibold text-ink-mid">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-ink-soft sm:hidden">Swipe for more →</p>
        <div className="mt-9">
          <h3 className="font-heading mb-4 text-2xl text-ink">Craft in daily use</h3>
          <div role="region" aria-label="Craft in daily use" tabIndex={0} className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-red sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-3">
            {craftInUse.map((item) => (
              <figure key={item.image} className="w-[80%] shrink-0 snap-center sm:w-auto overflow-hidden rounded-[18px] border border-border bg-white">
                <div className="relative aspect-video w-full sm:aspect-4/3">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4">
                  <div className="text-base font-bold text-ink">{item.caption}</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-mid">{item.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-2 text-center text-sm font-semibold text-ink-soft sm:hidden">Swipe for more →</p>
        </div>
      </Section>

      {/* NIYAMGIRI */}
      <div className="border-y border-border">
        <div className="relative h-44 w-full sm:h-72">
          <Image
            src="/images/culture/niyamgiri-hills.webp"
            alt="Forested ridges of the Eastern Ghats rising behind terraced paddy fields and a rocky stream"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Section className="bg-wash">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red">
                <PinIcon size={18} /> Roughly 80 km from campus
              </div>
              <h2 className="font-heading text-[30px] leading-tight text-ink sm:text-4xl">
                Niyamgiri is not a view. It is a person.
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-ink-mid sm:text-lg">
                <p>
                  To the Dongria Kondh, the range is <strong className="text-ink">Niyam Raja</strong>
                  {" "}— the king who gives the law. The hill is not where the god lives; the hill is
                  the god. Streams are his, the sal and bamboo are his, and the fruit gardens on his
                  slopes are held in trust rather than owned.
                </p>
                <p>
                  That belief was tested when a bauxite deposit was found beneath the summit. In
                  2013, twelve Dongria villages were asked, one gram sabha at a time, whether mining
                  should go ahead. Every one of them said no — a decision that has since become a
                  landmark in how India weighs indigenous consent.
                </p>
                <p>
                  Delegates who make the drive to the foothills find no monument and no ticket
                  counter. Just a ridge line, orange and jackfruit trees planted under canopy, and
                  villages that measure wealth in what the forest still gives.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-border bg-bg p-5">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-tint text-red">
                  <LeafIcon size={24} />
                </div>
                <div className="mb-2 text-lg font-bold text-ink">What grows here</div>
                <p className="text-base leading-relaxed text-ink-mid">
                  Turmeric, ginger, pineapple, jackfruit, orange and millet — grown in mixed plots
                  under forest canopy, without clearing and largely without chemicals. Niyamgiri
                  turmeric carries a GI tag of its own.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-bg p-5">
                <div className="mb-2 text-lg font-bold text-ink">Where the hills come down</div>
                <p className="text-base leading-relaxed text-ink-mid">
                  Once a week the haat at Chatikona fills with Dongria families trading forest
                  produce. It is the most direct way to meet the community — on their terms,
                  mid-trade, rather than as an audience.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* PEOPLE */}
      <Section>
        <SectionHeading
          title="The people of these hills"
          subtitle="Southern Odisha holds more tribal communities than any other part of India. These are the neighbours closest to campus."
        />
        <figure className="mb-6 overflow-hidden rounded-[20px] border border-border">
          <div className="relative aspect-video w-full sm:aspect-3/1">
            <Image
              src="/images/culture/dongria-women.webp"
              alt="A line of Dongria Kondh women in white wraps, bead necklaces, neck rings and hairpins standing outside a thatched village house"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="bg-white px-5 py-3 text-[15px] text-ink-mid">
            Dongria Kondh women outside a village house on the Niyamgiri slopes — hairpins, neck
            rings and layered beads worn as everyday dress, not costume.
          </figcaption>
        </figure>
        <div role="region" aria-label="Communities" tabIndex={0} className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-red sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2">
          {communities.map((c) => (
            <div key={c.name} className="hover-lift w-[85%] shrink-0 snap-center sm:w-auto rounded-2xl border border-border bg-white p-5">
              <h3 className="font-heading text-2xl text-ink">{c.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>{c.language}</Chip>
                <Chip>{c.where}</Chip>
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-mid">{c.known}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-ink-soft sm:hidden">Swipe for more →</p>
      </Section>

      {/* NATURE */}
      <Section className="border-y border-border bg-wash">
        <SectionHeading title="The ground it all stands on" align="left" />
        <div role="region" aria-label="Nature notes" tabIndex={0} className="stagger no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-red sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-4">
          {natureNotes.map((n) => (
            <div key={n.title} className="w-[80%] shrink-0 snap-center sm:w-auto rounded-2xl border border-border bg-bg p-5">
              <div className="mb-2 text-lg font-bold text-ink">{n.title}</div>
              <p className="text-base leading-relaxed text-ink-mid">{n.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-ink-soft sm:hidden">Swipe for more →</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {heritageHighlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink-mid"
            >
              {h}
            </span>
          ))}
        </div>
      </Section>

      {/* DAY TRIPS */}
      <Section>
        <SectionHeading
          title="Worth the drive"
          subtitle="Distances from GIET University, Gunupur. Roads here are hill roads — allow more time than a map suggests."
        />
        <div className="grid gap-px overflow-hidden rounded-[20px] border border-border bg-border lg:grid-cols-2">
          {dayTrips.map((trip) => (
            <div
              key={trip.place}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-white px-5 py-3.5 sm:px-6 lg:last:odd:col-span-2"
            >
              <div className="min-w-50 flex-1">
                <div className="text-lg font-bold text-ink">{trip.place}</div>
                <div className="mt-0.5 text-[15px] text-ink-mid">{trip.note}</div>
              </div>
              <div className="flex shrink-0 gap-2">
                <span className="rounded-full border border-border px-3 py-1 text-sm font-semibold text-ink-soft">
                  {trip.distance}
                </span>
                <span className="rounded-full bg-blue-tint px-3 py-1 text-sm font-semibold text-blue-dark">
                  {trip.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ETIQUETTE */}
      <Section className="border-t border-border bg-wash">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-heading text-[26px] leading-tight text-ink sm:text-[34px]">Visiting well</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-mid">
              These are homes and working markets, not exhibits. A little care keeps them that way
              for the delegates who come after you.
            </p>
          </div>
          <ul className="stagger space-y-2.5">
            {visitingNotes.map((note) => (
              <li key={note} className="flex gap-4 rounded-2xl border border-border bg-bg p-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-red" />
                <span className="text-base leading-relaxed text-ink-mid">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="flex flex-col items-center gap-4 rounded-[20px] border border-border bg-white p-7 text-center">
          <h2 className="font-heading max-w-xl text-3xl leading-tight text-ink">
            Build a day around it
          </h2>
          <p className="max-w-xl text-lg text-ink-mid">
            The Organizing Secretary can help arrange transport and a local guide for delegates
            staying on either side of the conference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/venue">
              Travel &amp; Stay <ArrowRightIcon size={20} />
            </Button>
            <Button href="/contact" variant="outline">
              Contact the Organizers
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="font-heading text-4xl font-bold text-ink">
        <CountUp value={value} />
      </div>
      <div className="mt-1 text-[15px] font-semibold text-ink-mid">{label}</div>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-bg px-3 py-1 text-sm font-semibold text-ink-soft">
      {children}
    </span>
  );
}
