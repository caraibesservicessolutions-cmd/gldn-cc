# Golden Circle Caraïbes - Checklist production

## Liens

- [ ] Vérifier le lien GC List.
- [ ] Vérifier le lien VIP.
- [ ] Vérifier le lien Instagram.
- [ ] Vérifier le lien collab event.

## Sources QR

- [ ] Tester `/fr/join?src=tshirt`.
- [ ] Tester `/fr/join?src=instagram`.
- [ ] Tester `/fr/join?src=flyer`.
- [ ] Tester `/fr/join?src=event`.
- [ ] Tester `/fr/join?src=partner`.
- [ ] Tester `/fr/join?src=meta_ads`.

## PWA et mobile

- [ ] Tester la PWA sur iPhone.
- [ ] Tester la PWA sur Android.
- [ ] Vérifier l'installation sur écran d'accueil.
- [ ] Vérifier le favicon.
- [ ] Vérifier l'icône mobile.
- [ ] Vérifier le splash screen mobile.
- [ ] Tester les performances mobile.

## Pages

- [ ] Tester les langues FR / EN / ES / PT / HT.
- [ ] Tester les boutons CTA.
- [ ] Tester le footer.
- [ ] Tester la page legal.
- [ ] Tester la page admin cachée `/fr/admin`.
- [ ] Tester la page language.
- [ ] Tester les pages events, deals, partners, join, VIP.

## Comptes membres et cartes

- [ ] Tester le code admin.
- [ ] Tester création membre.
- [ ] Tester modification membre.
- [ ] Tester suspension membre.
- [ ] Tester réactivation membre.
- [ ] Tester suppression membre.
- [ ] Tester carte virtuelle.
- [ ] Tester QR code carte.
- [ ] Tester copie du lien carte.
- [ ] Tester copie du Secret ID.
- [ ] Vérifier que les notes admin ne s'affichent pas sur la carte publique.
- [ ] Tester rendu mobile admin en 360px, 375px, 390px, 412px et 430px.
- [ ] Tester rendu mobile carte en 360px, 375px, 390px, 412px et 430px.

## Campagnes

- [ ] Générer QR code t-shirt.
- [ ] Générer QR code flyer.
- [ ] Générer QR code event.
- [ ] Préparer Meta Ads.
- [ ] Préparer t-shirts.
- [ ] Préparer campagne juillet-août.

## Avant mise en ligne

- [ ] Définir `NEXT_PUBLIC_SITE_URL` avec le domaine final.
- [ ] Définir `NEXT_PUBLIC_MEMBER_STORAGE_MODE=local` pour une V2 sans Supabase.
- [ ] Définir `NEXT_PUBLIC_MEMBER_STORAGE_MODE=supabase` pour activer Supabase.
- [ ] Vérifier `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] Vérifier `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Vérifier `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement.
- [ ] Vérifier `NEXT_PUBLIC_ADMIN_DEMO_CODE`.
- [ ] Lancer `pnpm build`.
- [ ] Vérifier `/sitemap.xml`.
- [ ] Vérifier `/robots.txt`.
- [ ] Vérifier `/manifest.json`.
- [ ] Tester la version Vercel.
- [ ] Tester les liens externes depuis un téléphone.

## Supabase

- [ ] Créer la table `members`.
- [ ] Créer la table `admin_logs`.
- [ ] Tester `/api/admin/members` avec le code admin.
- [ ] Tester création membre en mode `supabase`.
- [ ] Tester modification membre en mode `supabase`.
- [ ] Tester suspension, réactivation, soft delete et hard delete.
- [ ] Tester `/api/card/[secretId]`.
- [ ] Tester retour en `localStorage` si Supabase est désactivé.
