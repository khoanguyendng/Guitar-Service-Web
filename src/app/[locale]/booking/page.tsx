import { useTranslations } from "next-intl";

export default function BookingPage() {
  const t = useTranslations("booking");
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      {/* BookingForm component goes here */}
    </main>
  );
}
