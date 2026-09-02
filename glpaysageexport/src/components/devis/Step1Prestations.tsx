import { prestationOptions } from "@/lib/devis-schema";
import FieldError from "./FieldError";
import { inputClass, labelClass, type StepProps } from "./form-types";

export default function Step1Prestations({ data, errors, onChange }: StepProps) {
  function toggle(value: string) {
    const next = data.prestations.includes(value)
      ? data.prestations.filter((v) => v !== value)
      : [...data.prestations, value];
    onChange("prestations", next);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Quel type de travaux souhaitez-vous ?
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Plusieurs choix possibles.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {prestationOptions.map((option) => {
          const checked = data.prestations.includes(option.value);
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
                type="checkbox"
                className="h-4 w-4 rounded border-stone-400 text-emerald-800 focus:ring-emerald-700"
                checked={checked}
                onChange={() => toggle(option.value)}
              />
              <span className="text-sm font-medium text-stone-800">{option.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError message={errors.prestations} />

      <div className="flex flex-col gap-2">
        <label htmlFor="prestation-autre" className={labelClass}>
          Autre (facultatif)
        </label>
        <input
          id="prestation-autre"
          type="text"
          className={inputClass}
          placeholder="Précisez votre besoin"
          value={data.prestationAutre}
          onChange={(e) => onChange("prestationAutre", e.target.value)}
        />
      </div>
    </div>
  );
}
