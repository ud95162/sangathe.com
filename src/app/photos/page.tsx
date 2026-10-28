import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoListingView } from "@/components/media/PhotoListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getGalleryListing } from "@/lib/data/media";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export function generateMetadata(): Metadata {
  return categoryMetadata({ title: ta.gallery.pageTitle, description: undefined, page: 1, basePath: urls.photos() });
}

export default async function PhotosPage() {
  const data = await getGalleryListing(1);
  if (!data) notFound();
  return <PhotoListingView data={data} />;
}
