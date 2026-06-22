"use client";

import { useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeLabels, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  compact?: boolean;
};

export function LanguageSwitcher({ locale, compact }: LanguageSwitcherProps) {
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    window.localStorage.setItem("golden-circle-locale", nextLocale);
    const parts = window.location.pathname.split("/");
    parts[1] = nextLocale;
    router.push(parts.join("/") || `/${nextLocale}`);
  }

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/30 px-3 py-2 text-sm text-mist">
      <Globe2 className="h-4 w-4 text-gold" aria-hidden />
      <span className={compact ? "sr-only" : "hidden sm:inline"}>Language</span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        className="bg-transparent text-white outline-none"
        aria-label="Language"
      >
        {locales.map((item) => (
          <option key={item} value={item} className="bg-coal text-white">
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
