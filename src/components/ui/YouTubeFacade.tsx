"use client";

import { useState } from "react";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import type { Photo } from "@/lib/types";
import { youTubeEmbedUrl } from "@/lib/youtube";

/**
 * Shows the thumbnail with the children overlaid (category, title, duration) and only loads the
 * YouTube player after the visitor presses play, so the page stays fast.
 */
export function YouTubeFacade({
  videoId,
  title,
  image,
  sizes,
  children,
}: {
  videoId: string;
  title: string;
  image?: Photo;
  sizes: string;
  children: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate to-charcoal text-white">
      {playing ? (
        <iframe
          src={youTubeEmbedUrl(videoId)}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex cursor-pointer flex-col text-left"
        >
          <span className="sr-only">{ta.videos.playPrefix}</span>
          <Thumb photo={image} sizes={sizes} />
          {/* The play button centres in the space the overlay (children) leaves free. */}
          <span className="relative flex min-h-0 flex-1 items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-full glass transition-colors group-hover:border-flame group-hover:bg-flame sm:size-20">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-8">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          {children}
        </button>
      )}
    </div>
  );
}
