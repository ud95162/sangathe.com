import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

function pageItems(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 2) pages.add(3);
  if (current >= total - 1) pages.add(total - 2);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? ["gap" as const, n] : [n]));
}

const round = "flex size-11 items-center justify-center rounded-full font-poppins font-semibold";

export function Pagination({
  basePath,
  page,
  pageCount,
  hrefFor,
}: {
  basePath?: string;
  page: number;
  pageCount: number;
  /** Builds the link for a page. Defaults to path pages under basePath (/x/page/2). */
  hrefFor?: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  const href = hrefFor ?? ((n: number) => urls.listingPage(basePath ?? "/", n));
  return (
    <nav aria-label={ta.category.pages} className="mt-8 flex flex-wrap items-center gap-2">
      {page > 1 && (
        <Link
          href={href(page - 1)}
          className="mr-2 flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-semibold"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          {ta.category.prev}
        </Link>
      )}
      {pageItems(page, pageCount).map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-muted">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            aria-label={ta.category.pageOf(item)}
            aria-current={item === page ? "page" : undefined}
            className={`${round} ${item === page ? "bg-ink text-page hover:text-page" : "border border-line-strong"}`}
          >
            {item}
          </Link>
        ),
      )}
      {page < pageCount && (
        <Link
          href={href(page + 1)}
          className="ml-2 flex min-h-11 items-center gap-2 rounded-full bg-flame px-5 text-[15px] font-semibold text-white hover:text-white"
        >
          {ta.category.next}
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </nav>
  );
}
