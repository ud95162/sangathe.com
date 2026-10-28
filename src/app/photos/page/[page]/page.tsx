import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PhotoListingView } from "@/components/media/PhotoListingView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getGalleryListing, getMediaPageParams } from "@/lib/data/media";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  const pages = (await getMediaPageParams("photos")).map((p) => ({ page: String(p.page) }));
  // Cache Components needs at least one param to validate the route at build time. While there
  // is only one page of galleries this entry simply resolves to a 404.
  return pages.length ? pages : [{ page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/photos/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return categoryMetadata({ title: ta.gallery.pageTitle, description: undefined, page: Number(page), basePath: urls.photos() });
}

export default async function PhotosPageN({ params }: PageProps<"/photos/page/[page]">) {
  const { page } = await params;
  if (Number(page) === 1) permanentRedirect(urls.photos());
  const data = await getGalleryListing(Number(page));
  if (!data) notFound();
  return <PhotoListingView data={data} />;
}
