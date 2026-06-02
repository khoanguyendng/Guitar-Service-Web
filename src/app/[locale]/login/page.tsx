"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(t("error"));
        return;
      }

      router.push("/admin");
    } catch {
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0603] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-stone-950/80 to-amber-950/30" />
      {/* Scanline */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Decorative top border */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mb-8" />

        <div className="border border-amber-900/40 bg-black/40 backdrop-blur-sm p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-amber-500/60 mb-3">
              ◆ Guitar Service ◆
            </p>
            <h1 className="font-heading text-2xl text-amber-50 mb-2">
              {t("title")}
            </h1>
            <p className="text-amber-100/40 text-xs font-mono tracking-wider">
              {t("subtitle")}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-amber-900/40" />
            <span className="text-amber-700/60 text-xs">◆</span>
            <div className="h-px flex-1 bg-amber-900/40" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400/60"
              >
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@guitarservice.vn"
                required
                className="bg-amber-950/20 border-amber-900/40 text-amber-50 placeholder:text-amber-700/40 focus-visible:ring-amber-600/50 focus-visible:border-amber-600/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400/60"
              >
                {t("password")}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-amber-950/20 border-amber-900/40 text-amber-50 placeholder:text-amber-700/40 focus-visible:ring-amber-600/50 focus-visible:border-amber-600/50"
              />
            </div>

            {error && (
              <div className="border border-red-900/50 bg-red-950/20 p-3">
                <p className="text-xs font-mono text-red-400 tracking-wide">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs tracking-[0.2em] uppercase py-3 h-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.4)]"
            >
              {isLoading ? "..." : t("submit")}
            </Button>
          </form>
        </div>

        {/* Decorative bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mt-8" />
      </div>
    </div>
  );
}
