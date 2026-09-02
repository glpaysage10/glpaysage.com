import { budgetOptions, delaiOptions } from "@/lib/devis-schema";
import type { StepProps } from "./form-types";

export default function Step4Budget({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Budget & délai</h2>
        <p className="mt-1 text-sm text-stone-600">
          Une estimation suffit — cela nous permet de vous proposer une solution
          adaptée.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-stone-800">
          Fourchette de budget indicative
        </span>
        <div className="grid gap-3 sm:grid-cols-2">
          {budgetOptions.map((option) => {
            const checked = data.budget === option.value;
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
                  name="budget"
                  className="h-4 w-4 border-stone-400 text-emerald-800 focus:ring-emerald-700"
                  checked={checked}
                  onChange={() => onChange("budget", option.value)}
                />
                <span className="text-sm font-medium text-stone-800">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-stone-800">Délai souhaité</span>
        <div className="grid gap-3 sm:grid-cols-2">
          {delaiOptions.map((option) => {
            const checked = data.delai === option.value;
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
                  name="delai"
                  className="h-4 w-4 border-stone-400 text-emerald-800 focus:ring-emerald-700"
                  checked={checked}
                  onChange={() => onChange("delai", option.value)}
                />
                <span className="text-sm font-medium text-stone-800">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
