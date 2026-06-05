import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Music2, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");
  const services = useTranslations("services");

  return (
    <footer className="bg-foreground text-background dark:bg-card dark:text-card-foreground dark:border-t dark:border-border">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full border border-background/20 flex items-center justify-center">
                <Music2 className="w-4 h-4 opacity-80" />
              </div>
              <span className="font-heading text-xl tracking-wide">Torigo</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed italic font-heading">
              &ldquo;{t("tagline")}&rdquo;
            </p>

            {/* Ornament */}
            <div className="mt-6 flex items-center gap-3 opacity-30">
              <div className="h-px flex-1 bg-current" />
              <span className="text-xs">◆</span>
              <div className="h-px flex-1 bg-current" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.25em] uppercase opacity-50 mb-5">
              {t("nav_title")}
            </h4>
            <ul className="space-y-2.5">
              {(["home", "services", "gallery", "about", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "home" ? "/" : `/${key}`}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.25em] uppercase opacity-50 mb-5">
              {t("services_title")}
            </h4>
            <ul className="space-y-2.5">
              {(["service_setup", "service_repair", "service_restoration", "service_electronics"] as const).map(
                (key) => (
                  <li key={key}>
                    <Link
                      href="/services"
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {t(key)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.25em] uppercase opacity-50 mb-5">
              {t("contact_title")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 opacity-60" />
                <span>{contact("address")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Phone className="w-4 h-4 shrink-0 opacity-60" />
                <span>{contact("phone")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Mail className="w-4 h-4 shrink-0 opacity-60" />
                <span>{contact("email")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Clock className="w-4 h-4 shrink-0 opacity-60" />
                <span>{contact("hours")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-current/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs opacity-40 font-mono">{t("copyright")}</p>
          <p className="text-xs opacity-30 font-mono italic">{t("made_with")} ♪</p>
        </div>
      </div>
    </footer>
  );
}
