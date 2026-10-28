import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import { toneClasses } from "@/lib/tone";
import type { Story } from "@/lib/types";
import { Byline } from "@/components/ui/Byline";

export function RelatedStories({ stories }: { stories: Story[] }) {
  if (!stories.length) return null;
  return (
    <section className="border-t border-line bg-tint">
      <Container className="pb-16 pt-12">
        <div className="mb-6 border-t-[3px] border-ink pt-3">
          <SectionTitle tone="flame">{ta.article.related}</SectionTitle>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-7">
          {stories.map((s) => (
            <article key={s.id} className="flex flex-col gap-2.5">
              <Link href={s.href} className="relative block aspect-video overflow-hidden bg-line">
                <Thumb photo={s.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </Link>
              <span className={`text-xs font-bold tracking-[1px] ${toneClasses[s.tone].text}`}>{s.category}</span>
              <h3 className="font-serif text-[17px] font-bold leading-[1.6]">
                <Link href={s.href}>{s.title}</Link>
              </h3>
              <Byline story={s} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
