import { LockKeyhole, Map, Sparkles, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessList, AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { memberAccess, memberNotice, publicNotice } from "@/lib/access-model";
import { isLocale, links } from "@/lib/i18n";

export default async function GCListPage({
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
        eyebrow="GC List"
        title="L'acces membre Golden Circle."
        text="Une communaute pour acceder a une selection de privileges partenaires, experiences et opportunites lifestyle en Caraibe."
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <AccessPanel
          eyebrow="Acces"
          title="18 EUR"
          text="Acces annuel a l'ecosysteme Golden Circle. Les avantages restent soumis aux conditions de chaque operation."
        >
          <AccessList items={memberAccess} />
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <CTAButton href={links.gcList} external icon={Users}>
              Rejoindre la GC List
            </CTAButton>
            <CTAButton href={`/${locale}/mini-map`} variant="secondary" icon={Map}>
              Decouvrir les offres
            </CTAButton>
            <CTAButton href={`/${locale}/connexion`} variant="ghost" icon={LockKeyhole}>
              Se connecter
            </CTAButton>
          </div>
        </AccessPanel>
        <AccessPanel
          eyebrow="VIP GC List"
          title="49,90 EUR"
          text="Priorite, acces anticipes ou avantages renforces lorsque l'operation le permet."
        >
          <AccessList
            items={[
              "Statut VIP GC List",
              "Acces evenementiels selon conditions",
              "Golden Hour selon disponibilites",
              "Espace membre en deploiement progressif"
            ]}
          />
        </AccessPanel>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {["Golden Hour", "GC Deals", "Mini Map"].map((item) => (
          <AccessPanel
            key={item}
            title={item}
            text="Selection, horaire, quota et statut requis valides par Golden Circle."
            muted
          >
            <Sparkles className="h-5 w-5 text-gold" aria-hidden />
          </AccessPanel>
        ))}
      </section>

      <div className="mt-8 grid gap-4">
        <NoticeBox>{memberNotice}</NoticeBox>
        <NoticeBox>{publicNotice}</NoticeBox>
        <p className="text-sm leading-7 text-mist">
          Golden Circle se reserve le droit de valider, limiter ou refuser un
          acces selon les conditions, quotas, horaires et partenaires.
        </p>
      </div>
    </main>
  );
}
