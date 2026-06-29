import {
  Bell,
  CalendarDays,
  Crown,
  Gem,
  Handshake,
  Map,
  Network,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import {
  ecosystemPillars,
  eventFormats,
  executionRoadmap,
  membershipTiers,
  partnerPrograms,
  platformStats,
  saasModules
} from "@/lib/ecosystem";

const moduleIcons = [Users, Gem, CalendarDays, Sparkles, Handshake, Map];
const pillarIcons = [Gem, CalendarDays, Network];

export function PlatformStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {platformStats.map((item) => (
        <article
          key={item.label}
          className="rounded-lg border border-white/10 bg-black/24 p-4"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-mist">
            {item.label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            {item.value}
          </p>
          <p className="mt-2 text-xs leading-5 text-mist">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function PillarGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {ecosystemPillars.map((item, index) => {
        const Icon = pillarIcons[index];
        return (
          <article
            key={item.title}
            className="rounded-lg border border-gold/18 bg-coal/82 p-5 shadow-card"
          >
            <div className="flex items-center justify-between gap-3">
              <Icon className="h-7 w-7 text-gold" aria-hidden />
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-mist">
                {item.status}
              </span>
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-gold">
              {item.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}

export function ModuleGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {saasModules.map((item, index) => {
        const Icon = moduleIcons[index];
        return (
          <article
            key={item.title}
            className="rounded-lg border border-white/10 bg-coal/82 p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="flex items-center justify-between gap-3">
              <Icon className="h-7 w-7 text-gold" aria-hidden />
              <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-champagne">
                {item.state}
              </span>
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-gold">
              {item.scope}
            </p>
            <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}

export function MembershipGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {membershipTiers.map((item) => (
        <article
          key={item.title}
          className="rounded-lg border border-white/10 bg-black/24 p-5"
        >
          <div className="flex min-h-16 items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                {item.audience}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                {item.title}
              </h3>
            </div>
            <Crown className="h-5 w-5 shrink-0 text-gold" aria-hidden />
          </div>
          <p className="mt-4 font-display text-2xl font-bold gold-text">
            {item.price}
          </p>
          <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.benefits.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full border border-gold/15 px-3 py-1 text-xs font-semibold text-mist"
              >
                {benefit}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function RoadmapGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {executionRoadmap.map((item) => (
        <article
          key={item.phase}
          className="rounded-lg border border-white/10 bg-coal/82 p-5"
        >
          <p className="font-display text-4xl font-bold text-gold">
            {item.phase}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export function PartnerProgramGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {partnerPrograms.map((item) => (
        <article
          key={item.title}
          className="rounded-lg border border-white/10 bg-coal/82 p-5"
        >
          <Handshake className="h-6 w-6 text-gold" aria-hidden />
          <h3 className="mt-4 font-display text-2xl font-bold text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-gold">
            {item.price}
          </p>
          <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export function EventFormatGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {eventFormats.map((item) => (
        <article
          key={item.title}
          className="rounded-lg border border-white/10 bg-black/24 p-5"
        >
          <CalendarDays className="h-6 w-6 text-gold" aria-hidden />
          <h3 className="mt-4 font-display text-3xl font-bold text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-gold">
            {item.frequency}
          </p>
          <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export function NotificationPanel() {
  return (
    <article className="rounded-lg border border-gold/20 bg-ruby/20 p-6 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
          <Bell className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
            Centre de notifications
          </p>
          <h3 className="font-display text-3xl font-bold text-white">
            Priorite claire, promesses maitrisees.
          </h3>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {["Annonce membre", "Alerte VIP", "Validation partenaire"].map(
          (item) => (
            <div
              key={item}
              className="rounded-lg border border-white/10 bg-black/25 p-4"
            >
              <ShieldCheck className="h-5 w-5 text-gold" aria-hidden />
              <p className="mt-3 text-sm font-semibold text-white">{item}</p>
              <p className="mt-2 text-xs leading-5 text-mist">
                Publie seulement quand les conditions, quotas et dates sont
                confirmes.
              </p>
            </div>
          )
        )}
      </div>
    </article>
  );
}
