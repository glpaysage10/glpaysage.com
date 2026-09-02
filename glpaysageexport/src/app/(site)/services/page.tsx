import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nos services",
  description: `Toutes les prestations de paysagisme proposées par ${siteConfig.name} en ${siteConfig.zones.join(", ")}.`,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Nos services"
        title="Une prestation pour chaque besoin de votre extérieur"
        description="Que vous partiez d'un terrain nu ou souhaitiez simplement garder un jardin impeccable, nous adaptons notre intervention à votre projet."
      />

      <div className="mt-12 flex flex-col divide-y divide-emerald-900/10">
        {services.map((service) => (
          <article key={service.slug} id={service.slug} className="scroll-mt-24 py-8 first:pt-0">
            <div className="grid gap-4 sm:grid-cols-[1fr_2fr] sm:gap-10">
              <h2 className="text-2xl font-semibold text-stone-900">{service.title}</h2>
              <div className="flex flex-col gap-4">
                <p className="text-base text-stone-600">{service.description}</p>
                <CtaButton href="/devis" variant="secondary" className="w-fit">
                  Demander un devis pour ce service
                </CtaButton>
              </div>
            </div>
          </article>
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
