import Image from "next/image";
import Link from "next/link";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageCta } from "@/components/pages/PageCta";
import { PageHero } from "@/components/pages/PageHero";
import { SampleNotice } from "@/components/pages/SampleNotice";
import { Container } from "@/components/ui/Container";
import { Petal } from "@/components/ui/Petal";
import { SectionTitle } from "@/components/ui/SectionHeading";
import { ta } from "@/lib/i18n/ta";
import { toneClasses, toneCycle } from "@/lib/tone";
import type { AboutPageData } from "@/lib/types";
import { urls } from "@/lib/urls";

function Mission({ data }: { data: AboutPageData }) {
  return (
    <section aria-labelledby="mission" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h2 id="mission" className="mb-6 text-xs font-bold tracking-[2px] text-muted">
          {data.missionTitle}
        </h2>
        <blockquote className="relative pl-8">
          <Petal className="absolute left-0 top-4 size-4 bg-flame" />
          <p className="font-serif text-[30px] font-bold leading-[1.5] sm:text-[38px]">“{data.missionQuote}”</p>
        </blockquote>
      </div>
      <div className="flex flex-col gap-5 text-[18px] leading-[1.95] text-ink-2 lg:col-span-7">
        {data.mission.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function Values({ data }: { data: AboutPageData }) {
  return (
    <section aria-labelledby="values">
      <div className="mb-8 border-t-[3px] border-ink pt-3">
        <div id="values">
          <SectionTitle tone="flame">{data.valuesTitle}</SectionTitle>
        </div>
      </div>
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {data.values.map((v, i) => {
          const tone = toneCycle[i % toneCycle.length];
          return (
            <li key={v.title} className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className={`font-poppins text-[64px] font-bold leading-none text-transparent [-webkit-text-stroke-width:1.5px] ${toneClasses[tone].stroke}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-bold leading-[1.45]">{v.title}</h3>
              <p className="text-[15px] leading-[1.8] text-ink-2">{v.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Process({ data }: { data: AboutPageData }) {
  return (
    <section aria-labelledby="process" className="bg-tint">
      <Container className="py-16">
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
          <h2 id="process" className="font-serif text-[30px] font-bold leading-[1.4] sm:text-4xl">
            {data.processTitle}
          </h2>
          <p className="text-[17px] text-ink-2">{data.processIntro}</p>
        </div>
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {data.steps.map((step, i) => (
            <li key={step.role} className="relative flex flex-col gap-4">
              <div className="flex items-center">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-poppins text-lg font-bold text-page">
                  {i + 1}
                </span>
                {i < data.steps.length - 1 && (
                  <span aria-hidden="true" className="ml-3 hidden h-0.5 flex-1 bg-gradient-to-r from-flame to-sunset md:block" />
                )}
              </div>
              <h3 className="font-serif text-xl font-bold">{step.role}</h3>
              <p className="text-[15px] leading-[1.8] text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Team({ data }: { data: AboutPageData }) {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t-[3px] border-ink pt-3">
        <div id="team-title">
          <SectionTitle tone="flame">{data.teamTitle}</SectionTitle>
        </div>
        <Link href={urls.authors()} className="text-sm font-semibold text-flame-text">
          {ta.staticPage.teamLink}
        </Link>
      </div>
      <p className="mb-8 max-w-2xl text-[17px] text-ink-2">{data.teamIntro}</p>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-6">
        {data.team.map((a) => (
          <li key={a.slug}>
            <Link
              href={a.href}
              className="group flex h-full flex-col items-center gap-4 bg-tint px-6 pb-7 pt-8 text-center transition-shadow hover:shadow-[0_12px_32px_rgba(31,41,55,0.14)]"
            >
              <span aria-hidden="true" className="relative size-28 overflow-hidden rounded-full bg-line ring-4 ring-page">
                {a.avatar && <Image src={a.avatar.src} alt="" fill sizes="112px" className="object-cover" />}
              </span>
              <span className="flex flex-col gap-1">
                <span className="break-words font-serif text-lg font-bold leading-[1.4] group-hover:text-flame-text">{a.name}</span>
                {a.role && <span className="text-[13px] text-muted">{a.role}</span>}
              </span>
              {a.categories.length > 0 && (
                <span className="mt-auto flex flex-wrap justify-center gap-1.5">
                  {a.categories.map((c) => (
                    <span key={c} className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs text-ink-2">
                      {c}
                    </span>
                  ))}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AboutView({ data }: { data: AboutPageData }) {
  return (
    <div id="top">
      <Header active="none" />
      <Container className="mt-4">
        <BreakingTicker items={data.ticker} />
      </Container>

      <main className="mt-6">
        {data.sample && <SampleNotice />}
        <PageHero title={data.title} eyebrow={data.eyebrow} intro={data.intro} stats={data.stats} />
        <Container className="flex flex-col gap-20 py-16 sm:py-20">
          <Mission data={data} />
          <Values data={data} />
        </Container>
        <Process data={data} />
        <Container className="py-16 sm:py-20">
          <Team data={data} />
        </Container>
        <PageCta
          title={data.ctaTitle}
          text={data.ctaText}
          links={[
            { label: ta.topStories.allNews, href: urls.latest() },
            { label: ta.footer.contact, href: urls.page("contact") },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
