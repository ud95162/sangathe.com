import { withLocale, type Locale } from "@/lib/i18n/config";

export const urls = {
  home: (l?: Locale) => withLocale("/", l),
  category: (slug: string, l?: Locale) => withLocale(`/${slug}`, l),
  subcategory: (slug: string, sub: string, l?: Locale) => withLocale(`/${slug}/${sub}`, l),
  article: (categorySlug: string, slug: string, l?: Locale) => withLocale(`/${categorySlug}/${slug}`, l),
  /** Page n of a listing; page 1 is the listing itself. */
  listingPage: (basePath: string, page: number) => (page <= 1 ? basePath : `${basePath}/page/${page}`),
  tag: (slug: string, l?: Locale) => withLocale(`/tag/${slug}`, l),
  author: (slug: string, l?: Locale) => withLocale(`/author/${slug}`, l),
  authors: (l?: Locale) => withLocale("/authors", l),
  search: (q?: string, l?: Locale) => withLocale(q ? `/search?q=${encodeURIComponent(q)}` : "/search", l),
  gallery: (slug: string, l?: Locale) => withLocale(`/photos/${slug}`, l),
  page: (slug: string, l?: Locale) => withLocale(`/${slug}`, l),
  video: (l?: Locale) => withLocale("/video", l),
  photos: (l?: Locale) => withLocale("/photos", l),
  latest: (l?: Locale) => withLocale("/latest", l),
};
