# Cahier des charges — Site vitrine + Demande de devis (Paysagisme)

## 0. Objectif du projet

Site vitrine professionnel pour une entreprise de paysagisme, avec un objectif principal : **transformer un visiteur en demande de devis qualifiée**, sans friction, en donnant confiance (réalisations, avis, expertise) et en captant assez d'info pour chiffrer rapidement.

Philosophie : le client ne doit jamais se demander "est-ce que j'ai donné assez d'infos ?" — le formulaire guide, et l'entreprise reçoit un devis pré-qualifié directement exploitable.

---

## 1. Structure du site (pages)

| Page | Rôle |
|---|---|
| **Accueil** | Accroche, services phares, réalisations en avant, CTA devis |
| **Services** | Détail par prestation (tonte, création, entretien, élagage, clôtures, arrosage, terrasses/aménagement, etc.) |
| **Réalisations** | Galerie avant/après, filtrable par type de prestation |
| **À propos** | Histoire, valeurs, zone d'intervention, certifications/assurances |
| **Avis clients** | Témoignages (texte + note) |
| **Devis** | Formulaire détaillé (cœur du site, voir section 2) |
| **Contact** | Coordonnées, carte zone d'intervention, téléphone cliquable |
| **Blog (optionnel, SEO)** | Conseils jardinage, articles locaux pour le référencement |
| **Mentions légales / CGV / Confidentialité** | Obligatoire (RGPD, micro-entreprise ou société) |

---

## 2. Formulaire de demande de devis (détaillé)

### Logique : formulaire en étapes (multi-step), pas un long formulaire d'un coup — meilleur taux de complétion.

**Étape 1 — Type de prestation**
- Sélection (cases à cocher, plusieurs possibles) : Création de jardin / Entretien régulier / Tonte / Taille & élagage / Clôture & portail / Terrasse & aménagement extérieur / Arrosage automatique / Débroussaillage / Autre (champ libre)

**Étape 2 — Détails du chantier**
- Surface approximative (m²) — slider ou champ numérique
- Adresse du chantier (autocomplétion Google Places) → utile pour estimer déplacement et vérifier zone de couverture
- État actuel du terrain (options : terrain nu / jardin existant à rénover / entretien courant)
- Description libre (textarea)

**Étape 3 — Photos**
- Upload multi-photos (3 à 6 recommandées) du terrain/jardin actuel
- Compression côté client avant upload (comme pour Zokau Fitness avec les photos morphologiques — même logique technique)

**Étape 4 — Budget & délai**
- Fourchette de budget indicative (sélection de tranches, pas un chiffre exact obligatoire — évite d'effrayer le client)
- Délai souhaité (urgent / dans le mois / flexible / saisonnier)

**Étape 5 — Coordonnées**
- Nom, téléphone, email
- Créneaux de disponibilité pour être rappelé (optionnel)
- Case RGPD (consentement traitement des données)

**Après soumission :**
- Email de confirmation auto au client (via Brevo, comme pour Zokau)
- Notification email/SMS à l'entreprise avec récapitulatif + lien vers les photos
- Enregistrement en base pour suivi (voir section 4)

---

## 3. Fonctionnalités transverses

- **Responsive mobile-first** (la majorité des recherches "paysagiste + ville" se font sur mobile)
- **SEO local** : pages ou sections dédiées par ville/zone d'intervention, balises structurées (schema.org LocalBusiness), Google Business Profile lié
- **Temps de chargement rapide** : images optimisées (format WebP, lazy loading)
- **Prise de rendez-vous** (optionnel v2) : intégration Calendly ou système maison pour visite sur place
- **Multilingue** : non prioritaire sauf zone frontalière/touristique

---

## 4. Backend / Gestion des devis

- **Base de données** : stockage des demandes de devis (statut : nouveau / contacté / devis envoyé / accepté / refusé)
- **Espace admin simple** (protégé par login) pour :
  - Voir la liste des demandes avec filtres (statut, date, type de prestation)
  - Voir le détail + photos de chaque demande
  - Changer le statut, ajouter des notes internes
  - Exporter en CSV pour comptabilité/suivi
- **Notifications** : email automatique à chaque nouvelle demande

---

## 5. Stack technique recommandée

Cohérente avec ton stack habituel (Zokau Fitness) pour réutiliser tes compétences et ton environnement :

- **Frontend** : Next.js (React) + Tailwind CSS
- **Backend/DB** : Supabase (Postgres + Auth pour l'espace admin + Storage pour les photos), avec RLS pour sécuriser les données clients
- **Emails transactionnels** : Brevo (confirmation client + notification interne)
- **Déploiement** : Vercel
- **Formulaire multi-step** : gestion d'état côté client (React state ou React Hook Form)
- **Cartes/adresses** : API Google Places pour l'autocomplétion d'adresse
- **Nom de domaine** : à définir selon le nom de l'entreprise

---

## 6. Modèle économique du site

Pas de paiement en ligne nécessaire a priori (le paysagisme se facture après devis signé) — sauf si tu veux proposer un acompte en ligne (Stripe) pour valider un rendez-vous ou un service ponctuel (ex: tonte à la demande).

---

## 7. Roadmap de développement (par couches, méthode habituelle)

1. **Couche 1 — Structure & contenu statique** : pages Accueil/Services/À propos/Contact, design, responsive
2. **Couche 2 — Formulaire de devis** : les 5 étapes, validation, upload photos, envoi email
3. **Couche 3 — Backend & espace admin** : Supabase, stockage, dashboard de suivi des demandes
4. **Couche 4 — SEO & réalisations** : galerie, blog, référencement local
5. **Couche 5 (optionnel)** : prise de rendez-vous en ligne, avis clients automatisés (email post-prestation)

---

## 8. Prompt de démarrage pour Claude Code

```
Avant de lire des fichiers, consulte d'abord graphify-out/graph.json pour comprendre 
la structure et ne lire que le strict nécessaire.

Je démarre le projet [nom du site paysagisme] en suivant specs-site-paysagisme.md.
Commence par la Couche 1 : structure du site, pages statiques, design responsive.
Ne passe pas aux couches suivantes sans validation.
```

---

## 9. Points à trancher avant de démarrer

- Nom de l'entreprise / nom de domaine souhaité
- Zone d'intervention géographique précise (pour le SEO local)
- Statut juridique (micro-entreprise ? société ?) — impacte les mentions légales
- As-tu déjà des photos de réalisations à mettre en avant ?
- Espace admin : toi seul, ou plusieurs personnes (employés) doivent y accéder ?
