import { z } from "zod";

export const prestationOptions = [
  { value: "creation-de-jardin", label: "Création de jardin" },
  { value: "entretien-regulier", label: "Entretien régulier" },
  { value: "tonte", label: "Tonte" },
  { value: "taille-elagage", label: "Taille & élagage" },
  { value: "cloture-portail", label: "Clôture & portail" },
  { value: "terrasse-amenagement", label: "Terrasse & aménagement extérieur" },
  { value: "arrosage-automatique", label: "Arrosage automatique" },
  { value: "debroussaillage", label: "Débroussaillage" },
] as const;

export const terrainStateOptions = [
  { value: "terrain-nu", label: "Terrain nu" },
  { value: "jardin-a-renover", label: "Jardin existant à rénover" },
  { value: "entretien-courant", label: "Entretien courant" },
] as const;

export const budgetOptions = [
  { value: "moins-1000", label: "Moins de 1 000 €" },
  { value: "1000-3000", label: "1 000 – 3 000 €" },
  { value: "3000-6000", label: "3 000 – 6 000 €" },
  { value: "6000-10000", label: "6 000 – 10 000 €" },
  { value: "plus-10000", label: "Plus de 10 000 €" },
  { value: "ne-sait-pas", label: "Je ne sais pas encore" },
] as const;

export const delaiOptions = [
  { value: "urgent", label: "Urgent" },
  { value: "dans-le-mois", label: "Dans le mois" },
  { value: "flexible", label: "Flexible" },
  { value: "saisonnier", label: "Saisonnier" },
] as const;

export const MAX_PHOTOS = 6;
// Taille cible après compression côté client. Volontairement modeste : avec
// l'encodage base64 (+33 %) et jusqu'à 6 photos, on reste sous la limite de
// taille de requête des fonctions serverless (ex. 4,5 Mo sur Vercel Hobby).
export const MAX_PHOTO_BYTES = 350 * 1024;

export const photoSchema = z.object({
  name: z.string(),
  dataUrl: z.string().startsWith("data:image/"),
});

export const devisSchema = z.object({
  prestations: z.array(z.string()).min(1, "Sélectionnez au moins une prestation."),
  prestationAutre: z.string().max(200).optional().default(""),

  surface: z.string().max(50).optional().default(""),
  adresse: z.string().min(3, "Indiquez l'adresse du chantier.").max(300),
  etatTerrain: z.enum(
    terrainStateOptions.map((o) => o.value) as [string, ...string[]],
  ),
  description: z.string().max(2000).optional().default(""),

  photos: z.array(photoSchema).max(MAX_PHOTOS, `${MAX_PHOTOS} photos maximum.`).default([]),

  budget: z.enum(budgetOptions.map((o) => o.value) as [string, ...string[]]),
  delai: z.enum(delaiOptions.map((o) => o.value) as [string, ...string[]]),

  nom: z.string().min(2, "Indiquez votre nom.").max(150),
  telephone: z
    .string()
    .min(6, "Indiquez un numéro de téléphone valide.")
    .max(30),
  email: z.email("Indiquez une adresse email valide."),
  disponibilites: z.string().max(300).optional().default(""),
  rgpd: z.literal(true, "Vous devez accepter le traitement de vos données pour continuer."),

  // Honeypot anti-spam : normalement vide, rempli uniquement par les bots.
  // Pas de contrainte de longueur ici : on préfère répondre un faux succès
  // (voir la route API) plutôt qu'une erreur de validation qui renseignerait
  // les bots sur la détection.
  website: z.string().optional().default(""),
});

export type DevisFormData = z.infer<typeof devisSchema>;

export const emptyDevisFormData: DevisFormData = {
  prestations: [],
  prestationAutre: "",
  surface: "",
  adresse: "",
  etatTerrain: "entretien-courant",
  description: "",
  photos: [],
  budget: "ne-sait-pas",
  delai: "flexible",
  nom: "",
  telephone: "",
  email: "",
  disponibilites: "",
  rgpd: false as unknown as true,
  website: "",
};
