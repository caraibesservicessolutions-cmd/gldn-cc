"use client";

import { ArrowLeft, Copy, Download, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CTAButton } from "@/components/CTAButton";
import { brand, legal, type Locale } from "@/lib/i18n";
import {
  getPublicCardUrl,
  memberPageText,
  memberStatusLabels,
  memberTypeLabels,
  type Member
} from "@/lib/members";

type MemberCardProps = {
  member: Member;
  locale: Locale;
};

const badgeClassByType: Record<Member["type"], string> = {
  founder: "border-gold/60 bg-gold/20 text-champagne",
  gc_list: "border-white/15 bg-white/8 text-white",
  vip: "border-champagne/60 bg-champagne/20 text-champagne",
  partner_pro: "border-emerald-300/40 bg-emerald-400/12 text-emerald-100",
  event_organizer: "border-sky-300/40 bg-sky-400/12 text-sky-100",
  admin: "border-ruby/60 bg-ruby/25 text-white"
};

export function MemberCard({ member, locale }: MemberCardProps) {
  const copy = memberPageText[locale];
  const typeLabel = memberTypeLabels[locale][member.type];
  const statusLabel = memberStatusLabels[locale][member.status];
  const cardUrl = getPublicCardUrl(locale, member.secretId);
  const isInactive = ["suspended", "deleted", "expired"].includes(member.status);

  async function shareCard() {
    const text = `${brand.name} ${brand.region} - ${typeLabel} - ${member.fullName}`;

    if (navigator.share) {
      await navigator.share({ title: "Golden Circle", text, url: cardUrl });
      return;
    }

    await navigator.clipboard.writeText(cardUrl);
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <article
        className={[
          "premium-border relative overflow-hidden rounded-[28px] bg-black/76 p-5 shadow-card sm:p-6",
          isInactive ? "opacity-78 grayscale-[0.25]" : ""
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/18 via-transparent to-ruby/25" />
        <div className="pointer-events-none absolute -right-10 bottom-10 font-display text-[9rem] font-bold leading-none text-white/[0.03]">
          GC
        </div>
        {isInactive ? (
          <div className="absolute inset-x-0 top-8 z-20 rotate-[-8deg] border-y border-ruby/50 bg-ruby/70 py-2 text-center text-xs font-black uppercase tracking-[0.28em] text-white">
            {statusLabel}
          </div>
        ) : null}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <img
              src="/brand/golden-circle-logo.jpg"
              alt=""
              className="h-16 w-16 rounded-full border border-gold/60 object-cover"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                {brand.name}
              </p>
              <p className="font-display text-2xl font-bold text-white">
                {brand.region}
              </p>
              <p className="text-xs text-mist">{brand.slogan}</p>
            </div>
          </div>

          <div className="mt-8">
            <span
              className={[
                "inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]",
                badgeClassByType[member.type]
              ].join(" ")}
            >
              {typeLabel}
            </span>
            <h1 className="mt-3 break-words font-display text-4xl font-bold leading-tight text-white">
              {member.fullName}
            </h1>
            <p className="mt-2 text-sm font-semibold text-champagne">
              {statusLabel}
            </p>
          </div>

          <div className="mt-6 grid gap-3 text-sm">
            <InfoLine label={copy.secretId} value={member.secretId} />
            <InfoLine label={copy.validUntil} value={member.endDate || "-"} />
            <InfoLine
              label={copy.preferredLanguage}
              value={member.language.toUpperCase()}
            />
            {member.location ? (
              <InfoLine label="Zone" value={member.location} />
            ) : null}
            {member.instagram ? (
              <InfoLine label="Instagram" value={member.instagram} />
            ) : null}
          </div>

          <div className="mt-6 rounded-2xl border border-gold/30 bg-white p-3 text-center">
            <QRCodeSVG
              value={cardUrl}
              size={176}
              bgColor="#ffffff"
              fgColor="#111111"
              level="M"
              includeMargin
              className="mx-auto h-44 w-44"
            />
            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-ink">
              {copy.qrLabel}
            </p>
          </div>

          {member.status !== "active" ? (
            <p className="mt-5 rounded-lg border border-ruby/40 bg-ruby/18 p-3 text-xs font-semibold leading-5 text-white">
              {statusLabel}
            </p>
          ) : null}
          <p className="mt-5 text-xs leading-5 text-mist">{copy.cardNotice}</p>
          <p className="mt-2 text-xs leading-5 text-mist">{copy.publicWarning}</p>
          <p className="mt-4 text-[11px] leading-5 text-mist">
            {legal.commercialNotice}
            <br />
            SIRET : {legal.siret}
          </p>
        </div>
      </article>

      <div className="mt-5 grid gap-3">
        <button
          type="button"
          onClick={shareCard}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black uppercase tracking-wide text-ink shadow-glow transition hover:bg-champagne"
        >
          <Share2 className="h-4 w-4" aria-hidden />
          {copy.share}
        </button>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => copyText(cardUrl)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/30 px-4 py-3 text-xs font-bold uppercase tracking-wide text-champagne"
          >
            <Copy className="h-4 w-4" aria-hidden />
            {copy.copyLink}
          </button>
          <button
            type="button"
            onClick={() => copyText(member.secretId)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/30 px-4 py-3 text-xs font-bold uppercase tracking-wide text-champagne"
          >
            <Copy className="h-4 w-4" aria-hidden />
            {copy.copySecret}
          </button>
        </div>
        <button
          type="button"
          disabled
          title="TODO: connecter une export image/PDF de la carte."
          className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wide text-mist/70"
        >
          <Download className="h-4 w-4" aria-hidden />
          {copy.downloadCard}
        </button>
        <CTAButton href={`/${locale}`} variant="secondary" icon={ArrowLeft}>
          {copy.back}
        </CTAButton>
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mist">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold text-white">{value}</p>
    </div>
  );
}
