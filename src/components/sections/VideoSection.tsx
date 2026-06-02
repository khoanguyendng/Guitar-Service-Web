import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

// Replace with actual YouTube video ID when available
const VIDEO_ID = "";

export function VideoSection() {
  const t = useTranslations("video");

  return (
    <section className="py-24 sm:py-32 bg-[#0a0603] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(180,83,9,0.1),transparent)]" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.4) 2px,rgba(255,255,255,0.4) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-amber-500/60 mb-4">
          — {t("badge")} —
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-amber-50/90 mb-4 leading-tight">
          {t("title")}
        </h2>
        <p className="text-amber-100/50 text-base max-w-lg mx-auto mb-12 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Video embed / placeholder */}
        <div className="relative border border-amber-900/40 overflow-hidden">
          {VIDEO_ID ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={t("title")}
              />
            </div>
          ) : (
            <div className="aspect-video bg-black/50 flex flex-col items-center justify-center gap-6 group cursor-pointer">
              {/* Faint guitar string lines */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-amber-500/5"
                  style={{ top: `${20 + i * 12}%` }}
                />
              ))}

              {/* Play button */}
              <div className="relative w-20 h-20 rounded-full border-2 border-amber-500/50 bg-amber-600/15 flex items-center justify-center group-hover:bg-amber-600/30 group-hover:border-amber-500/80 transition-all duration-300">
                <Play className="w-8 h-8 text-amber-400 ml-1" fill="currentColor" />
                <div className="absolute inset-0 rounded-full border border-amber-500/20 scale-125 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              <div className="text-center">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/50 mb-1">
                  {t("caption")}
                </p>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-amber-500/30">
                  {t("hint")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
