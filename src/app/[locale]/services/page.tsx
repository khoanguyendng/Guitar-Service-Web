import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const t = useTranslations("services");
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <div key={service.id} className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{service.name_vi}</h2>
            <p className="mt-2 text-muted-foreground">{service.description_vi}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
