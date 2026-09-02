import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { prestationOptions } from "@/lib/devis-schema";
import { devisStatusOptions } from "@/lib/devis-status";
import { listDevisRequests } from "@/lib/devis-requests";

export default async function AdminDashboardPage({
  searchParams,
}: PageProps<"/admin">) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "";
  const prestation = typeof params.prestation === "string" ? params.prestation : "";

  const requests = await listDevisRequests({ status: status || undefined, prestation: prestation || undefined });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-stone-900">Demandes de devis</h1>
        <a
          href={`/api/admin/export${status || prestation ? `?${new URLSearchParams({ ...(status && { status }), ...(prestation && { prestation }) }).toString()}` : ""}`}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
        >
          Exporter en CSV
        </a>
      </div>

      <form method="get" className="flex flex-wrap gap-3">
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Tous les statuts</option>
          {devisStatusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          name="prestation"
          defaultValue={prestation}
          className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Toutes les prestations</option>
          {prestationOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-900"
        >
          Filtrer
        </button>
        {(status || prestation) && (
          <Link
            href="/admin"
            className="inline-flex items-center px-2 text-sm font-medium text-stone-500 hover:text-stone-800"
          >
            Réinitialiser
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Prestations</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {requests.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-stone-500">
                  Aucune demande pour l&apos;instant.
                </td>
              </tr>
            )}
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 text-stone-600">
                  {new Date(r.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/${r.id}`} className="font-semibold text-emerald-800 hover:underline">
                    {r.nom}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-600">{r.prestations.length} prestation(s)</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
