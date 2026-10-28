import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Petal } from "@/components/ui/Petal";
import { ta } from "@/lib/i18n/ta";
import { toneClasses } from "@/lib/tone";
import type { CategoryPageData } from "@/lib/types";

export function CategoryHeader({ data }: { data: CategoryPageData }) {
  return (
    <Container as="section" className="pt-8">
      <Breadcrumb items={data.breadcrumb} />
      <div className="mt-3.5 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-[3px] border-ink pb-5">
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-[18px] font-serif text-[36px] font-bold leading-[1.3] sm:text-5xl">
            <Petal className={`size-5 ${toneClasses[data.tone].bg}`} />
            {data.title}
          </h1>
          {data.description && <p className="text-[17px] text-ink-2">{data.description}</p>}
        </div>
        {data.chips.length > 0 && (
          <nav aria-label={ta.category.subcategories} className="flex flex-wrap gap-2">
            {data.chips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                aria-current={chip.active ? "page" : undefined}
                className={`flex min-h-10 items-center rounded-full px-4 text-sm font-semibold ${
                  chip.active ? "bg-ink text-page hover:text-page" : "border border-line-strong"
                }`}
              >
                {chip.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </Container>
  );
}
