import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CategoryView } from "@/components/category/CategoryView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getCategoryPage, getCategoryPageParams } from "@/lib/data/category";
import { getSubcategories } from "@/lib/data/content";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  const pages = (await getCategoryPageParams())
    .filter((p) => p.subcategory)
    .map((p) => ({ category: p.category, slug: p.subcategory!, page: String(p.page) }));
  if (pages.length) return pages;
  // Cache Components needs at least one param to validate the route at build time. While no
  // sub-category has a second page this entry simply resolves to a 404.
  const [first] = await getSubcategories();
  return [{ category: first.parentSlug, slug: first.slug, page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/[category]/[slug]/page/[page]">): Promise<Metadata> {
  const { category, slug, page } = await params;
  return categoryMetadata(await getCategoryPage(category, slug, Number(page)));
}

export default async function SubcategoryPageN({ params }: PageProps<"/[category]/[slug]/page/[page]">) {
  const { category, slug, page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.subcategory(category, slug));
  const data = await getCategoryPage(category, slug, Number(page));
  if (!data) notFound();
  return <CategoryView data={data} />;
}
