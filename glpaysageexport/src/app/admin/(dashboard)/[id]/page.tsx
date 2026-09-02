import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  budgetOptions,
  delaiOptions,
  prestationOptions,
  terrainStateOptions,
} from "@/lib/devis-schema";
import { getDevisRequestById, getSignedPhotoUrls } from "@/lib/devis-requests";
import { devisStatusOptions } from "@/lib/devis-status";
import { updateNotesAction, updateStatusAction } from "../../actions";

function labelFor(options: ReadonlyArray<{ value: string; label: string }>, value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default async function AdminRequestDetailPage({ params }: PageProps<"/admin/[id]">) {
  const { id } = await params;
  const request = await getDevisRequestById(id);
  if (!request) notFound();

  const photos = await getSignedPhotoUrls(request.photo_paths);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/admin" className="text-sm font-medium text-stone-500 hover:text-stone-800">
          ← Retour à la liste
        </Link>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-stone-900">{request.nom}</h1>
          <StatusBadge status={request.status} />
        </div>
        <p className="text-sm text-stone-500">
          Reçue le{" "}
          {new Date(request.created_at).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Demande
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Prestations">
                {request.prestations.map((p) => labelFor(prestationOptions, p)).join(", ") || "—"}
                {request.prestation_autre ? ` · ${request.prestation_autre}` : ""}
              </Field>
              <Field label="Surface">{request.surface ? `${request.surface} m²` : "—"}</Field>
              <Field label="Adresse">{request.adresse}</Field>
              <Field label="État du terrain">{labelFor(terrainStateOptions, request.etat_terrain)}</Field>
              <Field label="Budget">{labelFor(budgetOptions, request.budget)}</Field>
              <Field label="Délai">{labelFor(delaiOptions, request.delai)}</Field>
              <Field label="Description" full>
                {request.description || "—"}
              </Field>
            </dl>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Photos {photos.length > 0 && `(${photos.length})`}
            </h2>
            {photos.length === 0 ? (
              <p className="mt-3 text-sm text-stone-500">Aucune photo transmise.</p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo) => (
                  <a key={photo.path} href={photo.url} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element -- URLs signées Supabase, pas de next/image */}
                    <img
                      src={photo.url}
                      alt="Photo du chantier"
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  </a>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Coordonnées
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Téléphone">
                <a href={`tel:${request.telephone}`} className="text-emerald-800 hover:underline">
                  {request.telephone}
                </a>
              </Field>
              <Field label="Email">
                <a href={`mailto:${request.email}`} className="text-emerald-800 hover:underline">
                  {request.email}
                </a>
              </Field>
              <Field label="Disponibilités" full>
                {request.disponibilites || "Non précisées"}
              </Field>
            </dl>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Statut</h2>
            <form action={updateStatusAction} className="mt-4 flex flex-col gap-3">
              <input type="hidden" name="id" value={request.id} />
              <select
                name="status"
                defaultValue={request.status}
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
              >
                {devisStatusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                Mettre à jour
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Notes internes
            </h2>
            <form action={updateNotesAction} className="mt-4 flex flex-col gap-3">
              <input type="hidden" name="id" value={request.id} />
              <textarea
                name="notes"
                rows={6}
                defaultValue={request.notes}
                placeholder="Notes visibles uniquement dans l'espace admin..."
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-900"
              >
                Enregistrer les notes
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-stone-400">{label}</dt>
      <dd className="mt-1 text-sm text-stone-800">{children}</dd>
    </div>
  );
}
