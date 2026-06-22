import type { Member, MemberInput } from "@/src/lib/members/member.types";
import {
  createMember,
  demoMembers,
  getMemberBySecretId,
  memberStorageKey,
  normalizeMember
} from "@/src/lib/members/member.utils";

export function getLocalMembers() {
  if (typeof window === "undefined") return demoMembers;

  const saved = window.localStorage.getItem(memberStorageKey);
  if (!saved) return demoMembers;

  try {
    return (JSON.parse(saved) as Partial<Member>[]).map(normalizeMember);
  } catch {
    return demoMembers;
  }
}

export function saveLocalMembers(members: Member[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(memberStorageKey, JSON.stringify(members));
}

export async function listLocalMembers() {
  return getLocalMembers();
}

export async function createLocalMember(data: MemberInput) {
  const members = getLocalMembers();
  const member = createMember(data, members);
  saveLocalMembers([member, ...members]);
  return member;
}

export async function updateLocalMember(id: string, data: Partial<MemberInput>) {
  const members = getLocalMembers();
  const nextMembers = members.map((member) =>
    member.id === id
      ? { ...member, ...data, updatedAt: new Date().toISOString() }
      : member
  );
  saveLocalMembers(nextMembers);
  return nextMembers.find((member) => member.id === id) ?? null;
}

export async function setLocalMemberStatus(
  id: string,
  status: Member["status"]
) {
  return updateLocalMember(id, { status });
}

export async function hardDeleteLocalMember(id: string) {
  const nextMembers = getLocalMembers().filter((member) => member.id !== id);
  saveLocalMembers(nextMembers);
}

export async function getLocalMemberBySecretId(secretId: string) {
  return getMemberBySecretId(secretId, getLocalMembers()) ?? null;
}
