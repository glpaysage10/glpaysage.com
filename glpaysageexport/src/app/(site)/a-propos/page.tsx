import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "À propos",
  description: `Découvrez ${siteConfig.name}, entreprise d'entretien de jardins et d'espaces verts dans ${siteConfig.serviceArea.label}.`,
  alternates: { canonical: "/a-propos" },
};

const values = [
  {
    title: "Écoute du client",
    description:
      "Chaque projet commence par une compréhension précise de vos besoins et de vos contraintes de terrain.",
  },
  {
    title: "Travail soigné",
    description:
      "Un chantier propre, des finitions durables et un résultat pensé pour tenir dans le temps.",
  },
  {
    title: "Proximité",
    description:
      `Une zone d'intervention définie dans ${siteConfig.serviceArea.label}.`,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        as="h1"
        eyebrow="À propos"
        title={`${siteConfig.name}, votre spécialiste de l'entretien de jardin`}
        description={`${siteConfig.name} (${siteConfig.legalStatus}), dirigé par ${siteConfig.legal.director}, accompagne particuliers et professionnels dans l'entretien de leurs jardins et espaces verts, dans ${siteConfig.serviceArea.label}.`}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-2xl border border-emerald-900/10 bg-white p-6">
            <h3 className="text-lg font-semibold text-stone-900">{value.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-stone-900">Zone d&apos;intervention</h2>
        <p className="mt-3 text-stone-600">
          {siteConfig.name} intervient dans :
        </p>
        <p className="mt-3 rounded-full bg-emerald-800/10 px-4 py-1.5 text-sm font-medium text-emerald-800">
          {siteConfig.serviceArea.label}
        </p>
        <Link
          href="/zone-intervention"
          className="mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-emerald-800 underline hover:text-emerald-900"
        >
          Voir le détail de la zone d&apos;intervention
        </Link>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-stone-900">Discutons de votre projet</h2>
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
      </div>
    </div>
  );
}
