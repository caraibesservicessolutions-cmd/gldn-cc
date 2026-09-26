"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default function EntryPage() {
  const router = useRouter();
  useEffect(() => {
    const saved = window.localStorage.getItem("golden-circle-locale");
    router.replace(isLocale(saved) ? `/${saved}` : "/fr/language");
  }, [router]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
      <div className="max-w-lg">
        <img src="/golden-circle-logo-transparent.png" alt="Golden Circle" className="mx-auto w-36" />
        <p className="mt-6 text-sm uppercase tracking-[0.28em] text-gold">Golden Circle Caraïbes</p>
        <p className="mt-3 text-mist">L'accès aux privilèges.</p>
      </div>
    </main>
  );
}
