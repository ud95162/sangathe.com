# Sangathe.com: project guide for Claude Code

Tamil-first news platform for Sangathe.com, built by Codexium (Pvt) Ltd. Phase 1.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- PostgreSQL (indexed full-text search, Tamil partial-word matching)
- Custom CMS / admin panel inside this project (no paid plugins, themes or licences)
- Deployed on the client's Contabo VPS (Ubuntu 24.04 LTS) behind Cloudflare

## Design source of truth

- `design/reference/homepage-ta.html`, `article-ta.html`, `category-ta.html`: the approved page designs. Open them in a browser and match them closely.
- `design/DESIGN-SPEC.md`: colours, fonts, motifs, components, time display rules.
- `design/reference/assets/`: logo, icons, sample photos.

Rules:
- Put brand colours and fonts in the Tailwind theme (`flame`, `sunset`, `golden`, `leaf`, `charcoal` plus the accessible text shades). Never hard-code hex values in components.
- Use the accessible text shades for coloured text on white.
- Load fonts with `next/font/google` (Noto Serif Tamil, Noto Sans Tamil, Poppins).
- Build reusable components (Header, BreakingTicker, TrendingRow, StoryCard, SectionHeading, MostRead, Footer and so on), not one large page file.
- All interface labels are in Tamil. Keep them in one `lib/i18n/ta.ts` file so English or Sinhala can be added later.
- Use `next/image` for every image (WebP/AVIF, lazy loading, sizes).

## Phase 1 scope (from the signed proposal, do not add more)

Public site:
- Homepage, category and subcategory, tag, author, article pages
- Video articles (YouTube embed, custom thumbnail)
- Most read and trending
- Search: keyword, title, category, author, tag, date range
- Newsletter subscription FORM only (store emails, admin can export). No email sending.
- Static pages: About, Contact, Advertise, Privacy Policy, Terms
- Mobile-first responsive, with dark mode
- Share buttons: Facebook, X, WhatsApp, Telegram
- Auto-generated 1200x630 Open Graph image per article (headline + main image + branding, Tamil text)

CMS:
- Roles: Reporter -> Sub Editor -> News Editor -> Publisher (Admin)
- Article states: Draft, Review, Scheduled, Published, with an activity log
- Rich text editor (images, captions, embeds, autosave), media library, category, tag and menu management
- Breaking news flag, homepage placement, live ticker
- Basic analytics: views, most read, trending, category and author performance
- 2FA, rate-limited login, role-based permissions

SEO:
- SSR, NewsArticle / Organization / Breadcrumb structured data, canonical URLs
- XML sitemap + Google News sitemap, robots.txt, Open Graph and X cards
- Tamil language metadata (`lang="ta"`)

NOT in Phase 1 (do not build): push notifications, advertising system, newsletter email sending, AI features, extra languages, advanced analytics.

## Performance targets

LCP under 2.5s on mobile, INP under 200ms, CLS under 0.1, Lighthouse 90+ on homepage and article pages.

## Suggested routes

- `/` homepage
- `/[category]` and `/[category]/[subcategory]`
- `/[category]/[slug]` article
- `/tag/[slug]`, `/author/[slug]`, `/search`
- `/about`, `/contact`, `/advertise`, `/privacy`, `/terms`
- `/admin/...` CMS

## Architecture rules (set up in the homepage step)

- Pages and components get data only through `src/lib/data/*` (`getHomepage()`, `getNavigation()`, lookups). Today they are backed by `src/lib/mock/*`; replacing the mock with database queries must not touch any page or component.
- `src/lib/domain.ts` holds records that mirror the future tables (Article, Category, Tag, Author, Gallery, HomePlacements). `src/lib/types.ts` holds the view models the components render. Mappers in `src/lib/data/mappers.ts` turn one into the other and format times with `formatPublishedTime`.
- Article bodies are typed blocks (`ArticleBlock` in `src/lib/domain.ts`: paragraph, heading, quote, alsoRead, image, youtube), which is what the CMS rich-text editor will store. `/[category]/[slug]` is either a subcategory page or an article; `getArticlePage()` builds everything the article page shows.
- Listings: `getCategoryPage(category, subcategory|null, page)` feeds category and sub-category pages (3 featured stories on page 1, then 10 per page). Pages are path-based (`/sri-lanka/page/2`, `/sri-lanka/east/page/2`) so they prerender; `/page/1` redirects to the first page.
- Tag and author pages share `getListingPage("tag"|"author", slug, page)` (10 per page, `/tag/weather/page/2`). Mock stories carry tags and one of two sample authors.
- `/latest` is a third listing kind in `getListingPage`; `/video` and `/photos` (+ `/photos/[slug]`) load through `src/lib/data/media.ts` (12 per page). A gallery is a list of photos with captions and credits; `PhotoGallery` is the full-screen viewer.
- Frosted glass: `.glass` (light, for round controls) and `.glass-dark` (dark tint, for labels and panels) in `globals.css`, used for anything that sits on a photo or video (play buttons, duration badges, gallery labels, viewer controls). They fall back to a solid tint without `backdrop-filter` and under `prefers-reduced-transparency`.
- `/authors` lists every reporter (`getAuthorsPage()`, with story count and the categories they write in); the footer "ஆசிரியர் குழு" link and the author-page breadcrumb point to it. The mock newsroom has five sample reporters, one or two categories each.
- Search (`/search`) is a plain GET form (`SearchForm`): keyword, title-only, category, author, tag, date range, sort. `parseSearchParams`/`buildSearchUrl` in `src/lib/search.ts` own the query string; `searchArticles()` in `src/lib/data/search.ts` is the mock (substring match over title, summary, tags, body) that PostgreSQL full-text + trigram search replaces. The page renders per request (`connection()`), is `noindex`, and redirects untidy URLs to the clean form.
- About has its own premium layout (`AboutView`) fed by `getAboutPage()`. Every static page shares `PageHero` (dark hero with glow and optional glass stats), `SampleNotice` and `PageCta` (dark closing band). The other static pages (Contact, Advertise, Privacy, Terms) come from `getStaticPage(slug)` (sections of headings, paragraphs and bullets in `src/lib/mock/pages.ts`, the shape the CMS pages editor will store) and render through `StaticPageView` (numbered sections, a contents card for long pages, optional step cards, a closing band from the content's `cta`). The wording is still placeholder text for the client to replace; the "sample page" notice is off (`sample: false` in `src/lib/mock/pages.ts`; set it to `true` to show the notice again). `app/not-found.tsx` is the 404 page and `app/error.tsx` the last-resort error screen.
- Share image (Open Graph, 1200x630): the chosen template is **Layout B** (dark panel with glow on the left: logo, gold category, large white serif headline, "sangathe.com", flame stripe; article photo on the right with a rounded top-left corner). Sample renders are in `design/og/`; the dev-only preview page is `src/app/og-preview/[variant]/[sample]`. Headline size steps down with length (58/50/44/38px) so it never truncates. Tamil must be rendered with a real Tamil font (Noto Serif Tamil) and checked: Satori/`next/og` has not been tested with Tamil shaping yet, so the production generator may need a browser-based renderer instead.
- Build every internal URL with `src/lib/urls.ts` (it goes through `withLocale`, so a language prefix can be added later without changing Tamil URLs).
- Colours: theme-aware tokens (`page`, `ink`, `line`, `muted`, `*-text`) flip in dark mode via `data-theme="dark"`. `charcoal`, `slate`, `mist`, `silver`, `fog`, `faint` are fixed colours for permanently dark surfaces (footer, video section, ticker).
- Ad placements are reserved with `<AdSlot id>` and render nothing until `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true`. Staging and demo builds are `noindex` and `Disallow: /` until `SITE_INDEXING=on`.
- Dev server note: edits to `globals.css` are sometimes not picked up by `next dev`; stop it, delete `.next/dev` and start it again.

## Working style

- Build in small steps. After each step, run the dev server and compare against the reference page before moving on.
- Use mock data (`lib/mock/*.ts`) for the public site first, then connect the database.
