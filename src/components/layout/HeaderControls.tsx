"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";
import { Petal } from "@/components/ui/Petal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ta } from "@/lib/i18n/ta";
import { socialLinks } from "@/lib/site";
import type { NavItem } from "@/lib/types";
import { urls } from "@/lib/urls";

type Panel = "menu" | "search";

/**
 * Menu and search buttons for the top bar. Each opens a panel just below the bar (the bar stays
 * visible); only one panel is open at a time. The bar must carry `data-header-bar`.
 */
export function HeaderControls({ items, today, active }: { items: NavItem[]; today: string; active?: string }) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [top, setTop] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const open = panel === "menu";
  const searchOpen = panel === "search";

  const toggle = (target: Panel, button: HTMLButtonElement | null) => {
    if (panel === target) return setPanel(null);
    const bar = button?.closest("[data-header-bar]");
    setTop(Math.max(0, bar?.getBoundingClientRect().bottom ?? 0));
    setPanel(target);
  };

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        (panel === "menu" ? menuButtonRef : searchButtonRef).current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (panel === "search") searchRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [panel]);

  const close = () => setPanel(null);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        aria-label={open ? ta.header.closeMenu : ta.header.menu}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => toggle("menu", menuButtonRef.current)}
        className="flex h-10 w-9 cursor-pointer items-center justify-center text-ink"
      >
        <svg aria-hidden="true" width="32" height="24" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          {open ? <path d="M7 3l18 18M25 3L7 21" /> : <path d="M2 4h28M2 12h28M2 20h28" />}
        </svg>
      </button>

      <button
        ref={searchButtonRef}
        type="button"
        aria-label={searchOpen ? ta.header.closeSearch : ta.header.search}
        aria-expanded={searchOpen}
        aria-controls="site-search"
        onClick={() => toggle("search", searchButtonRef.current)}
        className="flex h-10 cursor-pointer items-center gap-2.5 font-serif text-base font-semibold text-ink hover:text-flame-text"
      >
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {searchOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <><circle cx="10.5" cy="10.5" r="7" /><path d="M20.5 20.5l-5-5" /></>}
        </svg>
        <span className="max-sm:sr-only">{ta.header.search}</span>
      </button>

      {searchOpen && (
        <div id="site-search" className="fixed inset-x-0 bottom-0 z-40" style={{ top }}>
          <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]" />
          <div className="relative animate-fade-up border-b border-line bg-page shadow-[0_8px_24px_rgba(31,41,55,0.18)]">
            <Container className="py-5">
              <form action={urls.search()} role="search" className="flex overflow-hidden rounded-[0_14px_0_14px] border-2 border-ink">
                <input
                  ref={searchRef}
                  name="q"
                  type="search"
                  placeholder={ta.header.searchPlaceholder}
                  aria-label={ta.header.search}
                  className="min-h-14 min-w-0 flex-1 bg-page text-ink px-5 font-serif text-lg focus-visible:outline-none"
                />
                <button
                  type="submit"
                  aria-label={ta.header.search}
                  className="flex w-16 cursor-pointer items-center justify-center bg-ink text-page hover:bg-flame hover:text-white"
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-4-4" />
                  </svg>
                </button>
              </form>
              <Link href={urls.search()} onClick={close} className="mt-3 inline-block text-sm font-semibold text-flame-text">
                {ta.header.advancedSearch}
              </Link>
            </Container>
          </div>
        </div>
      )}

      {open && (
        <div id="site-menu" className="fixed inset-x-0 bottom-0 z-40" style={{ top }}>
          <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]" />
          <div className="relative flex h-full w-[min(360px,90vw)] animate-drawer-in flex-col overflow-y-auto bg-page text-ink shadow-[8px_0_32px_rgba(31,41,55,0.25)]">
            <FlameStripe className="h-1 shrink-0" />

            <nav aria-label={ta.site.categoriesNav} className="flex min-h-0 flex-1 flex-col px-3 py-2">
              {items.map((item, i) => {
                const isActive = item.slug === active;
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    onClick={close}
                    aria-current={isActive ? "page" : undefined}
                    style={{ animationDelay: `${80 + i * 30}ms` }}
                    className={`group flex min-h-[38px] max-h-14 flex-1 animate-fade-up items-center gap-3 border-b border-line/70 px-2 font-serif text-[18px] font-bold transition-colors hover:bg-wash ${
                      isActive ? "text-flame-text" : ""
                    }`}
                  >
                    <Petal
                      className={`size-2.5 transition-opacity ${
                        isActive ? "bg-flame opacity-100" : "bg-sunset opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <span className="flex-1 transition-transform group-hover:translate-x-0.5">{item.name}</span>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-line px-5">
              <ThemeToggle />
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 bg-charcoal px-4 py-3 text-fog">
              <span className="text-xs md:hidden">{today}</span>
              <span className="flex items-center gap-1.5 md:ml-auto">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/28 hover:border-white"
                  >
                    <SocialIcon id={s.id} variant="white" context="footer" />
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
