import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ posts: data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("blog_posts").insert(body as never).select().single();
    if (error) throw error;
    return NextResponse.json({ post: data });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
