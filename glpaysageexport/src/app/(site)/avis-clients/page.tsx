import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import { reviews, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients",
  description: `Avis clients de ${siteConfig.name}.`,
  alternates: { canonical: "/avis-clients" },
};

export default function AvisClientsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        as="h1"
        align="center"
        eyebrow="Avis clients"
        title="Ce que disent nos clients"
        description="Des retours de clients accompagnés sur leurs projets de jardin."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="flex items-center justify-between rounded-2xl border border-emerald-900/10 bg-white p-5"
          >
            <span className="font-medium text-stone-900">{review.name}</span>
            <Stars rating={review.rating} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-12 text-center">
        <h2 className="text-xl font-semibold text-stone-900">
          Vous êtes client de {siteConfig.name} ?
        </h2>
        <p className="max-w-md text-stone-600">
          N&apos;hésitez pas à nous contacter pour partager votre expérience — elle
          pourra être publiée ici avec votre accord.
        </p>
        <CtaButton href="/contact" variant="secondary">
          Nous contacter
        </CtaButton>
      </div>
    </div>
  );
}
