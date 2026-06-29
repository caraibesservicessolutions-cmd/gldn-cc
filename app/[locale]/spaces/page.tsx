import { CreditCard, Handshake, ShieldCheck, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { CTAButton } from "@/components/CTAButton";
import {
  MembershipGrid,
  ModuleGrid,
  NotificationPanel,
  PillarGrid,
  PlatformStats,
  RoadmapGrid
} from "@/components/Platform";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, links } from "@/lib/i18n";
import { demoMembers } from "@/lib/members";

export default async function SpacesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale;
  const dictionary = getDictionary(locale);
  const demoSecretId = demoMembers[0].secretId;

  return (
    <main>
      <section className="border-b border-white/10 bg-black/24 py-14 md:py-20">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Golden Circle OS"
            title="Console SaaS de l'ecosysteme."
            text="Un espace de pilotage pour organiser l'acces membre, les privileges, experiences, opportunites, partenaires et notifications."
          />
          <div className="mt-10">
            <PlatformStats />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href={`/${locale}/account`} icon={Users}>
              {dictionary.nav.account}
            </CTAButton>
            <CTAButton href={`/${locale}/card/${demoSecretId}`} icon={CreditCard}>
              Carte demo
            </CTAButton>
            <CTAButton
              href={links.collaboration}
              external
              variant="secondary"
              icon={Handshake}
            >
              Golden Link
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 md:py-20">
        <SectionHeader
          eyebrow="Modules"
          title="Les briques operationnelles."
          text="Chaque module correspond a une partie du business: acquisition, validation, distribution d'acces et suivi."
        />
        <div className="mt-10">
          <ModuleGrid />
        </div>
      </section>

      <section className="bg-gradient-to-b from-ink via-wine/30 to-ink py-14 md:py-20">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Offres & statuts"
            title="Membres, VIP et ambassadrices."
            text="Le SaaS distingue l'achat d'un droit d'acces, la priorite VIP et les statuts attribues par l'equipe."
          />
          <div className="mt-10">
            <MembershipGrid />
          </div>
        </div>
      </section>

      <section className="section-shell py-14 md:py-20">
        <SectionHeader
          eyebrow="Distribution d'acces"
          title="Privileges, experiences, opportunites."
          text="Le coeur produit reste simple: distribuer le bon acces au bon segment, seulement quand l'operation est confirmee."
        />
        <div className="mt-10">
          <PillarGrid />
        </div>
        <div className="mt-8">
          <NotificationPanel />
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/24 py-14 md:py-20">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Execution"
            title="Roadmap MVP 90 jours."
            text="La plateforme est pensee pour demarrer leger, puis monter en puissance avec Supabase, le portail partenaire et les operations terrain."
          />
          <div className="mt-10">
            <RoadmapGrid />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href={`/${locale}/admin`} variant="secondary" icon={ShieldCheck}>
              Admin
            </CTAButton>
            <CTAButton href={`/${locale}/partners`} variant="secondary" icon={Handshake}>
              {dictionary.nav.partners}
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
