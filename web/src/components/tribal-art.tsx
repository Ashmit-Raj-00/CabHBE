const CHALK = "#FFFFFF";

function SauraFigure({
  x,
  y,
  s = 1,
  arms = "down",
}: {
  x: number;
  y: number;
  s?: number;
  arms?: "down" | "side" | "up";
}) {
  const armPath =
    arms === "up"
      ? "M-5 -11 L-11 -20 M5 -11 L11 -20"
      : arms === "side"
        ? "M-5 -11 L-13 -9 M5 -11 L13 -9"
        : "M-5 -11 L-10 -2 M5 -11 L10 -2";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-19" r="3.4" fill={CHALK} />
      <path d="M0 -15.6 L0 -12.5" stroke={CHALK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M-5.2 -12 L5.2 -12 L0 -4 Z" fill={CHALK} />
      <path d="M0 -4 L5.2 4 L-5.2 4 Z" fill={CHALK} />
      <path d={armPath} stroke={CHALK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path
        d="M-2.4 4 L-6 14 M2.4 4 L6 14 M-6 14 L-9.5 14.8 M6 14 L9.5 14.8"
        stroke={CHALK}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

export function SauraFrieze({ className = "" }: { className?: string }) {
  const positions = Array.from({ length: 17 }).map((_, i) => 28 + i * 50);
  return (
    <svg viewBox="0 0 840 80" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path d="M0 39 L840 39" stroke={CHALK} strokeWidth="1.4" opacity="0.5" />
      {positions.map((x, i) => (
        <SauraFigure key={x} x={x} y={48} s={0.8} arms={i % 3 === 1 ? "up" : "side"} />
      ))}
      <path d="M0 22 L840 22" stroke={CHALK} strokeWidth="1" strokeDasharray="2 7" opacity="0.4" />
    </svg>
  );
}
