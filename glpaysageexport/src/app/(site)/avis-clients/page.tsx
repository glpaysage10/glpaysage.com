import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients",
  description: `Avis clients de ${siteConfig.name}.`,
};

const reviews = [
  { name: "François D.", rating: 5 },
  { name: "Pierre", rating: 5 },
  { name: "Julien L.", rating: 5 },
  { name: "Jean-Marie O.", rating: 5 },
  { name: "Léonard", rating: 5 },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${i < rating ? "fill-amber-400" : "fill-stone-200"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function AvisClientsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
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
