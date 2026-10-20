// Configuration centrale du site — à mettre à jour au fil du projet.
// TODO: remplacer les valeurs marquées "à définir" dès qu'elles sont connues.

export const siteConfig = {
  name: "GLPaysage",
  tagline: "Paysagiste à Nogent-sur-Seine et alentours",
  description:
    "GLPaysage, paysagiste à Nogent-sur-Seine et alentours : entretien de jardins, tonte, taille de haies, élagage de petits arbres et débroussaillage dans un rayon de 50 km. Devis gratuit.",
  url: "https://www.glpaysage.com",
  phone: "06 47 15 70 52",
  phoneHref: "+33647157052",
  // TODO: remplacer par une adresse @glpaysage.com une fois la messagerie du domaine configurée
  email: "glpaysage10@gmail.com",
  legalStatus: "Entrepreneur individuel",
  serviceArea: {
    centerName: "Nogent-sur-Seine",
    postalCode: "10400",
    radiusKm: 50,
    radiusMeters: 50_000,
    center: [48.49222, 3.50139] as [number, number],
    label: "un rayon de 50 km autour de Nogent-sur-Seine",
  },
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
    slug: "entretien-de-jardin",
    title: "Entretien régulier",
    short: "Un jardin bien tenu toute l'année, sans y penser.",
    description:
      "Passages réguliers ou ponctuels pour garder votre jardin impeccable : désherbage, taille des massifs, nettoyage des espaces verts, entretien des allées.",
    intro:
      "Garder un jardin propre et soigné demande du temps et de la régularité. Nos passages d'entretien vous permettent de profiter de votre extérieur sans avoir à vous en occuper.",
    includes: [
      "Désherbage des massifs et allées",
      "Taille des massifs et arbustes",
      "Nettoyage des espaces verts",
      "Entretien des allées",
      "Évacuation des déchets verts",
    ],
    method:
      "Selon vos besoins, l'entretien peut être ponctuel ou organisé sur un contrat à l'année, avec des passages réguliers adaptés à la saison et à l'évolution de votre jardin.",
    faqExtra: {
      question: "Puis-je demander un entretien ponctuel, sans contrat à l'année ?",
      answer:
        "Oui, l'entretien peut être ponctuel (une intervention isolée) ou régulier sur l'année, selon ce qui vous convient.",
    },
  },
  {
    slug: "tonte",
    title: "Tonte de pelouse",
    short: "Tonte régulière ou ponctuelle, avec ou sans ramassage.",
    description:
      "Intervention ponctuelle ou sur contrat à l'année pour une pelouse impeccable, adaptée à la surface et à la configuration de votre terrain.",
    intro:
      "Une pelouse bien entretenue change l'allure d'un jardin. Nous assurons la tonte de pelouses de toutes surfaces, avec ou sans ramassage selon votre préférence.",
    includes: [
      "Tonte adaptée à la surface et à la configuration du terrain",
      "Ramassage ou mulching selon votre choix",
      "Finitions le long des bordures et des obstacles",
      "Intervention ponctuelle ou sur contrat à l'année",
    ],
    method:
      "La fréquence de tonte est adaptée à la saison et à la pousse de votre pelouse, pour un résultat net sans sur-intervenir.",
    faqExtra: {
      question: "Tondez-vous les grandes surfaces (plusieurs milliers de m²) ?",
      answer:
        "La faisabilité dépend de la surface et de l'accès au terrain ; précisez-la dans votre demande de devis pour que nous puissions vous répondre précisément.",
    },
  },
  {
    slug: "taille-elagage",
    title: "Taille & élagage de petits arbres",
    short: "Taille de haies, d'arbustes et élagage de petits arbres en toute sécurité.",
    description:
      "Taille de formation ou d'entretien pour haies et arbustes, élagage de petits arbres pour la sécurité et l'esthétique, évacuation des déchets verts.",
    intro:
      "Une haie ou un arbuste mal entretenu perd vite sa forme et sa vigueur. Nous intervenons pour la taille des haies et arbustes, ainsi que l'élagage de petits arbres.",
    includes: [
      "Taille de formation des haies et arbustes",
      "Taille d'entretien régulière",
      "Élagage de petits arbres",
      "Évacuation des déchets verts",
    ],
    method:
      "La taille est adaptée à l'espèce et à la période de l'année, pour préserver la bonne santé de vos végétaux tout en obtenant le résultat esthétique souhaité.",
    faqExtra: {
      question: "Élaguez-vous les grands arbres ?",
      answer:
        "Nous intervenons sur les petits arbres. Pour un grand arbre, indiquez-le dans votre demande : nous vous dirons si c'est faisable.",
    },
  },
  {
    slug: "debroussaillage",
    title: "Débroussaillage",
    short: "Remise en état de terrains envahis ou difficiles d'accès.",
    description:
      "Débroussaillage de terrains, friches ou parcelles peu entretenues, pour remettre un espace en état ou répondre à une obligation légale de débroussaillement.",
    intro:
      "Terrain en friche, parcelle envahie ou difficile d'accès : le débroussaillage permet de remettre un espace en état et, si nécessaire, de répondre à une obligation légale.",
    includes: [
      "Débroussaillage de terrains, friches ou parcelles peu entretenues",
      "Remise en état d'un terrain envahi",
      "Intervention dans le cadre d'une obligation légale de débroussaillement",
    ],
    method:
      "L'intervention est adaptée à l'état du terrain et à l'objectif final : remise en état ponctuelle ou entretien régulier.",
    faqExtra: {
      question: "Le débroussaillage est-il obligatoire sur mon terrain ?",
      answer:
        "Cela dépend de la localisation de votre parcelle et de la réglementation locale. En cas de doute, renseignez-vous auprès de votre mairie.",
    },
  },
] as const;

export const servicesFaqCommon = [
  {
    question: "Le devis est-il gratuit ?",
    answer: "Oui, chaque demande de devis est étudiée gratuitement et sans engagement.",
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer: `${siteConfig.name} intervient dans ${siteConfig.serviceArea.label}.`,
  },
] as const;
