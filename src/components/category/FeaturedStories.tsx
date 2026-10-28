import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Thumb } from "@/components/ui/Thumb";
import { toneClasses } from "@/lib/tone";
import type { Story } from "@/lib/types";
import { Byline } from "@/components/ui/Byline";

export function FeaturedStories({ lead, side }: { lead: Story; side: Story[] }) {
  return (
    <Container
      as="section"
      className={`grid gap-y-8 pb-10 pt-7 ${side.length ? "lg:grid-cols-[7fr_4fr]" : ""}`}
    >
      <article className={`flex min-w-0 flex-col gap-3.5 ${side.length ? "lg:pr-8" : "max-w-[820px]"}`}>
        <Link href={lead.href} className="relative block aspect-[16/10] overflow-hidden bg-line">
          <Thumb photo={lead.image} sizes="(min-width: 1320px) 700px, (min-width: 1024px) 55vw, 100vw" priority />
        </Link>
        <span className={`text-[13px] font-bold tracking-[1px] ${toneClasses[lead.tone].text}`}>{lead.category}</span>
        <h2 className="font-serif text-[26px] font-bold leading-[1.45] sm:text-[34px]">
          <Link href={lead.href}>{lead.title}</Link>
        </h2>
        {lead.summary && <p className="text-[17px] text-ink-2">{lead.summary}</p>}
        <Byline story={lead} className="text-[13px]" />
      </article>

      {side.length > 0 && (
        <div className="flex min-w-0 flex-col gap-[22px] lg:border-l lg:border-line lg:pl-8">
          {side.map((s, i) => (
            <article
              key={s.id}
              className={`flex flex-col gap-2.5 ${i < side.length - 1 ? "border-b border-line pb-[22px]" : ""}`}
            >
              <Link href={s.href} className="relative block aspect-video overflow-hidden bg-line">
                <Thumb photo={s.image} sizes="(min-width: 1024px) 30vw, 100vw" />
              </Link>
              <span className={`text-xs font-bold tracking-[1px] ${toneClasses[s.tone].text}`}>{s.category}</span>
              <h3 className="font-serif text-xl font-bold leading-[1.55]">
                <Link href={s.href}>{s.title}</Link>
              </h3>
              <Byline story={s} />
            </article>
          ))}
        </div>
      )}
    </Container>
  );
}
