import { NextResponse } from "next/server";
import { updateSupabaseMember } from "@/src/lib/members/member.supabase";
import type { MemberInput } from "@/src/lib/members/member.types";
import { isSupabaseAdminConfigured } from "@/src/lib/supabase/admin";

function assertAdmin(request: Request) {
  const expected = process.env.NEXT_PUBLIC_ADMIN_DEMO_CODE || "GC-DEMO-2026";
  return request.headers.get("x-admin-code") === expected;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!assertAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { developerMessage: "Supabase non configuré." },
      { status: 503 }
    );
  }

  try {
    const { id } = await params;
    const input = (await request.json()) as Partial<MemberInput>;
    return NextResponse.json({
      data: await updateSupabaseMember(id, input),
      mode: "supabase"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase error" },
      { status: 500 }
    );
  }
}
