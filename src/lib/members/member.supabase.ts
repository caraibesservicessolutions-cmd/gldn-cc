import { createSupabaseAdminClient } from "@/src/lib/supabase/admin";
import type {
  Member,
  MemberInput,
  MemberStatus
} from "@/src/lib/members/member.types";
import { generateSecretId } from "@/src/lib/members/member.utils";

type MemberRow = {
  id: string;
  secret_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  type: Member["type"];
  status: MemberStatus;
  language: Member["language"];
  location: string | null;
  start_date: string;
  end_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};

export function rowToMember(row: MemberRow): Member {
  return {
    id: row.id,
    secretId: row.secret_id,
    fullName: row.full_name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    instagram: row.instagram ?? "",
    type: row.type,
    status: row.status,
    language: row.language,
    location: row.location ?? "",
    startDate: row.start_date,
    endDate: row.end_date ?? "",
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function memberToRow(data: MemberInput) {
  return {
    full_name: data.fullName,
    email: data.email || null,
    phone: data.phone || null,
    instagram: data.instagram || null,
    type: data.type,
    status: data.status,
    language: data.language,
    location: data.location || null,
    start_date: data.startDate,
    end_date: data.endDate || null,
    notes: data.notes || null,
    updated_at: new Date().toISOString()
  };
}

function getAdminClientOrThrow() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    throw new Error("Supabase admin is not configured.");
  }

  return supabase;
}

export async function listSupabaseMembers() {
  const supabase = getAdminClientOrThrow();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as MemberRow[]).map(rowToMember);
}

export async function createSupabaseMember(data: MemberInput) {
  const supabase = getAdminClientOrThrow();
  const members = await listSupabaseMembers();
  const secretId = generateSecretId(data.type, members);
  const now = new Date().toISOString();
  const { data: inserted, error } = await supabase
    .from("members")
    .insert({
      ...memberToRow(data),
      secret_id: secretId,
      created_at: now,
      updated_at: now
    })
    .select("*")
    .single();

  if (error) throw error;
  return rowToMember(inserted as MemberRow);
}

export async function updateSupabaseMember(
  id: string,
  data: Partial<MemberInput>
) {
  const supabase = getAdminClientOrThrow();
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (data.fullName !== undefined) row.full_name = data.fullName;
  if (data.email !== undefined) row.email = data.email || null;
  if (data.phone !== undefined) row.phone = data.phone || null;
  if (data.instagram !== undefined) row.instagram = data.instagram || null;
  if (data.type !== undefined) row.type = data.type;
  if (data.status !== undefined) row.status = data.status;
  if (data.language !== undefined) row.language = data.language;
  if (data.location !== undefined) row.location = data.location || null;
  if (data.startDate !== undefined) row.start_date = data.startDate;
  if (data.endDate !== undefined) row.end_date = data.endDate || null;
  if (data.notes !== undefined) row.notes = data.notes || null;

  const { data: updated, error } = await supabase
    .from("members")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToMember(updated as MemberRow);
}

export async function setSupabaseMemberStatus(
  id: string,
  status: MemberStatus
) {
  return updateSupabaseMember(id, { status });
}

export async function softDeleteSupabaseMember(id: string) {
  const supabase = getAdminClientOrThrow();
  const { data, error } = await supabase
    .from("members")
    .update({
      status: "deleted",
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToMember(data as MemberRow);
}

export async function hardDeleteSupabaseMember(id: string) {
  const supabase = getAdminClientOrThrow();
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) throw error;
}

export async function getSupabaseMemberBySecretId(secretId: string) {
  const supabase = getAdminClientOrThrow();
  const { data, error } = await supabase
    .from("members")
    .select(
      "id, secret_id, full_name, instagram, type, status, language, location, start_date, end_date, created_at, updated_at"
    )
    .eq("secret_id", secretId)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToMember({ ...(data as MemberRow), notes: null }) : null;
}
