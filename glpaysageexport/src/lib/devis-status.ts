export const devisStatusOptions = [
  { value: "nouveau", label: "Nouveau" },
  { value: "contacte", label: "Contacté" },
  { value: "devis_envoye", label: "Devis envoyé" },
  { value: "accepte", label: "Accepté" },
  { value: "refuse", label: "Refusé" },
] as const;

export type DevisStatus = (typeof devisStatusOptions)[number]["value"];

export function devisStatusLabel(status: string): string {
  return devisStatusOptions.find((o) => o.value === status)?.label ?? status;
}

export const devisStatusStyles: Record<DevisStatus, string> = {
  nouveau: "bg-emerald-100 text-emerald-800",
  contacte: "bg-sky-100 text-sky-800",
  devis_envoye: "bg-amber-100 text-amber-800",
  accepte: "bg-emerald-800 text-white",
  refuse: "bg-stone-200 text-stone-600",
};
