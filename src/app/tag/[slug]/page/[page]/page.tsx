import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ListingView } from "@/components/listing/ListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getListingPage, getListingPageParams, getListingSlugs } from "@/lib/data/listing";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  const pages = (await getListingPageParams("tag")).map((p) => ({ slug: p.slug, page: String(p.page) }));
  if (pages.length) return pages;
  // Cache Components needs at least one param to validate the route at build time. While no
  // tag has a second page this entry simply resolves to a 404.
  const [first] = await getListingSlugs("tag");
  return [{ slug: first, page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/tag/[slug]/page/[page]">): Promise<Metadata> {
  const { slug, page } = await params;
  return categoryMetadata(await getListingPage("tag", slug, Number(page)));
}

export default async function TagPageN({ params }: PageProps<"/tag/[slug]/page/[page]">) {
  const { slug, page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.tag(slug));
  const data = await getListingPage("tag", slug, Number(page));
  if (!data) notFound();
  return <ListingView data={data} />;
}
