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
        Dernière mise à jour : 20 octobre 2026
      </p>

      <div className="mt-8 flex flex-col gap-8 text-stone-700">
        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Responsable du traitement
          </h2>
          <p className="mt-3">
            Gauthier Lauxerrois, entrepreneur individuel exerçant sous le nom
            GLPaysage, est responsable des données transmises par ce site. Vous
            pouvez le joindre à l’adresse{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-emerald-800 underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
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
          <p className="mt-3">
            Ces données servent à répondre à votre demande, vérifier la faisabilité
            de l’intervention, préparer un devis et assurer son suivi. Elles sont
            nécessaires aux échanges précontractuels que vous demandez.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Utilisation des données
          </h2>
          <p className="mt-3">
            Les données sont accessibles à GLPaysage et aux prestataires techniques
            qui hébergent le site, les demandes et les emails (notamment Supabase et
            Brevo lorsque ces services sont utilisés). Elles ne sont pas vendues ni
            utilisées pour de la prospection commerciale sans rapport avec votre
            demande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Conservation des données
          </h2>
          <p className="mt-3">
            Pour une demande n’aboutissant pas à un contrat, les informations de
            contact sont conservées jusqu’à trois ans après le dernier échange,
            puis supprimées. Les photos transmises pour un devis sont supprimées au
            plus tard six mois après la clôture du devis. Si un contrat est conclu,
            les documents nécessaires à la gestion du client et aux obligations
            comptables sont conservés séparément pendant les durées applicables.
          </p>
          <p className="mt-3">
            Les emails contenant le récapitulatif d’une demande doivent également
            être supprimés lorsqu’ils ne sont plus utiles au suivi ou à la preuve
            des échanges.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Vos droits</h2>
          <p className="mt-3">
            Vous pouvez demander l’accès à vos données, leur rectification ou leur
            effacement, ainsi que vous opposer à certains traitements ou en demander
            la limitation, dans les conditions prévues par le RGPD. Pour exercer
            vos droits, contactez-nous à{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-emerald-800 underline">
              {siteConfig.email}
            </a>
            . Vous pouvez également adresser une réclamation à la CNIL.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-stone-900">
            Cookies et traceurs
          </h2>
          <p className="mt-3">
            Le site n’utilise pas de traceurs publicitaires. Des services
            optionnels, comme l’autocomplétion d’adresse, peuvent être chargés si
            leur configuration est activée.
          </p>
        </section>
      </div>
    </div>
  );
}
