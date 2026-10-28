import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { Container } from "@/components/ui/Container";
import { HeaderControls } from "@/components/layout/HeaderControls";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { formatMastheadDate } from "@/lib/i18n/date";
import { ta } from "@/lib/i18n/ta";
import { getNavigation } from "@/lib/data/navigation";
import { socialLinks } from "@/lib/site";
import { urls } from "@/lib/urls";

async function getTodayLabel() {
  "use cache";
  cacheLife("hours");
  return formatMastheadDate(new Date());
}

export async function Header({ active = "home" }: { active?: string }) {
  const [today, navItems] = await Promise.all([getTodayLabel(), getNavigation()]);

  return (
    <>
      <div data-header-bar className="border-b border-line">
        <Container className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-6 py-3 text-[13px] text-ink-2 md:py-4">
          <div className="flex flex-col items-start gap-2 justify-self-start">
            <span className="hidden font-serif text-lg font-bold text-ink md:block">{today}</span>
            <div className="flex items-center gap-5">
              <HeaderControls items={navItems} today={today} active={active} />
            </div>
          </div>
          <Link href={urls.home()} className="block">
            <Image
              src="/logo/sangathe-logo-dark.png"
              alt={ta.site.logoAlt}
              width={156}
              height={84}
              priority
              className="block h-14 w-auto sm:h-16 md:h-[84px] dark:hidden"
            />
            <Image
              src="/logo/sangathe-logo-light.png"
              alt={ta.site.logoAlt}
              width={156}
              height={84}
              className="hidden h-14 w-auto sm:h-16 md:h-[84px] dark:block"
            />
          </Link>
          <span className="hidden items-center gap-1.5 justify-self-end md:flex">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.href}
                aria-label={s.label}
                className="flex size-9 items-center justify-center"
              >
                <SocialIcon id={s.id} variant="dark" context="header" />
              </a>
            ))}
          </span>
        </Container>
      </div>

      <Container as="header" className="text-center">
        <nav
          aria-label={ta.site.categoriesNav}
          className="flex gap-x-1 overflow-x-auto text-base font-semibold [&>:first-child]:ml-auto [&>:last-child]:mr-auto"
        >
          {navItems.map((item) => {
            const isActive = item.slug === active;
            return (
              <Link
                key={item.slug}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap border-b-[3px] px-4 pb-2 pt-3.5 ${
                  isActive ? "border-transparent text-flame-text" : "border-transparent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <FlameStripe />
      </Container>
    </>
  );
}
