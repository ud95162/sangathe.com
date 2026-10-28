import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ListingView } from "@/components/listing/ListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getLatestPageParams, getListingPage } from "@/lib/data/listing";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  return (await getLatestPageParams()).map((p) => ({ page: String(p.page) }));
}

export async function generateMetadata({ params }: PageProps<"/latest/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return categoryMetadata(await getListingPage("latest", "", Number(page)));
}

export default async function LatestPageN({ params }: PageProps<"/latest/page/[page]">) {
  const { page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.latest());
  const data = await getListingPage("latest", "", Number(page));
  if (!data) notFound();
  return <ListingView data={data} />;
}
