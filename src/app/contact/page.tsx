import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticPageView } from "@/components/pages/StaticPageView";
import { ContactContent } from "@/components/pages/ContactContent";
import { getStaticPage } from "@/lib/data/pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMetadata(await getStaticPage("contact"));
}

export default async function ContactPage() {
  const page = await getStaticPage("contact");
  if (!page) notFound();
  return <StaticPageView page={page} wide={<ContactContent />} />;
}
