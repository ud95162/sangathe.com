import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Petal } from "@/components/ui/Petal";
import { ta } from "@/lib/i18n/ta";
import type { ListingPageData } from "@/lib/types";

export function ListingHeader({ data }: { data: ListingPageData }) {
  const isAuthor = data.kind === "author";
  return (
    <Container as="section" className="pt-8">
      <Breadcrumb items={data.breadcrumb} />
      <div className="mt-3.5 flex items-center gap-5 border-b-[3px] border-ink pb-5">
        {isAuthor && (
          <span aria-hidden="true" className="relative size-20 shrink-0 overflow-hidden rounded-full bg-line sm:size-24">
            {data.author?.avatar && (
              <Image src={data.author.avatar.src} alt="" fill sizes="96px" className="object-cover" />
            )}
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-2">
          {data.label && <span className="text-xs font-bold tracking-[1px] text-muted">{data.label}</span>}
          <h1 className="flex items-center gap-[18px] font-serif text-[32px] font-bold leading-[1.3] sm:text-5xl">
            {!isAuthor && <Petal className="size-5 shrink-0 bg-flame" />}
            {data.title}
          </h1>
          <p className="text-[17px] text-ink-2">
            {[data.description, ta.listing.storyCount(data.total)].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </Container>
  );
}
