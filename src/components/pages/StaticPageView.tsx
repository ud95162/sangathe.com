import type { ReactNode } from "react";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageCta } from "@/components/pages/PageCta";
import { PageHero } from "@/components/pages/PageHero";
import { SampleNotice } from "@/components/pages/SampleNotice";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { Petal } from "@/components/ui/Petal";
import { ta } from "@/lib/i18n/ta";
import { toneClasses, toneCycle } from "@/lib/tone";
import type { StaticPageData, StaticSection } from "@/lib/types";

function SectionBody({ section }: { section: StaticSection }) {
  return (
    <div className="flex flex-col gap-4 text-[17px] leading-[1.9] text-ink-2">
      {section.paragraphs?.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {section.bullets &&
        (section.variant === "steps" ? (
          <ol className="grid gap-4 sm:grid-cols-3">
            {section.bullets.map((b, i) => (
              <li key={b} className="flex flex-col gap-3 bg-tint p-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-ink font-poppins text-base font-bold text-page">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-[1.75]">{b}</span>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {section.bullets.map((b) => (
              <li key={b} className="flex items-baseline gap-3">
                <Petal className="size-2 bg-sunset" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}

/**
 * Layout for fixed-text pages: dark hero, numbered sections, optional contents card and closing band.
 * `extras` adds a component under a section (by section id), `wide` goes before the text.
 */
export function StaticPageView({
  page,
  extras = {},
  wide,
}: {
  page: StaticPageData;
  extras?: Record<string, ReactNode>;
  wide?: ReactNode;
}) {
  const showToc = page.sections.length >= 5;

  return (
    <div id="top">
      <Header active="none" />
      <Container className="mt-4">
        <BreakingTicker items={page.ticker} />
      </Container>

      <main className="mt-6">
        {page.sample && <SampleNotice />}
        <PageHero title={page.title} eyebrow={page.eyebrow} intro={page.intro} stats={page.stats} />

        <Container className={`py-14 sm:py-20 ${showToc ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]" : ""}`}>
          <div className="min-w-0">
            {wide}

            <div className="flex max-w-[860px] flex-col gap-10">
              {page.sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-6 grid gap-x-8 gap-y-2 border-b border-line pb-10 last:border-b-0 last:pb-0 sm:grid-cols-[84px_minmax(0,1fr)]"
                >
                  <span
                    aria-hidden="true"
                    className={`font-poppins text-[52px] font-bold leading-none text-transparent [-webkit-text-stroke-width:1.5px] ${toneClasses[toneCycle[i % toneCycle.length]].stroke}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="mb-4 font-serif text-[26px] font-bold leading-[1.5]">{section.heading}</h2>
                    <SectionBody section={section} />
                    {extras[section.id] && <div className="mt-6">{extras[section.id]}</div>}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {showToc && (
            <aside className="self-start lg:sticky lg:top-6">
              <nav aria-label={ta.staticPage.onThisPage} className="bg-tint p-6 shadow-[0_10px_30px_rgba(31,41,55,0.08)]">
                <FlameStripe className="mb-4 h-1 w-16" />
                <h2 className="mb-4 font-serif text-lg font-bold">{ta.staticPage.onThisPage}</h2>
                <ol className="flex flex-col gap-1 text-[15px]">
                  {page.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex items-baseline gap-3 border-b border-line py-2.5 font-semibold last:border-b-0">
                        <span className="w-5 font-poppins text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </Container>

        {page.cta && <PageCta title={page.cta.title} text={page.cta.text} links={page.cta.links} />}
      </main>
      <Footer />
    </div>
  );
}
