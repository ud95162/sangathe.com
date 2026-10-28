import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ListingView } from "@/components/listing/ListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getListingPage, getListingPageParams, getListingSlugs } from "@/lib/data/listing";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  const pages = (await getListingPageParams("author")).map((p) => ({ slug: p.slug, page: String(p.page) }));
  if (pages.length) return pages;
  // Cache Components needs at least one param to validate the route at build time. While no
  // author has a second page this entry simply resolves to a 404.
  const [first] = await getListingSlugs("author");
  return [{ slug: first, page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/author/[slug]/page/[page]">): Promise<Metadata> {
  const { slug, page } = await params;
  return categoryMetadata(await getListingPage("author", slug, Number(page)));
}

export default async function AuthorPageN({ params }: PageProps<"/author/[slug]/page/[page]">) {
  const { slug, page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.author(slug));
  const data = await getListingPage("author", slug, Number(page));
  if (!data) notFound();
  return <ListingView data={data} />;
}
