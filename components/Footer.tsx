import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  legal,
  localeLabels,
  locales,
  links,
  type Dictionary,
  type Locale
} from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const footerCopy = {
  fr: { card: "Carte virtuelle" },
  en: { card: "Virtual card" },
  es: { card: "Tarjeta virtual" },
  pt: { card: "Cartão virtual" },
  ht: { card: "Kat vityèl" }
} satisfies Record<Locale, { card: string }>;

export function Footer({ locale, dictionary }: FooterProps) {
  const copy = footerCopy[locale];
  const footerLinks = [
    { label: dictionary.offers.gcList.title, href: links.gcList, external: true },
    { label: dictionary.offers.vip.title, href: links.vipList, external: true },
    { label: dictionary.nav.account, href: `/${locale}/account` },
    { label: dictionary.nav.spaces, href: `/${locale}/spaces` },
    { label: copy.card, href: `/${locale}/card` },
    { label: dictionary.nav.instagram, href: links.instagram, external: true },
    { label: "Collab Event", href: links.collaboration, external: true },
    { label: dictionary.nav.legal, href: `/${locale}/legal` },
    { label: dictionary.nav.language, href: `/${locale}/language` }
  ];

  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="section-shell grid gap-8 py-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo locale={locale} />
          <p className="mt-5 max-w-xl text-sm leading-7 text-mist">
            {dictionary.footer.line}
          </p>
          <p className="mt-3 text-sm text-mist">
            {legal.commercialNotice}
            <br />
            SIRET : {legal.siret}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {footerLinks.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-mist transition hover:border-gold hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-mist transition hover:border-gold hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
          >
            <Instagram className="h-4 w-4" aria-hidden />
            @gldn.crcl
          </a>
          <div className="sm:col-span-2 grid gap-2 rounded-lg border border-white/10 p-3 sm:grid-cols-5">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="rounded-md bg-white/[0.04] px-3 py-2 text-xs font-bold text-mist transition hover:bg-gold hover:text-ink"
              >
                {item.toUpperCase()} · {localeLabels[item]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
