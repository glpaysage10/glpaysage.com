import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold text-stone-900">Mentions légales</h1>

      <div className="mt-8 flex flex-col gap-8 text-stone-700">
        <section>
          <h2 className="text-xl font-semibold text-stone-900">Éditeur du site</h2>
          <ul className="mt-3 space-y-1">
            <li>Nom commercial : {siteConfig.name}</li>
            <li>Forme juridique : {siteConfig.legalStatus}</li>
            <li>SIREN : {siteConfig.legal.siren}</li>
            <li>SIRET : {siteConfig.legal.siret}</li>
            <li>N° de TVA intracommunautaire : {siteConfig.legal.vatNumber}</li>
            <li>Adresse du siège : {siteConfig.legal.headquartersAddress}</li>
            <li>Téléphone : {siteConfig.phone}</li>
            <li>Email : {siteConfig.email}</li>
            <li>Directeur de la publication : {siteConfig.legal.director}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Hébergement</h2>
          <p className="mt-3">
            Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
            91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Propriété intellectuelle</h2>
          <p className="mt-3">
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            logo) est la propriété de {siteConfig.name}, sauf mention contraire, et ne
            peut être reproduit sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Données personnelles</h2>
          <p className="mt-3">
            Les informations relatives à la collecte et au traitement de vos données
            personnelles sont détaillées dans notre page{" "}
            <a href="/confidentialite" className="font-medium text-emerald-800 underline">
              Confidentialité
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
