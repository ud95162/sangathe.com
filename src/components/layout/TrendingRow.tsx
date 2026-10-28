import Link from "next/link";
import { Petal } from "@/components/ui/Petal";
import { ta } from "@/lib/i18n/ta";
import { toneCycle, toneClasses } from "@/lib/tone";

export function TrendingRow({ tags }: { tags: { slug: string; name: string; href: string }[] }) {
  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
      <span className="mr-1 flex min-h-9 items-center gap-2 rounded-[0_12px_0_12px] bg-charcoal px-4 text-[13px] font-bold tracking-[1.2px] text-white shadow-[0_2px_6px_rgba(31,41,55,0.25)]">
        <Petal className="size-2 bg-golden" />
        {ta.trending.label}
      </span>
      {tags.map((tag, i) => (
        <Link
          key={tag.slug}
          href={tag.href}
          className={`flex min-h-9 items-center rounded-[0_12px_0_12px] border bg-page px-3.5 text-sm font-medium ${
            toneClasses[toneCycle[i % toneCycle.length]].border
          }`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
