import Link from "next/link";
import { event } from "@/lib/data";
import { MailIcon, WhatsappIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div aria-hidden className="h-1 w-full bg-linear-to-r from-white/40 via-white to-white/40" />
      <div className="mx-auto grid max-w-6xl gap-9 px-6 py-12 sm:gap-10 sm:px-8 sm:py-14 md:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
        <div>
          <div className="font-heading text-2xl font-bold">{event.shortName}</div>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80">
            Organized by the {event.organizer}, in association with the {event.associate}.
          </p>
        </div>

        <div>
          <div className="mb-4 text-base font-bold">Quick Links</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] text-white/80 md:flex md:flex-col">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/registration" className="hover:text-white">Registration</Link>
            <Link href="/about#committee" className="hover:text-white">Committee</Link>
            <Link href="/explore" className="hover:text-white">Explore the Region</Link>
            <Link href="/contact#faq" className="hover:text-white">FAQ</Link>
            <Link href="/downloads" className="hover:text-white">Downloads</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        <div>
          <div className="mb-4 text-base font-bold">Contact</div>
          <div className="flex flex-col gap-2.5 text-[15px] text-white/80">
            <a href={`mailto:${event.submissionEmail}`} className="flex min-w-0 items-center gap-2 hover:text-white">
              <MailIcon size={18} className="shrink-0" />
              <span className="min-w-0 wrap-break-word">{event.submissionEmail}</span>
            </a>
            {event.whatsapp.map((num) => (
              <a
                key={num}
                href={`https://wa.me/${num.replace(/[^\d]/g, "")}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <WhatsappIcon size={18} /> {num}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-base font-bold">Address</div>
          <p className="text-[15px] leading-relaxed text-white/80">{event.venueFull}</p>
        </div>
      </div>
      <div className="border-t border-white/20">
        <p className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-white/70 sm:px-8">
          © 2026 GIET University, Department of Biotechnology. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
