import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nos services",
  description: `Toutes les prestations d'entretien de jardins et d'espaces verts proposées par ${siteConfig.name} en ${siteConfig.zones.join(", ")}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Nos services"
        title="Une prestation d'entretien pour chaque jardin"
        description="Que votre jardin ait besoin d'un entretien régulier ou d'une remise en état ponctuelle, nous adaptons notre intervention à vos besoins. Cliquez sur une prestation pour en savoir plus."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-stone-900">
          Un projet qui ne rentre dans aucune case ?
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

