-- Schéma Supabase pour GL Paysage — Couche 3 (backend & espace admin)
-- À exécuter dans l'éditeur SQL du projet Supabase (Dashboard > SQL Editor).

-- Table des demandes de devis
create table if not exists public.devis_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'nouveau'
    check (status in ('nouveau', 'contacte', 'devis_envoye', 'accepte', 'refuse')),

  prestations text[] not null default '{}',
  prestation_autre text not null default '',
  surface text not null default '',
  adresse text not null,
  etat_terrain text not null,
  description text not null default '',

  photo_paths text[] not null default '{}',

  budget text not null,
  delai text not null,

  nom text not null,
  telephone text not null,
  email text not null,
  disponibilites text not null default '',

  notes text not null default ''
);

create index if not exists devis_requests_created_at_idx
  on public.devis_requests (created_at desc);
create index if not exists devis_requests_status_idx
  on public.devis_requests (status);

alter table public.devis_requests enable row level security;
-- Aucune policy pour anon/authenticated : la table n'est accessible qu'via
-- la clé service role, utilisée uniquement côté serveur (route API de
-- soumission du devis + espace admin, protégé par Supabase Auth).

-- Bucket de stockage pour les photos jointes aux demandes (privé)
insert into storage.buckets (id, name, public)
values ('devis-photos', 'devis-photos', false)
on conflict (id) do nothing;
-- Idem : aucune policy storage.objects pour anon/authenticated. L'upload et
-- la génération d'URLs signées se font uniquement via la clé service role.

-- Pour créer le compte admin (solo), utiliser Dashboard > Authentication >
-- Users > Add user, avec l'email/mot de passe qui serviront à se connecter
-- sur /admin/login. Aucune inscription publique n'est exposée par le site.
