import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services, siteConfig } from "@/lib/site-config";

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
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-cream">
        <div aria-hidden className="leaf-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-800/10 px-4 py-1.5 text-sm font-semibold text-emerald-800">
              Paysagiste — {siteConfig.zones.join(" · ")}
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
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

          <div className="relative isolate">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-emerald-400/40 blur-3xl"
            />
            <div
              aria-hidden
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-4 shadow-xl"
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white p-6">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  width={400}
                  height={346}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="leaf-pattern relative bg-cream py-16 sm:py-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-stone-900">{point.title}</h3>
                <p className="text-sm text-stone-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div aria-hidden className="leaf-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
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

      <section className="leaf-pattern relative bg-white py-16 sm:py-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-emerald-950 px-6 py-14 text-center text-white sm:px-16">
            <div aria-hidden className="leaf-pattern-dark pointer-events-none absolute inset-0" />
            <h2 className="relative text-3xl font-semibold sm:text-4xl">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="relative max-w-xl text-emerald-100/80">
              Remplissez notre formulaire en quelques étapes : type de travaux, photos,
              budget. Nous vous recontactons avec un devis adapté.
            </p>
            <CtaButton href="/devis" className="relative mt-2">
              Demander un devis gratuit
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
