const COLOMBO_OFFSET_MS = 5.5 * 3600_000;

export const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000);
export const hoursAgo = (n: number) => minutesAgo(n * 60);

/** Colombo wall-clock time on a day `daysBack` days before today. */
export function daysAgoAt(daysBack: number, hours: number, minutes = 0): Date {
  const c = new Date(Date.now() + COLOMBO_OFFSET_MS);
  return new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate() - daysBack, hours, minutes) - COLOMBO_OFFSET_MS);
}
