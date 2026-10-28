import { cacheLife } from "next/cache";
import type { Article, ArticleBlock } from "@/lib/domain";
import { articleHref, toLink, toStory } from "@/lib/data/mappers";
import { formatClock, formatDateTime, isSameColomboDay } from "@/lib/i18n/time";
import { ta } from "@/lib/i18n/ta";
import { buildMockContent } from "@/lib/mock/content";
import type { ArticleBodyBlock, ArticlePageData } from "@/lib/types";
import { urls } from "@/lib/urls";

const WORDS_PER_MINUTE = 180;

function readMinutes(blocks: ArticleBlock[]): number {
  const words = blocks.reduce((sum, b) => {
    if (b.type === "paragraph" || b.type === "heading" || b.type === "quote") {
      return sum + b.text.split(/\s+/).filter(Boolean).length;
    }
    return sum;
  }, 0);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Everything the article page shows. Returns null when the article does not exist.
 * Swap the mock for database queries here; the page and components do not change.
 */
export async function getArticlePage(categorySlug: string, slug: string): Promise<ArticlePageData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const now = new Date();
  const { articles, placements: p } = buildMockContent();
  const all = Object.values(articles);
  const byId = new Map(all.map((a) => [a.id, a]));
  const article = all.find((a) => a.category.slug === categorySlug && a.slug === slug);
  if (!article) return null;

  const body: ArticleBodyBlock[] = (article.body ?? []).flatMap((b): ArticleBodyBlock[] => {
    if (b.type !== "alsoRead") return [b];
    const target = byId.get(b.articleId);
    return target ? [{ type: "alsoRead", title: target.title, href: articleHref(target) }] : [];
  });

  const breadcrumb = [
    { name: ta.site.home, href: urls.home() },
    { name: article.category.name, href: urls.category(article.category.slug) },
    ...(article.subcategory ? [{ name: article.subcategory.name }] : []),
  ];
  // The last crumb is the current page, so it carries no link.
  breadcrumb[breadcrumb.length - 1] = { name: breadcrumb[breadcrumb.length - 1].name };

  const others = (list: Article[]) => list.filter((a) => a.id !== article.id);
  const byNewest = (a: Article, b: Article) => b.publishedAt.getTime() - a.publishedAt.getTime();
  const sameCategory = others(all).filter((a) => a.category.id === article.category.id && !a.video).sort(byNewest);
  const related = [...sameCategory, ...others(all).filter((a) => !sameCategory.includes(a) && !a.video).sort(byNewest)].slice(0, 4);

  const updatedAt = article.updatedAt;
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    categorySlug: article.category.slug,
    path: articleHref(article),
    breadcrumb,
    author: article.author && {
      name: article.author.name,
      href: urls.author(article.author.slug),
      role: article.author.role,
      bio: article.author.bio,
      avatar: article.author.avatar,
    },
    publishedLabel: formatDateTime(article.publishedAt),
    updatedLabel: updatedAt && (isSameColomboDay(updatedAt, article.publishedAt) ? formatClock(updatedAt) : formatDateTime(updatedAt)),
    publishedISO: article.publishedAt.toISOString(),
    modifiedISO: (updatedAt ?? article.publishedAt).toISOString(),
    readMinutes: readMinutes(article.body ?? []),
    image: article.image,
    imageCaption: article.imageCaption,
    imageCredit: article.imageCredit,
    body,
    tags: article.tags.map((t) => ({ name: t.name, href: urls.tag(t.slug) })),
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
    latest: others(p.latest.map((id) => byId.get(id)!)).slice(0, 5).map((a) => toStory(a, now)),
    mostRead: p.mostRead.slice(0, 5).map((id) => toLink(byId.get(id)!)),
    related: related.map((a) => toStory(a, now)),
  };
}
