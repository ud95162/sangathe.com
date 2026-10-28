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

## Working style

- Build in small steps. After each step, run the dev server and compare against the reference page before moving on.
- Use mock data (`lib/mock/*.ts`) for the public site first, then connect the database.
