import { Crown, Handshake, Sparkles, Tag, Users } from "lucide-react";
import { DealCard } from "@/components/Cards";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, links } from "@/lib/i18n";
import { notFound } from "next/navigation";

type ConfirmedDeal = {
  title: string;
  benefit: string;
  conditions: string;
  zone: string;
  badge: string;
};

const confirmedDeals: ConfirmedDeal[] = [];

export default async function DealsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);
  const hasConfirmedDeals = confirmedDeals.length > 0;

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader title={dictionary.deals.title} text={dictionary.deals.subtitle} />

      {hasConfirmedDeals ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {confirmedDeals.map((deal) => (
            <DealCard key={`${deal.title}-${deal.zone}`} {...deal} />
          ))}
        </div>
      ) : (
        <section className="premium-border mt-10 rounded-lg bg-coal/86 p-6 shadow-card md:p-8">
          <div className="flex max-w-3xl flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Tag className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-4xl font-bold text-white">
                {dictionary.deals.emptyTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-mist">
                {dictionary.deals.emptyText}
              </p>
              <p className="mt-5 rounded-lg border border-gold/20 bg-black/20 px-4 py-3 text-sm font-semibold text-champagne">
                {dictionary.deals.confirmedNote}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-8 rounded-lg border border-white/10 bg-black/25 p-6">
        <h2 className="font-display text-3xl font-bold text-white">
          {dictionary.deals.categoriesTitle}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.deals.categories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-3 rounded-lg border border-gold/15 bg-coal/72 px-4 py-4 text-sm font-semibold text-mist"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="premium-border rounded-lg bg-coal/86 p-6 shadow-card">
          <Users className="h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-display text-3xl font-bold text-white">
            {dictionary.deals.memberTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-mist">
            {dictionary.deals.memberText}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href={links.gcList} external icon={Users}>
              {dictionary.cta.gcList}
            </CTAButton>
            <CTAButton
              href={links.vipList}
              external
              variant="secondary"
              icon={Crown}
            >
              {dictionary.cta.vip}
            </CTAButton>
          </div>
        </article>

        <article className="premium-border rounded-lg bg-ruby/20 p-6 shadow-card">
          <Handshake className="h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-display text-3xl font-bold text-white">
            {dictionary.deals.partnerTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-mist">
            {dictionary.deals.partnerText}
          </p>
          <CTAButton
            href={links.collaboration}
            external
            variant="secondary"
            icon={Handshake}
            className="mt-7"
          >
            {dictionary.cta.partner}
          </CTAButton>
        </article>
      </section>
    </main>
  );
}
