import {
  budgetOptions,
  delaiOptions,
  prestationOptions,
  terrainStateOptions,
  type DevisFormData,
} from "@/lib/devis-schema";
import { siteConfig } from "@/lib/site-config";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

function labelFor(
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function recapRows(data: DevisFormData): { label: string; value: string }[] {
  const prestations = data.prestations
    .map((p) => labelFor(prestationOptions, p))
    .concat(data.prestationAutre ? [`Autre : ${data.prestationAutre}`] : [])
    .join(", ");

  return [
    { label: "Prestations souhaitées", value: prestations || "Non précisé" },
    { label: "Surface approximative", value: data.surface ? `${data.surface} m²` : "Non précisée" },
    { label: "Adresse du chantier", value: data.adresse },
    { label: "État du terrain", value: labelFor(terrainStateOptions, data.etatTerrain) },
    { label: "Description", value: data.description || "—" },
    { label: "Budget indicatif", value: labelFor(budgetOptions, data.budget) },
    { label: "Délai souhaité", value: labelFor(delaiOptions, data.delai) },
    { label: "Nom", value: data.nom },
    { label: "Téléphone", value: data.telephone },
    { label: "Email", value: data.email },
    { label: "Disponibilités", value: data.disponibilites || "Non précisées" },
  ];
}

function recapTableHtml(data: DevisFormData): string {
  const rows = recapRows(data)
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#44403c;font-weight:700;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:8px 0;color:#065f46;font-size:14px;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-family:sans-serif;">${rows}</table>`;
}

async function sendBrevoEmail(payload: Record<string, unknown>) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY n'est pas configurée sur le serveur.");
  }

  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Échec de l'envoi de l'email (Brevo ${res.status}): ${body}`);
  }
}

function senderInfo() {
  const email = process.env.BREVO_SENDER_EMAIL;
  if (!email) {
    throw new Error("BREVO_SENDER_EMAIL n'est pas configurée sur le serveur.");
  }
  return {
    name: process.env.BREVO_SENDER_NAME || siteConfig.name,
    email,
  };
}

export async function sendClientConfirmationEmail(data: DevisFormData) {
  const sender = senderInfo();
  const prenom = data.nom.split(" ")[0] || data.nom;

  await sendBrevoEmail({
    sender,
    to: [{ email: data.email, name: data.nom }],
    subject: `Votre demande de devis — ${siteConfig.name}`,
    htmlContent: `
      <div style="background:#f5f5f4;padding:32px 16px;font-family:sans-serif;">
        <div style="max-width:560px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:24px;">
            <img src="${siteConfig.url}/logo.png" alt="${escapeHtml(siteConfig.name)}" width="160" style="width:160px;height:auto;" />
          </div>

          <div style="background:#ecfdf5;border-radius:24px;padding:32px;color:#1c1917;">
            <p style="margin:0 0 16px;">Bonjour ${escapeHtml(prenom)},</p>
            <p style="margin:0 0 16px;line-height:1.6;">
              Merci pour votre demande ! Nous l'avons bien reçue et nous allons
              l'étudier avec attention pour vous proposer un devis adapté à votre
              projet.
            </p>
            <p style="margin:0 0 16px;line-height:1.6;">
              Nous revenons vers vous <strong>sous peu</strong>, au ${escapeHtml(data.telephone)}
              ou par email, pour affiner les détails si besoin et vous transmettre
              votre devis.
            </p>
            <p style="margin:0;line-height:1.6;">
              Une question en attendant ? Vous pouvez nous joindre directement au
              <strong style="color:#065f46;">${escapeHtml(siteConfig.phone)}</strong>.
            </p>
          </div>

          <p style="margin:32px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#78716c;">
            Récapitulatif de votre demande
          </p>
          ${recapTableHtml(data)}

          <p style="margin:32px 0 0;text-align:center;font-size:13px;color:#a8a29e;">
            À très bientôt,<br />
            <strong style="color:#57534e;">${escapeHtml(siteConfig.name)}</strong>
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendBusinessNotificationEmail(
  data: DevisFormData,
  options: { adminLink?: string } = {},
) {
  const sender = senderInfo();
  const notificationEmail = process.env.DEVIS_NOTIFICATION_EMAIL || siteConfig.email;

  // Si la demande a été enregistrée (Couche 3 / Supabase configuré), les
  // photos sont déjà stockées et consultables depuis l'espace admin : on
  // évite de les joindre en base64 et on renvoie simplement vers la fiche.
  // Sinon (pas encore de backend), on les joint directement à l'email.
  const useAdminLink = Boolean(options.adminLink);

  await sendBrevoEmail({
    sender,
    to: [{ email: notificationEmail }],
    replyTo: { email: data.email, name: data.nom },
    subject: `Nouvelle demande de devis — ${data.nom}`,
    htmlContent: `
      <div style="background:#f5f5f4;padding:32px 16px;font-family:sans-serif;">
        <div style="max-width:560px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:24px;">
            <img src="${siteConfig.url}/logo.png" alt="${escapeHtml(siteConfig.name)}" width="160" style="width:160px;height:auto;" />
          </div>

          <div style="background:#ecfdf5;border-radius:24px;padding:32px;color:#1c1917;">
            <p style="margin:0 0 16px;">Nouvelle demande de devis reçue via le site, de la part de
              <strong>${escapeHtml(data.nom)}</strong>.
            </p>
            <p style="margin:0;line-height:1.6;">
              Vous pouvez la joindre directement au
              <strong style="color:#065f46;">${escapeHtml(data.telephone)}</strong>
              ou en répondant à cet email.
            </p>
          </div>

          <p style="margin:32px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#78716c;">
            Récapitulatif de la demande
          </p>
          ${recapTableHtml(data)}

          ${
            useAdminLink
              ? `<div style="text-align:center;margin-top:24px;"><a href="${options.adminLink}" style="display:inline-block;background:#065f46;color:#fff;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:600;">Voir la demande complète${data.photos.length > 0 ? ` (${data.photos.length} photo(s))` : ""}</a></div>`
              : `<p style="margin-top:16px;text-align:center;color:#57534e;font-size:13px;">${data.photos.length > 0 ? `${data.photos.length} photo(s) jointe(s) à cet email.` : "Aucune photo jointe."}</p>`
          }

          <p style="margin:32px 0 0;text-align:center;font-size:13px;color:#a8a29e;">
            <strong style="color:#57534e;">${escapeHtml(siteConfig.name)}</strong>
          </p>
        </div>
      </div>
    `,
    attachment: useAdminLink
      ? undefined
      : data.photos.map((photo, index) => ({
          name: photo.name || `photo-${index + 1}.jpg`,
          content: photo.dataUrl.split(",")[1] ?? "",
        })),
  });
}
