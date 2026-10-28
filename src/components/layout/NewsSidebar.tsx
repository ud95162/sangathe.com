import Link from "next/link";
import { LatestNewsList } from "@/components/ui/LatestNewsList";
import { ta } from "@/lib/i18n/ta";
import type { LinkItem, Story } from "@/lib/types";

export function NewsSidebar({ latest, mostRead }: { latest: Story[]; mostRead: LinkItem[] }) {
  return (
    <aside className="flex min-w-0 flex-col gap-10 self-start lg:border-l lg:border-line lg:pl-8">
      <section aria-label={ta.topStories.latest}>
        <LatestNewsList items={latest} />
      </section>
      <section>
        <h2 className="mb-1.5 border-b-[3px] border-ink pb-2 font-serif text-xl font-bold">{ta.article.mostRead}</h2>
        <ol>
          {mostRead.map((item, i) => (
            <li key={item.id} className="flex items-start gap-3.5 border-b border-line py-3">
              <span aria-hidden="true" className="w-7 shrink-0 font-serif text-[28px] font-bold leading-none text-flame">
                {i + 1}
              </span>
              <Link href={item.href} className="text-[15px] font-semibold leading-[1.55]">
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}
