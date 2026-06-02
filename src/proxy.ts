import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { locales, defaultLocale } from "@/lib/i18n-config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export async function proxy(request: NextRequest) {
  // Refresh Supabase session first
  const supabaseResponse = await updateSession(request);

  // If Supabase redirected (e.g. unauthenticated /admin), return early
  if (supabaseResponse.status !== 200) return supabaseResponse;

  // Then apply i18n routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
