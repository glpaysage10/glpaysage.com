import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients",
  description: `Avis et témoignages clients de ${siteConfig.name} — bientôt disponibles.`,
};

export default function AvisClientsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Avis clients"
        title="Les avis de nos clients arrivent bientôt"
        description="Cette page rassemblera les retours de nos clients au fil des chantiers réalisés."
      />

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
