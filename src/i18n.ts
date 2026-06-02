import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locales.includes(locale as Locale)) notFound();

  // Static imports so Turbopack can resolve them at build time
  const messages =
    locale === "en"
      ? (await import("../messages/en.json")).default
      : (await import("../messages/vi.json")).default;

  return { locale: locale as string, messages };
});
