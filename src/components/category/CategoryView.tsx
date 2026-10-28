import { CategoryHeader } from "@/components/category/CategoryHeader";
import { FeaturedStories } from "@/components/category/FeaturedStories";
import { Pagination } from "@/components/category/Pagination";
import { StoryList } from "@/components/category/StoryList";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsSidebar } from "@/components/layout/NewsSidebar";
import { Container } from "@/components/ui/Container";
import type { CategoryPageData } from "@/lib/types";

export function CategoryView({ data }: { data: CategoryPageData }) {
  return (
    <div id="top">
      <Header active={data.categorySlug} />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>

      <main>
        <CategoryHeader data={data} />
        {data.featured && <FeaturedStories lead={data.featured.lead} side={data.featured.side} />}
        <Container className={`grid gap-12 pb-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] ${data.featured ? "" : "pt-8"}`}>
          <div className="min-w-0">
            <StoryList stories={data.list} rule={Boolean(data.featured)} />
            <Pagination basePath={data.basePath} page={data.page} pageCount={data.pageCount} />
          </div>
          <NewsSidebar latest={data.latest} mostRead={data.mostRead} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
