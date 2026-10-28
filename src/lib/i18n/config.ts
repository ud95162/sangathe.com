export const locales = ["ta"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ta";

/**
 * Every internal URL goes through this. The default language stays unprefixed, so adding
 * "/en" or "/si" later does not change any Tamil URL.
 */
export function withLocale(path: string, locale: Locale = defaultLocale): string {
  return locale === defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;
}
