import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Music2, ChevronDown } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0603] dark:bg-[#06030100]" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-stone-950/80 to-amber-950/40" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      {/* Subtle horizontal lines for retro TV feel */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)", backgroundSize: "100% 4px" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex items-center justify-center gap-3 mb-10 animate-fade-up">
          <div className="h-px w-12 bg-amber-400/40" />
          <div className="flex items-center gap-2 px-4 py-1.5 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <Music2 className="w-3 h-3 text-amber-400" />
            <span className="text-amber-400/90 text-[10px] font-mono tracking-[0.35em] uppercase">
              {t("badge")}
            </span>
          </div>
          <div className="h-px w-12 bg-amber-400/40" />
        </div>

        {/* Main Heading */}
        <div className="animate-fade-up animate-delay-100 mb-3">
          <h1 className="font-heading leading-[0.9] tracking-tight text-amber-50">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light">
              {t("line1")}
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic text-amber-400">
              {t("line2")}
            </span>
          </h1>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-8 animate-fade-up animate-delay-200">
          <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-amber-600/50" />
          <span className="text-amber-500/70 text-sm">◆</span>
          <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-amber-600/50" />
        </div>

        {/* Subtitle */}
        <p className="text-amber-100/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light tracking-wide animate-fade-up animate-delay-300 mb-10">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-500">
          <Link
            href="/booking"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,6,0.4)]"
          >
            {t("cta_booking")}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-amber-400/40 text-amber-200/80 hover:border-amber-400/70 hover:text-amber-100 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm"
          >
            {t("cta_services")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-400/40 hover:text-amber-400/70 transition-colors group"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">{t("scroll")}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
