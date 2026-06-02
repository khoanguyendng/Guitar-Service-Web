#!/bin/bash
set -e

echo "═══════════════════════════════════════════"
echo "  Guitar Service Web — Full Setup"
echo "═══════════════════════════════════════════"

# Config files (package.json, next.config.ts, etc.) are already in place.
# This script installs all dependencies and sets up shadcn/ui.

# ── Core dependencies ────────────────────────
npm install next react react-dom typescript @types/node @types/react @types/react-dom

# ── i18n ─────────────────────────────────────
npm install next-intl

# ── Supabase ─────────────────────────────────
npm install @supabase/supabase-js @supabase/ssr

# ── Form & Validation ─────────────────────────
npm install react-hook-form @hookform/resolvers zod

# ── Email ─────────────────────────────────────
npm install resend @react-email/components @react-email/render

# ── AI Chatbot ────────────────────────────────
npm install @anthropic-ai/sdk openai

# ── Monitoring ───────────────────────────────
npm install @vercel/analytics @vercel/speed-insights @sentry/nextjs

# ── UI & Icons ───────────────────────────────
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install sonner framer-motion embla-carousel-react react-day-picker
npm install react-google-recaptcha-v3 sharp date-fns cmdk

# ── Radix UI ──────────────────────────────────
npm install \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-avatar @radix-ui/react-checkbox \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-label @radix-ui/react-popover \
  @radix-ui/react-progress @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-slider \
  @radix-ui/react-slot @radix-ui/react-switch \
  @radix-ui/react-tabs @radix-ui/react-toast \
  @radix-ui/react-tooltip

# ── Dev tools ─────────────────────────────────
npm install -D tailwindcss @tailwindcss/typography tailwindcss-animate autoprefixer \
  prettier prettier-plugin-tailwindcss eslint eslint-config-next

# ── shadcn/ui ────────────────────────────────
# components.json already exists — skip init, go straight to adding components
npx shadcn@latest add \
  button card input label select textarea \
  dialog sheet accordion tabs badge avatar separator \
  form calendar dropdown-menu progress skeleton sonner \
  --yes

# ── .env.local ───────────────────────────────
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "  → .env.local created. Fill in your real keys."
fi

echo ""
echo "  ✓ Setup complete!"
echo ""
echo "  Next steps:"
echo "  1. Edit .env.local with real Supabase / Resend / Anthropic keys"
echo "  2. Run the SQL in supabase/migrations/001_initial_schema.sql via Supabase dashboard"
echo "  3. npm run dev  →  http://localhost:3000"
