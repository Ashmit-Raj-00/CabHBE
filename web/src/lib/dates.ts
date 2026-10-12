const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Splits "YYYY-MM-DD" without going through `Date`, so the day never shifts with time zones. */
function parse(isoDate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  const [year, month, day] = match ? match.slice(1).map(Number) : [0, 0, 0];
  const isRealDay = match && new Date(Date.UTC(year, month - 1, day)).getUTCDate() === day && month >= 1 && month <= 12;
  if (!isRealDay) {
    throw new Error(`Invalid date "${isoDate}" in src/content — write dates as YYYY-MM-DD, e.g. "2026-11-30".`);
  }
  return { day, month: MONTHS[month - 1], year };
}

/** "2026-11-30" → "30 November 2026", or "30 Nov 2026" with `"short"`. */
export function formatDate(isoDate: string, monthStyle: "long" | "short" = "long") {
  const { day, month, year } = parse(isoDate);
  return `${day} ${monthStyle === "short" ? month.slice(0, 3) : month} ${year}`;
}

/** "2026-12-10" + "2026-12-12" → "10 – 12 December 2026" (or "10 – 12 December" without the year). */
export function formatDateRange(start: string, end: string, withYear = true) {
  const s = parse(start);
  const e = parse(end);
  const endYear = withYear ? ` ${e.year}` : "";
  if (start === end) return `${s.day} ${s.month}${endYear}`;
  if (s.year !== e.year) {
    return withYear ? `${s.day} ${s.month} ${s.year} – ${e.day} ${e.month} ${e.year}` : `${s.day} ${s.month} – ${e.day} ${e.month}`;
  }
  if (s.month === e.month) return `${s.day} – ${e.day} ${e.month}${endYear}`;
  return `${s.day} ${s.month} – ${e.day} ${e.month}${endYear}`;
}
