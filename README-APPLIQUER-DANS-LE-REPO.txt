GOLDEN CIRCLE SAAS EXPORT
=========================

Contenu:
- Refonte SaaS Golden Circle OS
- Pages: accueil, espaces, offres, events, partenaires, mon espace
- Nouveaux modules: components/Platform.tsx et lib/ecosystem.ts
- Logo GC transparent et icones PWA/OG actualisees

Application dans le vrai repo GitHub/Vercel:
1. Ouvrir le vrai dossier du repo connecte a Vercel.
2. Extraire cette archive a la racine du repo.
3. Accepter le remplacement des fichiers existants.
4. Lancer: pnpm install si besoin, puis pnpm typecheck et pnpm build.
5. Commit/push sur la branche de production Vercel.
6. Verifier:
   - /fr
   - /fr/spaces
   - /fr/deals
   - /fr/events
   - /fr/partners
   - /fr/account

Important:
Cet export ne contient pas .git, node_modules, .next, deploy-cache, ni fichiers Vercel locaux.
