import { Crown, Handshake, Instagram, Users } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { FeatureCard, OfferCard, PartnerCard } from "@/components/Cards";
import { InstagramWidget } from "@/components/InstagramWidget";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialProof } from "@/components/SocialProof";
import { brand, getDictionary, isLocale, links, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale: Locale = resolvedParams.locale;
  const dictionary = getDictionary(locale);

  return (
    <main>
      <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-ink">
        <img
          src="/images/golden-circle-hero.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 sm:opacity-55"
        />
        <div className="pointer-events-none absolute inset-0 bg-ink/45 sm:bg-gradient-to-r sm:from-ink sm:via-ink/82 sm:to-ink/36" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/45" />
        <div className="section-shell relative z-10 flex min-h-[calc(100svh-80px)] items-center py-8 sm:py-16">
          <div className="w-full max-w-3xl reveal-soft">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gold sm:text-xs sm:tracking-[0.32em]">
              {dictionary.home.trustLine}
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] text-white sm:mt-5 sm:text-7xl lg:text-8xl">
              {brand.name}
              <span className="block gold-text">{brand.region}</span>
            </h1>
            <p className="mt-4 font-display text-2xl font-semibold text-white sm:mt-5 sm:text-3xl">
              {brand.slogan}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-mist sm:mt-5 sm:text-lg sm:leading-8">
              {dictionary.home.heroText}
            </p>
            <div className="relative z-20 mt-6 grid gap-2.5 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap sm:gap-3">
              <CTAButton href={links.gcList} external icon={Users} className="w-full sm:w-auto">
                {dictionary.cta.gcList}
              </CTAButton>
              <CTAButton
                href={links.vipList}
                external
                variant="secondary"
                icon={Crown}
                className="w-full sm:w-auto"
              >
                {dictionary.cta.vip}
              </CTAButton>
              <CTAButton
                href={`/${locale}/partners`}
                variant="secondary"
                icon={Handshake}
                className="w-full sm:w-auto"
              >
                {dictionary.cta.partner}
              </CTAButton>
              <CTAButton
                href={links.instagram}
                external
                variant="ghost"
                icon={Instagram}
                className="w-full sm:w-auto"
              >
                {dictionary.cta.instagram}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <SectionHeader
          title={dictionary.home.whyTitle}
          text={dictionary.home.whyText}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dictionary.home.features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-24">
        <SocialProof locale={locale} />
      </section>

      <section className="bg-gradient-to-b from-ink via-wine/35 to-ink py-16 md:py-24">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <OfferCard {...dictionary.offers.gcList} />
          <OfferCard {...dictionary.offers.vip} featured />
        </div>
      </section>

      <InstagramWidget locale={locale} />

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow={dictionary.home.partnersTitle}
            title={dictionary.partners.title}
            text={dictionary.home.partnersText}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {dictionary.partners.items.slice(0, 4).map((item) => (
              <PartnerCard key={item.title} {...item} />
            ))}
          </div>
        </div>
        <CTAButton
          href={links.collaboration}
          external
          icon={Handshake}
          className="mt-8"
        >
          {dictionary.cta.eventCollab}
        </CTAButton>
      </section>

      <section className="border-y border-gold/20 bg-ruby/20 py-14">
        <div className="section-shell">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">
            {dictionary.home.summerTitle}
          </p>
          <p className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            {dictionary.home.summerText}
          </p>
        </div>
      </section>
    </main>
  );
}
