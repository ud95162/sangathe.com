import { cacheLife } from "next/cache";
import { buildMockContent, categories, subcategories, tags } from "@/lib/mock/content";
import type { Article, Category, Gallery, Tag } from "@/lib/domain";

/** Lookups used by routes that only need to know a record exists and what it is called. */
export async function getCategories(): Promise<Category[]> {
  return Object.values(categories);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return Object.values(categories).find((c) => c.slug === slug);
}

export async function getSubcategories(): Promise<(Category & { parentSlug: string })[]> {
  return Object.values(subcategories).map((s) => ({
    ...s,
    parentSlug: Object.values(categories).find((c) => c.id === s.parentId)!.slug,
  }));
}

export async function getSubcategory(categorySlug: string, slug: string) {
  return (await getSubcategories()).find((s) => s.parentSlug === categorySlug && s.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  return Object.values(buildMockContent().articles);
}

export async function getArticle(categorySlug: string, slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.category.slug === categorySlug && a.slug === slug);
}

export async function getTags(): Promise<Tag[]> {
  return Object.values(tags);
}

export async function getTag(slug: string): Promise<Tag | undefined> {
  return Object.values(tags).find((t) => t.slug === slug);
}

export async function getGalleries(): Promise<Gallery[]> {
  "use cache";
  cacheLife("hours");
  return Object.values(buildMockContent().galleries);
}

export async function getGallery(slug: string): Promise<Gallery | undefined> {
  return (await getGalleries()).find((g) => g.slug === slug);
}

export async function getAuthors() {
  const authors = new Map<string, { slug: string; name: string }>();
  for (const a of await getArticles()) if (a.author) authors.set(a.author.slug, a.author);
  return [...authors.values()];
}
