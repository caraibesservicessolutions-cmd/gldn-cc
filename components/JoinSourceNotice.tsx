"use client";

import { useSearchParams } from "next/navigation";

const qrSources = ["tshirt", "instagram", "flyer", "event", "partner", "meta_ads"];

export function JoinSourceNotice({
  title,
  text
}: {
  title: string;
  text: string;
}) {
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get("src");
  const source = qrSources.includes(sourceParam ?? "") ? sourceParam : null;

  if (!source) return null;

  return (
    <section className="mt-8 rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm text-mist">
      <p className="font-bold uppercase tracking-wide text-champagne">
        {title}: {source}
      </p>
      <p className="mt-2 leading-6">{text}</p>
    </section>
  );
}
