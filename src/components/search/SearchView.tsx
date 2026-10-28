import { Pagination } from "@/components/category/Pagination";
import { StoryList } from "@/components/category/StoryList";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsSidebar } from "@/components/layout/NewsSidebar";
import { ActiveFilters } from "@/components/search/ActiveFilters";
import { SearchEmpty } from "@/components/search/SearchEmpty";
import { SearchForm } from "@/components/search/SearchForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ta } from "@/lib/i18n/ta";
import { buildSearchUrl } from "@/lib/search";
import type { SearchPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function SearchView({ data }: { data: SearchPageData }) {
  const { params, total } = data;
  const searched = Boolean(params.q || data.activeFilters.length);
  const subtitle = params.q ? ta.search.resultsFor(params.q, total) : searched ? ta.search.resultCount(total) : ta.search.hint;

  return (
    <div id="top">
      <Header active="none" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>

      <main>
        <PageHeader
          breadcrumb={[{ name: ta.site.home, href: urls.home() }, { name: ta.search.title }]}
          title={ta.search.title}
          subtitle={subtitle}
        />
        <Container className="flex flex-col gap-5 pt-8">
          <SearchForm data={data} />
          <ActiveFilters filters={data.activeFilters} />
        </Container>

        <Container className="grid gap-12 pb-16 pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            {total === 0 ? (
              <SearchEmpty data={data} />
            ) : (
              <>
                <StoryList stories={data.results} heading={ta.search.results} highlight={params.q} />
                <Pagination
                  page={data.page}
                  pageCount={data.pageCount}
                  hrefFor={(n) => buildSearchUrl({ ...params, page: n })}
                />
              </>
            )}
          </div>
          <NewsSidebar latest={data.latest} mostRead={data.mostRead} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
