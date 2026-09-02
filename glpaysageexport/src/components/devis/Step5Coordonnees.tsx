import Link from "next/link";
import FieldError from "./FieldError";
import { inputClass, labelClass, type StepProps } from "./form-types";

export default function Step5Coordonnees({ data, errors, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Vos coordonnées</h2>
        <p className="mt-1 text-sm text-stone-600">
          Pour vous recontacter avec votre devis.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nom" className={labelClass}>
          Nom
        </label>
        <input
          id="nom"
          type="text"
          className={inputClass}
          value={data.nom}
          onChange={(e) => onChange("nom", e.target.value)}
        />
        <FieldError message={errors.nom} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="telephone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="telephone"
            type="tel"
            className={inputClass}
            value={data.telephone}
            onChange={(e) => onChange("telephone", e.target.value)}
          />
          <FieldError message={errors.telephone} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <FieldError message={errors.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="disponibilites" className={labelClass}>
          Créneaux de disponibilité pour être rappelé (facultatif)
        </label>
        <input
          id="disponibilites"
          type="text"
          className={inputClass}
          placeholder="Ex : en semaine après 18h"
          value={data.disponibilites}
          onChange={(e) => onChange("disponibilites", e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-stone-300 bg-white px-4 py-3">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-stone-400 text-emerald-800 focus:ring-emerald-700"
          checked={data.rgpd === true}
          onChange={(e) => onChange("rgpd", e.target.checked as true)}
        />
        <span className="text-sm text-stone-700">
          J&apos;accepte que mes données soient utilisées par GL Paysage pour
          traiter ma demande de devis, conformément à la{" "}
          <Link href="/confidentialite" className="font-medium text-emerald-800 underline">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      <FieldError message={errors.rgpd} />

      {/* Honeypot anti-spam, invisible pour un humain */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => onChange("website", e.target.value)}
        />
      </div>
    </div>
  );
}
