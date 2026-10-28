import Image from "next/image";
import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import type { AuthorCardData } from "@/lib/types";
import { urls } from "@/lib/urls";

export function TeamPreview({ authors }: { authors: AuthorCardData[] }) {
  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(190px,100%),1fr))] gap-4">
        {authors.map((a) => (
          <li key={a.slug}>
            <Link href={a.href} className="flex h-full flex-col items-start gap-3 bg-tint p-4">
              <span aria-hidden="true" className="relative size-16 overflow-hidden rounded-full bg-line">
                {a.avatar && <Image src={a.avatar.src} alt="" fill sizes="64px" className="object-cover" />}
              </span>
              <span className="font-serif text-base font-bold leading-[1.4]">{a.name}</span>
              {a.role && <span className="text-xs text-muted">{a.role}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={urls.authors()} className="mt-5 inline-block font-semibold text-flame-text">
        {ta.staticPage.teamLink}
      </Link>
    </div>
  );
}
