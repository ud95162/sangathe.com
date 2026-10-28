import type { Metadata } from "next";
import { ta } from "@/lib/i18n/ta";
import type { CategoryPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function categoryMetadata(
  data: Pick<CategoryPageData, "title" | "description" | "page" | "basePath"> | null,
): Metadata {
  if (!data) return {};
  const suffix = data.page > 1 ? ` | ${ta.category.pageOf(data.page)}` : "";
  return {
    title: `${data.title}${suffix} | ${ta.meta.siteName}`,
    description: data.description,
    alternates: { canonical: urls.listingPage(data.basePath, data.page) },
  };
}
