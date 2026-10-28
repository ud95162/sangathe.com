"use client";

import Image from "next/image";
import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/newsletter";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { ta } from "@/lib/i18n/ta";
import { socialLinks } from "@/lib/site";

export function SubscribePanel() {
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });
  const whatsapp = socialLinks.find((s) => s.id === "whatsapp");
  return (
    <aside className="flex min-w-0 flex-col justify-center gap-4 bg-charcoal bg-[radial-gradient(120%_90%_at_100%_0%,rgb(249_115_22/0.42)_0%,rgb(225_29_46/0.22)_38%,rgb(31_41_55/0)_70%)] px-6 py-10 text-white sm:px-8">
      <FlameStripe className="h-1 w-24" />
      <h2 className="font-serif text-2xl font-bold leading-normal">{ta.subscribe.title}</h2>
      <p className="text-[15px] text-fog">{ta.subscribe.blurb}</p>
      <form action={formAction} className="flex flex-col gap-2" noValidate>
        <label htmlFor="sg-email" className="text-[13px] font-semibold text-silver">
          {ta.subscribe.emailLabel}
        </label>
        <input
          id="sg-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={ta.subscribe.emailPlaceholder}
          aria-invalid={state.status === "invalid"}
          aria-describedby="sg-email-status"
          className="min-h-12 bg-white px-3.5 text-base text-charcoal"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 cursor-pointer bg-flame text-[15px] font-bold text-white disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? ta.subscribe.sending : ta.subscribe.submit}
        </button>
        <p id="sg-email-status" role="status" className="min-h-5 text-[13px]">
          {state.status === "success" && <span className="text-leaf">{ta.subscribe.success}</span>}
          {state.status === "invalid" && <span className="text-golden">{ta.subscribe.invalid}</span>}
          {state.status === "failed" && <span className="text-golden">{ta.subscribe.failed}</span>}
        </p>
      </form>
      <div className="mt-3 flex flex-col gap-3 border-t border-white/14 pt-6">
        <span className="text-[13px] text-fog">{ta.subscribe.or}</span>
        <a
          href={whatsapp?.href ?? "#"}
          className="flex min-h-12 items-center justify-center gap-2.5 border border-leaf bg-leaf/14 text-[15px] font-bold text-white hover:text-white"
        >
          <Image src="/icons/white/whatsapp.png" alt="" width={20} height={20} className="block size-5" />
          {ta.subscribe.whatsapp}
        </a>
      </div>
    </aside>
  );
}
