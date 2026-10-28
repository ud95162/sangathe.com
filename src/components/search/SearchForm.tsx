import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import { buildSearchUrl } from "@/lib/search";
import type { SearchPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

const control =
  "min-h-11 w-full border border-line-strong bg-page px-3 text-[15px] text-ink focus-visible:border-ink";

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-xs font-bold tracking-[0.5px] text-ink-2">
        {label}
      </label>
      {children}
    </div>
  );
}

/** A plain GET form: it works without JavaScript and every search is a shareable URL. */
export function SearchForm({ data }: { data: SearchPageData }) {
  const { params, facets } = data;
  return (
    // The key remounts the form when the query changes, so the fields always match the URL.
    <form key={buildSearchUrl({ ...params, page: 1 })} action={urls.search()} method="get" role="search" className="bg-tint p-5 sm:p-6">
      <div className="flex overflow-hidden rounded-[0_14px_0_14px] border-2 border-ink bg-page">
        <input
          name="q"
          type="search"
          defaultValue={params.q}
          placeholder={ta.header.searchPlaceholder}
          aria-label={ta.search.title}
          autoFocus={!params.q}
          className="min-h-14 min-w-0 flex-1 bg-transparent px-5 font-serif text-lg text-ink focus-visible:outline-none"
        />
        <button
          type="submit"
          aria-label={ta.search.submit}
          className="flex w-16 shrink-0 cursor-pointer items-center justify-center bg-ink text-page hover:bg-flame hover:text-white"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 lg:grid-cols-4">
        <Field label={ta.search.searchIn} htmlFor="s-field" className="col-span-2 sm:col-span-1">
          <select id="s-field" name="field" defaultValue={params.field} className={control}>
            <option value="all">{ta.search.inAll}</option>
            <option value="title">{ta.search.inTitle}</option>
          </select>
        </Field>
        <Field label={ta.search.category} htmlFor="s-category">
          <select id="s-category" name="category" defaultValue={params.category ?? ""} className={control}>
            <option value="">{ta.search.anyCategory}</option>
            {facets.categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={ta.search.author} htmlFor="s-author">
          <select id="s-author" name="author" defaultValue={params.author ?? ""} className={control}>
            <option value="">{ta.search.anyAuthor}</option>
            {facets.authors.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={ta.search.tag} htmlFor="s-tag">
          <select id="s-tag" name="tag" defaultValue={params.tag ?? ""} className={control}>
            <option value="">{ta.search.anyTag}</option>
            {facets.tags.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={ta.search.from} htmlFor="s-from">
          <input id="s-from" name="from" type="date" defaultValue={params.from ?? ""} className={control} />
        </Field>
        <Field label={ta.search.to} htmlFor="s-to">
          <input id="s-to" name="to" type="date" defaultValue={params.to ?? ""} className={control} />
        </Field>
        <Field label={ta.search.sort} htmlFor="s-sort">
          <select id="s-sort" name="sort" defaultValue={params.sort} className={control}>
            <option value="relevance">{ta.search.relevance}</option>
            <option value="newest">{ta.search.newest}</option>
          </select>
        </Field>
        <div className="col-span-2 flex items-end gap-3 sm:col-span-1">
          <button
            type="submit"
            className="min-h-11 flex-1 cursor-pointer rounded-full bg-flame px-6 text-[15px] font-bold text-white"
          >
            {ta.search.submit}
          </button>
          <Link
            href={urls.search()}
            className="flex min-h-11 items-center rounded-full border border-line-strong px-5 text-[15px] font-semibold"
          >
            {ta.search.clear}
          </Link>
        </div>
      </div>
    </form>
  );
}
