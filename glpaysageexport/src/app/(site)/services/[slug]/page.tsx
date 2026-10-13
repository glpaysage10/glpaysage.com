import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaButton from "@/components/CtaButton";
import { services, servicesFaqCommon, siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} | ${siteConfig.name}`;
  const description = `${service.short} ${siteConfig.name} intervient en ${siteConfig.zones.join(", ")}.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/services/${service.slug}`,
      siteName: siteConfig.name,
      locale: "fr_FR",
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const faqItems = [service.faqExtra, ...servicesFaqCommon];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
    areaServed: siteConfig.zones.map((zone) => ({
      "@type": "AdministrativeArea",
      name: zone,
    })),
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-stone-500">
        <Link href="/" className="hover:text-emerald-800 hover:underline">
          Accueil
        </Link>
        {" / "}
        <Link href="/services" className="hover:text-emerald-800 hover:underline">
          Services
        </Link>
        {" / "}
        <span className="text-stone-700">{service.title}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold text-stone-900 sm:text-4xl">
        {service.title}
      </h1>
      <p className="mt-4 text-lg text-stone-600">{service.intro}</p>

      <div className="mt-6">
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-900">Ce qui est inclus</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-stone-700">
              <span aria-hidden className="mt-1 text-emerald-700">
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-stone-900">Notre méthode de travail</h2>
        <p className="mt-3 text-stone-700">{service.method}</p>
      </section>

      <section className="mt-10 rounded-2xl border border-emerald-900/10 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Zone d&apos;intervention</h2>
        <p className="mt-3 text-stone-700">
          {siteConfig.name} propose ce service en {siteConfig.zones.join(", ")}.
          Retrouvez le détail sur notre page{" "}
          <Link href="/zone-intervention" className="font-medium text-emerald-800 underline">
            Zone d&apos;intervention
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-stone-900">Questions fréquentes</h2>
        <div className="mt-4 flex flex-col gap-5">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="font-semibold text-stone-900">{item.question}</h3>
              <p className="mt-1 text-stone-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-900">Autres prestations</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {otherServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium text-emerald-800 ring-1 ring-inset ring-emerald-800/20 hover:bg-emerald-50"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-stone-900">
          Un projet de {service.title.toLowerCase()} ?
        </h2>
        <p className="max-w-xl text-stone-600">
          Décrivez-nous votre besoin dans le formulaire de devis, nous étudions chaque
          demande individuellement.
        </p>
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
      </div>
    </div>
  );
}
