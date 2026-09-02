import { terrainStateOptions } from "@/lib/devis-schema";
import AddressAutocomplete from "./AddressAutocomplete";
import FieldError from "./FieldError";
import { inputClass, labelClass, type StepProps } from "./form-types";

export default function Step2Chantier({ data, errors, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Parlez-nous de votre chantier
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Ces informations nous aident à estimer le déplacement et à mieux
          préparer votre devis.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="surface" className={labelClass}>
          Surface approximative (m²)
        </label>
        <input
          id="surface"
          type="text"
          inputMode="numeric"
          className={inputClass}
          placeholder="Ex : 250"
          value={data.surface}
          onChange={(e) => onChange("surface", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="adresse" className={labelClass}>
          Adresse du chantier
        </label>
        <AddressAutocomplete
          id="adresse"
          value={data.adresse}
          onChange={(value) => onChange("adresse", value)}
        />
        <FieldError message={errors.adresse} />
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>État actuel du terrain</span>
        <div className="grid gap-3 sm:grid-cols-3">
          {terrainStateOptions.map((option) => {
            const checked = data.etatTerrain === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  checked
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-stone-300 bg-white hover:border-emerald-700/50"
                }`}
              >
                <input
                  type="radio"
                  name="etatTerrain"
                  className="h-4 w-4 border-stone-400 text-emerald-800 focus:ring-emerald-700"
                  checked={checked}
                  onChange={() => onChange("etatTerrain", option.value)}
                />
                <span className="text-sm font-medium text-stone-800">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className={labelClass}>
          Décrivez votre projet (facultatif)
        </label>
        <textarea
          id="description"
          rows={4}
          className={inputClass}
          placeholder="Contexte, contraintes, envies particulières..."
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}
