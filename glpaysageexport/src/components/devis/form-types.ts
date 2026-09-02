import type { DevisFormData } from "@/lib/devis-schema";

export type StepProps = {
  data: DevisFormData;
  errors: Partial<Record<keyof DevisFormData, string>>;
  onChange: <K extends keyof DevisFormData>(field: K, value: DevisFormData[K]) => void;
};

export const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";

export const labelClass = "text-sm font-semibold text-stone-800";
