import { cacheLife } from "next/cache";
import type { Article } from "@/lib/domain";
import { toGalleryItem, toLink, toVideo } from "@/lib/data/mappers";
import { formatDateTime } from "@/lib/i18n/time";
import { ta } from "@/lib/i18n/ta";
import { buildMockContent } from "@/lib/mock/content";
import type { GalleryListingData, GalleryPageData, VideoListingData } from "@/lib/types";
import { urls } from "@/lib/urls";

export const MEDIA_PAGE_SIZE = 12;

const byNewest = (a: Article, b: Article) => b.publishedAt.getTime() - a.publishedAt.getTime();
const pageCountFor = (total: number) => Math.max(1, Math.ceil(total / MEDIA_PAGE_SIZE));
const inRange = (page: number, pageCount: number) => Number.isInteger(page) && page >= 1 && page <= pageCount;

/** All video articles, newest first. Swap the mock for database queries here. */
export async function getVideoListing(page: number): Promise<VideoListingData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const now = new Date();
  const { articles, placements: p } = buildMockContent();
  const all = Object.values(articles);
  const byId = new Map(all.map((a) => [a.id, a]));
  const videos = all.filter((a) => a.video).sort(byNewest);
  const pageCount = pageCountFor(videos.length);
  if (!inRange(page, pageCount)) return null;

  return {
    items: videos.slice((page - 1) * MEDIA_PAGE_SIZE, page * MEDIA_PAGE_SIZE).map((a) => toVideo(a, "mq", now)),
    page,
    pageCount,
    total: videos.length,
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
  };
}

export async function getGalleryListing(page: number): Promise<GalleryListingData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const { articles, galleries, placements: p } = buildMockContent();
  const byId = new Map(Object.values(articles).map((a) => [a.id, a]));
  const list = Object.values(galleries).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  const pageCount = pageCountFor(list.length);
  if (!inRange(page, pageCount)) return null;

  return {
    items: list.slice((page - 1) * MEDIA_PAGE_SIZE, page * MEDIA_PAGE_SIZE).map(toGalleryItem),
    page,
    pageCount,
    total: list.length,
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
  };
}

export async function getGalleryPage(slug: string): Promise<GalleryPageData | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });

  const { articles, galleries, placements: p } = buildMockContent();
  const byId = new Map(Object.values(articles).map((a) => [a.id, a]));
  const all = Object.values(galleries);
  const gallery = all.find((g) => g.slug === slug);
  if (!gallery) return null;

  return {
    title: gallery.title,
    description: gallery.description,
    publishedLabel: formatDateTime(gallery.publishedAt),
    count: gallery.photoCount,
    photos: gallery.photos.map((ph) => ({ ...ph.image, caption: ph.caption, credit: ph.credit })),
    breadcrumb: [
      { name: ta.site.home, href: urls.home() },
      { name: ta.gallery.pageTitle, href: urls.photos() },
      { name: gallery.title },
    ],
    more: all
      .filter((g) => g.id !== gallery.id)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 4)
      .map(toGalleryItem),
    ticker: p.ticker.map((id) => toLink(byId.get(id)!)),
  };
}

export async function getGallerySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  return Object.values(buildMockContent().galleries).map((g) => g.slug);
}

/** Pages after the first, for static generation. */
export async function getMediaPageParams(kind: "video" | "photos"): Promise<{ page: number }[]> {
  "use cache";
  cacheLife("hours");
  const { articles, galleries } = buildMockContent();
  const total = kind === "video" ? Object.values(articles).filter((a) => a.video).length : Object.values(galleries).length;
  return Array.from({ length: Math.max(0, pageCountFor(total) - 1) }, (_, i) => ({ page: i + 2 }));
}

