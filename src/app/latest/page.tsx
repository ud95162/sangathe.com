import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/listing/ListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getListingPage } from "@/lib/data/listing";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  return categoryMetadata(await getListingPage("latest", "", 1));
}

export default async function LatestPage() {
  const data = await getListingPage("latest", "", 1);
  if (!data) notFound();
  return <ListingView data={data} />;
}
