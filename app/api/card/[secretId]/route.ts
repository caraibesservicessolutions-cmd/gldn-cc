import { NextResponse } from "next/server";
import { getSupabaseMemberBySecretId } from "@/src/lib/members/member.supabase";
import { isSupabaseAdminConfigured } from "@/src/lib/supabase/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ secretId: string }> }
) {
  if (!isSupabaseAdminConfigured()) {
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

  try {
    const { secretId } = await params;
    return NextResponse.json({
      data: await getSupabaseMemberBySecretId(secretId),
      mode: "supabase"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase error" },
      { status: 500 }
    );
  }
}
