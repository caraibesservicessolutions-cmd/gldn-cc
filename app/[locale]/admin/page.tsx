import { notFound } from "next/navigation";
import { AccessList, AccessPanel, PrivateAccessNotice } from "@/components/AccessPanels";
import { SectionHeader } from "@/components/SectionHeader";
import { isLocale } from "@/lib/i18n";

export default async function AdminPage({
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
      <PrivateAccessNotice
        title="Acces reserve Golden Circle"
        text="L'administration sera disponible uniquement apres authentification Golden Circle."
      />
      <section className="mt-8">
        <SectionHeader
          eyebrow="Golden Circle OS"
          title="Validation de l'ecosysteme."
          text="Cette section restera non publique et dediee au controle interne."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <AccessPanel title="Operations a gerer" muted>
            <AccessList
              items={[
                "Valider les offres partenaires",
                "Valider les partenaires",
                "Gerer les evenements",
                "Gerer les statuts membres",
                "Gerer les quotas",
                "Gerer la Mini Map"
              ]}
            />
          </AccessPanel>
          <AccessPanel title="Diffusion controlee" muted>
            <AccessList
              items={[
                "Golden Hour",
                "Notifications",
                "Demandes partenaires",
                "Validations",
                "Audit logs",
                "Suspensions"
              ]}
            />
          </AccessPanel>
        </div>
      </section>
    </main>
  );
}
