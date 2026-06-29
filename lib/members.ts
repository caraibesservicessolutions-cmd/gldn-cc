import type { Locale } from "@/lib/i18n";

export type MemberType =
  | "founder"
  | "gc_list"
  | "vip"
  | "partner_pro"
  | "event_organizer"
  | "admin";

export type MemberStatus =
  | "active"
  | "pending"
  | "expired"
  | "suspended"
  | "deleted";

export type MemberLanguage = Locale;

export type Member = {
  id: string;
  secretId: string;
  fullName: string;
  email?: string;
  phone?: string;
  instagram?: string;
  type: MemberType;
  status: MemberStatus;
  language: MemberLanguage;
  location?: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type MemberInput = Omit<
  Member,
  "id" | "secretId" | "createdAt" | "updatedAt"
>;

export const memberStorageKey = "golden-circle-local-members";

export const memberTypes: MemberType[] = [
  "founder",
  "gc_list",
  "vip",
  "partner_pro",
  "event_organizer",
  "admin"
];

export const memberStatuses: MemberStatus[] = [
  "active",
  "pending",
  "expired",
  "suspended",
  "deleted"
];

export const memberTypePrefix: Record<MemberType, string> = {
  founder: "F",
  gc_list: "M",
  vip: "V",
  partner_pro: "P",
  event_organizer: "E",
  admin: "A"
};

export const memberTypeLabels: Record<Locale, Record<MemberType, string>> = {
  fr: {
    founder: "Membre Fondateur",
    gc_list: "Membre GC List",
    vip: "Membre VIP GC List",
    partner_pro: "Partenaire Pro",
    event_organizer: "Organisateur Event",
    admin: "Admin"
  },
  en: {
    founder: "Founding Member",
    gc_list: "GC List Member",
    vip: "VIP GC List Member",
    partner_pro: "Pro Partner",
    event_organizer: "Event Organizer",
    admin: "Admin"
  },
  es: {
    founder: "Miembro Fundador",
    gc_list: "Miembro GC List",
    vip: "Miembro VIP GC List",
    partner_pro: "Partner Pro",
    event_organizer: "Organizador Event",
    admin: "Admin"
  },
  pt: {
    founder: "Membro Fundador",
    gc_list: "Membro GC List",
    vip: "Membro VIP GC List",
    partner_pro: "Parceiro Pro",
    event_organizer: "Organizador de Evento",
    admin: "Admin"
  },
  // Kreyòl Ayisyen copy is intentionally simple and should be reviewed by a native speaker before production.
  ht: {
    founder: "Manm Fondatè",
    gc_list: "Manm GC List",
    vip: "Manm VIP GC List",
    partner_pro: "Patnè Pro",
    event_organizer: "Òganizatè Event",
    admin: "Admin"
  }
};

export const memberStatusLabels: Record<Locale, Record<MemberStatus, string>> = {
  fr: {
    active: "Compte actif",
    pending: "En attente de validation",
    expired: "Expiré",
    suspended: "Compte suspendu",
    deleted: "Compte supprimé ou désactivé"
  },
  en: {
    active: "Active account",
    pending: "Pending validation",
    expired: "Expired",
    suspended: "Suspended account",
    deleted: "Deleted or disabled account"
  },
  es: {
    active: "Cuenta activa",
    pending: "Pendiente de validación",
    expired: "Expirado",
    suspended: "Cuenta suspendida",
    deleted: "Cuenta eliminada o desactivada"
  },
  pt: {
    active: "Conta ativa",
    pending: "Aguardando validação",
    expired: "Expirada",
    suspended: "Conta suspensa",
    deleted: "Conta removida ou desativada"
  },
  ht: {
    active: "Kont aktif",
    pending: "Ap tann validasyon",
    expired: "Ekspire",
    suspended: "Kont sispann",
    deleted: "Kont efase oswa dezaktive"
  }
};

const now = "2026-06-21T00:00:00.000Z";

export const seedMembers: Member[] = [
  {
    id: "seed-founder",
    secretId: "GC-2026-F001",
    fullName: "Membre Fondateur",
    instagram: "@gld.crcl",
    type: "founder",
    status: "active",
    language: "fr",
    location: "Caraïbes",
    startDate: "2026-06-21",
    endDate: "2026-12-31",
    notes: "Carte locale de validation.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "seed-vip",
    secretId: "GC-2026-V001",
    fullName: "Membre VIP",
    instagram: "@gld.crcl",
    type: "vip",
    status: "active",
    language: "fr",
    location: "Guadeloupe",
    startDate: "2026-06-21",
    endDate: "2026-07-21",
    createdAt: now,
    updatedAt: now
  }
];

export function normalizeMember(member: Partial<Member>): Member {
  const createdAt = member.createdAt ?? new Date().toISOString();

  return {
    id: member.id ?? crypto.randomUUID(),
    secretId: member.secretId ?? "GC-2026-M000",
    fullName: member.fullName ?? "",
    email: member.email ?? "",
    phone: member.phone ?? "",
    instagram: member.instagram ?? "",
    type: member.type ?? "gc_list",
    status: member.status ?? "active",
    language: member.language ?? "fr",
    location: member.location ?? "",
    startDate: member.startDate ?? new Date().toISOString().slice(0, 10),
    endDate: member.endDate ?? "",
    notes: member.notes ?? "",
    createdAt,
    updatedAt: member.updatedAt ?? createdAt
  };
}

export function generateSecretId(type: MemberType, members: Member[]) {
  const prefix = memberTypePrefix[type];
  const usedNumbers = members
    .map((member) => member.secretId.match(new RegExp(`GC-2026-${prefix}(\\d{3})`, "i")))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => Number(match[1]));
  let nextNumber = 1;

  while (usedNumbers.includes(nextNumber)) {
    nextNumber += 1;
  }

  return `GC-2026-${prefix}${String(nextNumber).padStart(3, "0")}`;
}

export function createMember(data: MemberInput, members: Member[]): Member {
  const createdAt = new Date().toISOString();

  return {
    ...data,
    id: crypto.randomUUID(),
    secretId: generateSecretId(data.type, members),
    fullName: data.fullName.trim(),
    createdAt,
    updatedAt: createdAt
  };
}

export function updateMember(
  id: string,
  data: Partial<MemberInput>,
  members: Member[]
) {
  return members.map((member) =>
    member.id === id
      ? { ...member, ...data, updatedAt: new Date().toISOString() }
      : member
  );
}

export function suspendMember(id: string, members: Member[]) {
  return updateMember(id, { status: "suspended" }, members);
}

export function reactivateMember(id: string, members: Member[]) {
  return updateMember(id, { status: "active" }, members);
}

export function softDeleteMember(id: string, members: Member[]) {
  return updateMember(id, { status: "deleted" }, members);
}

export function hardDeleteMember(id: string, members: Member[]) {
  return members.filter((member) => member.id !== id);
}

export function getMemberBySecretId(secretId: string, members: Member[]) {
  return members.find(
    (member) => member.secretId.toLowerCase() === secretId.toLowerCase()
  );
}

export function findMemberBySecretId(secretId: string) {
  return getMemberBySecretId(secretId, seedMembers);
}

export function getStoredMembers() {
  if (typeof window === "undefined") return seedMembers;

  const saved = window.localStorage.getItem(memberStorageKey);
  if (!saved) return seedMembers;

  try {
    return (JSON.parse(saved) as Partial<Member>[]).map(normalizeMember);
  } catch {
    return seedMembers;
  }
}

export function getPublicCardUrl(locale: Locale, secretId: string) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://gldn-cc.vercel.app");

  return `${siteUrl.replace(/\/$/, "")}/${locale}/card/${secretId}`;
}

export const memberPageText: Record<
  Locale,
  {
    cardTitle: string;
    cardText: string;
    validUntil: string;
    preferredLanguage: string;
    secretId: string;
    share: string;
    back: string;
    qrLabel: string;
    copyLink: string;
    copySecret: string;
    downloadCard: string;
    cardNotice: string;
    unavailable: string;
    publicWarning: string;
    spacesTitle: string;
    spacesText: string;
    adminTitle: string;
    adminText: string;
  }
> = {
  fr: {
    cardTitle: "Carte virtuelle membre",
    cardText: "Une carte mobile pour identifier le statut Golden Circle.",
    validUntil: "Valide jusqu'au",
    preferredLanguage: "Langue préférée",
    secretId: "Secret ID",
    share: "Partager la carte",
    back: "Retour au Cercle",
    qrLabel: "QR code de vérification",
    copyLink: "Copier le lien",
    copySecret: "Copier le Secret ID",
    downloadCard: "Télécharger la carte",
    cardNotice:
      "Cette carte permet de vérifier un statut Golden Circle. Les avantages dépendent uniquement des offres confirmées par les partenaires.",
    unavailable: "Carte introuvable ou non encore synchronisée.",
    publicWarning:
      "Cette vérification publique n’affiche pas les notes admin ni les données internes.",
    spacesTitle: "Espaces Golden Circle",
    spacesText:
      "Les espaces membres, VIP, partenaires et organisateurs préparent la future gestion connectée.",
    adminTitle: "Admin comptes Golden Circle",
    adminText:
      "Gestion locale de démonstration, préparée pour Supabase. Les données créées ici restent dans ce navigateur."
  },
  en: {
    cardTitle: "Member virtual card",
    cardText: "A mobile card to identify a Golden Circle status.",
    validUntil: "Valid until",
    preferredLanguage: "Preferred language",
    secretId: "Secret ID",
    share: "Share card",
    back: "Back to the Circle",
    qrLabel: "Verification QR code",
    copyLink: "Copy card link",
    copySecret: "Copy Secret ID",
    downloadCard: "Download card",
    cardNotice:
      "This card verifies a Golden Circle status. Benefits depend only on offers confirmed by partners.",
    unavailable: "Card not found or not synchronized yet.",
    publicWarning:
      "This public verification does not display admin notes or internal data.",
    spacesTitle: "Golden Circle spaces",
    spacesText:
      "Member, VIP, partner and organizer spaces prepare the future connected management system.",
    adminTitle: "Golden Circle account admin",
    adminText:
      "Local management prepared for Supabase. Data created here stays in this browser."
  },
  es: {
    cardTitle: "Tarjeta virtual miembro",
    cardText: "Una tarjeta móvil para identificar un estatus Golden Circle.",
    validUntil: "Válida hasta",
    preferredLanguage: "Idioma preferido",
    secretId: "Secret ID",
    share: "Compartir tarjeta",
    back: "Volver al Círculo",
    qrLabel: "QR code de verificación",
    copyLink: "Copiar enlace",
    copySecret: "Copiar Secret ID",
    downloadCard: "Descargar tarjeta",
    cardNotice:
      "Esta tarjeta permite verificar un estatus Golden Circle. Las ventajas dependen únicamente de ofertas confirmadas por partners.",
    unavailable: "Tarjeta no encontrada o aún no sincronizada.",
    publicWarning:
      "Esta verificación pública no muestra notas admin ni datos internos.",
    spacesTitle: "Espacios Golden Circle",
    spacesText:
      "Los espacios miembros, VIP, partners y organizadores preparan la futura gestión conectada.",
    adminTitle: "Admin cuentas Golden Circle",
    adminText:
      "Gestión local preparada para Supabase. Los datos creados aquí permanecen en este navegador."
  },
  pt: {
    cardTitle: "Cartão virtual de membro",
    cardText: "Um cartão móvel para identificar um status Golden Circle.",
    validUntil: "Válido até",
    preferredLanguage: "Idioma preferido",
    secretId: "Secret ID",
    share: "Compartilhar cartão",
    back: "Voltar ao Círculo",
    qrLabel: "QR code de verificação",
    copyLink: "Copiar link",
    copySecret: "Copiar Secret ID",
    downloadCard: "Baixar cartão",
    cardNotice:
      "Este cartão verifica um status Golden Circle. Os benefícios dependem apenas de ofertas confirmadas por parceiros.",
    unavailable: "Cartão não encontrado ou ainda não sincronizado.",
    publicWarning:
      "Esta verificação pública não mostra notas admin nem dados internos.",
    spacesTitle: "Espaços Golden Circle",
    spacesText:
      "Os espaços de membros, VIP, parceiros e organizadores preparam a futura gestão conectada.",
    adminTitle: "Admin de contas Golden Circle",
    adminText:
      "Gestão local preparada para Supabase. Os dados criados aqui ficam neste navegador."
  },
  ht: {
    cardTitle: "Kat vityèl manm",
    cardText: "Yon kat mobil pou idantifye estati Golden Circle.",
    validUntil: "Valab jiska",
    preferredLanguage: "Lang prefere",
    secretId: "Secret ID",
    share: "Pataje kat la",
    back: "Tounen nan Circle la",
    qrLabel: "QR code verifikasyon",
    copyLink: "Kopye lyen an",
    copySecret: "Kopye Secret ID",
    downloadCard: "Telechaje kat la",
    cardNotice:
      "Kat sa a verifye estati Golden Circle. Avantaj yo depann sèlman de òf patnè ki konfime.",
    unavailable: "Kat la pa jwenn oswa li poko senkronize.",
    publicWarning:
      "Verifikasyon piblik sa a pa montre nòt admin ni done entèn.",
    spacesTitle: "Espas Golden Circle",
    spacesText:
      "Espas manm, VIP, patnè ak òganizatè yo prepare jesyon konekte pou pita.",
    adminTitle: "Admin kont Golden Circle",
    adminText:
      "Jesyon lokal ki prepare pou Supabase. Done ki kreye isit la rete nan navigatè sa a."
  }
};
