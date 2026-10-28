import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { ta } from "@/lib/i18n/ta";
import type { GalleryItem } from "@/lib/types";
import { urls } from "@/lib/urls";

export function PictureGallery({ items }: { items: GalleryItem[] }) {
  return (
    <Container as="section" className="pb-12 pt-2">
      <SectionHeading
        title={ta.gallery.title}
        tone="sunset"
        alignBaseline
        action={
          <Link href={urls.photos()} className="text-sm font-semibold text-flame-text">
            {ta.gallery.all}
          </Link>
        }
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
        {items.map((g) => (
          <GalleryCard key={g.id} item={g} sizes="(min-width: 1320px) 306px, (min-width: 768px) 25vw, 50vw" />
        ))}
      </div>
    </Container>
  );
}
