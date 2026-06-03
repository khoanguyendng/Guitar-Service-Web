import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("faqs").select("*").order("category").order("sort_order");
    if (error) throw error;
    return NextResponse.json({ faqs: data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("faqs").insert(body as never).select().single();
    if (error) throw error;
    return NextResponse.json({ faq: data });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
