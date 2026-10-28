import type { Photo, Tone } from "@/lib/types";

/**
 * Domain records. These mirror the future database tables, so the mock data layer
 * and the real one return the same shapes.
 */
export interface Category {
  id: string;
  slug: string;
  name: string;
  tone: Tone;
  description?: string;
  parentId?: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  /** Job title shown in place of the generic "reporter" label, e.g. "மூத்த செய்தியாளர்". */
  role?: string;
  bio?: string;
  avatar?: Photo;
}

/** Article body as the CMS editor will store it: a list of typed blocks. */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "alsoRead"; articleId: string }
  | { type: "image"; image: Photo; caption?: string; credit?: string }
  | { type: "youtube"; youtubeId: string; title: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  /** Optional kicker shown instead of the category name, e.g. "இலங்கை · வானிலை". */
  kicker?: string;
  category: Category;
  subcategory?: Category;
  tags: Tag[];
  author?: Author;
  image?: Photo;
  imageCaption?: string;
  imageCredit?: string;
  body?: ArticleBlock[];
  publishedAt: Date;
  updatedAt?: Date;
  views: number;
  /** Present for video articles. The CMS stores the pasted YouTube link as its video id. */
  video?: { youtubeId: string; duration: string };
}

export interface GalleryPhoto {
  image: Photo;
  caption?: string;
  credit?: string;
}

export interface Gallery {
  id: string;
  slug: string;
  title: string;
  description?: string;
  photoCount: number;
  cover?: Photo;
  photos: GalleryPhoto[];
  publishedAt: Date;
}

/** What the CMS "homepage placement" feature will control. Values are article ids. */
export interface HomePlacements {
  ticker: string[];
  trendingTags: string[];
  lead: string;
  leadRelated: string[];
  middle: string[];
  latest: string[];
  moreTop: string[];
  featuredVideo: string;
  upNextVideos: string[];
  categorySections: { categoryId: string; tone: Tone; leadId: string; listIds: string[] }[];
  mostRead: string[];
  trending: string[];
  galleries: string[];
}
