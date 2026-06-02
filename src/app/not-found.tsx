import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0603] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-stone-950/80 to-amber-950/40" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      {/* Scanline texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Large outlined 404 */}
        <div className="mb-2 leading-none select-none" aria-hidden="true">
          <span
            className="font-heading font-bold block"
            style={{
              fontSize: "clamp(6rem, 22vw, 16rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(217,119,6,0.35)",
              lineHeight: 1,
            }}
          >
            404
          </span>
        </div>

        {/* Solid 404 overlay */}
        <h1
          className="font-heading font-bold text-amber-50 mt-[-0.5em] mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          404
        </h1>

        {/* Subtitle */}
        <h2 className="font-heading text-xl sm:text-2xl text-amber-100/80 mb-4">
          Page Not Found
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-600/50" />
          <span className="text-amber-500/70 text-sm">◆</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-600/50" />
        </div>

        <p className="text-amber-100/40 text-sm font-mono tracking-wider mb-10 italic">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển
        </p>

        {/* Back to home button */}
        <Link
          href="/vi"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,6,0.4)]"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
