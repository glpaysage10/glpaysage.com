import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import { siteConfig } from "@/lib/site-config";
import InterventionMapLoader from "./InterventionMapLoader";

export default function InterventionSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Notre zone d'intervention"
        title="Visualisez le rayon d'intervention"
        description={`${siteConfig.name} intervient dans ${siteConfig.serviceArea.label}.`}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <InterventionMapLoader />
        <div className="flex flex-col items-start justify-center gap-5 rounded-2xl bg-emerald-50 p-6 sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Une zone simple à vérifier</h3>
            <p className="mt-2 text-stone-700">
              Nous intervenons dans {siteConfig.serviceArea.label}.
              Indiquez l&apos;adresse du chantier dans votre demande pour que nous puissions
              étudier votre besoin.
            </p>
          </div>
          <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="text-sm font-semibold text-emerald-800 underline"
          >
            Appeler le {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
