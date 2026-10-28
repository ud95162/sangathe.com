"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Thumb } from "@/components/ui/Thumb";
import { ta } from "@/lib/i18n/ta";
import { toneClasses } from "@/lib/tone";
import type { Story } from "@/lib/types";

const AUTO_ADVANCE_MS = 4500;

function useVisibleCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setCount(lg.matches ? 4 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return count;
}

export function MoreTopStories({ stories }: { stories: Story[] }) {
  const perView = useVisibleCount();
  const max = Math.max(0, stories.length - perView);
  const [rawIndex, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const index = Math.min(rawIndex, max);

  const step = useCallback(
    (n: number) => setIndex((i) => {
      const next = Math.min(i, max) + n;
      return next > max ? 0 : next < 0 ? max : next;
    }),
    [max],
  );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => step(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, step]);

  return (
    <Container as="section" className="pb-10">
      <SectionHeading
        title={ta.moreTopStories.title}
        action={
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={ta.moreTopStories.prev}
              onClick={() => step(-1)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-page text-ink"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={ta.moreTopStories.next}
              onClick={() => step(1)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink text-page"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        }
      />
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="flex gap-7 transition-transform duration-700 ease-in-out [--n:1] [--gap:28px] sm:[--n:2] lg:[--n:4]"
          style={{ transform: `translateX(calc(${-index} * (100% + var(--gap)) / var(--n)))` }}
        >
          {stories.map((s) => (
            <article
              key={s.id}
              className={`flex min-w-0 flex-[0_0_calc((100%-var(--gap)*(var(--n)-1))/var(--n))] flex-col gap-2.5 border-t-4 pt-3 ${toneClasses[s.tone].border}`}
            >
              <Link
                href={s.href}
                className="relative flex aspect-video items-center justify-center overflow-hidden bg-line text-[13px] text-muted"
              >
                {s.image ? <Thumb photo={s.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" /> : ta.imagePlaceholder}
              </Link>
              <span className={`text-xs font-bold tracking-[1px] ${toneClasses[s.tone].text}`}>{s.category}</span>
              <h3 className="font-serif text-lg font-bold leading-[1.55]">
                <Link href={s.href}>{s.title}</Link>
              </h3>
              <span className="text-xs text-muted">{s.timeLabel}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-0.5">
        {Array.from({ length: max + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={ta.moreTopStories.group(i + 1)}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="flex size-8 cursor-pointer items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full ${i === index ? "w-6 bg-flame" : "w-2 bg-line-strong"}`}
            />
          </button>
        ))}
      </div>
    </Container>
  );
}
