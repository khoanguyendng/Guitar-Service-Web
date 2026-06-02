import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about_page");
  const tAbout = useTranslations("about");

  return (
    <>
      <PageHero
        badge={t("hero_badge")}
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
      />

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
                — {t("story_badge")} —
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-6">
                {t("story_title")}
              </h2>
              <div className="retro-divider w-32 mb-8">
                <span className="text-secondary text-sm">◆</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                {t("story_p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                {t("story_p2")}
              </p>
            </div>

            {/* Decorative Est. Badge */}
            <div className="flex items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Outer ring */}
                <div className="absolute inset-0 border-2 border-secondary/30 rounded-full" />
                {/* Middle ring */}
                <div className="absolute inset-6 border border-secondary/20 rounded-full" />
                {/* Inner content */}
                <div className="absolute inset-12 bg-card border border-border rounded-full flex flex-col items-center justify-center text-center">
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-1">
                    Est.
                  </p>
                  <p className="font-heading text-5xl font-bold text-secondary leading-none">
                    2000
                  </p>
                  <div className="my-2">
                    <span className="text-secondary text-xs">◆</span>
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                    Hà Nội · Việt Nam
                  </p>
                </div>
                {/* Decorative dots */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-1.5 h-1.5 bg-secondary/40 rounded-full"
                    style={{
                      top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 132}px - 3px)`,
                      left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 132}px - 3px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
              — {t("mission_badge")} —
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-5">
              {t("mission_title")}
            </h2>
            <div className="retro-divider mx-auto w-40">
              <span className="text-secondary text-sm">◆</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            <div className="bg-card p-8 border border-border">
              <span className="font-mono text-5xl font-bold text-border/80 leading-none block mb-6">
                01
              </span>
              <h3 className="font-heading text-xl text-foreground mb-3">{t("value1_title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("value1_desc")}</p>
            </div>
            <div className="bg-card p-8 border border-border">
              <span className="font-mono text-5xl font-bold text-border/80 leading-none block mb-6">
                02
              </span>
              <h3 className="font-heading text-xl text-foreground mb-3">{t("value2_title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("value2_desc")}</p>
            </div>
            <div className="bg-card p-8 border border-border">
              <span className="font-mono text-5xl font-bold text-border/80 leading-none block mb-6">
                03
              </span>
              <h3 className="font-heading text-xl text-foreground mb-3">{t("value3_title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("value3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-16 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            <div className="bg-background py-10 px-6 text-center">
              <p className="font-heading text-4xl sm:text-5xl text-secondary mb-2 font-bold">
                {tAbout("years")}
              </p>
              <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                {tAbout("years_label")}
              </p>
            </div>
            <div className="bg-background py-10 px-6 text-center">
              <p className="font-heading text-4xl sm:text-5xl text-secondary mb-2 font-bold">
                {tAbout("guitars")}
              </p>
              <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                {tAbout("guitars_label")}
              </p>
            </div>
            <div className="bg-background py-10 px-6 text-center">
              <p className="font-heading text-4xl sm:text-5xl text-secondary mb-2 font-bold">
                {tAbout("satisfaction")}
              </p>
              <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                {tAbout("satisfaction_label")}
              </p>
            </div>
            <div className="bg-background py-10 px-6 text-center">
              <p className="font-heading text-4xl sm:text-5xl text-secondary mb-2 font-bold">
                {tAbout("masters")}
              </p>
              <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                {tAbout("masters_label")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
              — {t("team_badge")} —
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-5">
              {t("team_title")}
            </h2>
            <div className="retro-divider mx-auto w-40">
              <span className="text-secondary text-sm">◆</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Member 1 */}
            <div className="text-center border border-border bg-card p-8">
              <div className="w-20 h-20 rounded-full border-2 border-secondary/40 bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-heading text-xl font-bold text-secondary">NT</span>
              </div>
              <h3 className="font-heading text-lg text-foreground mb-1">{t("member1_name")}</h3>
              <p className="text-sm text-muted-foreground mb-3 leading-snug">{t("member1_role")}</p>
              <div className="inline-block px-3 py-1 border border-secondary/30 bg-secondary/5">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-secondary">
                  {t("member1_exp")}
                </span>
              </div>
            </div>

            {/* Member 2 */}
            <div className="text-center border border-border bg-card p-8">
              <div className="w-20 h-20 rounded-full border-2 border-secondary/40 bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-heading text-xl font-bold text-secondary">QB</span>
              </div>
              <h3 className="font-heading text-lg text-foreground mb-1">{t("member2_name")}</h3>
              <p className="text-sm text-muted-foreground mb-3 leading-snug">{t("member2_role")}</p>
              <div className="inline-block px-3 py-1 border border-secondary/30 bg-secondary/5">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-secondary">
                  {t("member2_exp")}
                </span>
              </div>
            </div>

            {/* Member 3 */}
            <div className="text-center border border-border bg-card p-8">
              <div className="w-20 h-20 rounded-full border-2 border-secondary/40 bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-heading text-xl font-bold text-secondary">TM</span>
              </div>
              <h3 className="font-heading text-lg text-foreground mb-1">{t("member3_name")}</h3>
              <p className="text-sm text-muted-foreground mb-3 leading-snug">{t("member3_role")}</p>
              <div className="inline-block px-3 py-1 border border-secondary/30 bg-secondary/5">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-secondary">
                  {t("member3_exp")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#0a0603] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/50 via-transparent to-amber-950/50" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
            backgroundSize: "100% 4px",
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-500/70 mb-4">
            — Hãy để chúng tôi chăm sóc đàn của bạn —
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-amber-50 mb-4">
            Tin tưởng vào đôi bàn tay lành nghề
          </h2>
          <p className="text-amber-100/50 mb-8 italic font-heading">
            Hơn 20 năm kinh nghiệm — Chúng tôi hiểu từng cây đàn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,6,0.4)]"
            >
              Đặt lịch ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-amber-400/40 text-amber-200/80 hover:border-amber-400/70 hover:text-amber-100 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300"
            >
              Liên hệ chúng tôi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
