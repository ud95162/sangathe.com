import Image from "next/image";
import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import type { AuthorCardData } from "@/lib/types";

export function AuthorCard({ author }: { author: AuthorCardData }) {
  return (
    <article className="flex min-w-0 flex-col gap-4 bg-tint p-6">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="relative size-[72px] shrink-0 overflow-hidden rounded-full bg-line">
          {author.avatar && <Image src={author.avatar.src} alt="" fill sizes="72px" className="object-cover" />}
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-bold tracking-[1px] text-muted">{author.role ?? ta.pages.author}</span>
          <h2 className="break-words font-serif text-xl font-bold leading-[1.4]">
            <Link href={author.href}>{author.name}</Link>
          </h2>
        </div>
      </div>

      {author.bio && <p className="text-[15px] text-ink-2">{author.bio}</p>}

      {author.categories.length > 0 && (
        <p className="text-[13px] text-muted">
          <span className="font-semibold text-ink-2">{ta.authorsPage.covers}: </span>
          {author.categories.join(", ")}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-sm">
        <span className="text-muted">{ta.listing.storyCount(author.storyCount)}</span>
        <Link href={author.href} className="whitespace-nowrap font-semibold text-flame-text">
          {ta.article.allByAuthor}
        </Link>
      </div>
    </article>
  );
}
