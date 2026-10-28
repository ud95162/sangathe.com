import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import type { SearchPageData } from "@/lib/types";

export function ActiveFilters({ filters }: { filters: SearchPageData["activeFilters"] }) {
  if (!filters.length) return null;
  return (
    <ul aria-label={ta.search.filters} className="flex flex-wrap items-center gap-2">
      {filters.map((f) => (
        <li key={f.key}>
          <Link
            href={f.removeHref}
            aria-label={ta.search.removeFilter(f.label)}
            className="flex min-h-9 items-center gap-2 rounded-full bg-ink px-3.5 text-sm font-semibold text-page hover:text-page"
          >
            {f.label}
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
