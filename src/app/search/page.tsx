import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SearchView } from "@/components/search/SearchView";
import { searchArticles } from "@/lib/data/search";
import { ta } from "@/lib/i18n/ta";
import { buildSearchUrl, parseSearchParams } from "@/lib/search";

// Results depend on the query string, so this page renders per request.
export const instant = false;

export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const { q } = parseSearchParams(await searchParams);
  return {
    title: `${q ? `${q} | ` : ""}${ta.search.title} | ${ta.meta.siteName}`,
    // Search result pages are not meant to be indexed.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const raw = await searchParams;
  const params = parseSearchParams(raw);

  // A plain form submit sends empty and default fields (author=&tag=&sort=relevance...).
  // Redirect to the clean address so every search URL is short and shareable.
  const untidy = Object.values(raw).some((v) => v === "") || raw.field === "all" || raw.sort === "relevance";
  if (untidy) redirect(buildSearchUrl(params));

  return <SearchView data={await searchArticles(params)} />;
}
