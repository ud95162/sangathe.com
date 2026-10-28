export type Tone = "flame" | "sunset" | "golden" | "leaf" | "charcoal";

export interface Photo {
  src: string;
  alt: string;
}

export interface Story {
  id: string;
  href: string;
  title: string;
  summary?: string;
  /** Kicker text, e.g. "இலங்கை · வானிலை" */
  category: string;
  tone: Tone;
  image?: Photo;
  /** Already formatted per the time display rules (relative / yesterday / full date). */
  timeLabel: string;
  author?: string;
  authorHref?: string;
  reads?: string;
}

export interface VideoItem {
  id: string;
  href: string;
  title: string;
  category: string;
  duration: string;
  timeLabel?: string;
  youtubeId?: string;
  image?: Photo;
}

export interface GalleryItem {
  id: string;
  href: string;
  title: string;
  count: number;
  image?: Photo;
}

export interface CategoryBlockData {
  slug: string;
  href: string;
  name: string;
  tone: Tone;
  lead: Story;
  list: Story[];
}

export interface NavItem {
  slug: string;
  name: string;
  href: string;
}

export interface LinkItem {
  id: string;
  href: string;
  title: string;
}

export interface RankedStories {
  top: Story;
  rest: Story[];
}

export interface HomepageData {
  ticker: LinkItem[];
  trendingTags: { slug: string; name: string; href: string }[];
  lead: Story;
  leadRelated: LinkItem[];
  middle: Story[];
  latest: Story[];
  moreTop: Story[];
  featuredVideo: VideoItem;
  upNextVideos: VideoItem[];
  categoryBlocks: CategoryBlockData[];
  galleries: GalleryItem[];
  mostRead: RankedStories;
  trending: RankedStories;
}

export type ArticleBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "alsoRead"; title: string; href: string }
  | { type: "image"; image: Photo; caption?: string; credit?: string }
  | { type: "youtube"; youtubeId: string; title: string };

export interface ArticlePageData {
  id: string;
  title: string;
  summary?: string;
  categorySlug: string;
  /** Site path, e.g. "/sri-lanka/some-slug" (no host). */
  path: string;
  breadcrumb: { name: string; href?: string }[];
  author?: { name: string; href: string; role?: string; bio?: string; avatar?: Photo };
  publishedLabel: string;
  updatedLabel?: string;
  publishedISO: string;
  modifiedISO: string;
  readMinutes: number;
  image?: Photo;
  imageCaption?: string;
  imageCredit?: string;
  body: ArticleBodyBlock[];
  tags: { name: string; href: string }[];
  ticker: LinkItem[];
  latest: Story[];
  mostRead: LinkItem[];
  related: Story[];
}

export interface CategoryPageData {
  title: string;
  description?: string;
  tone: Tone;
  categorySlug: string;
  /** Path of the first page, e.g. "/sri-lanka" or "/sri-lanka/weather". */
  basePath: string;
  breadcrumb: { name: string; href?: string }[];
  chips: { name: string; href: string; active: boolean }[];
  page: number;
  pageCount: number;
  featured?: { lead: Story; side: Story[] };
  list: Story[];
  ticker: LinkItem[];
  latest: Story[];
  mostRead: LinkItem[];
}

export interface ListingPageData {
  kind: "tag" | "author" | "latest";
  title: string;
  /** Small label above the title, e.g. "குறிச்சொல்" or "செய்தியாளர்". */
  label: string;
  description?: string;
  author?: { avatar?: Photo };
  breadcrumb: { name: string; href?: string }[];
  /** Path of the first page, e.g. "/tag/weather". */
  basePath: string;
  page: number;
  pageCount: number;
  total: number;
  list: Story[];
  ticker: LinkItem[];
  latest: Story[];
  mostRead: LinkItem[];
}

export interface VideoListingData {
  items: VideoItem[];
  page: number;
  pageCount: number;
  total: number;
  ticker: LinkItem[];
}

export interface GalleryListingData {
  items: GalleryItem[];
  page: number;
  pageCount: number;
  total: number;
  ticker: LinkItem[];
}

export interface GalleryPageData {
  title: string;
  description?: string;
  publishedLabel: string;
  count: number;
  photos: { src: string; alt: string; caption?: string; credit?: string }[];
  breadcrumb: { name: string; href?: string }[];
  more: GalleryItem[];
  ticker: LinkItem[];
}

export interface AuthorCardData {
  slug: string;
  name: string;
  href: string;
  role?: string;
  bio?: string;
  avatar?: Photo;
  storyCount: number;
  /** Names of the categories this reporter writes in, most stories first. */
  categories: string[];
}

export interface AuthorsPageData {
  authors: AuthorCardData[];
  ticker: LinkItem[];
}

export interface SearchOption {
  slug: string;
  name: string;
}

export interface SearchPageData {
  params: import("@/lib/search").SearchParams;
  total: number;
  page: number;
  pageCount: number;
  results: Story[];
  facets: { categories: SearchOption[]; authors: SearchOption[]; tags: SearchOption[] };
  activeFilters: { key: string; label: string; removeHref: string }[];
  popularTags: { name: string; href: string }[];
  ticker: LinkItem[];
  latest: Story[];
  mostRead: LinkItem[];
}

export interface StaticSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** "steps" shows the bullets as numbered step cards instead of a plain list. */
  variant?: "steps";
}

export interface PageCtaContent {
  title: string;
  text: string;
  /** The first link is the primary button. */
  links: { label: string; href: string }[];
}

/** A fixed-text page (About, Privacy...). The CMS "pages" editor will store this shape. */
export interface StaticPage {
  slug: string;
  title: string;
  /** Small letter-spaced label above the title, e.g. "PRIVACY". */
  eyebrow: string;
  intro: string;
  /** True while the wording is placeholder text the client still has to supply. */
  sample: boolean;
  /** Glass figures shown in the hero (for example audience numbers). */
  stats?: { label: string; value: string }[];
  sections: StaticSection[];
  cta?: PageCtaContent;
}

export interface StaticPageData extends StaticPage {
  ticker: LinkItem[];
}

export interface AboutContent {
  title: string;
  eyebrow: string;
  intro: string;
  sample: boolean;
  stats: { label: string; value: string }[];
  missionTitle: string;
  missionQuote: string;
  mission: string[];
  valuesTitle: string;
  values: { title: string; text: string }[];
  processTitle: string;
  processIntro: string;
  steps: { role: string; text: string }[];
  teamTitle: string;
  teamIntro: string;
  ctaTitle: string;
  ctaText: string;
}

export interface AboutPageData extends AboutContent {
  team: AuthorCardData[];
  teamCount: number;
  ticker: LinkItem[];
}
