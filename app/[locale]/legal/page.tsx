import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, legal, legalOffers } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function LegalPage({
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
      <SectionHeader title={dictionary.legalPage.title} text={dictionary.legalPage.note} />
      <section className="premium-border mt-10 rounded-lg bg-coal/86 p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">
          {dictionary.legalPage.intro}
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold text-white">
          {legal.operator}
        </h2>
        <p className="mt-2 text-mist">SIRET : {legal.siret}</p>
      </section>
      <section className="mt-8 rounded-lg border border-white/10 bg-black/25 p-6">
        <h2 className="font-display text-3xl font-bold text-white">
          {dictionary.legalPage.offersTitle}
        </h2>
        <ul className="mt-5 grid gap-3 text-mist sm:grid-cols-2">
          {legalOffers.map((offer) => (
            <li key={offer} className="rounded-lg border border-white/10 px-4 py-3">
              {offer}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
