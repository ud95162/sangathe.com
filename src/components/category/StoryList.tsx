import Link from "next/link";
import { Highlight } from "@/components/ui/Highlight";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import { toneClasses } from "@/lib/tone";
import type { Story } from "@/lib/types";
import { Byline } from "@/components/ui/Byline";

export function StoryList({
  stories,
  heading = ta.category.allStories,
  rule = true,
  highlight,
}: {
  stories: Story[];
  heading?: string;
  /** The heavy top rule. Turn it off when the list follows a page header that already ends in one. */
  rule?: boolean;
  /** Search words to mark in titles and summaries. */
  highlight?: string;
}) {
  return (
    <div className="min-w-0">
      <div className={rule ? "border-t-[3px] border-ink pt-3" : ""}>
        <SectionTitle tone="flame">{heading}</SectionTitle>
      </div>
      {stories.length === 0 ? (
        <p className="py-8 text-muted">{ta.category.empty}</p>
      ) : (
        <ol className="mt-2">
          {stories.map((s) => (
            <li key={s.id} className="flex flex-col gap-5 border-b border-line py-[22px] sm:flex-row sm:items-start">
              <Link
                href={s.href}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-line sm:w-60"
              >
                <Thumb photo={s.image} sizes="(min-width: 640px) 240px, 100vw" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className={`text-xs font-bold tracking-[1px] ${toneClasses[s.tone].text}`}>{s.category}</span>
                <h3 className="font-serif text-[21px] font-bold leading-[1.55]">
                  <Link href={s.href}>
                    <Highlight text={s.title} query={highlight} />
                  </Link>
                </h3>
                {s.summary && (
                  <p className="text-[15px] text-ink-2">
                    <Highlight text={s.summary} query={highlight} />
                  </p>
                )}
                <Byline story={s} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
