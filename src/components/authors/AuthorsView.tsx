import { AuthorCard } from "@/components/authors/AuthorCard";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ta } from "@/lib/i18n/ta";
import type { AuthorsPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function AuthorsView({ data }: { data: AuthorsPageData }) {
  return (
    <div id="top">
      <Header active="none" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>
      <main>
        <PageHeader
          breadcrumb={[{ name: ta.site.home, href: urls.home() }, { name: ta.authorsPage.title }]}
          title={ta.authorsPage.title}
          subtitle={ta.authorsPage.count(data.authors.length)}
        />
        <Container className="pb-16 pt-8">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-6">
            {data.authors.map((author) => (
              <AuthorCard key={author.slug} author={author} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
