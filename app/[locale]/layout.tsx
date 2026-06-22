import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <LocaleShell params={params}>{children}</LocaleShell>;
}

async function LocaleShell({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);

  return (
    <div className="min-h-screen bg-ink">
      <Header locale={resolvedParams.locale} dictionary={dictionary} />
      {children}
      <Footer locale={resolvedParams.locale} dictionary={dictionary} />
    </div>
  );
}
