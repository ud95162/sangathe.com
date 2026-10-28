import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoListingView } from "@/components/media/VideoListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getVideoListing } from "@/lib/data/media";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export function generateMetadata(): Metadata {
  return categoryMetadata({ title: ta.videos.title, description: undefined, page: 1, basePath: urls.video() });
}

export default async function VideoPage() {
  const data = await getVideoListing(1);
  if (!data) notFound();
  return <VideoListingView data={data} />;
}
