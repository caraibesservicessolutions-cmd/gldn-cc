import { ArrowUpRight, PlusCircle, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import {
  AccessList,
  AccessPanel,
  InternalNav,
  NoticeBox,
  PrivateAccessNotice
} from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import {
  activeQuotaMessage,
  partnerDashboardNav,
  partnerNotice,
  partnerTiers,
  progressiveNotice,
  upgradeMessage
} from "@/lib/access-model";
import { isLocale, links } from "@/lib/i18n";

const currentTier = partnerTiers[1];
const activeOffers = 3;

export default async function PartnerSpacePage({
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
      <PrivateAccessNotice
        title="Espace partenaire en deploiement progressif"
        text="Cette interface prepare la gestion separee des offres, quotas, evenements, demandes et upgrades partenaires."
      />

      <section className="mt-8">
        <InternalNav items={partnerDashboardNav} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <AccessPanel
          eyebrow="Statut actuel"
          title={currentTier.title}
          text={`Quota utilise : ${activeOffers}/${currentTier.quota} offres actives. Les brouillons ne comptent pas dans le quota.`}
        >
          <AccessList
            items={[
              "Offres en brouillon : 2",
              "Offres en validation : 1",
              "Offres actives : 3",
              "Offres expirees : 1",
              `Statistiques : ${progressiveNotice}`
            ]}
          />
        </AccessPanel>
        <AccessPanel
          eyebrow="Quota atteint"
          title="Votre presence actuelle est complete."
          text={activeQuotaMessage}
        >
          <NoticeBox>{upgradeMessage}</NoticeBox>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <CTAButton href={`/${locale}/partenaires`} variant="secondary" icon={ArrowUpRight}>
              Decouvrir le palier superieur
            </CTAButton>
            <CTAButton href={links.collaboration} external variant="ghost">
              Demander un upgrade
            </CTAButton>
          </div>
        </AccessPanel>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <AccessPanel
          eyebrow="Creation d'offre"
          title="Proposer une offre sous validation Golden Circle"
          text="Le partenaire cree une proposition. Golden Circle valide avant diffusion."
        >
          <AccessList
            items={[
              "Categorie",
              "Visibilite : GC List, VIP ou Ambassadrice",
              "Quota",
              "Heure limite",
              "Conditions d'acces",
              "Statut : brouillon, validation, actif, expire"
            ]}
          />
          <div className="mt-6">
            <CTAButton href={links.collaboration} external icon={PlusCircle}>
              Proposer une offre
            </CTAButton>
          </div>
        </AccessPanel>
        <AccessPanel
          eyebrow="Qualite"
          title="Validation avant diffusion"
          text={partnerNotice}
        >
          <ShieldCheck className="h-6 w-6 text-gold" aria-hidden />
        </AccessPanel>
      </section>
    </main>
  );
}
