import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article/ArticleView";
import { CategoryView } from "@/components/category/CategoryView";
import { categoryMetadata } from "@/lib/category-metadata";
import { getArticlePage } from "@/lib/data/article";
import { getCategoryPage } from "@/lib/data/category";
import { getArticles, getSubcategories, getSubcategory } from "@/lib/data/content";
import { ta } from "@/lib/i18n/ta";

export const instant = false;

/** /[category]/[slug] is either a subcategory page or an article. */
export async function generateStaticParams() {
  const [articles, subcategories] = await Promise.all([getArticles(), getSubcategories()]);
  return [
    ...articles.map((a) => ({ category: a.category.slug, slug: a.slug })),
    ...subcategories.map((s) => ({ category: s.parentSlug, slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  if (await getSubcategory(category, slug)) return categoryMetadata(await getCategoryPage(category, slug, 1));
  const article = await getArticlePage(category, slug);
  if (!article) return {};
  return {
    title: `${article.title} | ${ta.meta.siteName}`,
    description: article.summary,
    alternates: { canonical: article.path },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: article.path,
      publishedTime: article.publishedISO,
      modifiedTime: article.modifiedISO,
      images: article.image ? [{ url: article.image.src, alt: article.image.alt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary },
  };
}

export default async function ArticleOrSubcategoryPage({ params }: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;

  if (await getSubcategory(category, slug)) {
    const data = await getCategoryPage(category, slug, 1);
    if (!data) notFound();
    return <CategoryView data={data} />;
  }

  const article = await getArticlePage(category, slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
