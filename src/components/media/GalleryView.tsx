import { PhotoGallery } from "@/components/media/PhotoGallery";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { ta } from "@/lib/i18n/ta";
import type { GalleryPageData } from "@/lib/types";

export function GalleryView({ data }: { data: GalleryPageData }) {
  const meta = [
    ta.gallery.photos(data.count),
    `${ta.gallery.published}: ${data.publishedLabel}`,
  ].join(" · ");

  return (
    <div id="top">
      <Header active="photos" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>
      <main>
        <PageHeader
          breadcrumb={data.breadcrumb}
          title={data.title}
          subtitle={[data.description, meta].filter(Boolean).join(" · ")}
        />
        <Container className="pb-16 pt-8">
          <PhotoGallery photos={data.photos} />
        </Container>

        {data.more.length > 0 && (
          <section className="border-t border-line bg-tint">
            <Container className="pb-16 pt-12">
              <div className="mb-6 border-t-[3px] border-ink pt-3">
                <SectionTitle tone="sunset">{ta.gallery.moreGalleries}</SectionTitle>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                {data.more.map((g) => (
                  <GalleryCard key={g.id} item={g} sizes="(min-width: 1320px) 306px, (min-width: 768px) 25vw, 50vw" />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
