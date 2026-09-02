import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "À propos",
  description: `Découvrez ${siteConfig.name}, entreprise de paysagisme intervenant en ${siteConfig.zones.join(", ")}.`,
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
      "Une entreprise locale, disponible et réactive sur toute sa zone d'intervention.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="À propos"
        title={`${siteConfig.name}, votre paysagiste de proximité`}
        description={`${siteConfig.name} (${siteConfig.legalStatus}) accompagne particuliers et professionnels dans la création et l'entretien de leurs espaces extérieurs, en ${siteConfig.zones.join(", ")}.`}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-2xl border border-emerald-900/10 bg-white p-6">
            <h3 className="text-lg font-semibold text-stone-900">{value.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Zone d&apos;intervention</h2>
          <p className="mt-3 text-stone-600">
            {siteConfig.name} intervient dans les départements suivants :
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siteConfig.zones.map((zone) => (
              <li
                key={zone}
                className="rounded-full bg-emerald-800/10 px-4 py-1.5 text-sm font-medium text-emerald-800"
              >
                {zone}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Assurances & garanties</h2>
          <p className="mt-3 text-stone-600">
            Informations sur l&apos;assurance responsabilité civile professionnelle et,
            le cas échéant, la garantie décennale, à venir prochainement sur cette page.
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-stone-900">Discutons de votre projet</h2>
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
      </div>
    </div>
  );
}
