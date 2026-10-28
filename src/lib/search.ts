export type SearchField = "all" | "title";
export type SearchSort = "relevance" | "newest";

export interface SearchParams {
  q: string;
  field: SearchField;
  category?: string;
  author?: string;
  tag?: string;
  /** Inclusive dates as YYYY-MM-DD (Sri Lanka time). */
  from?: string;
  to?: string;
  sort: SearchSort;
  page: number;
}

type Raw = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

function validYmd(v: string | undefined) {
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
  const d = new Date(`${v}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v ? undefined : v;
}

/** Turns the raw query string into safe, typed search parameters. */
export function parseSearchParams(raw: Raw): SearchParams {
  const page = Number(first(raw.page));
  return {
    q: (first(raw.q) ?? "").slice(0, 120),
    field: first(raw.field) === "title" ? "title" : "all",
    category: first(raw.category),
    author: first(raw.author),
    tag: first(raw.tag),
    from: validYmd(first(raw.from)),
    to: validYmd(first(raw.to)),
    sort: first(raw.sort) === "newest" ? "newest" : "relevance",
    page: Number.isInteger(page) && page > 1 ? page : 1,
  };
}

/** Builds /search?… leaving out anything that is the default. */
export function buildSearchUrl(params: Partial<SearchParams>): string {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.field && params.field !== "all") sp.set("field", params.field);
  if (params.category) sp.set("category", params.category);
  if (params.author) sp.set("author", params.author);
  if (params.tag) sp.set("tag", params.tag);
  if (params.from) sp.set("from", params.from);
  if (params.to) sp.set("to", params.to);
  if (params.sort && params.sort !== "relevance") sp.set("sort", params.sort);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  const qs = sp.toString();
  return qs ? `/search?${qs}` : "/search";
}

/** Lower-case, composed form, without zero-width joiners, so Tamil text compares reliably. */
export function normalizeText(text: string): string {
  return text.normalize("NFC").replace(/[​-‍﻿]/g, "").toLowerCase();
}

export function searchTerms(q: string): string[] {
  return normalizeText(q).split(/\s+/).filter(Boolean);
}
