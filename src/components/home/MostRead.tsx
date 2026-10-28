"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon } from "@/components/ui/EyeIcon";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import { toneClasses, toneCycle } from "@/lib/tone";
import type { Story } from "@/lib/types";

export interface RankedList {
  id: string;
  label: string;
  top: Story;
  rest: Story[];
}

function TopCard({ story }: { story: Story }) {
  return (
    <Link
      href={story.href}
      className="relative flex min-h-[480px] flex-col justify-end overflow-hidden bg-charcoal text-white hover:text-white"
    >
      <Thumb photo={story.image} sizes="(min-width: 1024px) 33vw, 100vw" />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 via-45% to-charcoal/0 to-75%" />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex size-16 items-center justify-center rounded-br-[28px] bg-flame font-poppins text-[32px] font-bold leading-none"
      >
        1
      </span>
      <span className="relative flex flex-col gap-2.5 px-6 pb-6 pt-7">
        <FlameStripe className="h-1 w-[72px]" />
        <span className="text-[13px] font-bold tracking-[1px] text-golden">{story.category}</span>
        <span className="font-serif text-2xl font-bold leading-[1.45]">{story.title}</span>
        <span className="flex items-center gap-3.5 text-[13px] text-fog">
          <span className="flex items-center gap-1.5">
            <EyeIcon />
            {ta.mostRead.reads(story.reads ?? "")}
          </span>
          <span>{story.timeLabel}</span>
        </span>
      </span>
    </Link>
  );
}

function RankedRow({ story, rank }: { story: Story; rank: number }) {
  const strokeTone = toneCycle[(rank - 2) % toneCycle.length];
  return (
    <li className="flex items-center gap-4 border-b border-line py-3.5">
      <span
        aria-hidden="true"
        className={`w-12 shrink-0 font-poppins text-[46px] font-bold leading-none text-transparent [-webkit-text-stroke-width:1.5px] ${toneClasses[strokeTone].stroke}`}
      >
        {rank}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className={`text-xs font-bold tracking-[0.8px] ${toneClasses[strokeTone].text}`}>{story.category}</span>
        <Link href={story.href} className="font-serif text-base font-bold leading-[1.45] text-ink">
          {story.title}
        </Link>
        <span className="flex items-center gap-1.5 text-xs text-subtle">
          <EyeIcon />
          {ta.mostRead.reads(story.reads ?? "")}
        </span>
      </span>
      <span aria-hidden="true" className="relative h-[68px] w-24 shrink-0 overflow-hidden bg-line">
        <Thumb photo={story.image} sizes="96px" />
      </span>
    </li>
  );
}

export function MostRead({ lists }: { lists: RankedList[] }) {
  const [activeId, setActiveId] = useState(lists[0].id);
  const active = lists.find((l) => l.id === activeId) ?? lists[0];

  return (
    <div className="min-w-0 border-t-[3px] border-ink pt-3">
      <div role="tablist" aria-label={ta.mostRead.tabsLabel} className="mb-2 flex flex-wrap gap-x-6">
        {lists.map((l) => {
          const selected = l.id === active.id;
          return (
            <button
              key={l.id}
              type="button"
              role="tab"
              id={`tab-${l.id}`}
              aria-selected={selected}
              aria-controls={`panel-${l.id}`}
              onClick={() => setActiveId(l.id)}
              className={`cursor-pointer border-b-[3px] pb-1.5 font-serif ${
                selected
                  ? "border-flame text-2xl font-bold text-ink"
                  : "border-transparent text-xl font-semibold text-muted"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-7"
      >
        <TopCard story={active.top} />
        <ol start={2} className="flex flex-col">
          {active.rest.map((s, i) => (
            <RankedRow key={s.id} story={s} rank={i + 2} />
          ))}
        </ol>
      </div>
    </div>
  );
}
