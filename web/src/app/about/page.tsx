import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { StatCard, Badge } from "@/components/cards";
import { Button } from "@/components/Button";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";
import {
  committee,
  conferenceAudience,
  event,
  trustBadges,
  university,
} from "@/content";

export const metadata: Metadata = {
  title: "About & Committee — CABHBE-26",
};

const jumpLinks = [
  { href: "#conference", label: "The Conference" },
  { href: "#university", label: "The University" },
  { href: "#hosts", label: "Our Hosts" },
  { href: "#committee", label: "Committee" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Biotechnology, brought together in Gunupur"
        subtitle="A multidisciplinary platform connecting universities, industry, healthcare and policy across three days — and the people organizing it."
      />

      <div className="sticky top-18 z-40 border-b border-border bg-white/92 backdrop-blur sm:top-23">
        <nav className="no-scrollbar mx-auto flex max-w-6xl gap-2.5 overflow-x-auto px-6 py-3 sm:flex-wrap sm:px-8 sm:py-3.5">
          {jumpLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold text-ink-mid transition-colors hover:border-red hover:bg-red hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* THE CONFERENCE */}
      <Section id="conference" className="scroll-mt-32 sm:scroll-mt-40">
        <SectionHeading title="About the Conference" align="left" />
        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-ink-mid">
            <p>
              CABHBE-26, organized by the {event.organizer}, marks the second edition of the
              International Conference on Advancement of Biotechnology in Healthcare, Bioproducts
              and Environmental Research. Scheduled for {event.dates}, it is envisioned as a
              multidisciplinary platform spanning the biotechnology, healthcare, environmental and
              life science sectors.
            </p>
            <p>
              Designed to facilitate high-impact national and global collaborations, CABHBE-26
              connects universities, research institutions, healthcare organizations, startups and
              innovation ecosystems to exchange scientific knowledge, showcase cutting-edge research
              and foster technology-driven partnerships.
            </p>
            <p>
              The programme emphasizes healthcare biotechnology, bioproduct innovation,
              environmental sustainability, industrial biotechnology, biomedical innovation and
              translational research — turning scientific discoveries into sustainable technologies
              and real-world solutions.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-7">
            <div className="text-sm font-semibold text-ink-soft">Recognition</div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {trustBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-bg px-3.5 py-1.5 text-sm font-semibold text-ink-mid"
                >
                  {b}
                </span>
              ))}
            </div>
            <Button href="/call-for-papers" variant="outline" className="mt-7 w-full">
              Call for Papers <ArrowRightIcon size={20} />
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-heading mb-5 text-2xl text-ink">Who it brings together</h3>
          <div className="stagger flex flex-wrap gap-2.5 sm:gap-3">
            {conferenceAudience.map((a) => (
              <Badge key={a}>{a}</Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* THE UNIVERSITY */}
      <Section id="university" className="scroll-mt-32 sm:scroll-mt-40 border-t border-border bg-wash">
        <SectionHeading title="About GIET University" align="left" />
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-5 text-lg leading-relaxed text-ink-mid">
            <p>
              Gandhi Institute of Engineering and Technology University (GIETU) is a professionally
              managed, UGC &amp; AICTE-approved university established in 2018 under an Act of the
              State of Odisha. With state-of-the-art infrastructure and around 6,000 students, it is
              committed to quality education, research and innovation.
            </p>
            <p>
              More than 11,000 graduates have completed their education here and are pursuing
              careers across India and abroad. The university holds recognition and accreditation
              from NBA, NAAC, ICAR and DSIR.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {university.accreditations.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-mid"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[20px] border border-border sm:h-80">
            <Image
              src="/images/venue/academic-block-aerial.jpg"
              alt="Aerial view of a GIET University academic block with the Eastern Ghats behind it"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="stagger mt-11 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {university.stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      {/* PROGRAMS & INNOVATION */}
      <Section className="border-t border-border">
        <SectionHeading
          title="Programs & innovation ecosystem"
          subtitle="What GIETU teaches, and the incubation infrastructure that sits behind CABHBE-26."
          align="left"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-8">
            <h3 className="font-heading mb-5 text-2xl text-ink">Programs offered</h3>
            <dl className="space-y-5">
              {university.programs.map((p) => (
                <div key={p.level} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                  <dt className="text-base font-bold text-ink">{p.level}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-ink-mid">{p.list}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8">
            <h3 className="font-heading mb-5 text-2xl text-ink">Innovation & incubation</h3>
            <ul className="space-y-4">
              {university.innovation.map((c) => (
                <li key={c.name} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
                    <CheckIcon size={16} />
                  </span>
                  <span>
                    <span className="block text-base font-bold text-ink">{c.name}</span>
                    <span className="mt-0.5 block text-[15px] leading-relaxed text-ink-mid">
                      {c.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* HOSTS */}
      <Section id="hosts" className="scroll-mt-32 sm:scroll-mt-40 border-t border-border bg-wash">
        <SectionHeading
          title="Our hosts"
          subtitle="CABHBE-26 is run by the Department of Biotechnology together with the BIRAC E-YUVA Center."
          align="left"
        />
        <div className="stagger grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-[20px] border border-border bg-bg">
            <div className="relative h-52 w-full">
              <Image
                src="/images/venue/school-of-sciences.webp"
                alt="The School of Sciences building at GIET University"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl text-ink">Department of Biotechnology</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-mid">
                Established in 2003 and accredited by NBA, the department works toward sustainable
                development and capacity building, with focused research and product development in
                frontier areas of biotechnology. It promotes innovation, entrepreneurship and
                independent projects, with opportunities to work on funded research.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Ph.D.", "M.Tech", "M.Sc.", "B.Tech"].map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-mid"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[20px] border border-border bg-bg">
            <div className="relative h-52 w-full">
              <Image
                src="/images/venue/research-center.jpg"
                alt="The Research and Innovation Center at GIET University"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl text-ink">BIRAC E-YUVA Center</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-mid">
                A dedicated biotechnology pre-incubation hub established with the support of the
                Biotechnology Industry Research Assistance Council (BIRAC), Government of India. It
                exists to ignite young minds — undergraduate, postgraduate and post-doctoral
                students — across life sciences, agriculture, healthcare and biotechnology.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Modern laboratories", "Mentorship", "Fellowships & funding", "Prototyping"].map(
                  (p) => (
                    <span
                      key={p}
                      className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-mid"
                    >
                      {p}
                    </span>
                  ),
                )}
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* COMMITTEE */}
      <Section id="committee" className="scroll-mt-32 sm:scroll-mt-40 border-t border-border">
        <SectionHeading
          title="Organizing & Advisory Committee"
          subtitle="The people steering CABHBE-26, from University leadership to our international advisory panel."
          align="left"
        />
        <div className="space-y-11">
          {committee.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading mb-5 flex items-center gap-4 text-2xl text-ink">
                {group.title}
                <span className="h-px flex-1 bg-border" />
                <span className="text-base font-semibold text-ink-soft">
                  {group.members.length}
                </span>
              </h3>
              <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((m) => (
                  <div
                    key={m.name}
                    className="hover-lift flex gap-4 rounded-2xl border border-border bg-white p-6"
                  >
                    {m.image && (
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                        <Image
                          src={m.image}
                          alt={`Portrait of ${m.name}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="text-[17px] font-bold leading-snug text-ink">{m.name}</div>
                      {m.role && (
                        <div className="mt-1.5 text-sm leading-relaxed text-ink-mid">{m.role}</div>
                      )}
                      {m.bio && (
                        <p className="mt-3 border-t border-border pt-3 text-[13px] leading-relaxed text-ink-soft">
                          {m.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
