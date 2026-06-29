import { Handshake, LogIn, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { progressiveNotice } from "@/lib/access-model";
import { isLocale } from "@/lib/i18n";

export default async function ConnexionPage({
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
        eyebrow="Connexion"
        title="Deux espaces, deux usages."
        text="L'authentification est preparee pour separer les membres et les partenaires."
      />
      <div className="mt-8">
        <NoticeBox>Authentification {progressiveNotice}.</NoticeBox>
      </div>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <AccessPanel
          eyebrow="Membre"
          title="Connexion membre"
          text="Acceder a son statut, ses privileges, les Golden Hour, les evenements et la Mini Map."
        >
          <CTAButton href={`/${locale}/espace-membre`} icon={Users}>
            Espace membre
          </CTAButton>
        </AccessPanel>
        <AccessPanel
          eyebrow="Partenaire"
          title="Connexion partenaire"
          text="Gerer ses offres, ses quotas, ses demandes Golden Circle et ses activations."
        >
          <CTAButton href={`/${locale}/espace-partenaire`} icon={Handshake}>
            Espace partenaire
          </CTAButton>
        </AccessPanel>
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-black/18 p-5">
        <p className="flex items-start gap-3 text-sm leading-7 text-mist">
          <LogIn className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
          Etat actuel : non connecte. La deconnexion sera affichee uniquement
          apres authentification.
        </p>
      </section>
    </main>
  );
}
