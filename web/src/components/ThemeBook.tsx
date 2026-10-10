"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  alt: string;
};

type Page =
  | { kind: "cover" }
  | { kind: "photo"; theme: Theme; track: number }
  | { kind: "text"; theme: Theme; track: number; tone: "green" | "cream" }
  | { kind: "close" };

/*
 * A concertina brochure: pages hinged edge to edge in a zig-zag. Geometry is worked
 * out in page-width units; CSS turns those into pixels through --pw, so the same
 * layout serves every breakpoint without JS knowing the screen size.
 */
const THETA = (48 * Math.PI) / 180;
const VISIBLE = 3.4;
const STEP_MS = 1100;
const HOLD_MS = 2900;

type Pose = { x: number; z: number; ry: number; opacity: number; shade: number; visible: boolean };

function wrapOffset(i: number, t: number, n: number) {
  let d = (((i - t) % n) + n) % n;
  if (d >= n / 2) d -= n;
  return d;
}

// Flat at the centre, alternating folds either side, passing through flat as a page turns.
function angleFor(d: number) {
  return -THETA * Math.cos(Math.PI * d) * Math.max(-1, Math.min(1, d));
}

function layout(n: number, t: number): Pose[] {
  const items = Array.from({ length: n }, (_, i) => ({ i, d: wrapOffset(i, t, n) }));
  const chain = items.filter((p) => Math.abs(p.d) <= VISIBLE + 0.1).sort((a, b) => a.d - b.d);

  // Hinge each page's left edge to the previous page's right edge.
  const hinges = new Map<number, { x: number; z: number; ry: number }>();
  let hx = 0;
  let hz = 0;
  for (const p of chain) {
    const ry = angleFor(p.d);
    hinges.set(p.i, { x: hx, z: hz, ry });
    hx += Math.cos(ry);
    hz -= Math.sin(ry);
  }

  // Pin the chain so the point at offset 0 sits at the stage centre.
  const c = chain.reduce((a, b) => (Math.abs(b.d) < Math.abs(a.d) ? b : a));
  const hc = hinges.get(c.i)!;
  const u = 0.5 - c.d;
  const ax = hc.x + u * Math.cos(hc.ry);
  const az = hc.z - u * Math.sin(hc.ry);

  return items.map(({ i, d }) => {
    const h = hinges.get(i);
    if (!h) return { x: 0, z: 0, ry: 0, opacity: 0, shade: 0, visible: false };
    const ad = Math.abs(d);
    // Rounded so the server-rendered style and the client's first render match exactly.
    const r3 = (v: number) => Math.round(v * 1000) / 1000;
    return {
      x: h.x - ax,
      z: h.z - az,
      ry: h.ry,
      visible: true,
      opacity: r3(Math.max(0, Math.min(1, (VISIBLE - ad) / 0.6))),
      shade: r3(Math.min(0.7, 0.55 * Math.abs(Math.sin(h.ry)) + 0.1 * Math.max(0, ad - 0.5))),
    };
  });
}

function poseStyle(p: Pose) {
  return {
    transform: `translate3d(calc(var(--pw) * ${p.x.toFixed(4)}), -50%, calc(var(--pw) * ${p.z.toFixed(4)})) rotateY(${p.ry.toFixed(4)}rad)`,
    opacity: p.opacity,
    visibility: (p.visible && p.opacity > 0.01 ? "visible" : "hidden") as "visible" | "hidden",
  };
}

const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const mod = (a: number, n: number) => ((a % n) + n) % n;

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function ThemeBook({
  themes,
  deadline,
  email,
}: {
  themes: Theme[];
  deadline: string;
  email: string;
}) {
  const pages: Page[] = [
    { kind: "cover" },
    ...themes.flatMap((theme, k): Page[] => [
      { kind: "photo", theme, track: k },
      { kind: "text", theme, track: k, tone: k % 2 === 0 ? "cream" : "green" },
    ]),
    { kind: "close" },
  ];
  const n = pages.length;

  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tRef = useRef(0);
  const rafRef = useRef(0);
  const dragX = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [userPlay, setUserPlay] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const playing = userPlay ?? !reduced;

  const apply = useCallback(
    (t: number) => {
      layout(n, t).forEach((p, i) => {
        const el = pageRefs.current[i];
        if (el) Object.assign(el.style, poseStyle(p));
        const sh = shadeRefs.current[i];
        if (sh) sh.style.opacity = String(p.shade);
      });
    },
    [n],
  );

  const goTo = useCallback(
    (target: number) => {
      cancelAnimationFrame(rafRef.current);
      const from = tRef.current;
      const delta = mod(target - from + n / 2, n) - n / 2;
      const to = from + (Math.abs(delta) < 1e-6 ? 0 : delta);
      const settle = () => {
        tRef.current = to;
        apply(to);
        setIndex(mod(Math.round(to), n));
      };
      if (reduced) return settle();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / STEP_MS);
        tRef.current = from + (to - from) * ease(p);
        apply(tRef.current);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
        else settle();
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [apply, n, reduced],
  );

  const step = useCallback((dir: number) => goTo(Math.round(tRef.current) + dir), [goTo]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || hovered || !inView) return;
    const id = window.setTimeout(() => step(1), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [index, playing, hovered, inView, step]);

  const activeTrack = (() => {
    const p = pages[index];
    return p.kind === "photo" || p.kind === "text" ? p.track : -1;
  })();

  const rest = layout(n, index);

  return (
    <div
      ref={rootRef}
      className="book"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div
        className="book-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Theme of papers brochure"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        onPointerDown={(e) => {
          dragX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          dragX.current = null;
        }}
      >
        <div className="book-world" aria-live={playing ? "off" : "polite"}>
          {pages.map((page, i) => (
            <div
              key={i}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="book-page"
              style={poseStyle(rest[i])}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={i !== index}
            >
              <PageBody page={page} folio={i + 1} total={n} deadline={deadline} email={email} />
              <span
                ref={(el) => {
                  shadeRefs.current[i] = el;
                }}
                className="book-shade"
                style={{ opacity: rest[i].shade }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      <div className="book-controls">
        <RoundButton label="Previous page" onClick={() => step(-1)}>
          <path d="m15 5-7 7 7 7" />
        </RoundButton>

        <div className="flex flex-1 flex-wrap justify-center gap-2">
          {themes.map((t, k) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => goTo(2 + 2 * k)}
              aria-pressed={activeTrack === k}
              className={`book-track ${activeTrack === k ? "is-active" : ""}`}
            >
              <span className="book-track-num">{k + 1}</span>
              <span className="hidden sm:inline">{t.short}</span>
            </button>
          ))}
        </div>

        <RoundButton label="Next page" onClick={() => step(1)}>
          <path d="m9 5 7 7-7 7" />
        </RoundButton>
        <RoundButton
          label={playing ? "Pause page turning" : "Resume page turning"}
          onClick={() => setUserPlay(!playing)}
        >
          {playing ? <path d="M9 6v12M15 6v12" /> : <path d="M8 5.5v13l10.5-6.5z" />}
        </RoundButton>
      </div>
    </div>
  );
}

function RoundButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="book-round">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

function Masthead() {
  return <div className="bp-mast">CABHBE · 26</div>;
}

function Folio({ n, total }: { n: number; total: number }) {
  return (
    <div className="bp-folio">
      {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  );
}

function PageBody({
  page,
  folio,
  total,
  deadline,
  email,
}: {
  page: Page;
  folio: number;
  total: number;
  deadline: string;
  email: string;
}) {
  if (page.kind === "photo") {
    return (
      <div className="bp bp-photo">
        <Image
          src={page.theme.image}
          alt={page.theme.alt}
          fill
          sizes="(min-width: 1024px) 330px, 300px"
          className="object-cover"
        />
        <div className="bp-photo-cap">
          <span>Track {page.track + 1}</span>
          {page.theme.short}
        </div>
      </div>
    );
  }

  if (page.kind === "text") {
    return (
      <div className={`bp ${page.tone === "green" ? "bp-green" : "bp-cream"}`}>
        <Masthead />
        <div className="bp-body">
          <div className="bp-eyebrow">Track {page.track + 1} of 3</div>
          <h3 className="bp-title">{page.theme.title}</h3>
          <div className="bp-rule" />
          <p className="bp-text">{page.theme.description}</p>
        </div>
        <div className="bp-foot">
          <span>Abstracts · short papers · full manuscripts</span>
          <Folio n={folio} total={total} />
        </div>
      </div>
    );
  }

  if (page.kind === "close") {
    return (
      <div className="bp bp-green">
        <Masthead />
        <div className="bp-body">
          <div className="bp-eyebrow">Submit by {deadline}</div>
          <div className="bp-numeral">250–300</div>
          <div className="bp-numeral-label">words per abstract</div>
          <div className="bp-rule" />
          <p className="bp-text">
            Arial 12 pt, single spacing. Every submission is peer-reviewed; selected full papers
            are published in the proceedings.
          </p>
        </div>
        <div className="bp-foot">
          <span>{email}</span>
          <Folio n={folio} total={total} />
        </div>
      </div>
    );
  }

  return (
    <div className="bp bp-green">
      <Masthead />
      <div className="bp-body">
        <div className="bp-eyebrow">Call for papers · 2026</div>
        <h3 className="bp-title bp-title-lg">Three tracks, one conference</h3>
        <div className="bp-rule" />
        <p className="bp-text">
          Abstracts, short papers and full manuscripts are welcome in each of the themes that
          follow.
        </p>
      </div>
      <div className="bp-foot">
        <span>10 – 12 December · Gunupur</span>
        <Folio n={folio} total={total} />
      </div>
    </div>
  );
}
