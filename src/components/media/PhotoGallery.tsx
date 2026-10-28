"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import type { GalleryPageData } from "@/lib/types";

type GalleryPhotoView = GalleryPageData["photos"][number];

const iconButton =
  "flex size-12 cursor-pointer items-center justify-center rounded-full glass transition-colors hover:bg-white/30";

/** Thumbnail grid that opens a full-screen viewer (arrow keys, Escape and buttons). */
export function PhotoGallery({ photos }: { photos: GalleryPhotoView[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : photos[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (n: number) => setIndex((i) => (i === null ? i : (i + n + photos.length) % photos.length));

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-3">
        {photos.map((photo, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={ta.gallery.openPhoto(i + 1)}
              className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-line"
            >
              <Thumb photo={photo} sizes="(min-width: 1320px) 300px, (min-width: 640px) 33vw, 50vw" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={ta.gallery.viewer}
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-black/60 backdrop:backdrop-blur-2xl"
      >
        {current && index !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 font-poppins text-sm font-semibold">
              <span className="rounded-full glass-dark px-4 py-1.5">{ta.gallery.counter(index + 1, photos.length)}</span>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label={ta.gallery.close} className={iconButton}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <Image key={index} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              <button type="button" onClick={() => step(-1)} aria-label={ta.gallery.prev} className={`${iconButton} absolute left-3 top-1/2 -translate-y-1/2`}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button type="button" onClick={() => step(1)} aria-label={ta.gallery.next} className={`${iconButton} absolute right-3 top-1/2 -translate-y-1/2`}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center px-4 pb-4 pt-2">
              <p className="max-w-3xl rounded-[0_16px_0_16px] glass-dark px-5 py-3 text-center text-sm">
                {current.caption}
                {current.credit && ` · ${ta.article.photoCredit}: ${current.credit}`}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
