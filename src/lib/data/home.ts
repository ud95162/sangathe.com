import { cacheLife } from "next/cache";
import { buildMockContent, categories, tags } from "@/lib/mock/content";
import { toGalleryItem, toLink, toStory, toVideo } from "@/lib/data/mappers";
import { urls } from "@/lib/urls";
import type { HomepageData } from "@/lib/types";

/**
 * Everything the homepage shows. This is the only place the homepage gets data from:
 * swap the mock content below for database queries and no page or component changes.
 */
export async function getHomepage(): Promise<HomepageData> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const now = new Date();
  const { articles, galleries, placements: p } = buildMockContent();
  const byId = new Map(Object.values(articles).map((a) => [a.id, a]));
  const get = (id: string) => byId.get(id)!;
  const stories = (ids: string[]) => ids.map((id) => toStory(get(id), now));
  const ranked = (ids: string[]) => {
    const [top, ...rest] = stories(ids);
    return { top, rest };
  };
  const allCategories = Object.values(categories);

  return {
    ticker: p.ticker.map((id) => toLink(get(id))),
    trendingTags: Object.values(tags).map((t) => ({ slug: t.slug, name: t.name, href: urls.tag(t.slug) })),
    lead: toStory(get(p.lead), now),
    leadRelated: p.leadRelated.map((id) => toLink(get(id))),
    middle: stories(p.middle),
    latest: stories(p.latest),
    moreTop: stories(p.moreTop),
    featuredVideo: toVideo(get(p.featuredVideo), "maxres", now),
    upNextVideos: p.upNextVideos.map((id) => toVideo(get(id), "mq", now)),
    categoryBlocks: p.categorySections.map((s) => {
      const category = allCategories.find((c) => c.id === s.categoryId)!;
      return {
        slug: category.slug,
        href: urls.category(category.slug),
        name: category.name,
        tone: s.tone,
        lead: toStory(get(s.leadId), now),
        list: stories(s.listIds),
      };
    }),
    galleries: p.galleries.map((id) => toGalleryItem(Object.values(galleries).find((g) => g.id === id)!)),
    mostRead: ranked(p.mostRead),
    trending: ranked(p.trending),
  };
}
