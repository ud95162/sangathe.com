import Image from "next/image";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleTags, AuthorBox } from "@/components/article/ArticleFooter";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { NewsSidebar } from "@/components/layout/NewsSidebar";
import { RelatedStories } from "@/components/article/RelatedStories";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { ta } from "@/lib/i18n/ta";
import type { ArticlePageData } from "@/lib/types";

export function ArticleView({ article }: { article: ArticlePageData }) {
  return (
    <div id="top">
      <Header active={article.categorySlug} />
      <Container className="mt-4">
        <BreakingTicker items={article.ticker} />
      </Container>

      <main>
        <Container className="grid gap-12 pb-14 pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <article className="min-w-0 max-w-[820px]">
            <ArticleHeader article={article} />

            {article.image && (
              <figure className="mt-7">
                <div className="relative aspect-video overflow-hidden bg-line">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-cover"
                  />
                </div>
                {(article.imageCaption || article.imageCredit) && (
                  <figcaption className="mt-2.5 text-[13px] leading-[1.6] text-muted">
                    {article.imageCaption}
                    {article.imageCredit && ` ${ta.article.photoCredit}: ${article.imageCredit}`}
                  </figcaption>
                )}
              </figure>
            )}

            <ArticleBody blocks={article.body} />
            <ArticleTags tags={article.tags} />
            {article.author && <AuthorBox author={article.author} />}
          </article>

          <NewsSidebar latest={article.latest} mostRead={article.mostRead} />
        </Container>
        <RelatedStories stories={article.related} />
      </main>
      <Footer />
    </div>
  );
}
