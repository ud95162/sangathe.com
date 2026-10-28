import Link from "next/link";
import { Petal } from "@/components/ui/Petal";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import type { Story } from "@/lib/types";

/** Heading plus thumbnail list, shared by the homepage and the article sidebar. */
export function LatestNewsList({ items }: { items: Story[] }) {
  return (
    <>
      <h2 className="mb-1.5 flex items-center gap-2.5 text-[15px] font-bold tracking-[1px]">
        <Petal className="size-[11px] bg-flame" />
        {ta.topStories.latest}
      </h2>
      <ol>
        {items.map((s) => (
          <li key={s.id} className="flex items-start gap-3 border-b border-line py-3">
            <Link
              href={s.href}
              tabIndex={-1}
              aria-hidden="true"
              className="relative h-14 w-[84px] shrink-0 overflow-hidden bg-line"
            >
              <Thumb photo={s.image} sizes="84px" />
            </Link>
            <div className="flex min-w-0 flex-col gap-1">
              <Link href={s.href} className="text-[15px] font-semibold leading-[1.5]">
                {s.title}
              </Link>
              <span className="text-xs text-muted">{s.timeLabel}</span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
