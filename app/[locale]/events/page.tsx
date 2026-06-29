import { CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { knownEvents } from "@/lib/access-model";
import { isLocale, links } from "@/lib/i18n";

export default async function EventsPage({
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
        eyebrow="Evenements"
        title="Des experiences sous conditions, pas des soirees generiques."
        text="Chaque evenement doit avoir son format, son partenaire, son quota, son niveau requis et sa validation Golden Circle."
      />
      <div className="mt-8">
        <NoticeBox>
          Regle officielle : la tenue exigee est toujours "tenue adaptee a
          l'evenement".
        </NoticeBox>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {knownEvents.map((event) => (
          <AccessPanel
            key={event.title}
            eyebrow={event.format}
            title={event.title}
            text={event.condition}
          >
            <div className="grid gap-2 text-sm text-mist">
              <p>Acces : {event.access}</p>
              <p>Tenue : {event.dress}</p>
              <p>Statut : {event.status}</p>
              <p>Validation Golden Circle requise.</p>
            </div>
          </AccessPanel>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-white/10 bg-black/18 p-5">
        <p className="flex gap-3 text-sm leading-7 text-mist">
          <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
          Evenement non liste = conditions a definir avant diffusion : heure
          limite, quota, niveau requis, avantage eventuel, repost et statut.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CTAButton href={`/${locale}/gc-list`}>
            Rejoindre la GC List
          </CTAButton>
          <CTAButton href={links.collaboration} external variant="secondary">
            Proposer un evenement
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
