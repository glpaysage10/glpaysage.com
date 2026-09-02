import { NextResponse } from "next/server";
import { devisSchema } from "@/lib/devis-schema";
import { insertDevisRequest } from "@/lib/devis-requests";
import { sendBusinessNotificationEmail, sendClientConfirmationEmail } from "@/lib/send-devis-emails";
import { siteConfig } from "@/lib/site-config";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const parsed = devisSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Certaines informations sont invalides ou manquantes." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot anti-spam : champ invisible, ne doit jamais être rempli par un humain.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // Enregistrement en base (Couche 3). Ne bloque jamais l'envoi des emails :
  // si Supabase n'est pas configuré ou que l'insertion échoue, on retombe
  // sur le comportement de la Couche 2 (photos jointes directement à l'email).
  const saved = await insertDevisRequest(data);
  const adminLink = saved ? `${siteConfig.url}/admin/${saved.id}` : undefined;

  try {
    await Promise.all([
      sendClientConfirmationEmail(data),
      sendBusinessNotificationEmail(data, { adminLink }),
    ]);
  } catch (error) {
    console.error("Échec de l'envoi des emails de devis :", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Votre demande n'a pas pu être envoyée automatiquement. Merci de nous contacter directement.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
