import { Pagination } from "@/components/category/Pagination";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { ta } from "@/lib/i18n/ta";
import type { GalleryListingData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function PhotoListingView({ data }: { data: GalleryListingData }) {
  return (
    <div id="top">
      <Header active="photos" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>
      <main>
        <PageHeader
          breadcrumb={[{ name: ta.site.home, href: urls.home() }, { name: ta.gallery.pageTitle }]}
          title={ta.gallery.pageTitle}
          subtitle={ta.listing.galleryCount(data.total)}
        />
        <Container className="pb-16 pt-8">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-4">
            {data.items.map((g) => (
              <GalleryCard key={g.id} item={g} sizes="(min-width: 1320px) 306px, (min-width: 768px) 25vw, 50vw" />
            ))}
          </div>
          <Pagination basePath={urls.photos()} page={data.page} pageCount={data.pageCount} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
