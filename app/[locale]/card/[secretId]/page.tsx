import { notFound } from "next/navigation";
import { MemberCardResolver } from "@/components/MemberCardResolver";
import { SectionHeader } from "@/components/SectionHeader";
import { seedMembers, memberPageText } from "@/lib/members";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return seedMembers.flatMap((member) =>
    locales.map((locale) => ({
      locale,
      secretId: member.secretId
    }))
  );
}

export default async function SecretCardPage({
  params
}: {
  params: Promise<{ locale: string; secretId: string }>;
}) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const copy = memberPageText[resolvedParams.locale];

  return (
    <main className="section-shell py-14 md:py-20">
      <SectionHeader title={copy.cardTitle} text={copy.cardText} />
      <div className="mt-10">
        <MemberCardResolver
          locale={resolvedParams.locale}
          secretId={resolvedParams.secretId}
        />
      </div>
    </main>
  );
}
