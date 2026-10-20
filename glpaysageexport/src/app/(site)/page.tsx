import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Paysagiste à ${siteConfig.serviceArea.centerName} et alentours`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const trustPoints = [
  {
    title: "Devis clair et rapide",
    description: "Un formulaire guidé pour un devis chiffré sans allers-retours inutiles.",
  },
  {
    title: "Intervention locale",
    description:
      "Chaque demande est étudiée selon la commune, l'accès au terrain et la nature des travaux.",
    href: "/zone-intervention",
  },
  {
    title: "Un interlocuteur unique",
    description: "Du premier contact à la fin du chantier, vous échangez toujours avec la même personne.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-gradient relative isolate overflow-hidden">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-800/10 px-4 py-1.5 text-sm font-semibold text-emerald-800">
            Zone d’intervention · 50 km autour de {siteConfig.serviceArea.centerName}
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Du premier coup de bêche au dernier détail
          </h1>
          <p className="max-w-xl text-lg text-stone-600">
            Paysagiste autour de {siteConfig.serviceArea.centerName}, {siteConfig.name}
            entretient jardins et espaces verts : tonte, taille, élagage de petits
            arbres et débroussaillage. Chaque demande est étudiée selon la commune et
            le projet.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
            <CtaButton href="/services" variant="secondary">
              Découvrir nos prestations
            </CtaButton>
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
                <p className="text-sm text-stone-600">
                  {point.description}
                  {point.href && (
                    <>
                      {" "}
                      <Link href={point.href} className="font-medium text-emerald-800 underline">
                        Voir la zone détaillée
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Nos prestations"
            title="Des solutions d'entretien pour chaque jardin"
            description="Entretien ponctuel ou régulier, nous adaptons nos passages à votre jardin et à vos besoins."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/services" className="inline-flex min-h-12 items-center px-3 font-semibold text-emerald-800 underline">
              Voir toutes nos prestations
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="À votre écoute"
            title="Une question avant de demander un devis ?"
            description="Appelez-nous ou écrivez-nous pour parler de votre jardin et vérifier votre projet."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex min-h-12 items-center px-3 font-semibold text-emerald-800 underline">
              Appeler le {siteConfig.phone}
            </a>
            <Link href="/contact" className="inline-flex min-h-12 items-center px-3 font-semibold text-emerald-800 underline">
              Nous contacter
            </Link>
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
