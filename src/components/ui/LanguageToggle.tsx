"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "vi" ? "en" : "vi";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-800/30 dark:border-amber-400/20 text-xs font-mono tracking-widest text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all duration-300 disabled:opacity-50"
    >
      <span className={locale === "vi" ? "opacity-100 font-bold" : "opacity-40"}>VI</span>
      <span className="opacity-30">|</span>
      <span className={locale === "en" ? "opacity-100 font-bold" : "opacity-40"}>EN</span>
    </button>
  );
}
