import { Crown, Map, ShieldCheck } from "lucide-react";
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
  memberAccess,
  memberDashboardNav,
  progressiveNotice,
  publicNotice
} from "@/lib/access-model";
import { isLocale } from "@/lib/i18n";

export default async function MemberSpacePage({
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
        title="Espace membre en deploiement progressif"
        text="Cette interface prepare l'acces prive GC List, VIP GC List et Ambassadrice. Aucun acces n'est considere comme connecte pour le moment."
      />

      <section className="mt-8">
        <InternalNav items={memberDashboardNav} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <AccessPanel
          eyebrow="Statuts membres"
          title="GC List · VIP GC List · Ambassadrice"
          text={`Fonctions marquees ${progressiveNotice} tant que Supabase Auth et le paiement ne sont pas connectes.`}
        >
          <AccessList
            items={[
              "Voir son statut",
              "Voir les privileges accessibles",
              "Voir les evenements disponibles",
              "Voir les Golden Hour actives",
              "Voir les conditions d'acces"
            ]}
          />
        </AccessPanel>
        <AccessPanel
          eyebrow="Acces"
          title="Privileges et conditions"
          text="Les quotas, places restantes et priorites VIP seront affiches selon le statut membre."
        >
          <AccessList items={memberAccess} />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={`/${locale}/mini-map`} variant="secondary" icon={Map}>
              Mini Map
            </CTAButton>
            <CTAButton href={`/${locale}/gc-list`} variant="ghost" icon={Crown}>
              Voir GC List
            </CTAButton>
          </div>
        </AccessPanel>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {["Mes privileges", "Evenements", "Golden Hour"].map((item) => (
          <AccessPanel
            key={item}
            title={item}
            text={progressiveNotice}
            muted
          >
            <ShieldCheck className="h-5 w-5 text-gold" aria-hidden />
          </AccessPanel>
        ))}
      </section>

      <div className="mt-8">
        <NoticeBox>{publicNotice}</NoticeBox>
      </div>
    </main>
  );
}
