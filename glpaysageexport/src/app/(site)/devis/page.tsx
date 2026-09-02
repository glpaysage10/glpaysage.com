import type { Metadata } from "next";
import QuoteForm from "@/components/devis/QuoteForm";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: `Demandez un devis gratuit à ${siteConfig.name} pour votre projet de paysagisme.`,
};

export default function DevisPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Devis"
        title="Demandez votre devis gratuit"
        description="Quelques étapes simples pour nous transmettre toutes les infos utiles à un chiffrage rapide et précis."
      />

      <div className="mt-10">
        <QuoteForm />
      </div>

      <p className="mt-8 text-center text-sm text-stone-500">
        Vous préférez nous appeler directement ?{" "}
        <a href={`tel:${siteConfig.phoneHref}`} className="font-semibold text-emerald-800 hover:underline">
          {siteConfig.phone}
        </a>
      </p>
    </div>
  );
}
