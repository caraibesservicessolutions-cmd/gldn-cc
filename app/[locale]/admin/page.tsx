import { notFound } from "next/navigation";
import { AdminMembersClient } from "@/components/AdminMembersClient";
import { SectionHeader } from "@/components/SectionHeader";
import { isLocale } from "@/lib/i18n";
import { memberPageText } from "@/lib/members";

export default async function AdminPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const copy = memberPageText[resolvedParams.locale];

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader
        eyebrow="Admin V2"
        title={copy.adminTitle}
        text={copy.adminText}
      />
      <AdminMembersClient locale={resolvedParams.locale} />
    </main>
  );
}
