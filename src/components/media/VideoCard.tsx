import Link from "next/link";
import { Thumb } from "@/components/ui/Thumb";
import type { VideoItem } from "@/lib/types";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="flex min-w-0 flex-col gap-2.5">
      <Link
        href={video.href}
        tabIndex={-1}
        aria-hidden="true"
        className="group relative block aspect-video overflow-hidden bg-gradient-to-br from-slate to-charcoal text-white"
      >
        <Thumb photo={video.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass transition-colors group-hover:border-flame group-hover:bg-flame">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-2 right-2 rounded-[0_6px_0_6px] glass-dark px-2 py-0.5 font-poppins text-[11px] font-semibold">
          {video.duration}
        </span>
      </Link>
      <span className="text-xs font-bold tracking-[1px] text-flame-text">{video.category}</span>
      <h3 className="font-serif text-lg font-bold leading-[1.55]">
        <Link href={video.href}>{video.title}</Link>
      </h3>
      {video.timeLabel && <span className="text-xs text-muted">{video.timeLabel}</span>}
    </article>
  );
}
