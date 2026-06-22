import { brand, legal, links } from "@/lib/constants";

export const locales = ["fr", "en", "es", "pt", "ht"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : "fr";
}

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  pt: "Português",
  ht: "Kreyòl Ayisyen"
};

type Feature = {
  title: string;
  text: string;
};

type Offer = {
  title: string;
  price: string;
  period: string;
  intro: string;
  benefits: string[];
  cta: string;
  href: string;
};

type EventItem = {
  title: string;
  place: string;
  date: string;
  category: string;
  description: string;
  badge: string;
};

type DealItem = {
  title: string;
  benefit: string;
  conditions: string;
  zone: string;
  badge: string;
};

type PartnerItem = {
  title: string;
  price: string;
  text: string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    home: string;
    join: string;
    vip: string;
    events: string;
    deals: string;
    partners: string;
    spaces: string;
    account: string;
    instagram: string;
    language: string;
    legal: string;
  };
  cta: {
    gcList: string;
    vip: string;
    partner: string;
    instagram: string;
    eventCollab: string;
    chooseLanguage: string;
  };
  home: {
    heroText: string;
    trustLine: string;
    whyTitle: string;
    whyText: string;
    features: Feature[];
    listTitle: string;
    vipTitle: string;
    partnersTitle: string;
    partnersText: string;
    summerTitle: string;
    summerText: string;
  };
  join: {
    title: string;
    subtitle: string;
    founderTitle: string;
    founderText: string;
    founderBadge: string;
    sourceTitle: string;
    sourceText: string;
  };
  vip: {
    title: string;
    subtitle: string;
    compareTitle: string;
    gcColumn: string;
    vipColumn: string;
    rows: { label: string; gc: string; vip: string }[];
  };
  events: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyText: string;
    organizerTitle: string;
    organizerText: string;
    memberTitle: string;
    memberText: string;
    confirmedNote: string;
  };
  deals: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyText: string;
    categoriesTitle: string;
    categories: string[];
    confirmedNote: string;
    partnerTitle: string;
    partnerText: string;
    memberTitle: string;
    memberText: string;
  };
  partners: {
    title: string;
    subtitle: string;
    items: PartnerItem[];
    argumentsTitle: string;
    arguments: string[];
  };
  legalPage: {
    title: string;
    intro: string;
    offersTitle: string;
    note: string;
  };
  language: {
    title: string;
    subtitle: string;
    saved: string;
  };
  offers: {
    gcList: Offer;
    vip: Offer;
  };
  footer: {
    line: string;
  };
};

const baseDictionaries = {
  fr: {
    meta: {
      title: "GOLDEN CIRCLE Caraïbes",
      description:
        "Le hub premium des bons plans, events, avantages VIP et opportunités caribéennes."
    },
    nav: {
      home: "Accueil",
      join: "Rejoindre",
      vip: "VIP",
      events: "Events",
      deals: "Offres",
      partners: "Partenaires",
      spaces: "Espaces",
      account: "Mon espace",
      instagram: "Instagram",
      language: "Langue",
      legal: "Mentions légales"
    },
    cta: {
      gcList: "Rejoindre la GC List",
      vip: "Passer VIP",
      partner: "Devenir partenaire",
      instagram: "Suivre Instagram",
      eventCollab: "Demander une collaboration",
      chooseLanguage: "Choisir cette langue"
    },
    home: {
      heroText:
        "Rejoins le cercle des bons plans, events, avantages VIP et opportunités caribéennes.",
      trustLine:
        "Un hub premium pour locaux, touristes, expatriés, diaspora et partenaires.",
      whyTitle: "Pourquoi rejoindre le Cercle ?",
      whyText:
        "Golden Circle rassemble les accès utiles, les expériences et les opportunités au même endroit.",
      features: [
        {
          title: "Events & expériences",
          text: "Découvre les moments forts, soirées, brunchs et expériences locales."
        },
        {
          title: "Avantages partenaires",
          text: "Profite d'offres sélectionnées auprès de lieux et services caribéens."
        },
        {
          title: "Accès VIP",
          text: "Priorité, notifications immédiates, badge VIP et avantages exclusifs."
        },
        {
          title: "Opportunités caribéennes",
          text: "Connecte business, diaspora, lifestyle et réseau local."
        }
      ],
      listTitle: "GC List",
      vipTitle: "VIP GC List",
      partnersTitle: "Partenaires",
      partnersText:
        "Active ta visibilité, tes offres et tes événements auprès d'une communauté qualifiée.",
      summerTitle: "Juillet-Août",
      summerText:
        "La période estivale est le moment idéal pour connecter locaux, touristes, expatriés, partenaires et organisateurs autour des meilleurs plans caribéens."
    },
    join: {
      title: "Entre dans le Cercle.",
      subtitle:
        "Bons plans, events, avantages VIP et opportunités caribéennes.",
      founderTitle: "Membres Fondateurs",
      founderText:
        "Les 88 premiers membres gardent leur accès GC List gratuit jusqu'au 31 décembre 2026.",
      founderBadge: "Badge fondateur",
      sourceTitle: "Source QR",
      sourceText:
        "Cette visite vient d'une campagne terrain. Le lien reste simple et redirige vers la GC List."
    },
    vip: {
      title: "Passe au niveau VIP.",
      subtitle:
        "Des accès prioritaires, notifications immédiates et offres réservées.",
      compareTitle: "GC List vs VIP GC List",
      gcColumn: "GC List",
      vipColumn: "VIP GC List",
      rows: [
        { label: "Communauté", gc: "Oui", vip: "Oui" },
        { label: "Avantages partenaires", gc: "Oui", vip: "Oui" },
        { label: "Notifications", gc: "Différées", vip: "Immédiates" },
        { label: "Accès prioritaire", gc: "Non", vip: "Oui" },
        { label: "Offres VIP", gc: "Non", vip: "Oui" },
        { label: "Badge VIP", gc: "Non", vip: "Oui" }
      ]
    },
    events: {
      title: "Événements bientôt disponibles",
      subtitle:
        "Les prochains événements Golden Circle Caraïbes sont en cours de sélection avec nos partenaires.",
      emptyTitle: "Événements bientôt disponibles",
      emptyText:
        "Les prochains événements Golden Circle Caraïbes sont en cours de sélection avec nos partenaires. Reviens bientôt pour découvrir les activations, soirées, expériences et opportunités réservées à la communauté.",
      organizerTitle: "Vous organisez un événement ?",
      organizerText:
        "Golden Circle Caraïbes peut vous accompagner pour promouvoir votre événement, toucher une audience locale et touristique, créer du contenu, générer des inscriptions et activer une campagne QR code terrain.",
      memberTitle: "Reste informé des prochains events",
      memberText:
        "Rejoins la GC List pour recevoir les prochaines annonces, bons plans, accès partenaires et opportunités Golden Circle.",
      confirmedNote:
        "Aucun événement n’est publié tant qu’il n’est pas confirmé."
    },
    deals: {
      title: "Avantages partenaires bientôt disponibles",
      subtitle:
        "Les avantages partenaires Golden Circle Caraïbes sont en cours de sélection.",
      emptyTitle: "Avantages partenaires bientôt disponibles",
      emptyText:
        "Les avantages partenaires Golden Circle Caraïbes sont en cours de sélection. Les offres seront publiées uniquement après confirmation avec les établissements, organisateurs et partenaires concernés.",
      categoriesTitle: "Catégories de futurs avantages",
      categories: [
        "Restaurants & bars",
        "Events & soirées",
        "Beauté & bien-être",
        "Activités touristiques",
        "Location & mobilité",
        "Expériences VIP"
      ],
      confirmedNote:
        "Les offres seront affichées uniquement lorsqu’elles seront confirmées.",
      partnerTitle: "Vous souhaitez proposer un avantage ?",
      partnerText:
        "Golden Circle Caraïbes sélectionne des partenaires capables de proposer des avantages utiles, crédibles et alignés avec l'expérience premium de la communauté.",
      memberTitle: "Accéder aux prochains avantages",
      memberText:
        "Rejoins la GC List ou passe VIP pour recevoir les prochaines annonces dès que les offres partenaires seront confirmées."
    },
    partners: {
      title: "Active ton accès au Cercle.",
      subtitle:
        "Golden Circle aide les partenaires à toucher locaux, visiteurs, diaspora et organisateurs.",
      items: [
        {
          title: "Golden Boost",
          price: "À partir de 550 €",
          text: "Visibilité partenaire, campagne terrain et mise en avant premium."
        },
        {
          title: "GC Studio",
          price: "100 € à 300 €",
          text: "Création de contenus courts pour offres, lieux, events et activations."
        },
        {
          title: "GC Deals",
          price: "Commission sur ventes générées",
          text: "Activation d'offres partenaires auprès de membres qualifiés."
        },
        {
          title: "Golden Link",
          price: "Réseau B2B",
          text: "Connexions commerciales entre partenaires et opportunités locales."
        },
        {
          title: "Golden Chain",
          price: "Futur réseau inter-partenaires",
          text: "Un écosystème pour relier offres, lieux et expériences."
        }
      ],
      argumentsTitle: "Arguments partenaires",
      arguments: [
        "visibilité locale",
        "visibilité diaspora",
        "communauté qualifiée",
        "events",
        "QR code terrain",
        "campagnes juillet-août",
        "contenus vidéo",
        "offres VIP",
        "activation commerciale"
      ]
    },
    legalPage: {
      title: "Mentions légales",
      intro:
        "Golden Circle Caraïbes est développé et exploité commercialement par :",
      offersTitle: "Offres commerciales proposées par CSS",
      note:
        "Cette page est prête à compléter. Aucune adresse, téléphone ou email n'est ajouté tant que l'information n'est pas fournie."
    },
    language: {
      title: "Choix de langue",
      subtitle:
        "Sélectionne ta langue. Le choix sera mémorisé dans ton navigateur.",
      saved: "Langue enregistrée"
    },
    offers: {
      gcList: {
        title: "GC List",
        price: "15 €",
        period: "360 jours",
        intro: "Un accès simple au cercle des bons plans et opportunités.",
        benefits: [
          "communauté",
          "bons plans",
          "events",
          "offres partenaires",
          "opportunités Golden Circle"
        ],
        cta: "Rejoindre la GC List",
        href: links.gcList
      },
      vip: {
        title: "VIP GC List",
        price: "4,99 €/mois",
        period: "49,90 €/an",
        intro: "L'expérience prioritaire pour ne rien manquer.",
        benefits: [
          "notifications immédiates",
          "accès prioritaire",
          "offres exclusives",
          "badge VIP",
          "opportunités réservées",
          "avantages premium"
        ],
        cta: "Passer VIP",
        href: links.vipList
      }
    },
    footer: {
      line: "Golden Circle Caraïbes — L'accès aux privilèges."
    }
  },
  en: {
    meta: {
      title: "GOLDEN CIRCLE Caraïbes",
      description:
        "A premium hub for Caribbean deals, events, VIP perks and opportunities."
    },
    nav: {
      home: "Home",
      join: "Join",
      vip: "VIP",
      events: "Events",
      deals: "Deals",
      partners: "Partners",
      spaces: "Spaces",
      account: "My space",
      instagram: "Instagram",
      language: "Language",
      legal: "Legal"
    },
    cta: {
      gcList: "Join the GC List",
      vip: "Go VIP",
      partner: "Become a partner",
      instagram: "Follow Instagram",
      eventCollab: "Request a collaboration",
      chooseLanguage: "Choose this language"
    },
    home: {
      heroText:
        "Join the circle for Caribbean deals, events, VIP perks and opportunities.",
      trustLine:
        "A premium hub for locals, travelers, expats, the diaspora and partners.",
      whyTitle: "Why join the Circle?",
      whyText:
        "Golden Circle brings useful access, experiences and opportunities into one place.",
      features: [
        {
          title: "Events & experiences",
          text: "Discover highlights, nights out, brunches and local experiences."
        },
        {
          title: "Partner benefits",
          text: "Access selected offers from Caribbean venues and services."
        },
        {
          title: "VIP access",
          text: "Priority access, instant alerts, a VIP badge and exclusive perks."
        },
        {
          title: "Caribbean opportunities",
          text: "Connect business, diaspora, lifestyle and local networks."
        }
      ],
      listTitle: "GC List",
      vipTitle: "VIP GC List",
      partnersTitle: "Partners",
      partnersText:
        "Activate visibility, offers and events with a qualified community.",
      summerTitle: "July-August",
      summerText:
        "The summer period is the ideal moment to connect locals, travelers, expats, partners and organizers around the best Caribbean plans."
    },
    join: {
      title: "Enter the Circle.",
      subtitle: "Deals, events, VIP perks and Caribbean opportunities.",
      founderTitle: "Founding Members",
      founderText:
        "The first 88 members keep their GC List access free until December 31, 2026.",
      founderBadge: "Founder badge",
      sourceTitle: "QR source",
      sourceText:
        "This visit comes from a field campaign. The link stays simple and redirects to the GC List."
    },
    vip: {
      title: "Step into VIP.",
      subtitle: "Priority access, instant alerts and reserved offers.",
      compareTitle: "GC List vs VIP GC List",
      gcColumn: "GC List",
      vipColumn: "VIP GC List",
      rows: [
        { label: "Community", gc: "Yes", vip: "Yes" },
        { label: "Partner benefits", gc: "Yes", vip: "Yes" },
        { label: "Notifications", gc: "Delayed", vip: "Instant" },
        { label: "Priority access", gc: "No", vip: "Yes" },
        { label: "VIP offers", gc: "No", vip: "Yes" },
        { label: "VIP badge", gc: "No", vip: "Yes" }
      ]
    },
    events: {
      title: "Events coming soon",
      subtitle:
        "The next Golden Circle Caraïbes events are being selected with our partners.",
      emptyTitle: "Events coming soon",
      emptyText:
        "The next Golden Circle Caraïbes events are being selected with our partners. Come back soon to discover activations, nights, experiences and opportunities reserved for the community.",
      organizerTitle: "Are you organizing an event?",
      organizerText:
        "Golden Circle Caraïbes can help promote your event, reach a local and tourist audience, create content, generate registrations and activate a field QR code campaign.",
      memberTitle: "Stay informed about upcoming events",
      memberText:
        "Join the GC List to receive upcoming announcements, deals, partner access and Golden Circle opportunities.",
      confirmedNote:
        "No event is published until it has been confirmed."
    },
    deals: {
      title: "Partner benefits coming soon",
      subtitle:
        "Golden Circle Caraïbes partner benefits are currently being selected.",
      emptyTitle: "Partner benefits coming soon",
      emptyText:
        "Golden Circle Caraïbes partner benefits are currently being selected. Offers will only be published after confirmation with the venues, organizers and partners concerned.",
      categoriesTitle: "Future benefit categories",
      categories: [
        "Restaurants & bars",
        "Events & nights",
        "Beauty & wellness",
        "Tourism activities",
        "Rental & mobility",
        "VIP experiences"
      ],
      confirmedNote:
        "Offers will only be displayed once they are confirmed.",
      partnerTitle: "Would you like to propose a benefit?",
      partnerText:
        "Golden Circle Caraïbes selects partners able to offer useful, credible benefits aligned with the community's premium experience.",
      memberTitle: "Access upcoming benefits",
      memberText:
        "Join the GC List or go VIP to receive upcoming announcements as soon as partner offers are confirmed."
    },
    partners: {
      title: "Activate your access to the Circle.",
      subtitle:
        "Golden Circle helps partners reach locals, visitors, the diaspora and organizers.",
      items: [
        {
          title: "Golden Boost",
          price: "From 550 €",
          text: "Partner visibility, field campaign and premium promotion."
        },
        {
          title: "GC Studio",
          price: "100 € to 300 €",
          text: "Short-form content creation for offers, venues, events and activations."
        },
        {
          title: "GC Deals",
          price: "Commission on generated sales",
          text: "Partner offer activation for qualified members."
        },
        {
          title: "Golden Link",
          price: "B2B network",
          text: "Business connections between partners and local opportunities."
        },
        {
          title: "Golden Chain",
          price: "Future inter-partner network",
          text: "An ecosystem connecting offers, places and experiences."
        }
      ],
      argumentsTitle: "Partner arguments",
      arguments: [
        "local visibility",
        "diaspora visibility",
        "qualified community",
        "events",
        "field QR code",
        "July-August campaigns",
        "video content",
        "VIP offers",
        "commercial activation"
      ]
    },
    legalPage: {
      title: "Legal notice",
      intro:
        "Golden Circle Caraïbes is developed and commercially operated by:",
      offersTitle: "Commercial offers proposed by CSS",
      note:
        "This page is ready to be completed. No address, phone number or email is added until the information is provided."
    },
    language: {
      title: "Language choice",
      subtitle: "Choose your language. It will be saved in your browser.",
      saved: "Language saved"
    },
    offers: {
      gcList: {
        title: "GC List",
        price: "15 €",
        period: "360 days",
        intro: "Simple access to the circle of deals and opportunities.",
        benefits: [
          "community",
          "deals",
          "events",
          "partner offers",
          "Golden Circle opportunities"
        ],
        cta: "Join the GC List",
        href: links.gcList
      },
      vip: {
        title: "VIP GC List",
        price: "4.99 €/month",
        period: "49.90 €/year",
        intro: "The priority experience so you miss nothing.",
        benefits: [
          "instant notifications",
          "priority access",
          "exclusive offers",
          "VIP badge",
          "reserved opportunities",
          "premium benefits"
        ],
        cta: "Go VIP",
        href: links.vipList
      }
    },
    footer: {
      line: "Golden Circle Caraïbes — L'accès aux privilèges."
    }
  },
  es: {
    meta: {
      title: "GOLDEN CIRCLE Caraïbes",
      description:
        "Un hub premium de ofertas, eventos, ventajas VIP y oportunidades caribeñas."
    },
    nav: {
      home: "Inicio",
      join: "Unirse",
      vip: "VIP",
      events: "Eventos",
      deals: "Ofertas",
      partners: "Partners",
      spaces: "Espacios",
      account: "Mi espacio",
      instagram: "Instagram",
      language: "Idioma",
      legal: "Legal"
    },
    cta: {
      gcList: "Unirse a la GC List",
      vip: "Pasar a VIP",
      partner: "Ser partner",
      instagram: "Seguir Instagram",
      eventCollab: "Solicitar colaboración",
      chooseLanguage: "Elegir este idioma"
    },
    home: {
      heroText:
        "Únete al círculo de ofertas, eventos, ventajas VIP y oportunidades caribeñas.",
      trustLine:
        "Un hub premium para locales, viajeros, expatriados, diáspora y partners.",
      whyTitle: "¿Por qué unirse al Círculo?",
      whyText:
        "Golden Circle reúne accesos útiles, experiencias y oportunidades en un solo lugar.",
      features: [
        {
          title: "Eventos y experiencias",
          text: "Descubre noches, brunches, momentos destacados y experiencias locales."
        },
        {
          title: "Ventajas partners",
          text: "Accede a ofertas seleccionadas de lugares y servicios caribeños."
        },
        {
          title: "Acceso VIP",
          text: "Prioridad, alertas inmediatas, badge VIP y ventajas exclusivas."
        },
        {
          title: "Oportunidades caribeñas",
          text: "Conecta negocio, diáspora, lifestyle y redes locales."
        }
      ],
      listTitle: "GC List",
      vipTitle: "VIP GC List",
      partnersTitle: "Partners",
      partnersText:
        "Activa visibilidad, ofertas y eventos con una comunidad cualificada.",
      summerTitle: "Julio-Agosto",
      summerText:
        "La temporada de verano es el momento ideal para conectar locales, viajeros, expatriados, partners y organizadores con los mejores planes caribeños."
    },
    join: {
      title: "Entra en el Círculo.",
      subtitle: "Ofertas, eventos, ventajas VIP y oportunidades caribeñas.",
      founderTitle: "Miembros Fundadores",
      founderText:
        "Los primeros 88 miembros mantienen su acceso GC List gratis hasta el 31 de diciembre de 2026.",
      founderBadge: "Badge fundador",
      sourceTitle: "Fuente QR",
      sourceText:
        "Esta visita viene de una campaña de terreno. El enlace sigue siendo simple y redirige a la GC List."
    },
    vip: {
      title: "Sube al nivel VIP.",
      subtitle: "Acceso prioritario, alertas inmediatas y ofertas reservadas.",
      compareTitle: "GC List vs VIP GC List",
      gcColumn: "GC List",
      vipColumn: "VIP GC List",
      rows: [
        { label: "Comunidad", gc: "Sí", vip: "Sí" },
        { label: "Ventajas partners", gc: "Sí", vip: "Sí" },
        { label: "Notificaciones", gc: "Diferidas", vip: "Inmediatas" },
        { label: "Acceso prioritario", gc: "No", vip: "Sí" },
        { label: "Ofertas VIP", gc: "No", vip: "Sí" },
        { label: "Badge VIP", gc: "No", vip: "Sí" }
      ]
    },
    events: {
      title: "Eventos próximamente disponibles",
      subtitle:
        "Los próximos eventos Golden Circle Caraïbes se están seleccionando con nuestros partners.",
      emptyTitle: "Eventos próximamente disponibles",
      emptyText:
        "Los próximos eventos Golden Circle Caraïbes se están seleccionando con nuestros partners. Vuelve pronto para descubrir activaciones, noches, experiencias y oportunidades reservadas para la comunidad.",
      organizerTitle: "¿Organizas un evento?",
      organizerText:
        "Golden Circle Caraïbes puede ayudarte a promocionar tu evento, llegar a una audiencia local y turística, crear contenido, generar inscripciones y activar una campaña QR code de terreno.",
      memberTitle: "Mantente informado de los próximos eventos",
      memberText:
        "Únete a la GC List para recibir los próximos anuncios, buenos planes, accesos partners y oportunidades Golden Circle.",
      confirmedNote:
        "No se publica ningún evento hasta que esté confirmado."
    },
    deals: {
      title: "Ventajas partners próximamente disponibles",
      subtitle:
        "Las ventajas partners Golden Circle Caraïbes se están seleccionando.",
      emptyTitle: "Ventajas partners próximamente disponibles",
      emptyText:
        "Las ventajas partners Golden Circle Caraïbes se están seleccionando. Las ofertas se publicarán únicamente después de confirmación con los establecimientos, organizadores y partners correspondientes.",
      categoriesTitle: "Categorías de futuras ventajas",
      categories: [
        "Restaurantes & bares",
        "Eventos & noches",
        "Belleza & bienestar",
        "Actividades turísticas",
        "Alquiler & movilidad",
        "Experiencias VIP"
      ],
      confirmedNote:
        "Las ofertas se mostrarán únicamente cuando estén confirmadas.",
      partnerTitle: "¿Quieres proponer una ventaja?",
      partnerText:
        "Golden Circle Caraïbes selecciona partners capaces de proponer ventajas útiles, creíbles y alineadas con la experiencia premium de la comunidad.",
      memberTitle: "Acceder a las próximas ventajas",
      memberText:
        "Únete a la GC List o pasa a VIP para recibir los próximos anuncios cuando las ofertas partners estén confirmadas."
    },
    partners: {
      title: "Activa tu acceso al Círculo.",
      subtitle:
        "Golden Circle ayuda a partners a llegar a locales, visitantes, diáspora y organizadores.",
      items: [
        {
          title: "Golden Boost",
          price: "Desde 550 €",
          text: "Visibilidad partner, campaña de terreno y promoción premium."
        },
        {
          title: "GC Studio",
          price: "100 € a 300 €",
          text: "Creación de contenidos cortos para ofertas, lugares, eventos y activaciones."
        },
        {
          title: "GC Deals",
          price: "Comisión sobre ventas generadas",
          text: "Activación de ofertas partners para miembros cualificados."
        },
        {
          title: "Golden Link",
          price: "Red B2B",
          text: "Conexiones comerciales entre partners y oportunidades locales."
        },
        {
          title: "Golden Chain",
          price: "Futura red inter-partners",
          text: "Un ecosistema para conectar ofertas, lugares y experiencias."
        }
      ],
      argumentsTitle: "Argumentos partners",
      arguments: [
        "visibilidad local",
        "visibilidad diáspora",
        "comunidad cualificada",
        "eventos",
        "QR code de terreno",
        "campañas julio-agosto",
        "contenidos vídeo",
        "ofertas VIP",
        "activación comercial"
      ]
    },
    legalPage: {
      title: "Aviso legal",
      intro:
        "Golden Circle Caraïbes es desarrollado y explotado comercialmente por:",
      offersTitle: "Ofertas comerciales propuestas por CSS",
      note:
        "Esta página está lista para completar. No se añade dirección, teléfono ni email hasta que se facilite la información."
    },
    language: {
      title: "Elección de idioma",
      subtitle: "Selecciona tu idioma. Se guardará en tu navegador.",
      saved: "Idioma guardado"
    },
    offers: {
      gcList: {
        title: "GC List",
        price: "15 €",
        period: "360 días",
        intro: "Un acceso simple al círculo de ofertas y oportunidades.",
        benefits: [
          "comunidad",
          "ofertas",
          "eventos",
          "ofertas partners",
          "oportunidades Golden Circle"
        ],
        cta: "Unirse a la GC List",
        href: links.gcList
      },
      vip: {
        title: "VIP GC List",
        price: "4,99 €/mes",
        period: "49,90 €/año",
        intro: "La experiencia prioritaria para no perderte nada.",
        benefits: [
          "notificaciones inmediatas",
          "acceso prioritario",
          "ofertas exclusivas",
          "badge VIP",
          "oportunidades reservadas",
          "ventajas premium"
        ],
        cta: "Pasar a VIP",
        href: links.vipList
      }
    },
    footer: {
      line: "Golden Circle Caraïbes — L'accès aux privilèges."
    }
  }
} satisfies Record<"fr" | "en" | "es", Dictionary>;

export const dictionaries: Record<Locale, Dictionary> = {
  ...baseDictionaries,
  pt: {
    ...baseDictionaries.en,
    nav: {
      home: "Início",
      join: "Participar",
      vip: "VIP",
      events: "Eventos",
      deals: "Ofertas",
      partners: "Parceiros",
      spaces: "Espaços",
      account: "Meu espaço",
      instagram: "Instagram",
      language: "Idioma",
      legal: "Legal"
    },
    cta: {
      gcList: "Entrar na GC List",
      vip: "Passar para VIP",
      partner: "Ser parceiro",
      instagram: "Seguir Instagram",
      eventCollab: "Propor colaboração",
      chooseLanguage: "Escolher este idioma"
    },
    home: {
      ...baseDictionaries.en.home,
      heroText:
        "Entre no círculo de bons planos, eventos, vantagens VIP e oportunidades caribenhas.",
      trustLine:
        "Um hub premium para locais, viajantes, expatriados, diáspora e parceiros.",
      whyTitle: "Por que entrar no Círculo?",
      whyText:
        "Golden Circle reúne acessos úteis, experiências e oportunidades em um só lugar.",
      partnersTitle: "Parceiros",
      partnersText:
        "Ative sua visibilidade, ofertas e eventos junto a uma comunidade qualificada.",
      summerTitle: "Julho-Agosto",
      summerText:
        "O período de verão é ideal para conectar locais, viajantes, expatriados, parceiros e organizadores em torno dos melhores planos caribenhos."
    },
    join: {
      title: "Entre no Círculo.",
      subtitle: "Bons planos, eventos, vantagens VIP e oportunidades caribenhas.",
      founderTitle: "Membros Fundadores",
      founderText:
        "Os 88 primeiros membros mantêm o acesso GC List gratuito até 31 de dezembro de 2026.",
      founderBadge: "Badge fundador",
      sourceTitle: "Origem QR",
      sourceText:
        "Esta visita vem de uma campanha de campo. O link continua simples e redireciona para a GC List."
    },
    vip: {
      ...baseDictionaries.en.vip,
      title: "Passe para o nível VIP.",
      subtitle: "Acessos prioritários, alertas imediatos e ofertas reservadas.",
      compareTitle: "GC List vs VIP GC List",
      rows: [
        { label: "Comunidade", gc: "Sim", vip: "Sim" },
        { label: "Vantagens parceiros", gc: "Sim", vip: "Sim" },
        { label: "Notificações", gc: "Diferidas", vip: "Imediatas" },
        { label: "Acesso prioritário", gc: "Não", vip: "Sim" },
        { label: "Ofertas VIP", gc: "Não", vip: "Sim" },
        { label: "Badge VIP", gc: "Não", vip: "Sim" }
      ]
    },
    events: {
      title: "Eventos em breve",
      subtitle:
        "Os próximos eventos Golden Circle Caraïbes estão sendo selecionados com nossos parceiros.",
      emptyTitle: "Eventos em breve",
      emptyText:
        "Os próximos eventos Golden Circle Caraïbes estão sendo selecionados com nossos parceiros. Volte em breve para descobrir ativações, noites, experiências e oportunidades reservadas à comunidade.",
      organizerTitle: "Você organiza um evento?",
      organizerText:
        "Golden Circle Caraïbes pode ajudar a promover seu evento, alcançar público local e turístico, criar conteúdo, gerar inscrições e ativar uma campanha QR code de campo.",
      memberTitle: "Fique informado sobre os próximos eventos",
      memberText:
        "Entre na GC List para receber próximos anúncios, bons planos, acessos parceiros e oportunidades Golden Circle.",
      confirmedNote:
        "Nenhum evento é publicado antes de ser confirmado."
    },
    deals: {
      ...baseDictionaries.en.deals,
      title: "Vantagens parceiras em breve",
      subtitle:
        "As vantagens parceiras Golden Circle Caraïbes estão sendo selecionadas.",
      emptyTitle: "Vantagens parceiras em breve",
      emptyText:
        "As vantagens parceiras Golden Circle Caraïbes estão sendo selecionadas. As ofertas serão publicadas somente após confirmação com os estabelecimentos, organizadores e parceiros envolvidos.",
      categoriesTitle: "Categorias de vantagens futuras",
      confirmedNote:
        "As ofertas serão exibidas apenas quando forem confirmadas.",
      partnerTitle: "Quer propor uma vantagem?",
      partnerText:
        "Golden Circle Caraïbes seleciona parceiros capazes de propor vantagens úteis, credíveis e alinhadas com a experiência premium da comunidade.",
      memberTitle: "Acessar as próximas vantagens",
      memberText:
        "Entre na GC List ou passe para VIP para receber os próximos anúncios assim que as ofertas parceiras forem confirmadas."
    },
    partners: {
      ...baseDictionaries.en.partners,
      title: "Ative seu acesso ao Círculo.",
      subtitle:
        "Golden Circle ajuda parceiros a alcançar locais, visitantes, diáspora e organizadores.",
      argumentsTitle: "Argumentos parceiros"
    },
    legalPage: {
      title: "Aviso legal",
      intro:
        "Golden Circle Caraïbes é desenvolvido e explorado comercialmente por:",
      offersTitle: "Ofertas comerciais propostas pela CSS",
      note:
        "Esta página está pronta para completar. Nenhum endereço, telefone ou email é adicionado até que a informação seja fornecida."
    },
    language: {
      title: "Escolha de idioma",
      subtitle: "Escolha seu idioma. Ele será salvo no seu navegador.",
      saved: "Idioma salvo"
    },
    offers: {
      gcList: {
        ...baseDictionaries.en.offers.gcList,
        period: "360 dias",
        intro: "Um acesso simples ao círculo de bons planos e oportunidades.",
        cta: "Entrar na GC List"
      },
      vip: {
        ...baseDictionaries.en.offers.vip,
        intro: "A experiência prioritária para não perder nada.",
        cta: "Passar para VIP"
      }
    },
    footer: {
      line: "Golden Circle Caraïbes — L'accès aux privilèges."
    }
  },
  ht: {
    ...baseDictionaries.fr,
    nav: {
      home: "Akèy",
      join: "Antre",
      vip: "VIP",
      events: "Events",
      deals: "Òf",
      partners: "Patnè",
      spaces: "Espas",
      account: "Espas mwen",
      instagram: "Instagram",
      language: "Lang",
      legal: "Legal"
    },
    cta: {
      gcList: "Antre nan GC List",
      vip: "Pase VIP",
      partner: "Vin patnè",
      instagram: "Swiv Instagram",
      eventCollab: "Pwopoze kolaborasyon",
      chooseLanguage: "Chwazi lang sa a"
    },
    home: {
      ...baseDictionaries.fr.home,
      heroText:
        "Antre nan sèk bon plan, events, avantaj VIP ak opòtinite Karayib.",
      trustLine:
        "Yon hub premium pou moun lokal, vizitè, ekspatriye, dyaspora ak patnè.",
      whyTitle: "Poukisa antre nan Circle la?",
      whyText:
        "Golden Circle mete aksè itil, eksperyans ak opòtinite nan menm kote.",
      partnersTitle: "Patnè",
      partnersText:
        "Aktive vizibilite, òf ak events ou devan yon kominote kalifye.",
      summerTitle: "Jiyè-Out",
      summerText:
        "Sezon ete a se bon moman pou konekte lokal, vizitè, ekspatriye, patnè ak òganizatè sou pi bon plan Karayib yo."
    },
    join: {
      title: "Antre nan Circle la.",
      subtitle: "Bon plan, events, avantaj VIP ak opòtinite Karayib.",
      founderTitle: "Manm Fondatè",
      founderText:
        "Premye 88 manm yo kenbe aksè GC List gratis jiska 31 desanm 2026.",
      founderBadge: "Badge fondatè",
      sourceTitle: "Sous QR",
      sourceText:
        "Vizit sa a soti nan yon kanpay teren. Lyen an rete senp epi li mennen nan GC List."
    },
    vip: {
      ...baseDictionaries.fr.vip,
      title: "Pase nan nivo VIP.",
      subtitle: "Aksè priyoritè, alèt imedya ak òf rezève.",
      compareTitle: "GC List vs VIP GC List",
      rows: [
        { label: "Kominote", gc: "Wi", vip: "Wi" },
        { label: "Avantaj patnè", gc: "Wi", vip: "Wi" },
        { label: "Notifikasyon", gc: "An reta", vip: "Imedya" },
        { label: "Aksè priyoritè", gc: "Non", vip: "Wi" },
        { label: "Òf VIP", gc: "Non", vip: "Wi" },
        { label: "Badge VIP", gc: "Non", vip: "Wi" }
      ]
    },
    events: {
      title: "Events ap vini byento",
      subtitle:
        "Pwochen events Golden Circle Caraïbes yo ap chwazi ak patnè nou yo.",
      emptyTitle: "Events ap vini byento",
      emptyText:
        "Pwochen events Golden Circle Caraïbes yo ap chwazi ak patnè nou yo. Tounen byento pou dekouvri aktivasyon, sware, eksperyans ak opòtinite pou kominote a.",
      organizerTitle: "Ou òganize yon event?",
      organizerText:
        "Golden Circle Caraïbes ka ede w fè pwomosyon event ou, touche piblik lokal ak touris, kreye kontni, jenere enskripsyon epi aktive yon kanpay QR code teren.",
      memberTitle: "Rete enfòme sou pwochen events yo",
      memberText:
        "Antre nan GC List pou resevwa pwochen anons, bon plan, aksè patnè ak opòtinite Golden Circle.",
      confirmedNote:
        "Pa gen event ki pibliye avan li konfime."
    },
    deals: {
      ...baseDictionaries.fr.deals,
      title: "Avantaj patnè ap vini byento",
      subtitle:
        "Avantaj patnè Golden Circle Caraïbes yo ap chwazi.",
      emptyTitle: "Avantaj patnè ap vini byento",
      emptyText:
        "Avantaj patnè Golden Circle Caraïbes yo ap chwazi. Òf yo ap pibliye sèlman apre konfimasyon ak etablisman, òganizatè ak patnè ki konsène yo.",
      categoriesTitle: "Kategori avantaj pou pita",
      confirmedNote:
        "Òf yo ap parèt sèlman lè yo konfime.",
      partnerTitle: "Ou vle pwopoze yon avantaj?",
      partnerText:
        "Golden Circle Caraïbes chwazi patnè ki ka bay avantaj itil, serye, ki mache ak eksperyans premium kominote a.",
      memberTitle: "Aksede pwochen avantaj yo",
      memberText:
        "Antre nan GC List oswa pase VIP pou resevwa pwochen anons yo lè òf patnè yo konfime."
    },
    partners: {
      ...baseDictionaries.fr.partners,
      title: "Aktive aksè ou nan Circle la.",
      subtitle:
        "Golden Circle ede patnè yo touche lokal, vizitè, dyaspora ak òganizatè.",
      argumentsTitle: "Agiman patnè"
    },
    legalPage: {
      title: "Avi legal",
      intro:
        "Golden Circle Caraïbes devlope epi opere komèsyalman pa:",
      offersTitle: "Òf komèsyal CSS pwopoze",
      note:
        "Paj sa a pare pou konplete. Pa gen adrès, telefòn oswa email ki ajoute jiskaske enfòmasyon an bay."
    },
    language: {
      title: "Chwa lang",
      subtitle: "Chwazi lang ou. Chwa a ap sove nan navigatè ou.",
      saved: "Lang sove"
    },
    offers: {
      gcList: {
        ...baseDictionaries.fr.offers.gcList,
        period: "360 jou",
        intro: "Yon aksè senp nan sèk bon plan ak opòtinite.",
        cta: "Antre nan GC List"
      },
      vip: {
        ...baseDictionaries.fr.offers.vip,
        intro: "Eksperyans priyoritè pou pa rate anyen.",
        cta: "Pase VIP"
      }
    },
    footer: {
      line: "Golden Circle Caraïbes — L'accès aux privilèges."
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export const legalOffers = [
  "GC List",
  "VIP GC List",
  "Golden Boost",
  "GC Studio",
  "GC Deals",
  "Golden Link",
  "Golden Chain",
  "collaborations événementielles",
  "partenariats commerciaux"
];

export { brand, legal, links };
