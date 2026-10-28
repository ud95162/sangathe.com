import { connection } from "next/server";
import type { Article } from "@/lib/domain";
import { toLink, toStory } from "@/lib/data/mappers";
import { formatYmd } from "@/lib/i18n/time";
import { ta } from "@/lib/i18n/ta";
import { buildMockContent, categories, tags } from "@/lib/mock/content";
import { buildSearchUrl, normalizeText, searchTerms, type SearchParams } from "@/lib/search";
import type { SearchPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export const SEARCH_PAGE_SIZE = 10;
const COLOMBO_OFFSET_MS = 5.5 * 3600_000;

const startOfDay = (ymd: string) => new Date(`${ymd}T00:00:00Z`).getTime() - COLOMBO_OFFSET_MS;
const endOfDay = (ymd: string) => startOfDay(ymd) + 86_400_000 - 1;

function bodyText(a: Article): string {
  return (a.body ?? []).map((b) => (b.type === "paragraph" || b.type === "heading" || b.type === "quote" ? b.text : "")).join(" ");
}

/**
 * Relevance for one article, or 0 when it does not match. Every search word has to match somewhere
 * (partial matches count); title hits weigh most. This is a stand-in for the PostgreSQL full-text
 * and partial-word search that replaces it.
 */
function score(a: Article, terms: string[], titleOnly: boolean): number {
  if (!terms.length) return 1;
  const title = normalizeText(a.title);
  const summary = titleOnly ? "" : normalizeText(a.summary ?? "");
  const meta = titleOnly
    ? ""
    : normalizeText([a.category.name, a.subcategory?.name, a.author?.name, ...a.tags.map((t) => t.name)].filter(Boolean).join(" "));
  const body = titleOnly ? "" : normalizeText(bodyText(a));

  let total = 0;
  for (const term of terms) {
    const s = (title.includes(term) ? 10 : 0) + (summary.includes(term) ? 4 : 0) + (meta.includes(term) ? 3 : 0) + (body.includes(term) ? 1 : 0);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

/** Search results plus everything the page needs around them. Swap the mock for database queries here. */
export async function searchArticles(params: SearchParams): Promise<SearchPageData> {
  // Search results depend on the request, so this always runs at request time, never at build time.
  await connection();
  const now = new Date();
  const { articles, placements: p } = buildMockContent();
  const all = Object.values(articles);
  const byId = new Map(all.map((a) => [a.id, a]));
  const terms = searchTerms(params.q);
  const from = params.from ? startOfDay(params.from) : undefined;
  const to = params.to ? endOfDay(params.to) : undefined;

  const matched = all
    .filter((a) => !params.category || a.category.slug === params.category)
    .filter((a) => !params.author || a.author?.slug === params.author)
    .filter((a) => !params.tag || a.tags.some((t) => t.slug === params.tag))
    .filter((a) => (from === undefined || a.publishedAt.getTime() >= from) && (to === undefined || a.publishedAt.getTime() <= to))
    .map((a) => ({ a, s: score(a, terms, params.field === "title") }))
    .filter((x) => x.s > 0);

  const newest = (x: { a: Article }, y: { a: Article }) => y.a.publishedAt.getTime() - x.a.publishedAt.getTime();
  matched.sort(params.sort === "newest" || !terms.length ? newest : (x, y) => y.s - x.s || newest(x, y));

  const total = matched.length;
  const pageCount = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE));
  const page = Math.min(params.page, pageCount);
  const results = matched.slice((page - 1) * SEARCH_PAGE_SIZE, page * SEARCH_PAGE_SIZE).map(({ a }) => toStory(a, now));

  const authors = new Map<string, string>();
  for (const a of all) if (a.author) authors.set(a.author.slug, a.author.name);
  const categoryOptions = Object.values(categories).map((c) => ({ slug: c.slug, name: c.name }));
  const authorOptions = [...authors].map(([slug, name]) => ({ slug, name }));
  const tagOptions = Object.values(tags).map((t) => ({ slug: t.slug, name: t.name }));

  const without = (key: keyof SearchParams) => buildSearchUrl({ ...params, [key]: undefined, page: 1 });
  const activeFilters = [
    params.field === "title" && { key: "field", label: ta.search.inTitleChip, removeHref: without("field") },
    params.category && { key: "category", label: categoryOptions.find((c) => c.slug === params.category)?.name ?? params.category, removeHref: without("category") },
    params.author && { key: "author", label: authors.get(params.author) ?? params.author, removeHref: without("author") },
    params.tag && { key: "tag", label: tagOptions.find((t) => t.slug === params.tag)?.name ?? params.tag, removeHref: without("tag") },
    params.from && { key: "from", label: ta.search.fromChip(formatYmd(params.from)), removeHref: without("from") },
    params.to && { key: "to", label: ta.search.toChip(formatYmd(params.to)), removeHref: without("to") },
  ].filter((f): f is { key: string; label: string; removeHref: string } => Boolean(f));

  return {
    params: { ...params, page },
    total,
    page,
    pageCount,
    results,
    facets: { categories: categoryOptions, authors: authorOptions, tags: tagOptions },
    activeFilters,
    popularTags: tagOptions.slice(0, 6).map((t) => ({ name: t.name, href: urls.tag(t.slug) })),
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
    latest: p.latest.slice(0, 5).map((id) => toStory(byId.get(id)!, now)),
    mostRead: p.mostRead.slice(0, 5).map((id) => toLink(byId.get(id)!)),
  };
}
