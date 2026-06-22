# Golden Circle Caraïbes - Roadmap SaaS

## Objectif

Transformer la V1 actuelle en plateforme SaaS complète, sans casser le positionnement simple de départ : une PWA premium qui convertit vite via QR codes, Instagram, flyers, t-shirts et campagnes Meta Ads.

## V1 actuelle

- PWA multilingue FR / EN / ES.
- Pages publiques : accueil, rejoindre, VIP, events, deals, partenaires, legal, language.
- Hub de conversion avec liens Google Forms.
- Sources QR supportées sur `/fr/join?src=...`.
- Instagram Golden Circle.
- Formulaire de collaboration événement / partenaire.
- Mentions légales CSS visibles dans le footer et la page legal.

Liens actifs :

- GC List : https://forms.gle/omemdzTmxy26qfyeA
- VIP GC List : https://forms.gle/Mcsz2ZJ8iytNGcCX7
- Instagram : https://www.instagram.com/gldn.crcl/
- Demande collab event : https://forms.gle/kZrz5SWyJyxh8Zey8

## V2 SaaS cible

### Supabase

Tables futures :

- `users`
- `members`
- `memberships`
- `partners`
- `events`
- `deals`
- `payments`
- `qr_sources`
- `partner_leads`
- `event_collabs`
- `admin_stats`

### Stripe

Produits futurs :

- GC List : 15 € pour 360 jours
- VIP mensuel : 4,99 €/mois
- VIP annuel : 49,90 €/an
- Golden Boost : à partir de 550 €
- GC Studio : 100 à 300 €

## Dashboards futurs

### Membre

- Statut.
- Badge.
- Date d'expiration.
- Avantages utilisés.
- Préférences.
- Langue.
- Historique.

### VIP

- Offres exclusives.
- Notifications.
- Avantages prioritaires.
- Invitations.
- Événements VIP.

### Partenaire

- Campagnes.
- Offres.
- Demandes.
- Statistiques.
- Conversions.
- Source QR.

### Admin

- Membres.
- VIP.
- Partenaires.
- Événements.
- Sources QR.
- Revenus.
- Conversions.
- Campagnes.

## Étapes recommandées

1. Garder la V1 comme hub public de conversion pendant juillet-août.
2. Ajouter Supabase uniquement quand les formulaires prouvent la demande.
3. Ajouter Stripe en test pour GC List et VIP.
4. Créer un espace membre simple : statut, badge, expiration.
5. Ajouter les partenaires et deals dynamiques.
6. Ajouter un dashboard admin minimal.
7. Mesurer les sources QR et campagnes Meta Ads.
8. Automatiser les notifications VIP.

## Limites à respecter en V1

- Pas de paiement réel.
- Pas de login complet.
- Pas de dashboard complexe.
- Pas de données sensibles stockées dans l'app.
- Les variables `.env` restent vides tant que les services ne sont pas créés.
