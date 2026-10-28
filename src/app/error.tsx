"use client";

import Image from "next/image";
import Link from "next/link";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

/** Last-resort screen for unexpected errors. Self-contained: it must not depend on data that may have failed. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-start justify-center gap-6 px-6 py-16">
      <Link href={urls.home()}>
        <Image src="/logo/sangathe-logo-dark.png" alt={ta.site.logoAlt} width={156} height={84} className="block h-16 w-auto dark:hidden" />
        <Image src="/logo/sangathe-logo-light.png" alt={ta.site.logoAlt} width={156} height={84} className="hidden h-16 w-auto dark:block" />
      </Link>
      <h1 className="font-serif text-[32px] font-bold leading-[1.4]">{ta.errorPage.title}</h1>
      <p className="text-[18px] leading-[1.8] text-ink-2">{ta.errorPage.text}</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="flex min-h-12 cursor-pointer items-center rounded-full bg-flame px-7 text-[15px] font-bold text-white"
        >
          {ta.errorPage.retry}
        </button>
        <Link href={urls.home()} className="flex min-h-12 items-center rounded-full border border-line-strong px-7 text-[15px] font-semibold">
          {ta.notFound.home}
        </Link>
      </div>
    </main>
  );
}
