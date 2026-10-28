import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import { toneClasses } from "@/lib/tone";
import type { CategoryBlockData } from "@/lib/types";
import { Byline } from "@/components/ui/Byline";

function CategoryBlock({ block }: { block: CategoryBlockData }) {
  const tone = toneClasses[block.tone];
  const { lead } = block;
  return (
    <div className={`flex min-w-0 flex-col gap-3 border-t-4 pt-3 ${tone.border}`}>
      <div className="flex items-baseline justify-between">
        <SectionTitle tone={block.tone} gap="mr-3">
          {block.name}
        </SectionTitle>
        <Link href={block.href} className={`text-[13px] font-semibold ${tone.text}`}>
          {ta.category.more}
        </Link>
      </div>
      <Link
        href={lead.href}
        className="relative flex aspect-video items-center justify-center overflow-hidden bg-line text-[13px] text-muted"
      >
        {lead.image ? <Thumb photo={lead.image} sizes="(min-width: 1320px) 424px, (min-width: 768px) 33vw, 100vw" /> : ta.imagePlaceholder}
      </Link>
      <h3 className="font-serif text-[19px] font-bold leading-[1.55]">
        <Link href={lead.href}>{lead.title}</Link>
      </h3>
      <Byline story={lead} />
      <ul className="mt-2.5">
        {block.list.map((s) => (
          <li key={s.id} className="flex items-start gap-3.5 border-t border-line py-3.5">
            <span aria-hidden="true" className="relative h-[68px] w-[104px] shrink-0 overflow-hidden bg-line">
              <Thumb photo={s.image} sizes="104px" />
            </span>
            <Link href={s.href} className="font-serif text-[15px] font-bold leading-[1.6]">
              {s.title}
              <span className="mt-1 block font-sans text-xs font-normal text-muted">{s.timeLabel}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CategoryBlocks({ blocks }: { blocks: CategoryBlockData[] }) {
  return (
    <Container as="section" className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-8 pb-10 pt-12">
      {blocks.map((b) => (
        <CategoryBlock key={b.slug} block={b} />
      ))}
    </Container>
  );
}
