import { Crown } from "lucide-react";
import { OfferCard } from "@/components/Cards";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, links } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function VipPage({
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
      <SectionHeader title={dictionary.vip.title} text={dictionary.vip.subtitle} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <OfferCard {...dictionary.offers.vip} featured />
        <section className="premium-border overflow-hidden rounded-lg bg-coal/86 shadow-card">
          <div className="border-b border-white/10 p-6">
            <h2 className="font-display text-4xl font-bold text-white">
              {dictionary.vip.compareTitle}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gold">
                  <th className="px-5 py-4">Feature</th>
                  <th className="px-5 py-4">{dictionary.vip.gcColumn}</th>
                  <th className="px-5 py-4">{dictionary.vip.vipColumn}</th>
                </tr>
              </thead>
              <tbody>
                {dictionary.vip.rows.map((row) => (
                  <tr key={row.label} className="border-b border-white/10 last:border-0">
                    <td className="px-5 py-4 font-semibold text-white">{row.label}</td>
                    <td className="px-5 py-4 text-mist">{row.gc}</td>
                    <td className="px-5 py-4 font-bold text-champagne">{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6">
            <CTAButton href={links.vipList} external icon={Crown}>
              {dictionary.cta.vip}
            </CTAButton>
          </div>
        </section>
      </div>
    </main>
  );
}
