export const publicNotice =
  "Les privileges ne sont ni automatiques ni garantis. Ils dependent des partenaires, des evenements, des quotas, des disponibilites et des conditions Golden Circle.";

export const memberNotice =
  "Les privileges varient selon les partenaires, les evenements, les horaires, les disponibilites et les conditions Golden Circle.";

export const partnerNotice =
  "Chaque collaboration est soumise a validation Golden Circle afin de preserver la qualite, la coherence et la valeur percue de l'ecosysteme.";

export const progressiveNotice = "en deploiement progressif";

export const accessSteps = [
  {
    title: "Les partenaires proposent",
    text: "Offres, Golden Hour, experiences, evenements ou opportunites lifestyle."
  },
  {
    title: "Golden Circle valide",
    text: "Conditions, image, quota, horaire, statut requis et valeur percue."
  },
  {
    title: "Les membres accedent",
    text: "Diffusion controlee vers GC List, VIP GC List ou ambassadrices."
  }
];

export const notGoldenCircle = [
  "Un groupe WhatsApp",
  "Une carte de reduction",
  "Une marketplace ouverte",
  "Un annuaire de bons plans"
];

export const memberAccess = [
  "Privileges partenaires",
  "Experiences selectionnees",
  "Opportunites lifestyle",
  "Golden Hour",
  "GC Deals",
  "Mini Map"
];

export const partnerValue = [
  "Visibilite qualifiee",
  "Activation ciblee",
  "Test d'offre",
  "Experience client",
  "Remplissage intelligent",
  "Diffusion controlee"
];

export const partnerTiers = [
  {
    title: "Partenaire Decouverte",
    quota: 1,
    next: "Partenaire Actif",
    benefits: "Plus d'offres actives et une presence plus reguliere."
  },
  {
    title: "Partenaire Actif",
    quota: 3,
    next: "Partenaire Premium",
    benefits: "Capacite etendue pour tester plusieurs activations."
  },
  {
    title: "Partenaire Premium",
    quota: 7,
    next: "Partenaire Signature",
    benefits: "Diffusion renforcee, quotas superieurs et accompagnement plus fin."
  },
  {
    title: "Partenaire Signature",
    quota: "etendu",
    next: "Validation personnalisee",
    benefits: "Quota adapte selon validation Golden Circle."
  }
];

export const activeQuotaMessage =
  "Votre quota d'offres actives est atteint. Pour etendre votre presence dans l'ecosysteme Golden Circle, passez au palier superieur.";

export const upgradeMessage =
  "Votre presence actuelle est complete. Le palier superieur permet d'etendre vos activations tout en conservant la qualite de diffusion Golden Circle.";

export const knownEvents = [
  {
    title: "LA DESH",
    format: "Soiree club",
    access: "GC List",
    condition: "Groupe de 5, avant 23h, repost flyer GC List obligatoire.",
    dress: "Tenue adaptee a une soiree club",
    status: "conditions a confirmer"
  },
  {
    title: "SKYLINE GUADELOUPE",
    format: "Opportunite last minute",
    access: "GC List",
    condition: "Avant 18h, diffusion via annonce Golden Circle.",
    dress: "Tenue adaptee au lieu et au moment",
    status: "ponctuel"
  },
  {
    title: "ZOUK JAM",
    format: "Evenement recurrent",
    access: "Selon annonce",
    condition: "Avantages variables selon edition, repost demande.",
    dress: "Tenue adaptee a l'evenement musical",
    status: "variable"
  },
  {
    title: "E-REZO",
    format: "Reseau professionnel",
    access: "Selon validation",
    condition: "Avantage non systematique, format relationnel.",
    dress: "Tenue adaptee au format reseau",
    status: "a definir"
  }
];

export const miniMapCategories = [
  "restaurants",
  "mode",
  "bien-etre",
  "sante",
  "beaute",
  "evenements",
  "experiences",
  "services",
  "partenaires actifs",
  "partenaires en approche"
];

export const miniMapLocations = [
  {
    name: "Golden Hour Restauration",
    category: "restaurants",
    area: "Guadeloupe",
    state: "Golden Hour active",
    visibility: "reserve GC List"
  },
  {
    name: "Experience bien-etre",
    category: "bien-etre",
    area: "Caraibe",
    state: "partenaire en approche",
    visibility: "conditions a definir"
  },
  {
    name: "Evenement partenaire",
    category: "evenements",
    area: "Guadeloupe",
    state: "offre disponible",
    visibility: "reserve VIP"
  },
  {
    name: "Service lifestyle",
    category: "services",
    area: "Martinique",
    state: "partenaire actif",
    visibility: "GC List"
  }
];

export const memberDashboardNav = [
  "Tableau de bord",
  "Mes privileges",
  "Evenements",
  "Golden Hour",
  "Mini Map",
  "Mon statut",
  "Parametres",
  "Deconnexion"
];

export const partnerDashboardNav = [
  "Tableau de bord",
  "Mes offres",
  "Creer une offre",
  "Mes evenements",
  "Demandes GC",
  "Statistiques",
  "Profil partenaire",
  "Parametres",
  "Deconnexion"
];

export const supabaseEntities = [
  "users",
  "member_profiles",
  "member_status",
  "partners",
  "partner_profiles",
  "partner_tiers",
  "offers",
  "offer_status",
  "offer_categories",
  "offer_visibility",
  "offer_quota",
  "events",
  "event_access_rules",
  "golden_hours",
  "mini_map_locations",
  "submissions",
  "validations",
  "notifications",
  "subscriptions",
  "payments",
  "audit_logs"
];

export const availabilityGroups = {
  now: ["Accueil", "GC List", "Partenaires", "Evenements", "Mini Map statique"],
  progressive: [
    "Authentification",
    "Espace membre",
    "Espace partenaire",
    "Creation d'offre",
    "Notifications"
  ],
  later: ["Stripe", "Supabase complet", "Reporting avance", "Carte API"]
};
