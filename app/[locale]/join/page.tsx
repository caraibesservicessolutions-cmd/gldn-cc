import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function JoinAliasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr";

  redirect(`/${locale}/gc-list`);
}
