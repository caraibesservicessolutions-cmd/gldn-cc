"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isLocale, locales } from "@/lib/i18n";

export default function EntryPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = window.localStorage.getItem("golden-circle-locale");
    router.replace(isLocale(saved) ? `/${saved}` : "/fr/language");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
      <div className="max-w-lg">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">
          GOLDEN CIRCLE
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold">
          Caraïbes
        </h1>
        <p className="mt-3 text-mist">"L'accès aux privilèges."</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className="premium-border rounded-full px-5 py-3 text-sm font-semibold uppercase text-champagne transition hover:border-gold hover:bg-gold hover:text-ink"
            >
              {locale.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
