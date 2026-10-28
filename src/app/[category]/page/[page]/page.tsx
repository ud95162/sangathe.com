import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CategoryView } from "@/components/category/CategoryView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getCategoryPage, getCategoryPageParams } from "@/lib/data/category";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  return (await getCategoryPageParams())
    .filter((p) => !p.subcategory)
    .map((p) => ({ category: p.category, page: String(p.page) }));
}

export async function generateMetadata({ params }: PageProps<"/[category]/page/[page]">): Promise<Metadata> {
  const { category, page } = await params;
  return categoryMetadata(await getCategoryPage(category, null, Number(page)));
}

export default async function CategoryPageN({ params }: PageProps<"/[category]/page/[page]">) {
  const { category, page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.category(category));
  const data = await getCategoryPage(category, null, Number(page));
  if (!data) notFound();
  return <CategoryView data={data} />;
}
