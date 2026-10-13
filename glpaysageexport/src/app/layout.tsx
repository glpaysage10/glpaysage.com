import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { services, siteConfig } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "fr_FR",
    type: "website",
  },
};

const sameAs = Object.values(siteConfig.socials).filter(Boolean);

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  telephone: siteConfig.phoneHref,
  email: siteConfig.email,
  url: siteConfig.url,
  image: `${siteConfig.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.legal.headquartersAddress,
    addressCountry: "FR",
  },
  areaServed: siteConfig.zones.map((zone) => ({
    "@type": "AdministrativeArea",
    name: zone,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "fr-FR",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-stone-800">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-emerald-300/50 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-emerald-500/40 blur-3xl" />
          <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
