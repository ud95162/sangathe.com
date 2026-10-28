import Image from "next/image";
import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import type { ArticlePageData } from "@/lib/types";

export function ArticleTags({ tags }: { tags: ArticlePageData["tags"] }) {
  if (!tags.length) return null;
  return (
    <div className="mt-9 flex flex-wrap items-center gap-x-2.5 gap-y-2">
      <span className="mr-1 text-[13px] font-bold tracking-[1px] text-ink-2">{ta.article.tags}</span>
      {tags.map((t) => (
        <Link key={t.href} href={t.href} className="flex min-h-9 items-center bg-wash px-3 text-sm font-medium">
          {t.name}
        </Link>
      ))}
    </div>
  );
}

export function AuthorBox({ author }: { author: NonNullable<ArticlePageData["author"]> }) {
  return (
    <div className="mt-8 flex items-start gap-[18px] border-t-[3px] border-ink bg-tint p-6">
      <span aria-hidden="true" className="relative size-[72px] shrink-0 overflow-hidden rounded-full bg-line">
        {author.avatar && <Image src={author.avatar.src} alt="" fill sizes="72px" className="object-cover" />}
      </span>
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-xs font-bold tracking-[1px] text-muted">{author.role ?? ta.article.reporter}</span>
        <Link href={author.href} className="font-serif text-xl font-bold">
          {author.name}
        </Link>
        {author.bio && <p className="text-[15px] text-ink-2">{author.bio}</p>}
        <Link href={author.href} className="text-sm font-semibold text-flame-text">
          {ta.article.allByAuthor}
        </Link>
      </div>
    </div>
  );
}
