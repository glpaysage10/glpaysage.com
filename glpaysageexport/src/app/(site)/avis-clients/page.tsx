import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients",
  description: `Les avis clients de ${siteConfig.name} seront publiés sur cette page.`,
  alternates: { canonical: "/avis-clients" },
};

export default function AvisClientsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        as="h1"
        align="center"
        eyebrow="Avis clients"
        title="Avis clients"
        description="Aucun avis client n'est publié pour le moment."
      />

      <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center">
        <h2 className="text-xl font-semibold text-stone-900">Parlons de votre projet</h2>
        <p className="max-w-md text-stone-600">
          Pour toute question sur nos prestations ou notre zone d&apos;intervention, contactez-nous directement.
        </p>
        <CtaButton href="/contact" variant="secondary">
          Nous contacter
        </CtaButton>
      </div>
    </div>
  );
}
