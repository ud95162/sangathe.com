import Link from "next/link";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import type { GalleryItem } from "@/lib/types";

/** Portrait (4:5) cover with the title and photo count over a gradient. */
export function GalleryCard({ item, sizes }: { item: GalleryItem; sizes: string }) {
  return (
    <Link
      href={item.href}
      className="relative block aspect-[4/5] overflow-hidden bg-line-strong text-white hover:text-white"
    >
      <Thumb photo={item.image} sizes={sizes} />
      <span className="absolute inset-x-3 bottom-3 flex flex-col gap-0.5 rounded-[0_14px_0_14px] glass-dark px-4 py-3">
        <span className="font-serif text-[17px] font-bold leading-[1.45]">{item.title}</span>
        <span className="text-xs text-silver">{ta.gallery.photos(item.count)}</span>
      </span>
    </Link>
  );
}
