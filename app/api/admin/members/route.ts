import { NextResponse } from "next/server";
import {
  createSupabaseMember,
  listSupabaseMembers
} from "@/src/lib/members/member.supabase";
import type { MemberInput } from "@/src/lib/members/member.types";
import { isSupabaseAdminConfigured } from "@/src/lib/supabase/admin";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function assertAdmin(request: Request) {
  const expected = process.env.NEXT_PUBLIC_ADMIN_DEMO_CODE || "GC-DEMO-2026";
  return request.headers.get("x-admin-code") === expected;
}

function supabaseUnavailable() {
  return NextResponse.json(
    {
      data: null,
      mode: "local",
      developerMessage:
        "Supabase n'est pas configuré côté serveur. Fallback localStorage requis."
    },
    { status: 503 }
  );
}

export async function GET(request: Request) {
  if (!assertAdmin(request)) return unauthorized();
  if (!isSupabaseAdminConfigured()) return supabaseUnavailable();

  try {
    return NextResponse.json({
      data: await listSupabaseMembers(),
      mode: "supabase"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!assertAdmin(request)) return unauthorized();
  if (!isSupabaseAdminConfigured()) return supabaseUnavailable();

  try {
    const input = (await request.json()) as MemberInput;
    return NextResponse.json({
      data: await createSupabaseMember(input),
      mode: "supabase"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase error" },
      { status: 500 }
    );
  }
}
