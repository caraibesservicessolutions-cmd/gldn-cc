import type { Locale } from "@/lib/i18n";
import type {
  Member,
  MemberInput,
  MemberStatus,
  MemberType
} from "@/src/lib/members/member.types";

export const memberStorageKey = "golden-circle-demo-members";

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

const now = "2026-06-21T00:00:00.000Z";

export const demoMembers: Member[] = [
  {
    id: "demo-founder",
    secretId: "GC-2026-F001",
    fullName: "Membre Fondateur Demo",
    instagram: "@gldn.crcl",
    type: "founder",
    status: "active",
    language: "fr",
    location: "Caraïbes",
    startDate: "2026-06-21",
    endDate: "2026-12-31",
    notes: "Carte de démonstration V2.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "demo-vip",
    secretId: "GC-2026-V001",
    fullName: "Membre VIP Demo",
    instagram: "@gldn.crcl",
    type: "vip",
    status: "active",
    language: "fr",
    location: "Guadeloupe",
    startDate: "2026-06-21",
    endDate: "2026-07-21",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "demo-expired",
    secretId: "GC-2026-M001",
    fullName: "Membre Expiré Demo",
    type: "gc_list",
    status: "expired",
    language: "fr",
    location: "Martinique",
    startDate: "2026-01-01",
    endDate: "2026-02-01",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "demo-suspended",
    secretId: "GC-2026-P001",
    fullName: "Partenaire Suspendu Demo",
    type: "partner_pro",
    status: "suspended",
    language: "fr",
    location: "Caraïbes",
    startDate: "2026-06-21",
    endDate: "2026-12-31",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "demo-deleted",
    secretId: "GC-2026-E001",
    fullName: "Organisateur Désactivé Demo",
    type: "event_organizer",
    status: "deleted",
    language: "fr",
    location: "Caraïbes",
    startDate: "2026-06-21",
    endDate: "2026-12-31",
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
    .map((member) =>
      member.secretId.match(new RegExp(`GC-2026-${prefix}(\\d{3})`, "i"))
    )
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

export function getMemberBySecretId(secretId: string, members: Member[]) {
  return members.find(
    (member) => member.secretId.toLowerCase() === secretId.toLowerCase()
  );
}

export function getPublicCardUrl(locale: Locale, secretId: string) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://gldn-cc.vercel.app");

  return `${siteUrl.replace(/\/$/, "")}/${locale}/card/${secretId}`;
}
