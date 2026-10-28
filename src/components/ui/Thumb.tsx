import Image from "next/image";
import type { Photo } from "@/lib/types";

/** Fills its (relatively positioned, sized) parent. Falls back to a grey box when there is no photo. */
export function Thumb({
  photo,
  sizes,
  priority = false,
}: {
  photo?: Photo;
  sizes: string;
  priority?: boolean;
}) {
  if (!photo) return null;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      className="object-cover"
    />
  );
}
