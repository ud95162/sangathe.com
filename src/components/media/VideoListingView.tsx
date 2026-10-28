import { Pagination } from "@/components/category/Pagination";
import { VideoCard } from "@/components/media/VideoCard";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ta } from "@/lib/i18n/ta";
import type { VideoListingData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function VideoListingView({ data }: { data: VideoListingData }) {
  return (
    <div id="top">
      <Header active="video" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>
      <main>
        <PageHeader
          breadcrumb={[{ name: ta.site.home, href: urls.home() }, { name: ta.videos.title }]}
          title={ta.videos.title}
          subtitle={ta.listing.videoCount(data.total)}
        />
        <Container className="pb-16 pt-8">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-x-7 gap-y-9">
            {data.items.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
          <Pagination basePath={urls.video()} page={data.page} pageCount={data.pageCount} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
