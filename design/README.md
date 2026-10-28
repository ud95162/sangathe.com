# Sangathe handoff package

## What is inside

- `reference/homepage-ta.html`, `reference/article-ta.html`, `reference/category-ta.html`: the approved designs as plain HTML pages. Open them in Chrome to view them (they work offline except for Google Fonts) and click between them.
- `reference/assets/`: logo, icons and sample photos.
- `DESIGN-SPEC.md`: colours, fonts, motifs and every component.
- `CLAUDE.md`: project instructions for Claude Code (stack, scope, rules).

## How to start with Claude Code

1. Create the project:
   ```
   npx create-next-app@latest sangathe --typescript --tailwind --app --src-dir
   ```
2. Copy this folder into the project as `design/`, and move `CLAUDE.md` to the project root.
3. Copy `design/reference/assets/logo` and `icons` into `public/`.
4. Open the project folder in Claude Code and work through the prompts below one at a time. Check the result in the browser after each one.

## Prompts, in order

1. "Read CLAUDE.md and design/DESIGN-SPEC.md. Set up the Tailwind theme with the brand colours and the fonts with next/font. Create lib/i18n/ta.ts for interface labels."
2. "Build the site layout to match design/reference/homepage-ta.html: compact top bar header, main nav, flame stripe, breaking news ticker, trending row and footer. Use mock data."
3. "Build the homepage sections from the reference as separate components, in order: top stories, latest news, more top stories carousel, videos, category blocks, in pictures, most read and subscribe panel. Use mock data."
4. "Make the layout and homepage fully responsive, mobile-first. Mobile designs were not made, so follow common news site patterns (single column, hamburger menu, horizontal scroll for chips) while keeping the design spec."
5. "Build the article page at /[category]/[slug] to match design/reference/article-ta.html. Reuse the existing components."
6. "Build the category page at /[category] to match design/reference/category-ta.html, with subcategory chips and pagination."
7. "Build tag, author and search pages, and the static pages, in the same style as the category page."
8. "Add dark mode using the charcoal palette."
9. Then the database, CMS, roles and workflow, SEO, and deployment, step by step.

Tip: if a section does not match, take a screenshot of the reference and of your build and give both to Claude Code.
