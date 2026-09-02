import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Réalisations",
  description: `Galerie des chantiers réalisés par ${siteConfig.name} — bientôt disponible.`,
};

export default function RealisationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Réalisations"
        title="Nos chantiers, bientôt en photos"
        description="Cette galerie présentera prochainement nos réalisations avant/après, filtrables par type de prestation."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-900/20 bg-emerald-50 text-emerald-800/60"
          >
            <span aria-hidden className="text-3xl">🌱</span>
            <span className="text-sm font-medium">Photo à venir</span>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-stone-900">
          Votre projet pourrait être notre prochaine réalisation
        </h2>
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
      </div>
    </div>
  );
}
