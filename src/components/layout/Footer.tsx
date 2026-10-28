import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ta } from "@/lib/i18n/ta";
import { getNavigation } from "@/lib/data/navigation";
import { socialLinks } from "@/lib/site";
import { urls } from "@/lib/urls";

const headingClass = "text-xs font-semibold tracking-[2px] text-faint";
const linkClass = "text-mist hover:text-white";

export async function Footer() {
  const navItems = await getNavigation();
  const categories = navItems.filter((i) => i.slug !== "home" && i.slug !== "photos");

  return (
    <footer className="overflow-hidden bg-charcoal text-[15px] text-fog">
      <FlameStripe className="h-[3px]" />
      <Container className="pt-16">
        <div className="flex flex-wrap items-end justify-between gap-7 border-b border-white/12 pb-10">
          <div className="flex max-w-[460px] flex-col gap-3.5">
            <Image
              src="/logo/sangathe-logo-light.png"
              alt={ta.site.logoAlt}
              width={178}
              height={96}
              className="block h-24 w-auto self-start"
            />
            <p className="font-serif text-[17px] leading-[1.7] text-faint">{ta.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.href}
                aria-label={s.label}
                className="flex size-11 items-center justify-center rounded-full border border-white/28"
              >
                <SocialIcon id={s.id} variant="white" context="footer" />
              </a>
            ))}
            <a
              href="#top"
              className="ml-2 flex min-h-11 items-center gap-2 rounded-full bg-white px-[18px] text-sm font-semibold text-charcoal"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
              {ta.footer.backToTop}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-10 py-12">
          <nav aria-label={ta.footer.categories} className="flex flex-col gap-3.5">
            <h3 className={headingClass}>{ta.footer.categories}</h3>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {categories.map((c) => (
                <Link key={c.slug} href={c.href} className={linkClass}>
                  {c.name}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Sangathe" className="flex flex-col gap-2.5">
            <h3 className={`mb-1 ${headingClass}`}>SANGATHE</h3>
            <Link href={urls.page("about")} className={linkClass}>{ta.footer.about}</Link>
            <Link href={urls.authors()} className={linkClass}>{ta.footer.editorial}</Link>
            <Link href={urls.page("contact")} className={linkClass}>{ta.footer.contact}</Link>
            <Link href={urls.page("advertise")} className={linkClass}>{ta.footer.advertise}</Link>
          </nav>
          <nav aria-label={ta.footer.policies} className="flex flex-col gap-2.5">
            <h3 className={`mb-1 ${headingClass}`}>{ta.footer.policies}</h3>
            <Link href={urls.page("privacy")} className={linkClass}>{ta.footer.privacyPolicy}</Link>
            <Link href={urls.page("terms")} className={linkClass}>{ta.footer.terms}</Link>
            <Link href={`${urls.page("terms")}#corrections`} className={linkClass}>{ta.footer.corrections}</Link>
          </nav>
          <div className="flex flex-col gap-2.5">
            <h3 className={`mb-1 ${headingClass}`}>{ta.footer.contactHeading}</h3>
            <span className="text-mist">{ta.footer.address}</span>
            <span className="text-mist">{ta.footer.email}</span>
            <span className="text-mist">{ta.footer.phone}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-white/12 py-[22px] text-[13px] text-faint">
          <span>{ta.footer.rights}</span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={urls.page("privacy")} className="text-faint hover:text-white">{ta.footer.privacyShort}</Link>
            <Link href={urls.page("terms")} className="text-faint hover:text-white">{ta.footer.termsShort}</Link>
            <span>
              {ta.footer.credit}{" "}
              <a href="#" className="font-semibold text-mist hover:text-white">Codexium</a>
            </span>
          </span>
        </div>
      </Container>
    </footer>
  );
}
