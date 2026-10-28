import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticPageView } from "@/components/pages/StaticPageView";

import { getStaticPage } from "@/lib/data/pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMetadata(await getStaticPage("privacy"));
}

export default async function PrivacyPage() {
  const page = await getStaticPage("privacy");
  if (!page) notFound();
  return <StaticPageView page={page} />;
}
