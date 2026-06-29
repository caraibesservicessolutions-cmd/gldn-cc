import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function SpacesAliasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr";

  redirect(`/${locale}/connexion`);
}
