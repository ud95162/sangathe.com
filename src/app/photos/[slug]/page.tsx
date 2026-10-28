import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryView } from "@/components/media/GalleryView";
import { getGalleryPage, getGallerySlugs } from "@/lib/data/media";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateStaticParams() {
  return (await getGallerySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/photos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = await getGalleryPage(slug);
  if (!data) return {};
  return {
    title: `${data.title} | ${ta.meta.siteName}`,
    description: data.description,
    alternates: { canonical: urls.gallery(slug) },
    openGraph: { type: "article", title: data.title, description: data.description, images: [{ url: data.photos[0].src, alt: data.photos[0].alt }] },
  };
}

export default async function GalleryPage({ params }: PageProps<"/photos/[slug]">) {
  const { slug } = await params;
  const data = await getGalleryPage(slug);
  if (!data) notFound();
  return <GalleryView data={data} />;
}
