import { devisStatusLabel, devisStatusStyles, type DevisStatus } from "@/lib/devis-status";

export default function StatusBadge({ status }: { status: string }) {
  const style = devisStatusStyles[status as DevisStatus] ?? "bg-stone-200 text-stone-600";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {devisStatusLabel(status)}
    </span>
  );
}
