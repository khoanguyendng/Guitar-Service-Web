import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("services").update(body as never).eq("id", id).select().single();
    if (error) throw error;
    return NextResponse.json({ service: data });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
