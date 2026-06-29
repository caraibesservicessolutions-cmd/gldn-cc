import { Handshake, LockKeyhole, PlusCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessList, AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import {
  partnerNotice,
  partnerTiers,
  partnerValue,
  upgradeMessage
} from "@/lib/access-model";
import { isLocale, links } from "@/lib/i18n";

export default async function PartnersFrPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale;

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader
        eyebrow="Partenaires"
        title="Activer une audience qualifiee sans banaliser votre offre."
        text="Golden Circle accompagne les etablissements, marques, organisateurs et prestataires lifestyle dans une diffusion controlee."
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <AccessPanel
          eyebrow="Valeur partenaire"
          title="Visibilite, activation, experience client."
          text="Le partenaire propose. Golden Circle valide la coherence, les conditions et la valeur percue."
        >
          <AccessList items={partnerValue} />
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <CTAButton href={links.collaboration} external icon={Handshake}>
              Devenir partenaire
            </CTAButton>
            <CTAButton href={`/${locale}/espace-partenaire`} variant="secondary" icon={PlusCircle}>
              Proposer une offre
            </CTAButton>
            <CTAButton href={`/${locale}/connexion`} variant="ghost" icon={LockKeyhole}>
              Connexion partenaire
            </CTAButton>
          </div>
        </AccessPanel>
        <AccessPanel
          eyebrow="Sous validation"
          title="Chaque offre passe par Golden Circle."
          text="GC Deals, Golden Hour, evenements partenaires, reporting et espace partenaire sont prepares pour une validation progressive."
        >
          <NoticeBox>{partnerNotice}</NoticeBox>
        </AccessPanel>
      </section>

      <section className="mt-12">
        <SectionHeader
          eyebrow="Paliers"
          title="Quotas d'offres actives."
          text="Le quota concerne les offres actives, pas les brouillons."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {partnerTiers.map((tier) => (
            <AccessPanel
              key={tier.title}
              eyebrow={tier.title}
              title={`${tier.quota} offre${tier.quota === 1 ? "" : "s"} active${tier.quota === 1 ? "" : "s"}`}
              text={tier.benefits}
              muted
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <AccessPanel
          eyebrow="Upgrade"
          title="Etendre votre presence sans perdre la qualite de diffusion."
          text={upgradeMessage}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton href={`/${locale}/espace-partenaire`} variant="secondary">
              Decouvrir le palier superieur
            </CTAButton>
            <CTAButton href={links.collaboration} external variant="ghost">
              Demander un upgrade
            </CTAButton>
          </div>
        </AccessPanel>
      </section>
    </main>
  );
}
