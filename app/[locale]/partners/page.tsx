import { Handshake } from "lucide-react";
import { PartnerCard } from "@/components/Cards";
import { CTAButton } from "@/components/CTAButton";
import { PartnerProgramGrid, RoadmapGrid } from "@/components/Platform";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialProof } from "@/components/SocialProof";
import { getDictionary, isLocale, legal, links, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function PartnersPage({
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
    <main className="section-shell py-14 md:py-20">
      <SectionHeader
        title={dictionary.partners.title}
        text={dictionary.partners.subtitle}
      />
      <SocialProof locale={locale} className="mt-10" />
      <section className="mt-10">
        <SectionHeader
          eyebrow="Golden Link"
          title="Un portail partenaire en quatre niveaux."
          text="Le reseau partenaire est pense comme un canal d'acces: offres, activations, opportunites, contenus et visibilite."
        />
        <div className="mt-8">
          <PartnerProgramGrid />
        </div>
      </section>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dictionary.partners.items.map((item) => (
          <PartnerCard key={item.title} {...item} />
        ))}
      </div>
      <section className="premium-border mt-10 rounded-lg bg-ruby/20 p-6">
        <h2 className="font-display text-3xl font-bold text-white">
          {dictionary.partners.argumentsTitle}
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {dictionary.partners.arguments.map((item) => (
            <span
              key={item}
              className="rounded-full border border-gold/20 bg-black/20 px-3 py-2 text-sm font-semibold text-mist"
            >
              {item}
            </span>
          ))}
        </div>
        <CTAButton
          href={links.collaboration}
          external
          icon={Handshake}
          className="mt-7"
        >
          {dictionary.cta.eventCollab}
        </CTAButton>
      </section>
      <section className="mt-10">
        <SectionHeader
          eyebrow="Mise en marche"
          title="Du contact partenaire a la campagne."
          text="Golden Circle qualifie, valide, diffuse et mesure les activations pour proteger la promesse membre."
        />
        <div className="mt-8">
          <RoadmapGrid />
        </div>
      </section>
      <p className="mt-8 text-sm leading-7 text-mist">
        {legal.commercialNotice}
        <br />
        SIRET : {legal.siret}
      </p>
    </main>
  );
}
