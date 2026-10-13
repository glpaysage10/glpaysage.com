import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Zone d'intervention",
  description: `Découvrez les départements où ${siteConfig.name} intervient : ${siteConfig.zones.join(", ")}.`,
  alternates: { canonical: "/zone-intervention" },
};

export default function ZoneInterventionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Zone d'intervention"
        title="Où intervient GLPaysage ?"
        description={`${siteConfig.name} intervient en ${siteConfig.zones.join(", ")}, pour des particuliers comme pour des professionnels.`}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {siteConfig.zones.map((zone) => (
          <div
            key={zone}
            className="rounded-2xl border border-emerald-900/10 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-stone-900">{zone}</h2>
            <p className="mt-2 text-sm text-stone-600">
              Création de jardin, entretien, tonte, taille, aménagement extérieur et
              débroussaillage pour les particuliers et professionnels du secteur.
            </p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-900">
          Toutes nos prestations, où que vous soyez dans la zone
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`/services/${service.slug}`}
                className="inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-900">Question fréquente</h2>
        <div className="mt-4">
          <h3 className="font-semibold text-stone-900">
            Mon adresse est-elle dans votre zone d&apos;intervention ?
          </h3>
          <p className="mt-1 text-stone-600">
            Si vous n&apos;êtes pas certain que votre commune soit couverte,
            contactez-nous directement ou indiquez simplement votre adresse dans le
            formulaire de devis : nous vous confirmons rapidement si nous pouvons
            intervenir chez vous.
          </p>
        </div>
      </section>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-stone-900">
          Votre projet est dans l&apos;une de ces zones ?
        </h2>
        <p className="max-w-xl text-stone-600">
          Décrivez-nous votre projet dans le formulaire de devis, nous étudions chaque
          demande individuellement.
        </p>
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
      </div>
    </div>
  );
}
