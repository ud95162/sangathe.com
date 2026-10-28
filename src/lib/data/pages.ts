import { cacheLife } from "next/cache";
import { toLink } from "@/lib/data/mappers";
import { buildMockContent } from "@/lib/mock/content";
import { getAuthorsPage } from "@/lib/data/authors";
import { aboutContent, staticPages } from "@/lib/mock/pages";
import type { AboutPageData, StaticPageData } from "@/lib/types";

export type StaticPageSlug = "contact" | "advertise" | "privacy" | "terms";

/** A static page plus the ticker. Returns null for an unknown page. Swap the mock for the CMS table. */
export async function getStaticPage(slug: StaticPageSlug): Promise<StaticPageData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const page = staticPages[slug];
  if (!page) return null;
  const { articles, placements: p } = buildMockContent();
  const byId = new Map(Object.values(articles).map((a) => [a.id, a]));
  return { ...page, ticker: p.ticker.map((id) => toLink(byId.get(id)!)) };
}

/** The About page: sample content plus the newsroom team. Swap the mock for the CMS pages table. */
export async function getAboutPage(): Promise<AboutPageData> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const { authors, ticker } = await getAuthorsPage();
  return {
    ...aboutContent,
    stats: aboutContent.stats.map((s) => (s.value ? s : { ...s, value: String(authors.length) })),
    team: authors.slice(0, 4),
    teamCount: authors.length,
    ticker,
  };
}
