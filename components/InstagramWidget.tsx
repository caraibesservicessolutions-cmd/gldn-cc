import { Instagram } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { links, type Locale } from "@/lib/i18n";

const text = {
  fr: {
    title: "Suivre les activations Golden Circle",
    body: "Les annonces, événements passés, contenus partenaires et prochaines activations sont publiés sur notre Instagram officiel.",
    cta: "Voir Instagram"
  },
  en: {
    title: "Follow Golden Circle activations",
    body: "Announcements, past events, partner content and upcoming activations are shared on our official Instagram.",
    cta: "View Instagram"
  },
  es: {
    title: "Seguir las activaciones Golden Circle",
    body: "Los anuncios, eventos pasados, contenidos partners y próximas activaciones se publican en nuestro Instagram oficial.",
    cta: "Ver Instagram"
  },
  pt: {
    title: "Seguir as ativações Golden Circle",
    body: "Anúncios, eventos passados, conteúdos de parceiros e próximas ativações são publicados no nosso Instagram oficial.",
    cta: "Ver Instagram"
  },
  ht: {
    title: "Swiv aktivasyon Golden Circle yo",
    body: "Anons, events pase, kontni patnè ak pwochen aktivasyon yo pibliye sou Instagram ofisyèl nou.",
    cta: "Gade Instagram"
  }
};

export function InstagramWidget({ locale }: { locale: Locale }) {
  const copy = text[locale];

  return (
    <section className="section-shell py-12">
      <div className="premium-border reveal-soft rounded-lg bg-coal/86 p-6 shadow-card md:flex md:items-center md:justify-between md:gap-8">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Instagram className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
              @gldn.crcl
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              {copy.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-mist">
              {copy.body}
            </p>
          </div>
        </div>
        <CTAButton
          href={links.instagram}
          external
          variant="secondary"
          icon={Instagram}
          className="mt-6 w-full md:mt-0 md:w-auto"
        >
          {copy.cta}
        </CTAButton>
      </div>
    </section>
  );
}
