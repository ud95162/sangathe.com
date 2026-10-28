import type { Metadata } from "next";
import { AuthorsView } from "@/components/authors/AuthorsView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getAuthorsPage } from "@/lib/data/authors";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const instant = false;

export function generateMetadata(): Metadata {
  return categoryMetadata({ title: ta.authorsPage.title, description: undefined, page: 1, basePath: urls.authors() });
}

export default async function AuthorsPage() {
  return <AuthorsView data={await getAuthorsPage()} />;
}
