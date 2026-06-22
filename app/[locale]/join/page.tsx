import { Users } from "lucide-react";
import { Suspense } from "react";
import { FounderBadge } from "@/components/Badges";
import { OfferCard } from "@/components/Cards";
import { CTAButton } from "@/components/CTAButton";
import { JoinSourceNotice } from "@/components/JoinSourceNotice";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, links, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function JoinPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader title={dictionary.join.title} text={dictionary.join.subtitle} />
      <Suspense fallback={null}>
        <JoinSourceNotice
          title={dictionary.join.sourceTitle}
          text={dictionary.join.sourceText}
        />
      </Suspense>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <OfferCard {...dictionary.offers.gcList} />
        <aside className="premium-border rounded-lg bg-ruby/25 p-6 shadow-card">
          <FounderBadge label={dictionary.join.founderBadge} />
          <h2 className="mt-6 font-display text-4xl font-bold text-white">
            {dictionary.join.founderTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-mist">
            {dictionary.join.founderText}
          </p>
          <CTAButton href={links.gcList} external icon={Users} className="mt-7">
            {dictionary.cta.gcList}
          </CTAButton>
        </aside>
      </div>
    </main>
  );
}
