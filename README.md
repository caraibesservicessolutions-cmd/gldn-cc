# GOLDEN CIRCLE Caraïbes

PWA premium multilingue pour convertir rapidement les visiteurs en membres Golden Circle via QR codes, Instagram, flyers, t-shirts, campagnes Meta Ads et liens Google Forms.

Slogan : **L'accès aux privilèges.**

## Technologies

- Next.js 16.
- TypeScript.
- Tailwind CSS.
- React.
- PWA installable.
- SEO de base avec Open Graph, Twitter card, sitemap et robots.

## Installation

Installer Node.js puis lancer :

```bash
pnpm install
```

Si `pnpm` n'est pas installé :

```bash
npm install -g pnpm
```

## Commandes

Développement :

```bash
pnpm dev
```

Build production :

```bash
pnpm build
```

Serveur production local :

```bash
pnpm start
```

## Structure

- `app/` : routes Next.js, pages, manifest, sitemap, robots.
- `components/` : composants réutilisables.
- `lib/` : textes, traductions, liens et constantes.
- `public/` : icônes, favicon, image Open Graph et visuels.
- `SAAS_ROADMAP.md` : plan de passage vers une vraie plateforme SaaS.
- `PRODUCTION_CHECKLIST.md` : checklist avant mise en ligne.
- `SUPABASE_SCHEMA_DRAFT.md` : brouillon de schéma Supabase pour les comptes membres.
- `.env.example` : variables prévues pour la V2.

Page admin cachée :

- `/fr/admin`
- `/en/admin`
- `/es/admin`
- `/pt/admin`
- `/ht/admin`

Elle n'est pas reliée au menu public. Elle demande un code admin local temporaire avant d'ouvrir la gestion des comptes.

## Système de comptes manuel

L'admin permet de gérer les membres avec deux modes :

- `localStorage` pour tester simplement dans le navigateur.
- `supabase` pour utiliser la base Supabase via les routes API serveur.

Ouvrir l'admin :

- Aller sur `/fr/admin`, `/en/admin`, `/es/admin`, `/pt/admin` ou `/ht/admin`.
- Entrer le code défini dans `NEXT_PUBLIC_ADMIN_DEMO_CODE`.
- Si la variable n'est pas renseignée, le code temporaire est `GC-DEMO-2026`.

Créer un membre :

1. Ouvrir le formulaire admin.
2. Remplir nom, email, téléphone, Instagram, type, statut, langue, zone, dates et notes.
3. Cliquer sur **Créer le compte**.
4. Le `secretId` est généré automatiquement selon le type de compte.
5. La carte virtuelle est disponible immédiatement via `/card/[secretId]`.

Suspendre ou réactiver :

- **Suspendre** passe le statut à `suspended`.
- La carte reste visible mais affiche clairement que le compte est suspendu.
- **Réactiver** repasse le statut à `active`.

Supprimer :

- **Désactiver** applique un soft delete avec `status = deleted`.
- **Supprimer** retire le compte de la liste locale après confirmation.
- En production, la suppression devra être sécurisée, journalisée et remplacée par Supabase.

Carte virtuelle et QR code :

- Chaque compte a une carte publique `/[lang]/card/[secretId]`.
- Le QR code pointe vers l'URL publique de vérification.
- La carte publique n'affiche pas les notes admin.
- Le domaine utilisé vient de `NEXT_PUBLIC_SITE_URL`, sinon du domaine local courant.

## Comment connecter Supabase

1. Dans Supabase, créer les tables décrites dans `SUPABASE_SCHEMA_DRAFT.md`.
2. Dans Vercel, ouvrir le projet Golden Circle.
3. Aller dans **Settings > Environment Variables**.
4. Ajouter les variables :

```env
NEXT_PUBLIC_SITE_URL=https://gldn-cc.vercel.app
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MEMBER_STORAGE_MODE=supabase
NEXT_PUBLIC_ADMIN_DEMO_CODE=
```

5. Redéployer le projet sur Vercel.
6. Ouvrir `/fr/admin`.
7. Entrer le code admin.
8. Créer un membre test.
9. Ouvrir sa carte avec `/fr/card/[secretId]`.

Important :

- `SUPABASE_SERVICE_ROLE_KEY` reste côté serveur uniquement.
- Les actions admin passent par `/api/admin/members`.
- Les cartes publiques passent par `/api/card/[secretId]`.
- Si Supabase n'est pas configuré ou répond mal, l'app revient en localStorage et affiche un message développeur dans l'admin.

Revenir en localStorage :

```env
NEXT_PUBLIC_MEMBER_STORAGE_MODE=local
```

Puis redéployer. Cela permet de continuer les tests sans Supabase.

## Liens importants

- GC List : https://forms.gle/omemdzTmxy26qfyeA
- VIP GC List : https://forms.gle/Mcsz2ZJ8iytNGcCX7
- Instagram : https://www.instagram.com/gldn.crcl/
- Collaboration événement / partenaire : https://forms.gle/kZrz5SWyJyxh8Zey8

## Multilingue

Langues actuelles :

- Français : `/fr`
- English : `/en`
- Español : `/es`
- Português : `/pt`
- Kreyòl Ayisyen : `/ht`

Les textes sont dans `lib/i18n.ts`. Le choix de langue est mémorisé dans le navigateur.

## QR source

La page `/join` accepte une source simple dans l'URL :

- `/fr/join?src=tshirt`
- `/fr/join?src=instagram`
- `/fr/join?src=flyer`
- `/fr/join?src=event`
- `/fr/join?src=partner`
- `/fr/join?src=meta_ads`

Ces liens servent aux QR codes terrain, flyers, t-shirts, events, partenaires et campagnes Meta Ads.

## Déploiement Vercel

1. Créer un compte GitHub.
2. Créer un nouveau repository GitHub.
3. Pousser le projet sur GitHub.
4. Créer un compte Vercel.
5. Cliquer sur **Add New Project** dans Vercel.
6. Sélectionner le repository GitHub.
7. Garder les réglages Next.js par défaut.
8. Ajouter `NEXT_PUBLIC_SITE_URL` dans les variables Vercel avec l'URL finale.
9. Lancer le déploiement.
10. Tester la version en ligne sur mobile.

Nom de domaine plus tard :

1. Acheter ou connecter le domaine.
2. Dans Vercel, ouvrir le projet puis **Settings > Domains**.
3. Ajouter le domaine.
4. Suivre les instructions DNS de Vercel.
5. Mettre `NEXT_PUBLIC_SITE_URL` à jour avec le domaine final.

## Générer les QR codes

Créer un QR code pour chaque source :

- T-shirt : `https://votre-domaine.com/fr/join?src=tshirt`
- Instagram : `https://votre-domaine.com/fr/join?src=instagram`
- Flyer : `https://votre-domaine.com/fr/join?src=flyer`
- Event : `https://votre-domaine.com/fr/join?src=event`
- Partner : `https://votre-domaine.com/fr/join?src=partner`
- Meta Ads : `https://votre-domaine.com/fr/join?src=meta_ads`

Outils possibles : Canva, Adobe Express, Bitly, QR Code Monkey ou le générateur QR intégré de certains navigateurs.

## Roadmap SaaS

Voir `SAAS_ROADMAP.md`.

Prochaines briques futures :

- Supabase.
- Stripe.
- Espace membre.
- Espace VIP.
- Espace partenaire.
- Dashboard admin.
- Tracking réel des sources QR.

## Prochaines étapes business

- Tester les liens sur mobile.
- Préparer les QR codes terrain.
- Préparer les visuels Meta Ads.
- Préparer les flyers et t-shirts.
- Collecter les premiers membres.
- Identifier les premiers partenaires.
- Garder la V1 simple jusqu'à validation commerciale.
