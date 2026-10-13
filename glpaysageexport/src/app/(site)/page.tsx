import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const trustPoints = [
  {
    title: "Devis clair et rapide",
    description: "Un formulaire guidé pour un devis chiffré sans allers-retours inutiles.",
  },
  {
    title: "Intervention locale",
    description: `Basés au cœur de la zone ${siteConfig.zones.join(", ")}.`,
  },
  {
    title: "Un interlocuteur unique",
    description: "Du premier contact à la fin du chantier, vous échangez toujours avec la même personne.",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-emerald-50 to-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-800/10 px-4 py-1.5 text-sm font-semibold text-emerald-800">
              Paysagiste — {siteConfig.zones.join(" · ")}
            </span>
            <h1 className="text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl lg:text-[2.75rem]">
              Un jardin à votre image, du premier coup de bêche au dernier détail
            </h1>
            <p className="max-w-xl text-lg text-stone-600">
              {siteConfig.name} conçoit, aménage et entretient vos espaces extérieurs.
              Décrivez votre projet en quelques étapes, nous revenons vers vous avec un
              devis adapté.
            </p>
            <div className="flex flex-wrap gap-3">
              <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
              <CtaButton href="/services" variant="secondary">
                Découvrir nos prestations
              </CtaButton>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-emerald-200/40 blur-2xl"
            />
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100 ring-1 ring-emerald-900/5">
              <svg
                viewBox="0 0 200 160"
                className="h-1/2 w-1/2 text-emerald-800/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M100 150V70" />
                <path d="M100 100c-20-5-35-25-32-50 25 0 42 18 42 40" />
                <path d="M100 85c18-4 32-20 30-42-23 0-38 16-39 35" />
                <path d="M100 70c-14-2-25-15-24-33 18 0 30 13 31 28" />
                <ellipse cx="100" cy="153" rx="42" ry="5" fill="currentColor" stroke="none" opacity="0.1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Pourquoi nous choisir"
            title="Pourquoi choisir GLPaysage ?"
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex flex-col gap-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-stone-900">{point.title}</h3>
                <p className="text-sm text-stone-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Nos prestations"
            title="Des services pour chaque projet extérieur"
            description="De l'entretien courant à la création complète de jardin, nous intervenons à chaque étape."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-emerald-950 px-6 py-14 text-center text-white sm:px-16">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="max-w-xl text-emerald-100/80">
              Remplissez notre formulaire en quelques étapes : type de travaux, photos,
              budget. Nous vous recontactons avec un devis adapté.
            </p>
            <CtaButton href="/devis" className="mt-2">
              Demander un devis gratuit
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
