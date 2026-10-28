import { months } from "@/lib/i18n/date";
import { ta } from "@/lib/i18n/ta";

const COLOMBO_OFFSET_MS = 5.5 * 3600_000;
const DAY_MS = 86_400_000;

const colomboDay = (d: Date) => Math.floor((d.getTime() + COLOMBO_OFFSET_MS) / DAY_MS);
const pad = (n: number) => String(n).padStart(2, "0");

/** Time display rules (design spec 6): relative today, "yesterday, HH:mm", otherwise the full date. */
export function formatPublishedTime(date: Date, now: Date = new Date()): string {
  const days = colomboDay(now) - colomboDay(date);
  const local = new Date(date.getTime() + COLOMBO_OFFSET_MS);

  if (days <= 0) {
    const minutes = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 60_000));
    if (minutes < 1) return ta.time.justNow;
    if (minutes < 60) return ta.time.minutesAgo(minutes);
    return ta.time.hoursAgo(Math.floor(minutes / 60));
  }
  if (days === 1) return ta.time.yesterday(`${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`);
  return `${local.getUTCDate()} ${months[local.getUTCMonth()]} ${local.getUTCFullYear()}`;
}

/** "26 ஒக்டோபர் 2026, 10:17" in Sri Lanka time. */
export function formatDateTime(date: Date): string {
  const local = new Date(date.getTime() + COLOMBO_OFFSET_MS);
  return `${local.getUTCDate()} ${months[local.getUTCMonth()]} ${local.getUTCFullYear()}, ${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`;
}

/** "11:05" in Sri Lanka time. */
export function formatClock(date: Date): string {
  const local = new Date(date.getTime() + COLOMBO_OFFSET_MS);
  return `${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`;
}

/** Same Colombo calendar day? */
export const isSameColomboDay = (a: Date, b: Date) => colomboDay(a) === colomboDay(b);

/** "2026-10-01" -> "1 ஒக்டோபர் 2026". Returns the input unchanged when it is not a valid date. */
export function formatYmd(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return ymd;
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
}
