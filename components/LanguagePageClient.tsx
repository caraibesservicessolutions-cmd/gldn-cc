"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Globe2 } from "lucide-react";
import {
  getDictionary,
  localeLabels,
  locales,
  type Locale
} from "@/lib/i18n";

export function LanguagePageClient({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const [saved, setSaved] = useState<Locale | null>(null);

  function saveLanguage(nextLocale: Locale) {
    window.localStorage.setItem("golden-circle-locale", nextLocale);
    setSaved(nextLocale);
  }

  return (
    <main className="section-shell py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-gold">
          <Globe2 className="h-4 w-4" aria-hidden />
          GOLDEN CIRCLE
        </p>
        <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
          {dictionary.language.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-mist">
          {dictionary.language.subtitle}
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {locales.map((item) => (
          <div
            key={item}
            className="premium-border rounded-lg bg-coal/86 p-6 shadow-card"
          >
            <p className="font-display text-3xl font-bold text-white">
              {localeLabels[item]}
            </p>
            <button
              type="button"
              onClick={() => saveLanguage(item)}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-champagne"
            >
              {saved === item ? <Check className="h-4 w-4" /> : null}
              {saved === item
                ? dictionary.language.saved
                : dictionary.cta.chooseLanguage}
            </button>
            <Link
              href={`/${item}`}
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gold/30 px-5 py-3 text-sm font-bold uppercase tracking-wide text-champagne transition hover:bg-gold hover:text-ink"
              onClick={() => saveLanguage(item)}
            >
              {localeLabels[item]}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
