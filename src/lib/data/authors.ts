import { cacheLife } from "next/cache";
import { toLink } from "@/lib/data/mappers";
import { buildMockContent } from "@/lib/mock/content";
import type { AuthorsPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

/**
 * Every reporter with their story count and the categories they write in.
 * Swap the mock for database queries here.
 */
export async function getAuthorsPage(): Promise<AuthorsPageData> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const { articles, placements: p } = buildMockContent();
  const all = Object.values(articles);
  const byId = new Map(all.map((a) => [a.id, a]));

  const stats = new Map<string, { author: NonNullable<(typeof all)[number]["author"]>; count: number; categories: Map<string, number> }>();
  for (const a of all) {
    if (!a.author) continue;
    const entry = stats.get(a.author.slug) ?? { author: a.author, count: 0, categories: new Map() };
    entry.count += 1;
    entry.categories.set(a.category.name, (entry.categories.get(a.category.name) ?? 0) + 1);
    stats.set(a.author.slug, entry);
  }

  const authors = [...stats.values()]
    .sort((a, b) => b.count - a.count)
    .map(({ author, count, categories }) => ({
      slug: author.slug,
      name: author.name,
      href: urls.author(author.slug),
      role: author.role,
      bio: author.bio,
      avatar: author.avatar,
      storyCount: count,
      categories: [...categories.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name),
    }));

  return { authors, ticker: p.ticker.map((id) => toLink(byId.get(id)!)) };
}
