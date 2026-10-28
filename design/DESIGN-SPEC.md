# Sangathe.com Design Spec (Phase 1)

Source of truth for the look of the site. Reference pages (open them in a browser next to your build and match them):

- `reference/homepage-ta.html`: approved homepage ("Homepage, desktop (Tamil), logo in top bar")
- `reference/article-ta.html`: article (news details) page
- `reference/category-ta.html`: category page (Sri Lanka example)

All three pages share the same header and footer. The pages link to each other, so you can click from the homepage into an article or a category.

All values below are taken from that file.

## 1. Brand colours (Flame Lily / Gloriosa superba)

| Token | Hex | Use |
|---|---|---|
| `flame` | `#E11D2E` | Primary accent: breaking news label, active nav underline, buttons, #1 badge |
| `sunset` | `#F97316` | Secondary accent, focus outline, petal markers |
| `golden` | `#FACC15` | Highlights on dark backgrounds (kicker text on photos, petal dot) |
| `leaf` | `#16A34A` | Accent, WhatsApp button outline |
| `charcoal` | `#1F2937` | Main text, section top rules, dark sections, footer, Trending label |

Accessible text shades (use these for coloured TEXT on white, never the bright tones above):

| For | Text shade |
|---|---|
| flame | `#B91C1C` |
| sunset | `#C2410C` |
| golden | `#A16207` |
| leaf | `#15803D` |

Neutrals: `#FFFFFF` page, `#E5E7EB` borders and image placeholders, `#D1D5DB` subtle borders, `#4B5563` / `#6B7280` meta text, `#374151` secondary text.

## 2. Typography

| Role | Font | Notes |
|---|---|---|
| Headlines | Noto Serif Tamil (fallback Noto Serif, Georgia) | weight 700 |
| Body, UI | Noto Sans Tamil | weights 400 to 700, base 16px, line-height 1.65 |
| Numbers (Most Read ranks, #1 badge) | Poppins | weight 700 |

Tamil text needs more line height than English: headlines use line-height 1.4 to 1.55. Never set Tamil headlines tighter than 1.35 or the vowel signs collide.

Load fonts with `next/font/google` (subset `tamil` + `latin`).

## 3. Layout

- Content width: `max-width: 1320px`, side padding `24px`, centred.
- Section heading pattern: 3px charcoal top rule, then heading with a rotated petal marker in front.
- Sections are separated by generous spacing (40 to 64px bottom padding).

## 4. Signature motifs

**Petal** (from the Flame Lily logo):
```css
border-radius: 0 100% 0 100%;
transform: rotate(45deg);
```
Used as section heading markers, ticker separators, bullet points.

**Leaf-cut corners** (badges, Trending label): `border-radius: 0 12px 0 12px;`

**Flame stripe**: 4 segments in a row, flex ratio 6:3:2:1 in flame, sunset, golden, leaf. Used under the header nav, at the top of the footer and on dark cards.

## 5. Components (top to bottom on the homepage)

1. **Top bar (compact header)**: 3-column grid `minmax(0,1fr) auto minmax(0,1fr)`. Left: Tamil date. Centre: dark logo (`logo/sangathe-logo-dark.png`). Right: Newsletter link, 5 social icons (dark), dark mode toggle, search button.
2. **Main nav**: category links, active item underlined in flame. Flame stripe below.
3. **Breaking news ticker**: charcoal bar, red "முக்கியச் செய்தி" label, scrolling headlines with petal separators (CSS `@keyframes sgTicker`, translateX 0 to -50%, list duplicated). No times shown.
4. **Trending row**: charcoal leaf-corner label with a yellow petal, then outlined chips: white background, charcoal text, 1px border cycling flame, sunset, golden, leaf, leaf-cut corners.
5. **Top stories**: lead story (large photo, kicker, big serif headline, summary, byline, share buttons in brand-coloured circles, 2 related links), two middle stories with photos, and the Latest News column (thumbnail, headline, "x minutes ago").
6. **More top stories carousel**: 4 cards visible, coloured 4px top border per category, auto-advances every 4.5s, pauses on hover, prev/next buttons and dots.
7. **Videos**: charcoal section, featured video with play button, "Up next" list.
8. **Category blocks**: Sri Lanka, World, Business columns, each a lead card plus thumbnail list with times.
9. **In Pictures gallery**: 4 portrait cards (4:5) with gradient overlay, title and photo count.
10. **Most Read + Subscribe**:
    - Most Read (tabs: Most Read / Trending). #1 is a large photo card with red corner badge, gradient overlay, yellow kicker, reads count. #2 to #6: big outlined Poppins numbers (`-webkit-text-stroke`) cycling sunset, golden, leaf, flame, plus category, serif headline, reads count, thumbnail.
    - Subscribe panel: charcoal with orange/red radial glow, flame stripe, heading, email field, red Subscribe button, WhatsApp channel button. It only collects email addresses in Phase 1 (no email sending).
11. **Footer**: charcoal, flame stripe on top, light logo, tagline placeholder, white social icons in outlined circles, Back to top button, 4 link columns (Categories, Sangathe, Policies, Contact), copyright line and "Designed & developed by Codexium".

## 6. Time display rules

- Same day: relative ("18 நிமிடங்களுக்கு முன்", "2 மணி நேரத்துக்கு முன்").
- Yesterday: "நேற்று, 18:30".
- Older: full date ("24 ஒக்டோபர் 2026").
- Breaking news ticker shows no time.

## 7. Interaction and accessibility

- Links: charcoal, hover flame text shade `#B91C1C`, no underline.
- Focus: `outline: 3px solid #F97316; outline-offset: 2px` on links, buttons and inputs.
- Minimum tap target 44px for icon buttons.
- Every image has meaningful `alt` text (from the CMS caption or alt field).

## 8. Inside pages

**Article page** (`reference/article-ta.html`), main column max 820px plus a sidebar:
- Breadcrumb, large serif headline, standfirst (summary), byline with author photo, published time, updated time and read time.
- Share row: Facebook, X, WhatsApp, Telegram in brand circles, plus a copy-link button.
- Hero image with caption and photo credit.
- Body text with sub-headings, an "Also read" box (light flame tint), a pull quote with a petal marker, an inline image with caption and a YouTube embed (custom thumbnail with play button).
- Tags as grey chips, author box with "All stories by this reporter" link.
- Sidebar: Latest news (thumbnails) and Most read (numbered list).
- Related stories: 4 cards in a full-width band at the bottom.

**Category page** (`reference/category-ta.html`):
- Breadcrumb, category title with petal marker, short description, subcategory chips on the right (active chip filled charcoal).
- Featured block: one lead story with large photo plus two stacked stories.
- "All stories" list: thumbnail left, category kicker, headline, summary, time. Pagination with numbered buttons and a red Next button.
- Sidebar: Latest news and the category's own Most read list.

## 9. Not designed yet (build in the same style)

Not designed at all: author, tag, search results, static pages (About, Contact, Advertise, Privacy, Terms), mobile layouts and dark mode colours. Derive them from this spec and the homepage.

## 10. Assets (`reference/assets/`)

- `logo/sangathe-logo-dark.png` for white backgrounds, `logo/sangathe-logo-light.png` for charcoal backgrounds.
- `icons/dark/*` header icons, `icons/white/*` footer and share-button icons (Facebook, X, YouTube, WhatsApp, Telegram).
- `photos/*` sample photos for development only. Real images come from the CMS.
