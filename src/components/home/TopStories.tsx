import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Petal } from "@/components/ui/Petal";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { LatestNewsList } from "@/components/ui/LatestNewsList";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import { siteUrl } from "@/lib/site";
import { toneClasses } from "@/lib/tone";
import type { Story } from "@/lib/types";
import { urls } from "@/lib/urls";
import { Byline } from "@/components/ui/Byline";

function LeadStory({ story, related }: { story: Story; related: { id: string; href: string; title: string }[] }) {
  return (
    <article className="flex min-w-0 flex-col gap-3.5 md:col-span-2 lg:col-span-1 lg:pr-7">
      <Link href={story.href} className="relative block aspect-[16/10] overflow-hidden bg-line">
        <Thumb photo={story.image} sizes="(min-width: 1320px) 640px, (min-width: 1024px) 50vw, 100vw" priority />
      </Link>
      <span className="text-[13px] font-bold tracking-[1px] text-flame-text">{story.category}</span>
      <h1 className="font-serif text-[28px] font-bold leading-[1.4] sm:text-[38px]">
        <Link href={story.href}>{story.title}</Link>
      </h1>
      <p className="text-lg text-ink-2">{story.summary}</p>
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-[13px] text-muted">
        <Byline story={story} className="text-[13px]" />
        <ShareButtons url={`${siteUrl}${story.href}`} title={story.title} />
      </div>
      <ul className="mt-1 flex flex-col gap-2 border-t border-line pt-3.5">
        {related.map((r) => (
          <li key={r.id} className="flex items-baseline gap-2.5">
            <Petal className="size-2 bg-flame" />
            <Link href={r.href} className="font-semibold">
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function MiddleStories({ stories }: { stories: Story[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-[22px] md:col-span-1 lg:border-l lg:border-line lg:px-7">
      {stories.map((s, i) => (
        <article
          key={s.id}
          className={`flex flex-col gap-2.5 ${i < stories.length - 1 ? "border-b border-line pb-[22px]" : ""}`}
        >
          <Link href={s.href} className="relative block aspect-[3/2] overflow-hidden bg-line">
            <Thumb photo={s.image} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
          </Link>
          <span className={`text-xs font-bold tracking-[1px] ${toneClasses[s.tone].text}`}>{s.category}</span>
          <h2 className="font-serif text-[21px] font-bold leading-[1.5]">
            <Link href={s.href}>{s.title}</Link>
          </h2>
          <p className="text-[15px] text-ink-2">{s.summary}</p>
          <Byline story={s} />
        </article>
      ))}
    </div>
  );
}

function LatestNews({ items }: { items: Story[] }) {
  return (
    <aside
      aria-label={ta.topStories.latest}
      className="min-w-0 md:col-span-1 lg:border-l lg:border-line lg:pl-7"
    >
      <LatestNewsList items={items} />
      <Link
        href={urls.latest()}
        className="mt-3.5 flex min-h-11 items-center justify-center border-[1.5px] border-ink text-sm font-semibold"
      >
        {ta.topStories.allNews}
      </Link>
    </aside>
  );
}

export function TopStories({
  lead,
  related,
  middle,
  latest,
}: {
  lead: Story;
  related: { id: string; href: string; title: string }[];
  middle: Story[];
  latest: Story[];
}) {
  return (
    <Container as="section" className="grid grid-cols-1 gap-y-8 pb-10 pt-7 md:grid-cols-2 lg:grid-cols-[6fr_3fr_3fr]">
      <LeadStory story={lead} related={related} />
      <MiddleStories stories={middle} />
      <LatestNews items={latest} />
    </Container>
  );
}
