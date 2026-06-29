import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { AccessPanel, NoticeBox } from "@/components/AccessPanels";
import { SectionHeader } from "@/components/SectionHeader";
import { miniMapCategories, miniMapLocations } from "@/lib/access-model";
import { isLocale } from "@/lib/i18n";

export default async function MiniMapPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader
        eyebrow="Mini Map"
        title="Une vision controlee des lieux activables."
        text="La Mini Map donne une lecture claire des partenaires, privileges et experiences en deploiement."
      />
      <div className="mt-8">
        <NoticeBox>Mini Map — en deploiement progressif.</NoticeBox>
      </div>

      <section className="mt-10 rounded-lg border border-gold/20 bg-black/18 p-5">
        <div className="flex flex-wrap gap-2">
          {miniMapCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-mist"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {miniMapLocations.map((location) => (
          <AccessPanel
            key={location.name}
            eyebrow={location.category}
            title={location.name}
            text={`${location.area} · ${location.visibility}`}
          >
            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-semibold text-mist">
                <MapPin className="h-4 w-4 text-gold" aria-hidden />
                {location.state}
              </span>
              <span className="text-xs font-black uppercase tracking-wide text-gold">
                MVP
              </span>
            </div>
          </AccessPanel>
        ))}
      </section>
    </main>
  );
}
