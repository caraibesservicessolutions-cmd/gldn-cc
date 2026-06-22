import { notFound } from "next/navigation";
import { Crown, Handshake, ShieldCheck, Users } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialProof } from "@/components/SocialProof";
import { getDictionary, isLocale, links } from "@/lib/i18n";
import { memberPageText } from "@/lib/members";

const spaceCards = {
  fr: [
    ["GC List", "Accès membre, carte virtuelle et annonces confirmées."],
    ["VIP", "Statut VIP, avantages prioritaires et invitations futures."],
    ["Partenaires", "Espace futur pour offres, campagnes et conversions."],
    ["Organisateurs", "Espace futur pour collaborations événementielles."]
  ],
  en: [
    ["GC List", "Member access, virtual card and confirmed announcements."],
    ["VIP", "VIP status, priority benefits and future invitations."],
    ["Partners", "Future space for offers, campaigns and conversions."],
    ["Organizers", "Future space for event collaborations."]
  ],
  es: [
    ["GC List", "Acceso miembro, tarjeta virtual y anuncios confirmados."],
    ["VIP", "Estatus VIP, ventajas prioritarias e invitaciones futuras."],
    ["Partners", "Espacio futuro para ofertas, campañas y conversiones."],
    ["Organizadores", "Espacio futuro para colaboraciones de eventos."]
  ],
  pt: [
    ["GC List", "Acesso membro, cartão virtual e anúncios confirmados."],
    ["VIP", "Status VIP, vantagens prioritárias e convites futuros."],
    ["Parceiros", "Espaço futuro para ofertas, campanhas e conversões."],
    ["Organizadores", "Espaço futuro para colaborações de eventos."]
  ],
  ht: [
    ["GC List", "Aksè manm, kat vityèl ak anons konfime."],
    ["VIP", "Estati VIP, avantaj priyoritè ak envitasyon pou pita."],
    ["Patnè", "Espas pou òf, kanpay ak konvèsyon pou pita."],
    ["Òganizatè", "Espas pou kolaborasyon event pou pita."]
  ]
};

export default async function SpacesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const copy = memberPageText[resolvedParams.locale];
  const dictionary = getDictionary(resolvedParams.locale);

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader title={copy.spacesTitle} text={copy.spacesText} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {spaceCards[resolvedParams.locale].map(([label, description], index) => {
          const icons = [Users, Crown, Handshake, ShieldCheck];
          const Icon = icons[index];
          return (
            <article
              key={label}
              className="rounded-lg border border-white/10 bg-coal/82 p-6 shadow-card"
            >
              <Icon className="h-8 w-8 text-gold" aria-hidden />
              <h2 className="mt-5 font-display text-3xl font-bold text-white">
                {label}
              </h2>
              <p className="mt-3 text-sm leading-7 text-mist">
                {description}
              </p>
            </article>
          );
        })}
      </div>
      <SocialProof locale={resolvedParams.locale} className="mt-8" />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href={`/${resolvedParams.locale}/account`} icon={Users}>
          {dictionary.nav.account}
        </CTAButton>
        <CTAButton href={`/${resolvedParams.locale}/card`} icon={ShieldCheck}>
          Carte demo
        </CTAButton>
        <CTAButton
          href={links.collaboration}
          external
          variant="secondary"
          icon={Handshake}
        >
          Collab Event
        </CTAButton>
      </div>
    </main>
  );
}
