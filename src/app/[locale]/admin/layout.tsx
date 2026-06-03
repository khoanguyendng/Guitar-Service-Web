import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect(`/${locale}/login`);
  } catch {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar locale={locale} />
      {/* Content offset for desktop sidebar */}
      <div className="flex-1 md:ml-60 min-h-screen bg-background">
        {children}
      </div>
    </div>
  );
}
