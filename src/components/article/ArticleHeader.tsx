import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { ta } from "@/lib/i18n/ta";
import { siteUrl } from "@/lib/site";
import type { ArticlePageData } from "@/lib/types";

export function ArticleHeader({ article }: { article: ArticlePageData }) {
  const { author } = article;
  const meta = [
    `${ta.article.published}: ${article.publishedLabel}`,
    article.updatedLabel && `${ta.article.updated}: ${article.updatedLabel}`,
    ta.article.readTime(article.readMinutes),
  ].filter(Boolean);

  return (
    <header>
      <Breadcrumb items={article.breadcrumb} />
      <h1 className="mt-[18px] font-serif text-[30px] font-bold leading-[1.45] sm:text-[42px]">{article.title}</h1>
      {article.summary && <p className="mt-4 text-xl leading-[1.75] text-ink-2">{article.summary}</p>}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="relative size-12 shrink-0 overflow-hidden rounded-full bg-line">
            {author?.avatar && <Image src={author.avatar.src} alt="" fill sizes="48px" className="object-cover" />}
          </span>
          <div className="flex flex-col gap-0.5">
            {author && (
              <Link href={author.href} className="text-[15px] font-bold">
                {author.name}
              </Link>
            )}
            <span className="text-[13px] text-muted">{meta.join(" · ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons url={`${siteUrl}${article.path}`} title={article.title} className="text-[13px] font-semibold text-ink-2" />
          <CopyLinkButton url={`${siteUrl}${article.path}`} />
        </div>
      </div>
    </header>
  );
}
