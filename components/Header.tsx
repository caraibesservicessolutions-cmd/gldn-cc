"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Crown,
  Handshake,
  Home,
  Instagram,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Tag,
  Users,
  X
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { localeLabels, locales, links, type Dictionary, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const localeHref = (nextLocale: Locale) => {
    const parts = pathname.split("/");
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  };
  const nav = [
    { href: `/${locale}`, label: dictionary.nav.home, icon: Home },
    { href: `/${locale}/join`, label: dictionary.nav.join, icon: Users },
    { href: `/${locale}/vip`, label: dictionary.nav.vip, icon: Crown },
    { href: `/${locale}/events`, label: dictionary.nav.events, icon: CalendarDays },
    { href: `/${locale}/deals`, label: dictionary.nav.deals, icon: Tag },
    { href: `/${locale}/partners`, label: dictionary.nav.partners, icon: Handshake },
    { href: `/${locale}/spaces`, label: dictionary.nav.spaces, icon: LayoutDashboard },
    { href: `/${locale}/account`, label: dictionary.nav.account, icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 supports-[backdrop-filter]:bg-ink/88 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="section-shell flex min-h-20 items-center justify-between gap-4">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-mist transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4 text-gold" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center gap-1 rounded-full border border-gold/15 bg-black/25 px-2 py-1">
            {locales.map((item) => (
              <Link
                key={item}
                href={localeHref(item)}
                className={[
                  "rounded-full px-2 py-1 text-xs font-black uppercase transition",
                  item === locale
                    ? "bg-gold text-ink"
                    : "text-mist hover:text-gold"
                ].join(" ")}
                aria-label={localeLabels[item]}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
            aria-label={dictionary.nav.instagram}
          >
            <Instagram className="h-4 w-4" />
          </a>
          <LanguageSwitcher locale={locale} compact />
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-black/30 text-gold transition hover:bg-gold hover:text-ink xl:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="absolute left-0 right-0 top-full max-h-[calc(100svh-80px)] overflow-y-auto border-t border-white/10 bg-ink shadow-card xl:hidden">
          <nav className="section-shell grid gap-2 py-5">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-coal px-4 py-3 text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-ruby/30"
                >
                  <Icon className="h-4 w-4 text-gold" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
            <a
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-coal px-4 py-3 text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-ruby/30"
            >
              <Instagram className="h-4 w-4 text-gold" aria-hidden />
              {dictionary.nav.instagram}
            </a>
            <a
              href={links.collaboration}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-coal px-4 py-3 text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-ruby/30"
            >
              <Handshake className="h-4 w-4 text-gold" aria-hidden />
              Collab Event
            </a>
            <Link
              href={`/${locale}/legal`}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-coal px-4 py-3 text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-ruby/30"
            >
              <ShieldCheck className="h-4 w-4 text-gold" aria-hidden />
              {dictionary.nav.legal}
            </Link>
            <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row">
              <LanguageSwitcher locale={locale} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={localeHref(item)}
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white transition hover:border-gold/40"
                >
                  <span className="mr-2 text-gold">{item.toUpperCase()}</span>
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
