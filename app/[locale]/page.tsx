import { Crown, Handshake, Instagram, Users } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { OfferCard, PartnerCard } from "@/components/Cards";
import { InstagramWidget } from "@/components/InstagramWidget";
import {
  MembershipGrid,
  ModuleGrid,
  PillarGrid,
  PlatformStats,
  RoadmapGrid
} from "@/components/Platform";
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
        <div className="section-shell relative z-10 grid min-h-[calc(100svh-80px)] items-center gap-10 py-8 sm:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.65fr)]">
          <div className="w-full max-w-3xl reveal-soft">
            <div className="flex max-w-2xl items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/60 shadow-glow sm:h-16 sm:w-16">
                <img
                  src="/brand/golden-circle-emblem-transparent.png"
                  alt=""
                  className="h-full w-full object-contain"
                  width={64}
                  height={64}
                />
              </span>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gold sm:text-xs sm:tracking-[0.28em]">
                {dictionary.home.trustLine}
              </p>
            </div>
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
          <div className="pointer-events-none hidden justify-center lg:flex">
            <div className="relative aspect-square w-full max-w-[360px]">
              <span className="absolute inset-[-10%] rounded-full border border-gold/20" />
              <span className="absolute inset-[-4%] rounded-full border border-champagne/25 shadow-[0_0_80px_rgba(212,175,55,0.18)]" />
              <img
                src="/brand/golden-circle-emblem-transparent.png"
                alt=""
                className="relative h-full w-full object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.45)]"
                width={360}
                height={360}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <SectionHeader
          eyebrow="Plateforme SaaS"
          title="Un systeme d'acces, pas une simple communaute."
          text="Golden Circle organise les membres, privileges, experiences, opportunites, partenaires, notifications et cartes virtuelles dans une infrastructure exploitable."
        />
        <div className="mt-10">
          <PlatformStats />
        </div>
        <div className="mt-6">
          <PillarGrid />
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-16 md:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="GCOS"
            title="Les modules qui font tourner l'ecosysteme."
            text="Chaque brique peut fonctionner en MVP avec donnees controlees, puis se connecter progressivement a Supabase et aux operations terrain."
          />
          <div className="mt-10">
            <ModuleGrid />
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-24">
        <SocialProof locale={locale} />
      </section>

      <section className="bg-gradient-to-b from-ink via-wine/35 to-ink py-16 md:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Acces membres"
            title="Une adhesion annuelle, des disponibilites limitees."
            text="Le membre achete un droit d'acces a l'ecosysteme. Les privileges, experiences et opportunites restent confirmes operation par operation."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <OfferCard {...dictionary.offers.gcList} />
            <OfferCard {...dictionary.offers.vip} featured />
          </div>
          <div className="mt-6">
            <MembershipGrid />
          </div>
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

      <section className="section-shell py-16 md:py-24">
        <SectionHeader
          eyebrow="Roadmap MVP"
          title="90 jours pour passer du cercle au systeme."
          text="La refonte garde l'experience premium, mais structure le produit comme une machine d'acquisition, de validation et de distribution d'acces."
        />
        <div className="mt-10">
          <RoadmapGrid />
        </div>
      </section>
    </main>
  );
}
