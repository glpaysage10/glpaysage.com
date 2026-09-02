import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase privilégié (clé service role), pour les opérations
 * serveur uniquement : réception des demandes de devis, espace admin.
 * La RLS n'a aucune policy publique — tout accès passe par ce client.
 * Retourne `null` si Supabase n'est pas encore configuré, pour permettre
 * une dégradation gracieuse (voir src/lib/devis-requests.ts).
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
