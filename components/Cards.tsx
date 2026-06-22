import { CalendarDays, Check, MapPin, ShieldCheck, Tag } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { VIPBadge } from "@/components/Badges";

type OfferCardProps = {
  title: string;
  price: string;
  period: string;
  intro: string;
  benefits: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

export function OfferCard({
  title,
  price,
  period,
  intro,
  benefits,
  cta,
  href,
  featured
}: OfferCardProps) {
  return (
    <article className={`premium-border rounded-lg ${featured ? "bg-ruby/35" : "bg-coal/88"} p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-gold/40`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-mist">{intro}</p>
        </div>
        {featured ? <VIPBadge /> : null}
      </div>
      <div className="mt-6">
        <p className="font-display text-5xl font-bold gold-text">{price}</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-mist">
          {period}
        </p>
      </div>
      <ul className="mt-6 grid gap-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-sm text-mist">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <CTAButton href={href} external className="mt-7 w-full">
        {cta}
      </CTAButton>
    </article>
  );
}

export function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg border border-white/10 bg-coal/80 p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/40">
      <ShieldCheck className="h-7 w-7 text-gold" aria-hidden />
      <h3 className="mt-5 font-display text-2xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-mist">{text}</p>
    </article>
  );
}

export function EventCard({
  title,
  place,
  date,
  category,
  description,
  badge
}: {
  title: string;
  place: string;
  date: string;
  category: string;
  description: string;
  badge: string;
}) {
  return (
    <article className="premium-border rounded-lg bg-coal/82 p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-mist">
          {category}
        </span>
        <VIPBadge label={badge} />
      </div>
      <h3 className="mt-5 font-display text-3xl font-bold text-white">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-mist">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gold" aria-hidden />
          {place}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-gold" aria-hidden />
          {date}
        </p>
      </div>
      <p className="mt-4 text-sm leading-6 text-mist">{description}</p>
    </article>
  );
}

export function DealCard({
  title,
  benefit,
  conditions,
  zone,
  badge
}: {
  title: string;
  benefit: string;
  conditions: string;
  zone: string;
  badge: string;
}) {
  return (
    <article className="premium-border rounded-lg bg-coal/82 p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <Tag className="h-6 w-6 text-gold" aria-hidden />
        <VIPBadge label={badge} />
      </div>
      <h3 className="mt-5 font-display text-3xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-lg font-bold text-champagne">{benefit}</p>
      <p className="mt-4 text-sm leading-6 text-mist">{conditions}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-mist">
        {zone}
      </p>
    </article>
  );
}

export function PartnerCard({
  title,
  price,
  text
}: {
  title: string;
  price: string;
  text: string;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-coal/82 p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/40">
      <h3 className="font-display text-3xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm font-black uppercase tracking-wide text-gold">
        {price}
      </p>
      <p className="mt-4 text-sm leading-6 text-mist">{text}</p>
    </article>
  );
}
