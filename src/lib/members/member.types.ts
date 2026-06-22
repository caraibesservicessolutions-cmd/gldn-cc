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

export type MemberStorageMode = "local" | "supabase";

export type MemberApiResponse<T> = {
  data: T;
  mode: MemberStorageMode;
  developerMessage?: string;
};
