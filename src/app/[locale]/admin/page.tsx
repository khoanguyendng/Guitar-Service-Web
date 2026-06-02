import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createAdminClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-muted-foreground">{bookings?.length ?? 0} bookings</p>
    </div>
  );
}
