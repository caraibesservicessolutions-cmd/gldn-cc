# Supabase schema draft - Golden Circle Caraïbes

Ce document prépare la migration future du mode local vers Supabase. Stripe n'est pas connecté dans cette étape, mais les entités de paiement et d'abonnement sont prévues.

## Entités cible

- `users`
- `member_profiles`
- `member_status`
- `partners`
- `partner_profiles`
- `partner_tiers`
- `offers`
- `offer_status`
- `offer_categories`
- `offer_visibility`
- `offer_quota`
- `events`
- `event_access_rules`
- `golden_hours`
- `mini_map_locations`
- `submissions`
- `validations`
- `notifications`
- `subscriptions`
- `payments`
- `audit_logs`

## Table `members`

```sql
create table members (
  id uuid primary key default gen_random_uuid(),
  secret_id text unique not null,
  full_name text not null,
  email text,
  phone text,
  instagram text,
  type text not null,
  status text not null,
  language text not null,
  location text,
  start_date date not null,
  end_date date,
  notes text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone
);
```

## Table `admin_logs`

```sql
create table admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid,
  action text not null,
  member_id uuid,
  member_secret_id text,
  metadata jsonb,
  created_at timestamp with time zone not null default now()
);
```

## Statuts et types attendus

Types :

- `founder`
- `gc_list`
- `vip`
- `partner_pro`
- `event_organizer`
- `admin`

Statuts :

- `active`
- `pending`
- `expired`
- `suspended`
- `deleted`

Langues :

- `fr`
- `en`
- `es`
- `pt`
- `ht`

## Règles futures

- Seul un administrateur authentifié peut créer, modifier, suspendre ou supprimer un membre.
- Un membre peut voir sa propre carte.
- Le public peut vérifier une carte via `secret_id`, mais sans voir les notes admin ni les champs internes.
- Le soft delete est recommandé : passer `status = 'deleted'` et remplir `deleted_at`.
- Les suppressions définitives doivent être limitées, journalisées et réservées aux administrateurs autorisés.
- Les actions sensibles doivent être enregistrées dans `admin_logs`.

## Migration future localStorage -> Supabase

1. Créer la table `members`.
2. Ajouter Supabase Auth.
3. Ajouter un rôle `admin`.
4. Remplacer les fonctions locales `createMember`, `updateMember`, `suspendMember`, `reactivateMember`, `softDeleteMember`, `hardDeleteMember` par des Server Actions sécurisées.
5. Importer les membres locaux ou existants depuis `localStorage` uniquement si nécessaire.
6. Remplacer la lecture publique de carte par une requête filtrée qui exclut `notes`, `email`, `phone` et les champs internes.
7. Activer RLS et tester les accès admin / public.

## Variables Vercel

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_MEMBER_STORAGE_MODE=supabase`
- `NEXT_PUBLIC_ADMIN_ACCESS_CODE`
