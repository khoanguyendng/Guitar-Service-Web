import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error) throw error;
    return NextResponse.json({ settings: data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { settings } = await req.json() as { settings: { key: string; value_en: string }[] };
    const supabase = await createAdminClient();
    const results = await Promise.allSettled(
      settings.map(({ key, value_en }) =>
        supabase.from("site_settings").upsert({ key, value_en, updated_at: new Date().toISOString() } as never)
      )
    );
    return NextResponse.json({ success: true, results: results.length });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
