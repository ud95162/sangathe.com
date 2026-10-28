import { FlameStripe } from "@/components/ui/FlameStripe";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ta } from "@/lib/i18n/ta";
import { socialLinks } from "@/lib/site";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const channelIcons: Record<string, React.ReactNode> = {
  general: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  tips: (
    <svg {...iconProps}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </svg>
  ),
  ads: (
    <svg {...iconProps}>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z" />
      <path d="M17.5 9a4 4 0 0 1 0 6" />
    </svg>
  ),
};

export function ContactContent() {
  return (
    <div className="flex flex-col gap-8">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {ta.contactPage.channels.map((c) => (
          <li
            key={c.id}
            className="group flex flex-col gap-4 rounded-[0_22px_0_22px] bg-tint p-7 shadow-[0_10px_30px_rgba(31,41,55,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(31,41,55,0.14)]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-ink text-page transition-colors group-hover:bg-flame group-hover:text-white">
              {channelIcons[c.id]}
            </span>
            <h2 className="font-serif text-xl font-bold leading-[1.4]">{c.title}</h2>
            <p className="text-[15px] leading-[1.8] text-ink-2">{c.blurb}</p>
            <p className="mt-auto border-t border-line pt-4 text-sm font-semibold text-flame-text">{ta.footer.email}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <dl className="flex flex-col gap-6 rounded-[0_22px_0_22px] bg-charcoal bg-[radial-gradient(100%_100%_at_100%_0%,rgb(249_115_22/0.3)_0%,rgb(225_29_46/0.16)_40%,rgb(31_41_55/0)_72%)] p-8 text-white sm:p-10">
          <FlameStripe className="h-1 w-20" />
          {[
            [ta.contactPage.address, ta.footer.address],
            [ta.contactPage.phone, ta.footer.phone],
            [ta.contactPage.email, ta.footer.email],
            [ta.contactPage.hours, ta.contactPage.hoursValue],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 border-b border-white/12 pb-5 last:border-b-0 last:pb-0">
              <dt className="text-xs font-bold tracking-[2px] text-golden">{label}</dt>
              <dd className="font-serif text-xl">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-5 bg-tint p-8 sm:p-10">
          <h2 className="font-serif text-xl font-bold">{ta.contactPage.follow}</h2>
          <ul className="grid grid-cols-2 gap-3">
            {socialLinks.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  className="flex min-h-14 items-center gap-3 border border-line-strong bg-page px-4 text-sm font-semibold transition-colors hover:border-ink"
                >
                  <SocialIcon id={s.id} variant="dark" context="footer" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
