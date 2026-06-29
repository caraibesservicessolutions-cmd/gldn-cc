import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const pages = [
  "",
  "/gc-list",
  "/partenaires",
  "/events",
  "/deals",
  "/mini-map",
  "/connexion",
  "/espace-membre",
  "/espace-partenaire",
  "/legal",
  "/language"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: now,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.7
    }))
  );
}
