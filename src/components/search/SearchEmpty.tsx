import Link from "next/link";
import { Petal } from "@/components/ui/Petal";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { ta } from "@/lib/i18n/ta";
import type { SearchPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function SearchEmpty({ data }: { data: SearchPageData }) {
  return (
    <div className="min-w-0">
      <div className="border-t-[3px] border-ink pt-3">
        <SectionTitle tone="flame">{ta.search.emptyTitle}</SectionTitle>
      </div>
      <ul className="mt-5 flex flex-col gap-2.5 text-[16px] text-ink-2">
        {ta.search.tips.map((tip) => (
          <li key={tip} className="flex items-baseline gap-3">
            <Petal className="size-2 bg-flame" />
            {tip}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs font-bold tracking-[1px] text-muted">{ta.search.popular}</p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {data.popularTags.map((t) => (
          <Link key={t.href} href={t.href} className="flex min-h-9 items-center rounded-[0_12px_0_12px] border border-line-strong px-3.5 text-sm font-medium">
            {t.name}
          </Link>
        ))}
      </div>
      <Link href={urls.latest()} className="mt-8 inline-block font-semibold text-flame-text">
        {ta.topStories.allNews}
      </Link>
    </div>
  );
}
