import { Handshake, LockKeyhole, Map, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessList, AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import {
  accessSteps,
  memberAccess,
  notGoldenCircle,
  partnerValue,
  publicNotice
} from "@/lib/access-model";
import { brand, isLocale, links, type Locale } from "@/lib/i18n";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale: Locale = resolvedParams.locale;

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-ink">
        <img
          src="/images/golden-circle-hero.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-wine/30" />
        <div className="section-shell relative z-10 grid min-h-[calc(100svh-80px)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.72fr]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <img
                src="/brand/golden-circle-emblem-transparent.png"
                alt=""
                className="h-14 w-14 object-contain"
                width={56}
                height={56}
              />
              <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">
                Infrastructure privee
              </p>
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] text-pearl sm:text-7xl lg:text-8xl">
              {brand.name}
              <span className="block gold-text">{brand.region}</span>
            </h1>
            <p className="mt-5 font-display text-2xl font-semibold text-pearl">
              L'Acces aux Privileges.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mist sm:text-lg">
              Une infrastructure privee d'acces aux privileges, experiences
              et opportunites lifestyle en Caraibe.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <CTAButton href={`/${locale}/gc-list`} icon={Users}>
                Je suis membre
              </CTAButton>
              <CTAButton
                href={`/${locale}/partenaires`}
                variant="secondary"
                icon={Handshake}
              >
                Je suis partenaire
              </CTAButton>
            </div>
          </div>
          <div className="grid gap-4">
            <AccessPanel
              eyebrow="Principe"
              title="Les partenaires proposent. Golden Circle valide. Les membres accedent."
              text="L'acces reste controle, limite et coherent avec la valeur de l'ecosysteme."
            />
            <NoticeBox>{publicNotice}</NoticeBox>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="Positionnement"
            title="Un cercle d'acces, pas une marketplace."
            text="Golden Circle n'ouvre pas tout a tout le monde. Il qualifie, valide et distribue des acces selon les conditions."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <AccessPanel title="Ce que Golden Circle est" eyebrow="Controle">
              <AccessList
                items={[
                  "Une communaute membre",
                  "Un reseau partenaire qualifie",
                  "Un distributeur d'acces",
                  "Un cadre de validation"
                ]}
              />
            </AccessPanel>
            <AccessPanel title="Ce que Golden Circle n'est pas" eyebrow="Clarte">
              <AccessList items={notGoldenCircle} />
            </AccessPanel>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/18 py-16 md:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Fonctionnement"
            title="Un acces en trois temps."
            text="Ce cadre protege les membres, les partenaires et la perception premium de Golden Circle."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {accessSteps.map((step) => (
              <AccessPanel key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <AccessPanel
            eyebrow="Membres"
            title="Rejoindre la GC List"
            text="Acceder a une selection de privileges, experiences et opportunites selon conditions Golden Circle."
          >
            <AccessList items={memberAccess} />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={`/${locale}/gc-list`} icon={Users}>
                GC List
              </CTAButton>
              <CTAButton href={`/${locale}/mini-map`} variant="secondary" icon={Map}>
                Mini Map
              </CTAButton>
            </div>
          </AccessPanel>
          <AccessPanel
            eyebrow="Partenaires"
            title="Proposer une activation"
            text="Tester une offre, remplir intelligemment un moment, valoriser une image et toucher une communaute qualifiee."
          >
            <AccessList items={partnerValue} />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={`/${locale}/partenaires`} icon={Handshake}>
                Partenaires
              </CTAButton>
              <CTAButton href={links.collaboration} external variant="secondary">
                Proposer une offre
              </CTAButton>
            </div>
          </AccessPanel>
        </div>
        <div className="mt-6">
          <CTAButton href={`/${locale}/connexion`} variant="ghost" icon={LockKeyhole}>
            Deja inscrit ? Connexion
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
