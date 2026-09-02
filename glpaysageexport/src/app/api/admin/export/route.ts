import { NextResponse } from "next/server";
import { listDevisRequests } from "@/lib/devis-requests";
import { devisStatusLabel } from "@/lib/devis-status";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

const COLUMNS = [
  "Date",
  "Statut",
  "Nom",
  "Téléphone",
  "Email",
  "Adresse",
  "Prestations",
  "Autre prestation",
  "Surface (m²)",
  "État du terrain",
  "Budget",
  "Délai",
  "Description",
  "Disponibilités",
  "Notes",
] as const;

export async function GET(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "Supabase n'est pas configuré." }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status") || undefined;
  const prestation = url.searchParams.get("prestation") || undefined;

  const requests = await listDevisRequests({ status, prestation });

  const rows = requests.map((r) =>
    [
      new Date(r.created_at).toLocaleString("fr-FR"),
      devisStatusLabel(r.status),
      r.nom,
      r.telephone,
      r.email,
      r.adresse,
      r.prestations.join(", "),
      r.prestation_autre,
      r.surface,
      r.etat_terrain,
      r.budget,
      r.delai,
      r.description,
      r.disponibilites,
      r.notes,
    ]
      .map((cell) => csvCell(String(cell ?? "")))
      .join(","),
  );

  const csv = ["﻿" + COLUMNS.map(csvCell).join(","), ...rows].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="devis-gl-paysage-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
