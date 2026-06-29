import type { MetadataRoute } from "next";

const baseUrl = "https://gldn-cc.vercel.app";

const locales = ["fr", "en", "es", "pt", "ht"];

const routes = [
  "",
  "/gc-list",
  "/partenaires",
  "/events",
  "/mini-map",
  "/connexion",
  "/espace-membre",
  "/espace-partenaire",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
    }))
  );
}
