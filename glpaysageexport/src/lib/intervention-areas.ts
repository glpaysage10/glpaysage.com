// Données de la zone d'intervention, utilisées par la carte interactive et
// la liste accessible de la section "Zone d'intervention".
//
// Statut volontairement prudent : tant que GLPaysage n'a pas confirmé
// desservir l'intégralité d'un département, son statut reste "a-confirmer".
// Ne jamais passer un département à "confirme" sans information fiable de
// l'entreprise sur sa couverture réelle.

export type InterventionStatus = "a-confirmer" | "confirme";

export type InterventionArea = {
  /** Code officiel géographique (INSEE) du département. */
  code: string;
  name: string;
  status: InterventionStatus;
  /** Message affiché au visiteur (carte et liste), sans promesse de couverture totale. */
  message: string;
};

export const interventionAreas: InterventionArea[] = [
  {
    code: "10",
    name: "Aube",
    status: "a-confirmer",
    message:
      "Disponibilité à confirmer selon la localisation précise de votre projet. Contactez-nous pour vérifier notre intervention dans votre commune.",
  },
  {
    code: "89",
    name: "Yonne",
    status: "a-confirmer",
    message:
      "Disponibilité à confirmer selon la localisation précise de votre projet. Contactez-nous pour vérifier notre intervention dans votre commune.",
  },
  {
    code: "77",
    name: "Seine-et-Marne",
    status: "a-confirmer",
    message:
      "Disponibilité à confirmer selon la localisation précise de votre projet. Contactez-nous pour vérifier notre intervention dans votre commune.",
  },
  {
    code: "51",
    name: "Marne",
    status: "a-confirmer",
    message:
      "Disponibilité à confirmer selon la localisation précise de votre projet. Contactez-nous pour vérifier notre intervention dans votre commune.",
  },
];

export function getInterventionArea(code: string): InterventionArea | undefined {
  return interventionAreas.find((area) => area.code === code);
}
