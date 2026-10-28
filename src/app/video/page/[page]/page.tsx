import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { VideoListingView } from "@/components/media/VideoListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getMediaPageParams, getVideoListing } from "@/lib/data/media";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  const pages = (await getMediaPageParams("video")).map((p) => ({ page: String(p.page) }));
  // Cache Components needs at least one param to validate the route at build time. While there
  // is only one page of videos this entry simply resolves to a 404.
  return pages.length ? pages : [{ page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/video/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return categoryMetadata({ title: ta.videos.title, description: undefined, page: Number(page), basePath: urls.video() });
}

export default async function VideoPageN({ params }: PageProps<"/video/page/[page]">) {
  const { page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.video());
  const data = await getVideoListing(Number(page));
  if (!data) notFound();
  return <VideoListingView data={data} />;
}
