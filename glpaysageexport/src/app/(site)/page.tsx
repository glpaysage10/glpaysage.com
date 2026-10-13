import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Stars from "@/components/Stars";
import { reviews, services, siteConfig, zoneNames } from "@/lib/site-config";

export const metadata: Metadata = {
  description: `${siteConfig.name}, entretien de jardins et espaces verts en ${zoneNames} : tonte, taille, élagage, débroussaillage. Devis gratuit.`,
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
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-80 rounded-full bg-emerald-800/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 -z-10 h-80 w-72 rounded-full bg-emerald-700/10 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-800/10 px-4 py-1.5 text-sm font-semibold text-emerald-800">
            Entretien de jardins — {siteConfig.zones.join(" · ")}
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Un jardin impeccable, entretenu avec soin toute l&apos;année
          </h1>
          <p className="max-w-xl text-lg text-stone-600">
            {siteConfig.name} entretient vos jardins et espaces verts tout au long de
            l&apos;année. Décrivez votre besoin en quelques étapes, nous revenons vers
            vous avec un devis adapté.
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
            <Link href="/services" className="font-semibold text-emerald-800 underline">
              Voir toutes nos prestations
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Avis clients"
            title="Ce que disent nos clients"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="flex items-center justify-between gap-2 rounded-2xl border border-emerald-900/10 bg-white p-5"
              >
                <span className="font-medium text-stone-900">{review.name}</span>
                <Stars rating={review.rating} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/avis-clients" className="font-semibold text-emerald-800 underline">
              Voir tous les avis clients
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
