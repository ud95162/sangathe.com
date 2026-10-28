import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/category/CategoryView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getCategoryPage } from "@/lib/data/category";
import { getCategories } from "@/lib/data/content";

export const instant = false;

const reserved = new Set(["video", "photos"]);

export async function generateStaticParams() {
  return (await getCategories()).filter((c) => !reserved.has(c.slug)).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  return categoryMetadata(await getCategoryPage(category, null, 1));
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category } = await params;
  const data = await getCategoryPage(category, null, 1);
  if (!data) notFound();
  return <CategoryView data={data} />;
}
