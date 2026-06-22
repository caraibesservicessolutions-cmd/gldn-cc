import { NextResponse } from "next/server";
import {
  hardDeleteSupabaseMember,
  softDeleteSupabaseMember
} from "@/src/lib/members/member.supabase";
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
    return NextResponse.json({ error: "Supabase non configuré." }, { status: 503 });
  }

  try {
    const { id } = await params;
    return NextResponse.json({
      data: await softDeleteSupabaseMember(id),
      mode: "supabase"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!assertAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase non configuré." }, { status: 503 });
  }

  try {
    const { id } = await params;
    await hardDeleteSupabaseMember(id);
    return NextResponse.json({ data: null, mode: "supabase" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase error" },
      { status: 500 }
    );
  }
}
