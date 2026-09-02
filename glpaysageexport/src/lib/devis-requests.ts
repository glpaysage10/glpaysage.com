import "server-only";
import { randomUUID } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { DevisFormData } from "@/lib/devis-schema";
import type { DevisStatus } from "@/lib/devis-status";

const TABLE = "devis_requests";
const BUCKET = "devis-photos";

export type DevisRequestRow = {
  id: string;
  created_at: string;
  status: DevisStatus;
  prestations: string[];
  prestation_autre: string;
  surface: string;
  adresse: string;
  etat_terrain: string;
  description: string;
  photo_paths: string[];
  budget: string;
  delai: string;
  nom: string;
  telephone: string;
  email: string;
  disponibilites: string;
  notes: string;
};

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-80) || "photo.jpg";
}

/**
 * Enregistre une demande de devis en base (+ upload des photos en storage).
 * Ne lance jamais d'exception : retourne `null` si Supabase n'est pas
 * configuré ou en cas d'erreur, pour ne jamais bloquer l'envoi des emails.
 */
export async function insertDevisRequest(
  data: DevisFormData,
): Promise<{ id: string; photoPaths: string[] } | null> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return null;

  try {
    const id = randomUUID();
    const photoPaths: string[] = [];

    for (const [index, photo] of data.photos.entries()) {
      const match = photo.dataUrl.match(/^data:(.+);base64,(.*)$/);
      if (!match) continue;
      const [, contentType, base64] = match;
      const path = `${id}/${index}-${sanitizeFileName(photo.name)}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, Buffer.from(base64, "base64"), { contentType, upsert: false });
      if (!error) photoPaths.push(path);
      else console.error("Erreur upload photo devis:", error);
    }

    const { error } = await supabase.from(TABLE).insert({
      id,
      status: "nouveau",
      prestations: data.prestations,
      prestation_autre: data.prestationAutre,
      surface: data.surface,
      adresse: data.adresse,
      etat_terrain: data.etatTerrain,
      description: data.description,
      photo_paths: photoPaths,
      budget: data.budget,
      delai: data.delai,
      nom: data.nom,
      telephone: data.telephone,
      email: data.email,
      disponibilites: data.disponibilites,
    });

    if (error) {
      console.error("Erreur insertion devis_requests:", error);
      return null;
    }

    return { id, photoPaths };
  } catch (error) {
    console.error("Erreur inattendue insertDevisRequest:", error);
    return null;
  }
}

export type DevisFilters = { status?: string; prestation?: string };

export async function listDevisRequests(
  filters: DevisFilters = {},
): Promise<DevisRequestRow[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return [];

  let query = supabase.from(TABLE).select("*").order("created_at", { ascending: false });
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.prestation) query = query.contains("prestations", [filters.prestation]);

  const { data, error } = await query;
  if (error) {
    console.error("Erreur liste devis_requests:", error);
    return [];
  }
  return (data ?? []) as DevisRequestRow[];
}

export async function getDevisRequestById(id: string): Promise<DevisRequestRow | null> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as DevisRequestRow;
}

export async function updateDevisRequest(
  id: string,
  patch: Partial<Pick<DevisRequestRow, "status" | "notes">>,
): Promise<boolean> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return false;

  const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
  if (error) console.error("Erreur mise à jour devis_requests:", error);
  return !error;
}

export async function getSignedPhotoUrls(
  paths: string[],
  expiresInSeconds = 60 * 60 * 24 * 7,
): Promise<{ path: string; url: string }[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase || paths.length === 0) return [];

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, expiresInSeconds);

  if (error || !data) {
    console.error("Erreur génération URLs signées:", error);
    return [];
  }

  return data
    .map((entry, index) => ({ path: paths[index], url: entry.signedUrl }))
    .filter((entry): entry is { path: string; url: string } => Boolean(entry.url));
}
