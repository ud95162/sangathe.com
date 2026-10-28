import type { Article, Gallery } from "@/lib/domain";
import { formatCount } from "@/lib/format";
import { formatPublishedTime } from "@/lib/i18n/time";
import { urls } from "@/lib/urls";
import { youTubeThumbnail } from "@/lib/youtube";
import type { GalleryItem, LinkItem, Story, VideoItem } from "@/lib/types";

export const articleHref = (a: Article) => urls.article(a.category.slug, a.slug);

export const toLink = (a: Article): LinkItem => ({ id: a.id, href: articleHref(a), title: a.title });

export function toStory(a: Article, now: Date, kicker: "default" | "subcategory" = "default"): Story {
  return {
    id: a.id,
    href: articleHref(a),
    title: a.title,
    summary: a.summary,
    category: kicker === "subcategory" ? (a.subcategory?.name ?? a.category.name) : (a.kicker ?? a.category.name),
    tone: a.category.tone,
    image: a.image ?? (a.video ? youTubeThumbnail(a.video.youtubeId) : undefined),
    timeLabel: formatPublishedTime(a.publishedAt, now),
    author: a.author?.name,
    authorHref: a.author && urls.author(a.author.slug),
    reads: formatCount(a.views),
  };
}

export function toVideo(a: Article, thumb: "maxres" | "mq" = "mq", now?: Date): VideoItem {
  return {
    id: a.id,
    href: articleHref(a),
    title: a.title,
    category: a.category.name,
    duration: a.video?.duration ?? "",
    youtubeId: a.video?.youtubeId,
    timeLabel: now ? formatPublishedTime(a.publishedAt, now) : undefined,
    image: a.image ?? (a.video ? youTubeThumbnail(a.video.youtubeId, thumb) : undefined),
  };
}

export const toGalleryItem = (g: Gallery): GalleryItem => ({
  id: g.id,
  href: urls.gallery(g.slug),
  title: g.title,
  count: g.photoCount,
  image: g.cover,
});
