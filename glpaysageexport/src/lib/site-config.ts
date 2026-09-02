// Configuration centrale du site — à mettre à jour au fil du projet.
// TODO: remplacer les valeurs marquées "à définir" dès qu'elles sont connues.

export const siteConfig = {
  name: "GLPaysage",
  tagline: "Création et entretien de jardins en Aube, Yonne, Seine-et-Marne et Marne",
  description:
    "GLPaysage, entreprise de paysagisme intervenant en Aube (10), Yonne (89), Seine-et-Marne (77) et Marne (51) : création de jardins, entretien, tonte, élagage de petits arbres et aménagement extérieur.",
  url: "https://www.glpaysage.com",
  phone: "06 47 15 70 52",
  phoneHref: "+33647157052",
  // TODO: remplacer par une adresse @glpaysage.com une fois la messagerie du domaine configurée
  email: "glpaysage10@gmail.com",
  legalStatus: "Entrepreneur individuel",
  zones: ["Aube (10)", "Yonne (89)", "Seine-et-Marne (77)", "Marne (51)"],
  legal: {
    director: "Gauthier Lauxerrois",
    siren: "990 003 550",
    siret: "990 003 550 00011",
    vatNumber: "FR60990003550",
    headquartersAddress: "60 rue François 1er, 75008 Paris",
  },
  socials: {
    facebook: "", // TODO
    instagram: "", // TODO
  },
} as const;

export const services = [
  {
    slug: "creation-de-jardin",
    title: "Création de jardin",
    short: "Conception et aménagement complet de votre extérieur, du terrain nu au jardin fini.",
    description:
      "De l'étude du terrain au résultat final : plantations, engazonnement, massifs, allées. Un accompagnement complet pour donner vie à votre projet de jardin, quel que soit son point de départ.",
  },
  {
    slug: "entretien-de-jardin",
    title: "Entretien régulier",
    short: "Un jardin bien tenu toute l'année, sans y penser.",
    description:
      "Passages réguliers ou ponctuels pour garder votre jardin impeccable : désherbage, taille des massifs, nettoyage des espaces verts, entretien des allées.",
  },
  {
    slug: "tonte",
    title: "Tonte de pelouse",
    short: "Tonte régulière ou ponctuelle, avec ou sans ramassage.",
    description:
      "Intervention ponctuelle ou sur contrat à l'année pour une pelouse impeccable, adaptée à la surface et à la configuration de votre terrain.",
  },
  {
    slug: "taille-elagage",
    title: "Taille & élagage de petits arbres",
    short: "Taille de haies, d'arbustes et élagage de petits arbres en toute sécurité.",
    description:
      "Taille de formation ou d'entretien pour haies et arbustes, élagage de petits arbres pour la sécurité et l'esthétique, évacuation des déchets verts.",
  },
  {
    slug: "amenagement-exterieur",
    title: "Aménagement extérieur",
    short: "Allées, cheminements et aménagements extérieurs pensés pour être vécus.",
    description:
      "Conception d'allées, cheminements et petits aménagements extérieurs pour profiter pleinement de votre jardin.",
  },
  {
    slug: "debroussaillage",
    title: "Débroussaillage",
    short: "Remise en état de terrains envahis ou difficiles d'accès.",
    description:
      "Débroussaillage de terrains, friches ou parcelles peu entretenues, pour préparer un nouveau projet ou répondre à une obligation légale de débroussaillement.",
  },
] as const;
