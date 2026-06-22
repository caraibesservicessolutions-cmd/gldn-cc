import type {
  Member,
  MemberApiResponse,
  MemberInput,
  MemberStatus,
  MemberStorageMode
} from "@/src/lib/members/member.types";
import {
  createLocalMember,
  getLocalMemberBySecretId,
  hardDeleteLocalMember,
  listLocalMembers,
  setLocalMemberStatus,
  updateLocalMember
} from "@/src/lib/members/member.storage";

function configuredMode(): MemberStorageMode {
  return process.env.NEXT_PUBLIC_MEMBER_STORAGE_MODE === "supabase"
    ? "supabase"
    : "local";
}

function getAdminCode() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("golden-circle-admin-code") || "";
}

async function requestJson<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-admin-code": getAdminCode(),
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return (await response.json()) as MemberApiResponse<T>;
}

async function withFallback<T>(
  supabaseCall: () => Promise<T>,
  localCall: () => Promise<T>
) {
  if (configuredMode() !== "supabase") {
    return { data: await localCall(), mode: "local" as const };
  }

  try {
    const data = await supabaseCall();
    return { data, mode: "supabase" as const };
  } catch (error) {
    return {
      data: await localCall(),
      mode: "local" as const,
      developerMessage:
        error instanceof Error
          ? `Supabase indisponible, fallback localStorage actif: ${error.message}`
          : "Supabase indisponible, fallback localStorage actif."
    };
  }
}

export const memberService = {
  async listMembers() {
    return withFallback(
      async () => (await requestJson<Member[]>("/api/admin/members")).data,
      listLocalMembers
    );
  },

  async createMember(data: MemberInput) {
    return withFallback(
      async () =>
        (await requestJson<Member>("/api/admin/members", {
          method: "POST",
          body: JSON.stringify(data)
        })).data,
      () => createLocalMember(data)
    );
  },

  async updateMember(id: string, data: Partial<MemberInput>) {
    return withFallback(
      async () =>
        (await requestJson<Member>(`/api/admin/members/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data)
        })).data,
      async () => updateLocalMember(id, data)
    );
  },

  async suspendMember(id: string) {
    return this.setStatus(id, "suspended", "suspend");
  },

  async reactivateMember(id: string) {
    return this.setStatus(id, "active", "reactivate");
  },

  async softDeleteMember(id: string) {
    return withFallback(
      async () =>
        (await requestJson<Member>(`/api/admin/members/${id}/delete`, {
          method: "PATCH"
        })).data,
      () => setLocalMemberStatus(id, "deleted")
    );
  },

  async hardDeleteMember(id: string) {
    return withFallback(
      async () =>
        (await requestJson<null>(`/api/admin/members/${id}/delete`, {
          method: "DELETE"
        })).data,
      async () => {
        await hardDeleteLocalMember(id);
        return null;
      }
    );
  },

  async getMemberBySecretId(secretId: string) {
    return withFallback(
      async () =>
        (await requestJson<Member | null>(`/api/card/${secretId}`, {
          headers: {}
        })).data,
      () => getLocalMemberBySecretId(secretId)
    );
  },

  async setStatus(
    id: string,
    status: MemberStatus,
    action: "suspend" | "reactivate"
  ) {
    return withFallback(
      async () =>
        (await requestJson<Member>(`/api/admin/members/${id}/${action}`, {
          method: "PATCH"
        })).data,
      () => setLocalMemberStatus(id, status)
    );
  }
};
