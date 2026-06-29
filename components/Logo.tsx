import Link from "next/link";
import { brand, type Locale } from "@/lib/i18n";

type LogoProps = {
  locale: Locale;
};

export function Logo({ locale }: LogoProps) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/70 shadow-glow">
        <img
          src="/brand/golden-circle-emblem-transparent.png"
          alt=""
          className="h-full w-full object-contain"
          width={48}
          height={48}
        />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-black tracking-[0.2em] text-white">
          {brand.name}
        </span>
        <span className="mt-1 block font-display text-lg font-semibold text-gold">
          {brand.region}
        </span>
      </span>
    </Link>
  );
}
