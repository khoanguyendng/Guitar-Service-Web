"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Music2, ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const t = useTranslations("hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; r: number; a: number; speed: number; drift: number }[] = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        speed: Math.random() * 0.3 + 0.1,
        drift: (Math.random() - 0.5) * 0.2,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,119,6,${p.a * 0.5})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        p.a += (Math.random() - 0.5) * 0.02;
        p.a = Math.max(0.1, Math.min(0.8, p.a));
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0603]">

      {/* Layered background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-stone-950/70 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(180,83,9,0.18),transparent)]" />

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.4) 2px,rgba(255,255,255,0.4) 3px)", backgroundSize: "100% 4px" }} />

      {/* Ghost background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading font-black text-[22vw] leading-none tracking-tighter opacity-[0.028] text-amber-300 whitespace-nowrap">
          GUITAR
        </span>
      </div>

      {/* Floating particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-24 left-8 opacity-20 hidden lg:block">
        <div className="w-12 h-12 border-l-2 border-t-2 border-amber-500/60" />
      </div>
      <div className="absolute top-24 right-8 opacity-20 hidden lg:block">
        <div className="w-12 h-12 border-r-2 border-t-2 border-amber-500/60" />
      </div>
      <div className="absolute bottom-20 left-8 opacity-20 hidden lg:block">
        <div className="w-12 h-12 border-l-2 border-b-2 border-amber-500/60" />
      </div>
      <div className="absolute bottom-20 right-8 opacity-20 hidden lg:block">
        <div className="w-12 h-12 border-r-2 border-b-2 border-amber-500/60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto w-full">

        {/* Top badge */}
        <div className="flex items-center justify-center gap-4 mb-10 animate-fade-up">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
          <div className="flex items-center gap-2.5 px-5 py-2 border border-amber-500/25 bg-amber-500/5 backdrop-blur-sm rounded-full">
            <Music2 className="w-3 h-3 text-amber-400/80" />
            <span className="text-amber-400/80 text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase">
              {t("badge")}
            </span>
          </div>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Heading */}
        <div className="mb-6 animate-fade-up animate-delay-100">
          <h1 className="font-heading leading-[0.88] tracking-tight">
            <span className="block text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] xl:text-[9rem] font-light text-amber-50/90">
              {t("line1")}
            </span>
            <span className="block text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] xl:text-[9rem] font-bold italic text-amber-400">
              {t("line2")}
            </span>
          </h1>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 my-7 sm:my-9 animate-fade-up animate-delay-200">
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-600/60" />
          <span className="text-amber-500/60 text-xs">◆</span>
          <div className="h-px w-6 sm:w-10 bg-amber-600/40" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-amber-500/50">Since 2000</span>
          <div className="h-px w-6 sm:w-10 bg-amber-600/40" />
          <span className="text-amber-500/60 text-xs">◆</span>
          <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-600/60" />
        </div>

        {/* Subtitle */}
        <p className="text-amber-100/55 text-base sm:text-lg max-w-lg mx-auto leading-relaxed font-light tracking-wide animate-fade-up animate-delay-300 mb-10 sm:mb-12">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-500">
          <Link
            href="/booking"
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-mono tracking-[0.25em] uppercase transition-all duration-300 overflow-hidden hover:shadow-[0_0_32px_rgba(217,119,6,0.5)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-700/0 via-amber-400/20 to-amber-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            {t("cta_booking")}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 border border-amber-400/30 text-amber-200/70 hover:border-amber-400/60 hover:text-amber-100 text-[11px] font-mono tracking-[0.25em] uppercase transition-all duration-300 backdrop-blur-sm hover:bg-amber-900/20"
          >
            {t("cta_services")}
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="mt-14 flex items-center justify-center gap-6 sm:gap-10 animate-fade-up animate-delay-500">
          {[["5.000+", "Cây đàn"], ["20+", "Năm"], ["99%", "Hài lòng"]].map(([num, label]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-xl sm:text-2xl font-bold text-amber-400">{num}</span>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-amber-500/50">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-400/35 hover:text-amber-400/60 transition-colors"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">{t("scroll")}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
