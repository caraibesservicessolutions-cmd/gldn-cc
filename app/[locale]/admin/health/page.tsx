import { CheckCircle2, Database, ShieldCheck, type LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const healthCopy = {
  fr: {
    title: "Admin health",
    text: "Vérification rapide des routes admin, membres, cartes et stockage.",
    route: "Route admin active",
    storage: "Mode stockage configurable",
    api: "API membres prête"
  },
  en: {
    title: "Admin health",
    text: "Quick check for admin, members, cards and storage routes.",
    route: "Admin route active",
    storage: "Configurable storage mode",
    api: "Members API ready"
  },
  es: {
    title: "Admin health",
    text: "Verificación rápida de rutas admin, miembros, tarjetas y almacenamiento.",
    route: "Ruta admin activa",
    storage: "Modo de almacenamiento configurable",
    api: "API miembros lista"
  },
  pt: {
    title: "Admin health",
    text: "Verificação rápida das rotas admin, membros, cartões e armazenamento.",
    route: "Rota admin ativa",
    storage: "Modo de armazenamento configurável",
    api: "API membros pronta"
  },
  ht: {
    title: "Admin health",
    text: "Verifikasyon rapid pou wout admin, manm, kat ak depo.",
    route: "Wout admin aktif",
    storage: "Mòd depo ka konfigire",
    api: "API manm pare"
  }
} satisfies Record<Locale, Record<string, string>>;

export default async function AdminHealthPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const copy = healthCopy[resolvedParams.locale];
  const storageMode = process.env.NEXT_PUBLIC_MEMBER_STORAGE_MODE || "local";
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader title={copy.title} text={copy.text} />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <HealthCard icon={ShieldCheck} title={copy.route} value="OK" />
        <HealthCard icon={Database} title={copy.storage} value={storageMode} />
        <HealthCard
          icon={CheckCircle2}
          title={copy.api}
          value={supabaseConfigured ? "Supabase ready" : "localStorage fallback"}
        />
      </div>
    </main>
  );
}

function HealthCard({
  icon: Icon,
  title,
  value
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-gold/20 bg-coal/86 p-5 shadow-card">
      <Icon className="h-7 w-7 text-gold" aria-hidden />
      <h2 className="mt-4 font-display text-2xl font-bold text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm font-semibold text-champagne">{value}</p>
    </article>
  );
}
