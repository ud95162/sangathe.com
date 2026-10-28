import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { ta } from "@/lib/i18n/ta";
import { urls } from "@/lib/urls";

/** Dark hero band used at the top of the About, Contact, Advertise, Privacy and Terms pages. */
export function PageHero({
  title,
  eyebrow,
  intro,
  stats,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <section className="bg-charcoal bg-[radial-gradient(90%_120%_at_100%_0%,rgb(249_115_22/0.35)_0%,rgb(225_29_46/0.2)_38%,rgb(31_41_55/0)_72%)] text-white">
      <Container className={`pt-8 ${stats?.length ? "pb-14 sm:pb-20" : "pb-12 sm:pb-16"}`}>
        <nav aria-label={ta.article.breadcrumb} className="flex items-center gap-2 text-[13px] text-fog">
          <Link href={urls.home()} className="text-fog hover:text-white">
            {ta.site.home}
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="font-semibold text-golden">
            {title}
          </span>
        </nav>

        <div className="mt-10 flex max-w-3xl flex-col gap-5 sm:mt-14">
          <FlameStripe className="h-1 w-24" />
          <span className="text-[13px] font-bold tracking-[3px] text-golden">{eyebrow}</span>
          <h1 className="break-words font-serif text-[32px] font-bold leading-[1.3] sm:text-[64px] sm:leading-[1.25]">{title}</h1>
          <p className="font-serif text-xl leading-[1.8] text-silver sm:text-2xl">{intro}</p>
        </div>

        {stats && stats.length > 0 && (
          <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col gap-1 rounded-[0_18px_0_18px] glass-dark px-6 py-5">
                <span className="font-poppins text-3xl font-bold">{s.value}</span>
                <span className="text-sm text-fog">{s.label}</span>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
