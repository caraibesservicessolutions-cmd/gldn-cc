import { notFound } from "next/navigation";
import { LanguagePageClient } from "@/components/LanguagePageClient";
import { isLocale } from "@/lib/i18n";

export default async function LanguagePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  return <LanguagePageClient locale={resolvedParams.locale} />;
}
