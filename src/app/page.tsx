import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TrendingRow } from "@/components/layout/TrendingRow";
import { CategoryBlocks } from "@/components/home/CategoryBlocks";
import { MoreTopStories } from "@/components/home/MoreTopStories";
import { MostRead, type RankedList } from "@/components/home/MostRead";
import { PictureGallery } from "@/components/home/PictureGallery";
import { SubscribePanel } from "@/components/home/SubscribePanel";
import { TopStories } from "@/components/home/TopStories";
import { VideoSection } from "@/components/home/VideoSection";
import { AdSlot } from "@/components/ui/AdSlot";
import { Container } from "@/components/ui/Container";
import { getHomepage } from "@/lib/data/home";
import { ta } from "@/lib/i18n/ta";

// The page is prerendered from cached data; skip the dev-only instant-navigation check.
export const instant = false;

export default async function HomePage() {
  const home = await getHomepage();
  const rankedLists: RankedList[] = [
    { id: "most-read", label: ta.mostRead.mostRead, ...home.mostRead },
    { id: "trending", label: ta.mostRead.trending, ...home.trending },
  ];

  return (
    <div id="top">
      <Header active="home" />
      <Container className="mt-4">
        <BreakingTicker items={home.ticker} />
        <TrendingRow tags={home.trendingTags} />
        <AdSlot id="home-top" className="mt-4" />
      </Container>
      <main>
        <TopStories lead={home.lead} related={home.leadRelated} middle={home.middle} latest={home.latest} />
        <MoreTopStories stories={home.moreTop} />
        <VideoSection featured={home.featuredVideo} upNext={home.upNextVideos} />
        <CategoryBlocks blocks={home.categoryBlocks} />
        <Container>
          <AdSlot id="home-middle" className="mb-10" />
        </Container>
        <PictureGallery items={home.galleries} />
        <Container as="section" className="flex flex-col gap-10 pb-16 lg:grid lg:grid-cols-[2fr_1fr]">
          <MostRead lists={rankedLists} />
          <SubscribePanel />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
