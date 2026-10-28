import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { LatestNewsList } from "@/components/ui/LatestNewsList";
import { getHomepage } from "@/lib/data/home";
import { getNavigation } from "@/lib/data/navigation";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

export const metadata: Metadata = {
  title: `${ta.notFound.title} | ${ta.meta.siteName}`,
  robots: { index: false },
};

/** Shown for any address that does not exist, and whenever a page calls notFound(). */
export default async function NotFound() {
  const [home, nav] = await Promise.all([getHomepage(), getNavigation()]);
  const categories = nav.filter((n) => n.slug !== "home");

  return (
    <div id="top">
      <Header active="none" />
      <main>
        <Container className="grid gap-12 pb-20 pt-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:pt-16">
          <div className="flex min-w-0 flex-col items-start gap-6">
            <p aria-hidden="true" className="font-poppins text-[96px] font-bold leading-none text-flame sm:text-[140px]">
              {ta.notFound.code}
            </p>
            <FlameStripe className="h-1 w-24" />
            <h1 className="font-serif text-[30px] font-bold leading-[1.4] sm:text-[42px]">{ta.notFound.title}</h1>
            <p className="max-w-xl text-[18px] leading-[1.8] text-ink-2">{ta.notFound.text}</p>

            <form action={urls.search()} role="search" className="flex w-full max-w-xl overflow-hidden rounded-[0_14px_0_14px] border-2 border-ink bg-page">
              <input
                name="q"
                type="search"
                placeholder={ta.header.searchPlaceholder}
                aria-label={ta.search.title}
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
            </form>

            <div className="flex flex-wrap gap-3">
              <Link
                href={urls.home()}
                className="flex min-h-12 items-center rounded-full bg-flame px-7 text-[15px] font-bold text-white hover:text-white"
              >
                {ta.notFound.home}
              </Link>
              <Link href={urls.latest()} className="flex min-h-12 items-center rounded-full border border-line-strong px-7 text-[15px] font-semibold">
                {ta.topStories.allNews}
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[1px] text-muted">{ta.notFound.browse}</p>
              <ul className="flex flex-wrap gap-2.5">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={c.href} className="flex min-h-9 items-center rounded-[0_12px_0_12px] border border-line-strong px-3.5 text-sm font-medium">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="min-w-0 lg:border-l lg:border-line lg:pl-8">
            <LatestNewsList items={home.latest.slice(0, 5)} />
          </aside>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
