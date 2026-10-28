import { Pagination } from "@/components/category/Pagination";
import { StoryList } from "@/components/category/StoryList";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsSidebar } from "@/components/layout/NewsSidebar";
import { Container } from "@/components/ui/Container";
import { ta } from "@/lib/i18n/ta";
import type { ListingPageData } from "@/lib/types";

export function ListingView({ data }: { data: ListingPageData }) {
  return (
    <div id="top">
      <Header active="none" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>

      <main>
        <ListingHeader data={data} />
        <Container className="grid gap-12 pb-16 pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <StoryList
              rule={false}
              stories={data.list}
              heading={
                data.kind === "author"
                  ? ta.article.allByAuthor
                  : data.kind === "latest"
                    ? ta.listing.newestFirst
                    : ta.category.allStories
              }
            />
            <Pagination basePath={data.basePath} page={data.page} pageCount={data.pageCount} />
          </div>
          <NewsSidebar latest={data.latest} mostRead={data.mostRead} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
