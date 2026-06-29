import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "GOLDEN CIRCLE Caraïbes",
  title: {
    default: "GOLDEN CIRCLE Caraïbes - L'accès aux privilèges",
    template: "%s | GOLDEN CIRCLE Caraïbes"
  },
  description:
    "Golden Circle Caraïbes est une infrastructure privée d'accès aux privilèges, expériences et opportunités lifestyle en Caraïbe.",
  keywords: [
    "Golden Circle Caraïbes",
    "Golden Circle Guadeloupe",
    "Événements Guadeloupe",
    "Privilèges Caraïbes",
    "Événements Saint-Martin",
    "Caribbean private access",
    "Caribbean lifestyle experiences",
    "Mini Map Golden Circle",
    "Diaspora caribéenne",
    "Avantages partenaires Caraïbes"
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  appleWebApp: {
    capable: true,
    title: "Golden Circle",
    statusBarStyle: "black-translucent",
    startupImage: ["/icons/icon-512.png"]
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/fr",
    siteName: "GOLDEN CIRCLE Caraïbes",
    title: "GOLDEN CIRCLE Caraïbes - L'accès aux privilèges",
    description:
      "Infrastructure privée d'accès aux privilèges, expériences et opportunités lifestyle en Caraïbe.",
    images: [
      {
        url: "/og-golden-circle.png",
        width: 1200,
        height: 630,
        alt: "GOLDEN CIRCLE Caraïbes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GOLDEN CIRCLE Caraïbes",
    description:
      "L'accès privé aux privilèges, expériences et opportunités lifestyle en Caraïbe.",
    images: ["/og-golden-circle.png"]
  },
  alternates: {
    canonical: "/fr",
    languages: {
      fr: "/fr",
      en: "/en",
      es: "/es"
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#4A192E" },
    { media: "(prefers-color-scheme: light)", color: "#4A192E" }
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
