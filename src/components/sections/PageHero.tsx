interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0a0603]" />
      {/* Amber gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-stone-950/80 to-amber-950/30" />
      {/* Scanline retro texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
          backgroundSize: "100% 4px",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-10 bg-amber-400/40" />
          <span className="px-4 py-1.5 border border-amber-500/30 rounded-full text-amber-400/90 text-[10px] font-mono tracking-[0.35em] uppercase backdrop-blur-sm">
            {badge}
          </span>
          <div className="h-px w-10 bg-amber-400/40" />
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-amber-50 mb-6 leading-tight">
          {title}
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-600/50" />
          <span className="text-amber-500/70 text-sm">◆</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-600/50" />
        </div>

        {/* Subtitle */}
        <p className="text-amber-100/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light italic tracking-wide">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
