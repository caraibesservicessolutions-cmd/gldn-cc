import { Clock, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessList, AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { memberAccess, publicNotice } from "@/lib/access-model";
import { isLocale } from "@/lib/i18n";

export default async function DealsPage({
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
        eyebrow="Privileges"
        title="Offres partenaires sous validation."
        text="GC Deals et Golden Hour sont diffuses seulement quand les conditions, quotas et horaires sont confirmes."
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <AccessPanel
          eyebrow="GC Deals"
          title="Avantages controles"
          text="Aucun avantage n'est presente comme automatique. Golden Circle valide la diffusion."
        >
          <AccessList items={memberAccess} />
        </AccessPanel>
        <AccessPanel
          eyebrow="Golden Hour"
          title="Moments limites"
          text="Une fenetre horaire, un quota, un partenaire et des conditions d'acces."
        >
          <div className="flex items-center gap-3 text-sm font-semibold text-mist">
            <Clock className="h-5 w-5 text-gold" aria-hidden />
            Disponible selon annonce Golden Circle.
          </div>
        </AccessPanel>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {["reserve GC List", "reserve VIP", "offre expiree"].map((state) => (
          <AccessPanel key={state} title={state} text="Etat prevu pour la Mini Map et les offres." muted>
            <Sparkles className="h-5 w-5 text-gold" aria-hidden />
          </AccessPanel>
        ))}
      </section>

      <div className="mt-8 grid gap-4">
        <NoticeBox>{publicNotice}</NoticeBox>
        <CTAButton href={`/${locale}/mini-map`} variant="secondary">
          Voir la Mini Map
        </CTAButton>
      </div>
    </main>
  );
}
