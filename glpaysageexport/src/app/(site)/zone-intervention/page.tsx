import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import InterventionSection from "@/components/intervention/InterventionSection";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Zone d'intervention autour de ${siteConfig.serviceArea.centerName}`,
  description: `Vous cherchez un paysagiste autour de ${siteConfig.serviceArea.centerName} ? GLPaysage étudie les demandes d'entretien de jardin dans ${siteConfig.serviceArea.label}.`,
  alternates: { canonical: "/zone-intervention" },
};

export default function ZoneInterventionPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Zone d'intervention"
        title="Une zone d’intervention autour de Nogent-sur-Seine"
        description={`${siteConfig.name} entretient les jardins et espaces verts dans ${siteConfig.serviceArea.label}, pour les particuliers et les professionnels.`}
      />

      <div className="mt-12">
        <InterventionSection />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-900">
          Nos prestations dans la zone d&apos;intervention
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`/services/${service.slug}`}
                className="inline-flex min-h-12 items-center rounded-full bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
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
