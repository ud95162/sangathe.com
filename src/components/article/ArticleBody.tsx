import Link from "next/link";
import { Petal } from "@/components/ui/Petal";
import { Thumb } from "@/components/ui/Thumb";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";
import { ta } from "@/lib/i18n/ta";
import type { ArticleBodyBlock } from "@/lib/types";
import { youTubeThumbnail } from "@/lib/youtube";

function Caption({ caption, credit }: { caption?: string; credit?: string }) {
  if (!caption && !credit) return null;
  return (
    <figcaption className="mt-2.5 font-sans text-[13px] leading-[1.6] text-muted">
      {caption}
      {credit && ` ${ta.article.photoCredit}: ${credit}`}
    </figcaption>
  );
}

function Block({ block }: { block: ArticleBodyBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading":
      return <h2 className="mt-2 text-[26px] font-bold leading-[1.5]">{block.text}</h2>;
    case "alsoRead":
      return (
        <Link
          href={block.href}
          className="flex items-center gap-3.5 bg-flame-tint px-[18px] py-3.5 font-sans text-[15px]"
        >
          <span className="whitespace-nowrap font-bold text-flame-text">{ta.article.alsoRead}</span>
          <span className="font-semibold text-ink">{block.title}</span>
        </Link>
      );
    case "quote":
      return (
        <blockquote className="relative my-2 py-1 pl-7">
          <Petal className="absolute left-0 top-3.5 size-3.5 bg-flame" />
          <p className="text-[22px] font-bold leading-[1.6] sm:text-[26px]">“{block.text}”</p>
          {block.attribution && (
            <footer className="mt-2.5 font-sans text-sm text-muted">{block.attribution}</footer>
          )}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-2">
          <div className="relative aspect-[3/2] overflow-hidden bg-line">
            <Thumb photo={block.image} sizes="(min-width: 1024px) 820px, 100vw" />
          </div>
          <Caption caption={block.caption} credit={block.credit} />
        </figure>
      );
    case "youtube":
      return (
        <div className="my-2">
          <YouTubeFacade
            videoId={block.youtubeId}
            title={block.title}
            image={youTubeThumbnail(block.youtubeId, "maxres")}
            sizes="(min-width: 1024px) 820px, 100vw"
          >
            {null}
          </YouTubeFacade>
        </div>
      );
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBodyBlock[] }) {
  return (
    <div className="mt-8 flex flex-col gap-[22px] font-serif text-[18px] leading-[1.95] sm:text-[19px]">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
