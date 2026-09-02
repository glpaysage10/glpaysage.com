import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Confidentialité",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold text-stone-900">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm text-stone-500">
        Page en cours de finalisation — à faire relire pour conformité RGPD avant
        mise en ligne, notamment une fois le formulaire de devis et la base de
        données mis en place.
      </p>

      <div className="mt-8 flex flex-col gap-8 text-stone-700">
        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Données collectées
          </h2>
          <p className="mt-3">
            Lorsque vous utilisez notre formulaire de demande de devis, nous
            collectons les informations que vous nous transmettez : coordonnées
            (nom, téléphone, email), détails de votre projet et, le cas échéant,
            les photos que vous nous envoyez.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Utilisation des données
          </h2>
          <p className="mt-3">
            Ces informations sont utilisées uniquement pour établir et vous
            transmettre un devis, et pour assurer le suivi de votre demande. Elles
            ne sont ni vendues, ni transmises à des tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Conservation des données
          </h2>
          <p className="mt-3">
            Vos données sont conservées pendant la durée nécessaire au traitement
            de votre demande, puis archivées ou supprimées conformément à la
            réglementation en vigueur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Vos droits</h2>
          <p className="mt-3">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de
            suppression de vos données. Pour l&apos;exercer, contactez-nous à{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-emerald-800 underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
