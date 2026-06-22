import { CalendarCheck, Crown, Handshake, Megaphone, Users } from "lucide-react";
import { EventCard } from "@/components/Cards";
import { CTAButton } from "@/components/CTAButton";
import { InstagramWidget } from "@/components/InstagramWidget";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, links } from "@/lib/i18n";
import { notFound } from "next/navigation";

type ConfirmedEvent = {
  title: string;
  place: string;
  date: string;
  category: string;
  description: string;
  badge: string;
};

const confirmedEvents: ConfirmedEvent[] = [];

export default async function EventsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);
  const hasConfirmedEvents = confirmedEvents.length > 0;

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader title={dictionary.events.title} text={dictionary.events.subtitle} />

      {hasConfirmedEvents ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {confirmedEvents.map((event) => (
            <EventCard key={`${event.title}-${event.date}`} {...event} />
          ))}
        </div>
      ) : (
        <section className="premium-border mt-10 rounded-lg bg-coal/86 p-6 shadow-card md:p-8">
          <div className="flex max-w-3xl flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <CalendarCheck className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-4xl font-bold text-white">
                {dictionary.events.emptyTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-mist">
                {dictionary.events.emptyText}
              </p>
              <p className="mt-5 rounded-lg border border-gold/20 bg-black/20 px-4 py-3 text-sm font-semibold text-champagne">
                {dictionary.events.confirmedNote}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="premium-border rounded-lg bg-ruby/20 p-6 shadow-card">
          <Megaphone className="h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-display text-3xl font-bold text-white">
            {dictionary.events.organizerTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-mist">
            {dictionary.events.organizerText}
          </p>
          <CTAButton
            href={links.collaboration}
            external
            icon={Handshake}
            className="mt-7"
          >
            {dictionary.cta.eventCollab}
          </CTAButton>
        </article>

        <article className="premium-border rounded-lg bg-coal/86 p-6 shadow-card">
          <Users className="h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-display text-3xl font-bold text-white">
            {dictionary.events.memberTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-mist">
            {dictionary.events.memberText}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href={links.gcList} external icon={Users}>
              {dictionary.cta.gcList}
            </CTAButton>
            <CTAButton
              href={links.vipList}
              external
              variant="secondary"
              icon={Crown}
            >
              {dictionary.cta.vip}
            </CTAButton>
          </div>
        </article>
      </section>

      <InstagramWidget locale={resolvedParams.locale} />
    </main>
  );
}
