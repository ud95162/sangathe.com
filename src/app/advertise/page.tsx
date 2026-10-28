import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticPageView } from "@/components/pages/StaticPageView";
import { AdFormats } from "@/components/pages/AdvertiseExtras";
import { getStaticPage } from "@/lib/data/pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMetadata(await getStaticPage("advertise"));
}

export default async function AdvertisePage() {
  const page = await getStaticPage("advertise");
  if (!page) notFound();
  return <StaticPageView page={page} extras={{ formats: <AdFormats /> }} />;
}
