import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { Thumb } from "@/components/ui/Thumb";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";
import { ta } from "@/lib/i18n/ta";
import type { VideoItem } from "@/lib/types";
import { urls } from "@/lib/urls";

function PlayIcon({ size }: { size: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function FeaturedVideo({ video }: { video: VideoItem }) {
  const info = (
    <>
      <span className="flex items-center gap-3.5">
        <span className="bg-flame px-2.5 py-1 text-xs font-bold tracking-[1px] text-white">{video.category}</span>
        <span className="flex items-center gap-1.5 font-poppins text-[13px] font-semibold text-silver">
          <PlayIcon size={12} />
          {video.duration}
        </span>
      </span>
      <span className="font-serif text-lg font-bold leading-[1.5] sm:text-xl lg:text-[28px] lg:leading-[1.45]">
        {video.title}
      </span>
    </>
  );
  // Phones: the title sits under the video. Larger screens: a glass panel over the thumbnail.
  const overlay = (
    <span className="relative m-5 hidden flex-col gap-2.5 rounded-[0_20px_0_20px] glass-dark p-5 sm:flex">
      {info}
    </span>
  );

  return (
    <article className="min-w-0 flex-[7_1_560px] max-sm:flex-auto">
      {video.youtubeId ? (
        <YouTubeFacade
          videoId={video.youtubeId}
          title={video.title}
          image={video.image}
          sizes="(min-width: 1024px) 60vw, 100vw"
        >
          {overlay}
        </YouTubeFacade>
      ) : (
        <Link
          href={video.href}
          className="relative block aspect-video overflow-hidden bg-gradient-to-br from-slate to-charcoal text-white hover:text-white"
        >
          <span className="sr-only">{ta.videos.playPrefix}</span>
          <Thumb photo={video.image} sizes="(min-width: 1024px) 60vw, 100vw" />
          {overlay}
        </Link>
      )}
      <div className="mt-3 flex flex-col gap-2 text-white sm:hidden">{info}</div>
    </article>
  );
}

function UpNext({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="flex min-w-0 flex-[4_1_340px] flex-col max-sm:flex-auto">
      <h3 className="mb-1 text-[13px] font-bold tracking-[2px] text-golden">{ta.videos.upNext}</h3>
      {videos.map((v) => (
        <Link
          key={v.id}
          href={v.href}
          className="flex items-start gap-4 border-b border-white/14 py-4 text-white hover:text-white"
        >
          <span className="relative flex aspect-video w-[152px] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-slate to-charcoal">
            <Thumb photo={v.image} sizes="152px" />
            <span className="relative flex size-9 items-center justify-center rounded-full glass">
              <PlayIcon size={14} />
            </span>
            <span className="absolute bottom-1.5 right-1.5 rounded-[0_5px_0_5px] glass-dark px-1.5 py-0.5 font-poppins text-[11px] font-semibold">
              {v.duration}
            </span>
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="text-xs font-bold tracking-[1px] text-golden">{v.category}</span>
            <span className="font-serif text-base font-bold leading-[1.6]">{v.title}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function VideoSection({ featured, upNext }: { featured: VideoItem; upNext: VideoItem[] }) {
  return (
    <section className="bg-charcoal text-mist">
      <Container className="pb-[72px] pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <FlameStripe className="h-1 w-[72px]" />
            <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-[40px]">{ta.videos.title}</h2>
          </div>
          <Link
            href={urls.video()}
            className="flex min-h-11 items-center gap-2.5 rounded-full border border-white/40 px-[22px] text-sm font-semibold text-white hover:text-white"
          >
            {ta.videos.all}
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-wrap gap-10">
          <FeaturedVideo video={featured} />
          <UpNext videos={upNext} />
        </div>
      </Container>
    </section>
  );
}
