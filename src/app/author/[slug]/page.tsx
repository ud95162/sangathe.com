import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/listing/ListingView";
import { getListingPage, getListingSlugs } from "@/lib/data/listing";
import { categoryMetadata } from "@/lib/category-metadata";

export const instant = false;

export async function generateStaticParams() {
  return (await getListingSlugs("author")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/author/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return categoryMetadata(await getListingPage("author", slug, 1));
}

export default async function AuthorPage({ params }: PageProps<"/author/[slug]">) {
  const { slug } = await params;
  const data = await getListingPage("author", slug, 1);
  if (!data) notFound();
  return <ListingView data={data} />;
}
