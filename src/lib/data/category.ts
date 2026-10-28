import { cacheLife } from "next/cache";
import type { Article, Category } from "@/lib/domain";
import { toLink, toStory } from "@/lib/data/mappers";
import { ta } from "@/lib/i18n/ta";
import { buildMockContent, categories, subcategories } from "@/lib/mock/content";
import type { CategoryPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export const CATEGORY_PAGE_SIZE = 10;
/** The first page opens with one lead story and two side stories above the list. */
const FEATURED_COUNT = 3;

const byNewest = (a: Article, b: Article) => b.publishedAt.getTime() - a.publishedAt.getTime();

function subcategoriesOf(category: Category) {
  return Object.values(subcategories).filter((s) => s.parentId === category.id);
}

function scope(all: Article[], category: Category, subcategory?: Category) {
  return all
    .filter((a) => a.category.id === category.id && (!subcategory || a.subcategory?.id === subcategory.id))
    .sort(byNewest);
}

const pageCountFor = (total: number) => Math.max(1, Math.ceil(Math.max(0, total - FEATURED_COUNT) / CATEGORY_PAGE_SIZE));

/**
 * Everything a category (or sub-category) listing page shows. Returns null when the category,
 * sub-category or page does not exist. Swap the mock for database queries here.
 */
export async function getCategoryPage(
  categorySlug: string,
  subcategorySlug: string | null,
  page: number,
): Promise<CategoryPageData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const category = Object.values(categories).find((c) => c.slug === categorySlug);
  if (!category) return null;
  const subs = subcategoriesOf(category);
  const subcategory = subcategorySlug ? subs.find((s) => s.slug === subcategorySlug) : undefined;
  if (subcategorySlug && !subcategory) return null;

  const now = new Date();
  const { articles, placements: p } = buildMockContent();
  const all = Object.values(articles);
  const byId = new Map(all.map((a) => [a.id, a]));

  const items = scope(all, category, subcategory);
  const pageCount = pageCountFor(items.length);
  if (!Number.isInteger(page) || page < 1 || page > pageCount) return null;

  const basePath = subcategory ? urls.subcategory(category.slug, subcategory.slug) : urls.category(category.slug);
  const story = (a: Article) => toStory(a, now, "subcategory");
  const featuredItems = page === 1 ? items.slice(0, FEATURED_COUNT) : [];
  const rest = items.slice(FEATURED_COUNT);
  const listItems = rest.slice((page - 1) * CATEGORY_PAGE_SIZE, page * CATEGORY_PAGE_SIZE);

  const title = subcategory?.name ?? category.name;
  return {
    title,
    description: category.description,
    tone: category.tone,
    categorySlug: category.slug,
    basePath,
    breadcrumb: [
      { name: ta.site.home, href: urls.home() },
      ...(subcategory
        ? [{ name: category.name, href: urls.category(category.slug) }, { name: subcategory.name }]
        : [{ name: category.name }]),
    ],
    chips: subs.length
      ? [
          { name: ta.category.all, href: urls.category(category.slug), active: !subcategory },
          ...subs.map((s) => ({
            name: s.name,
            href: urls.subcategory(category.slug, s.slug),
            active: s.id === subcategory?.id,
          })),
        ]
      : [],
    page,
    pageCount,
    featured: featuredItems.length
      ? { lead: story(featuredItems[0]), side: featuredItems.slice(1).map(story) }
      : undefined,
    list: listItems.map(story),
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
    latest: p.latest.slice(0, 5).map((id) => toStory(byId.get(id)!, now)),
    mostRead: scope(all, category)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(toLink),
  };
}

/** Every listing page after the first, for static generation. */
export async function getCategoryPageParams(): Promise<{ category: string; subcategory: string | null; page: number }[]> {
  "use cache";
  cacheLife("hours");
  const { articles } = buildMockContent();
  const all = Object.values(articles);
  const out: { category: string; subcategory: string | null; page: number }[] = [];
  for (const category of Object.values(categories)) {
    const scopes: (Category | undefined)[] = [undefined, ...subcategoriesOf(category)];
    for (const sub of scopes) {
      const count = pageCountFor(scope(all, category, sub).length);
      for (let page = 2; page <= count; page++) {
        out.push({ category: category.slug, subcategory: sub?.slug ?? null, page });
      }
    }
  }
  return out;
}
