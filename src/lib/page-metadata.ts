import type { Metadata } from "next";
import { ta } from "@/lib/i18n/ta";
import type { StaticPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function staticPageMetadata(page: StaticPageData | null): Metadata {
  if (!page) return {};
  return {
    title: `${page.title} | ${ta.meta.siteName}`,
    description: page.intro,
    alternates: { canonical: urls.page(page.slug) },
  };
}
