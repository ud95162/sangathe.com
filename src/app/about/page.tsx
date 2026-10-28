import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";
import { getAboutPage } from "@/lib/data/pages";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return {
    title: `${page.title} | ${ta.meta.siteName}`,
    description: page.intro,
    alternates: { canonical: urls.page("about") },
  };
}

export default async function AboutPage() {
  return <AboutView data={await getAboutPage()} />;
}
