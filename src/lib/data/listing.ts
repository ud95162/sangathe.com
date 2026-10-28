import { cacheLife } from "next/cache";
import type { Article } from "@/lib/domain";
import { toLink, toStory } from "@/lib/data/mappers";
import { ta } from "@/lib/i18n/ta";
import { buildMockContent, tags } from "@/lib/mock/content";
import type { ListingPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export const LISTING_PAGE_SIZE = 10;

export type ListingKind = "tag" | "author" | "latest";

const byNewest = (a: Article, b: Article) => b.publishedAt.getTime() - a.publishedAt.getTime();
const pageCountFor = (total: number) => Math.max(1, Math.ceil(total / LISTING_PAGE_SIZE));

function matches(kind: ListingKind, slug: string, a: Article) {
  if (kind === "latest") return true;
  return kind === "tag" ? a.tags.some((t) => t.slug === slug) : a.author?.slug === slug;
}

/**
 * Everything a tag page or author page shows: a header plus the newest-first list of their stories.
 * Returns null when the tag, author or page does not exist. Swap the mock for database queries here.
 */
export async function getListingPage(kind: ListingKind, slug: string, page: number): Promise<ListingPageData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const now = new Date();
  const { articles, placements: p } = buildMockContent();
  const all = Object.values(articles);
  const byId = new Map(all.map((a) => [a.id, a]));

  const tag = kind === "tag" ? Object.values(tags).find((t) => t.slug === slug) : undefined;
  const author = kind === "author" ? all.find((a) => a.author?.slug === slug)?.author : undefined;
  if (kind !== "latest" && !tag && !author) return null;

  const items = all.filter((a) => matches(kind, slug, a)).sort(byNewest);
  const pageCount = pageCountFor(items.length);
  if (!Number.isInteger(page) || page < 1 || page > pageCount) return null;

  const title = kind === "latest" ? ta.topStories.allNews : (tag ?? author)!.name;
  const crumbLabel = kind === "latest" ? "" : kind === "tag" ? ta.pages.tag : ta.pages.author;
  const label = kind === "author" ? (author?.role ?? ta.pages.author) : crumbLabel;
  return {
    kind,
    title,
    label,
    description: author?.bio ?? undefined,
    author: author && { avatar: author.avatar },
    breadcrumb: [{ name: ta.site.home, href: urls.home() }, ...(crumbLabel ? [{ name: crumbLabel, href: kind === "author" ? urls.authors() : undefined }] : []),
      { name: title },
    ],
    basePath: kind === "latest" ? urls.latest() : kind === "tag" ? urls.tag(slug) : urls.author(slug),
    page,
    pageCount,
    total: items.length,
    list: items.slice((page - 1) * LISTING_PAGE_SIZE, page * LISTING_PAGE_SIZE).map((a) => toStory(a, now)),
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
    latest: p.latest.slice(0, 5).map((id) => toStory(byId.get(id)!, now)),
    mostRead: p.mostRead.slice(0, 5).map((id) => toLink(byId.get(id)!)),
  };
}

/** Every listing page after the first, for static generation. */
export async function getListingPageParams(kind: ListingKind): Promise<{ slug: string; page: number }[]> {
  "use cache";
  cacheLife("hours");
  const all = Object.values(buildMockContent().articles);
  const slugs =
    kind === "tag"
      ? Object.values(tags).map((t) => t.slug)
      : [...new Set(all.flatMap((a) => (a.author ? [a.author.slug] : [])))];
  return slugs.flatMap((slug) => {
    const count = pageCountFor(all.filter((a) => matches(kind, slug, a)).length);
    return Array.from({ length: Math.max(0, count - 1) }, (_, i) => ({ slug, page: i + 2 }));
  });
}

export async function getListingSlugs(kind: ListingKind): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  if (kind === "tag") return Object.values(tags).map((t) => t.slug);
  const all = Object.values(buildMockContent().articles);
  return [...new Set(all.flatMap((a) => (a.author ? [a.author.slug] : [])))];
}

/** Pages after the first of the all-news listing. */
export async function getLatestPageParams(): Promise<{ page: number }[]> {
  "use cache";
  cacheLife("hours");
  const total = Object.values(buildMockContent().articles).length;
  return Array.from({ length: Math.max(0, pageCountFor(total) - 1) }, (_, i) => ({ page: i + 2 }));
}
