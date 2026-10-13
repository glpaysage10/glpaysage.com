import CtaButton from "@/components/CtaButton";
import { interventionAreas } from "@/lib/intervention-areas";
import { siteConfig } from "@/lib/site-config";

/**
 * Liste des départements en HTML simple, toujours présente dans la page
 * (indépendamment du chargement ou non de la carte) : c'est la source
 * d'information accessible et indexable par les moteurs de recherche.
 */
export default function DepartmentList() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Départements concernés
        </h3>
        <ul className="mt-4 flex flex-col gap-3">
          {interventionAreas.map((area) => (
            <li
              key={area.code}
              className="rounded-xl border border-emerald-900/10 bg-white p-4"
            >
              <p className="font-semibold text-stone-900">
                {area.name} <span className="font-normal text-stone-500">({area.code})</span>
              </p>
              <p className="mt-1 text-sm text-stone-600">{area.message}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          Ces départements ne sont pas intégralement couverts par défaut : la
          disponibilité dépend de la localisation précise et de la nature de votre
          projet. Contactez-nous pour confirmer notre intervention dans votre commune.
        </p>
      </div>

      <div className="flex flex-col items-start gap-3">
        <CtaButton href="/devis">Demander un devis gratuit</CtaButton>
        <a
          href={`tel:${siteConfig.phoneHref}`}
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          Nous appeler : {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
