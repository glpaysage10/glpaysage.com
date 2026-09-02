# GL Paysage — site vitrine

Site vitrine pour GL Paysage, entreprise de paysagisme (entreprise individuelle)
intervenant en Aube (10), Yonne (89) et Seine-et-Marne (77).

Le cahier des charges complet et sa version simplifiée sont dans `docs/`.

## État d'avancement

### Couche 1 (terminée) — Structure & contenu statique, design, responsive

- Accueil, Services, À propos, Contact — contenu complet
- Réalisations, Avis clients — pages stub ("bientôt disponible"), en attendant
  la Couche 4
- Mentions légales, Confidentialité — trame avec champs `à compléter`
- Header/nav responsive (menu mobile), footer, CTA "Demander un devis" partout
- Métadonnées SEO de base + JSON-LD `LocalBusiness` dans `src/app/layout.tsx`

### Couche 2 (terminée) — Formulaire de devis

- Formulaire en 5 étapes (`src/components/devis/`) : prestations, chantier
  (surface, adresse avec autocomplétion Google Places optionnelle, état du
  terrain, description), photos, budget/délai, coordonnées + case RGPD
- Validation par étape et globale avec Zod (`src/lib/devis-schema.ts`)
- Compression des photos côté client avant envoi (`src/lib/compress-image.ts`)
- Honeypot anti-spam (champ caché, faux succès silencieux si rempli)
- Route API `POST /api/devis` (`src/app/api/devis/route.ts`) : revalide les
  données côté serveur, puis envoie un email de confirmation au client et un
  email de notification (avec photos en pièces jointes) à l'entreprise, via
  l'API Brevo (`src/lib/send-devis-emails.ts`)
- En cas d'échec d'envoi (ex : `BREVO_API_KEY` non configurée), le formulaire
  affiche un message clair avec le téléphone de secours plutôt que d'échouer
  silencieusement

### Couche 3 (terminée) — Backend & espace admin

- Schéma Supabase (`supabase/schema.sql`) : table `devis_requests` (statut
  nouveau/contacté/devis envoyé/accepté/refusé, notes internes) + bucket de
  stockage privé `devis-photos`. RLS activée, aucune policy publique — tout
  accès passe par la clé service role, côté serveur uniquement
- `POST /api/devis` enregistre désormais la demande en base et upload les
  photos vers Supabase Storage (`src/lib/devis-requests.ts`) ; l'email de
  notification pointe vers la fiche admin plutôt que de joindre les photos
  en base64 (si Supabase n'est pas configuré, on retombe sur le
  comportement Couche 2 avec pièces jointes)
- Espace admin protégé par Supabase Auth (`src/app/admin/`), route
  `/admin/login` + `src/proxy.ts` (le `middleware.ts` de Next 16 a été
  renommé `proxy.ts`) qui redirige tout accès non authentifié
- Dashboard `/admin` : liste des demandes avec filtres (statut, prestation)
- Détail `/admin/[id]` : récapitulatif complet, photos (URLs signées,
  valables 7 jours), changement de statut et notes internes (Server Actions)
- Export CSV (`/api/admin/export`, protégé) depuis le dashboard

**Non fait volontairement** (couches suivantes, à valider avant de démarrer) :

- Couche 4 — galerie réalisations filtrable, blog, contenu SEO local avancé
- Couche 5 — prise de RDV en ligne, avis clients automatisés

## Configuration requise

Voir `.env.example`. Sans ces variables, le site reste pleinement
fonctionnel en dégradé : le formulaire de devis marche (validation,
compression photo) mais l'envoi final échoue avec un message invitant à
appeler directement, et l'espace admin affiche un message "pas encore
configuré" plutôt qu'un formulaire de connexion cassé.

- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME` — envoi des
  emails de confirmation/notification
- `DEVIS_NOTIFICATION_EMAIL` — adresse qui reçoit les nouvelles demandes
  (par défaut `siteConfig.email`)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — autocomplétion d'adresse (optionnel,
  champ texte simple sinon)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` — backend + espace admin (voir
  `supabase/schema.sql` pour l'initialisation et la création du compte admin)

## À compléter avant mise en ligne

Toutes les valeurs ci-dessous sont centralisées dans `src/lib/site-config.ts` —
c'est le seul fichier à modifier pour les mettre à jour partout sur le site :

- `phone` / `phoneHref` — vrai numéro de téléphone
- `email` — vraie adresse email
- `url` — nom de domaine définitif (à reporter aussi dans `metadataBase`)

Et directement dans les pages légales (`src/app/mentions-legales`,
`src/app/confidentialite`) :

- SIRET, adresse du siège, directeur de publication
- Détails assurance RC pro / garantie décennale (`src/app/a-propos`)

## Stack

Next.js 16 (App Router) + Tailwind CSS v4, TypeScript. Conforme à la stack
recommandée dans `docs/specs-site-paysagisme.md` (§5) pour les couches suivantes :
Supabase (DB/Auth/Storage), Brevo (emails), Vercel (déploiement), Google Places
(autocomplétion d'adresse).

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```
