-- ============================================================
-- GuitarService — Complete PDF Schema (Section 12)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── updated_at trigger function ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. CUSTOMERS (CRM)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.customers (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  name           text        NOT NULL,
  email          text,
  phone          text,
  preferred_lang text        NOT NULL DEFAULT 'vi',
  booking_count  int         NOT NULL DEFAULT 0
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin manages customers"
  ON public.customers FOR ALL
  USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. SERVICES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.services (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  name_en        text        NOT NULL,
  name_vi        text        NOT NULL,
  description_en text        NOT NULL DEFAULT '',
  description_vi text        NOT NULL DEFAULT '',
  price_min      numeric     NOT NULL DEFAULT 0,
  price_max      numeric,
  duration_min   int         NOT NULL DEFAULT 60,   -- minutes (60 = 1 day)
  warranty_days  int         NOT NULL DEFAULT 30,
  is_active      boolean     NOT NULL DEFAULT true,
  sort_order     int         NOT NULL DEFAULT 0
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active services"
  ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manages services"
  ON public.services FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. BOOKINGS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  -- PDF core fields
  customer_id    uuid        REFERENCES public.customers(id) ON DELETE SET NULL,
  service_type   text        NOT NULL,
  scheduled_at   timestamptz,
  status         text        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending','confirmed','in_progress','completed','cancelled')),
  notes          text,
  images         text[]      NOT NULL DEFAULT '{}',
  -- App convenience fields (denormalised — populated from customers at insert time)
  name           text,
  email          text,
  phone          text,
  guitar_type    text,
  preferred_date date,
  description    text,
  language       text        NOT NULL DEFAULT 'vi',
  time_slot      text        NOT NULL DEFAULT 'flexible'
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert booking"
  ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads bookings"
  ON public.bookings FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Admin updates bookings"
  ON public.bookings FOR UPDATE USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. BLOG_POSTS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  slug         text        NOT NULL UNIQUE,
  title_en     text        NOT NULL,
  title_vi     text        NOT NULL,
  excerpt_en   text,
  excerpt_vi   text,
  content_en   text,
  content_vi   text,
  category     text        NOT NULL DEFAULT 'setup-tips',
  tags         text[]      NOT NULL DEFAULT '{}',
  published_at timestamptz,
  author_id    uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published boolean     NOT NULL DEFAULT false,
  is_featured  boolean     NOT NULL DEFAULT false,
  read_time    int                  DEFAULT 5,
  image_url    text
);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts"
  ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admin manages blog posts"
  ON public.blog_posts FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. GALLERY_ITEMS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  image_url   text        NOT NULL DEFAULT '',
  before_url  text,
  after_url   text,
  guitar_type text,
  service_id  uuid        REFERENCES public.services(id) ON DELETE SET NULL,
  caption_en  text,
  caption_vi  text,
  category    text        NOT NULL DEFAULT 'general',
  is_featured boolean     NOT NULL DEFAULT false,
  sort_order  int         NOT NULL DEFAULT 0
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads gallery"
  ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admin manages gallery"
  ON public.gallery_items FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. FAQS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.faqs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  question_en text        NOT NULL,
  question_vi text        NOT NULL,
  answer_en   text        NOT NULL,
  answer_vi   text        NOT NULL,
  category    text        NOT NULL DEFAULT 'general',
  sort_order  int         NOT NULL DEFAULT 0,
  is_active   boolean     NOT NULL DEFAULT true
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active FAQs"
  ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manages FAQs"
  ON public.faqs FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. CONTACT_MESSAGES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name       text        NOT NULL,
  email      text        NOT NULL,
  subject    text,
  message    text        NOT NULL,
  images     text[]      NOT NULL DEFAULT '{}',
  status     text        NOT NULL DEFAULT 'unread'
                           CHECK (status IN ('unread', 'read', 'replied'))
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact message"
  ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads messages"
  ON public.contact_messages FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Admin updates messages"
  ON public.contact_messages FOR UPDATE USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. CHAT_SESSIONS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  session_id    text        NOT NULL UNIQUE,
  messages_json jsonb       NOT NULL DEFAULT '[]',
  locale        text        NOT NULL DEFAULT 'vi'
);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages chat sessions"
  ON public.chat_sessions FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. AVAILABILITY_SLOTS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.availability_slots (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  date         date        NOT NULL,
  start_time   time        NOT NULL,
  end_time     time        NOT NULL,
  is_available boolean     NOT NULL DEFAULT true,
  booking_id   uuid        REFERENCES public.bookings(id) ON DELETE SET NULL,
  UNIQUE (date, start_time)
);

ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads availability"
  ON public.availability_slots FOR SELECT USING (true);
CREATE POLICY "Admin manages slots"
  ON public.availability_slots FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. SITE_SETTINGS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  key        text        PRIMARY KEY,
  value_en   text,
  value_vi   text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads settings"
  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin manages settings"
  ON public.site_settings FOR ALL USING (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- INDEXES (performance)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bookings_status      ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer    ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created     ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_date        ON public.bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_blog_slug            ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published       ON public.blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category     ON public.gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured     ON public.gallery_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_faqs_category        ON public.faqs(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_messages_status      ON public.contact_messages(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_slots_date           ON public.availability_slots(date, start_time);
CREATE INDEX IF NOT EXISTS idx_customers_email      ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_chat_session         ON public.chat_sessions(session_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA — Services
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.services (name_en, name_vi, description_en, description_vi, price_min, price_max, duration_min, warranty_days, sort_order) VALUES
  ('Basic Setup',         'Setup cơ bản',        'Action, intonation, string change, nut slot cleaning',           'Action, intonation, thay dây, vệ sinh nut',           350000,  500000,  1440,  30, 1),
  ('Full Setup',          'Setup tổng thể',       'Complete playability optimisation — all aspects',                'Tối ưu toàn diện khả năng chơi',                     700000,  1200000, 2880,  30, 2),
  ('Fret Levelling',      'Mài fret',             'Fret crown, level, and polish for even playability',             'Crown, mài phẳng và đánh bóng fret',                 800000,  1500000, 7200,  90, 3),
  ('Nut Replacement',     'Thay nut',             'Bone or TUSQ nut fitting and slot cutting',                      'Lắp nut xương hoặc TUSQ và cắt rãnh dây',            400000,  800000,  1440,  60, 4),
  ('Electronics Repair',  'Sửa điện tử',          'Pickup swap, wiring, jack and pot repair',                       'Thay pickup, wiring, jack và pot',                   300000,  null,    1440,  30, 5),
  ('Vintage Restoration', 'Phục hồi vintage',     'Complete restoration of vintage instruments',                    'Phục hồi toàn bộ đàn cổ',                           2000000, null,    20160, 90, 6),
  ('Consultation',        'Tư vấn',               '30-minute assessment and service recommendation',                'Kiểm tra 30 phút và tư vấn dịch vụ',                150000,  null,    30,    0,  7)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA — Site Settings
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value_en, value_vi) VALUES
  ('site_name',    'Guitar Service',                              'Guitar Service'),
  ('tagline',      'Reviving sound — Preserving passion',         'Hồi sinh âm thanh — Gìn giữ đam mê'),
  ('address',      '123 Pho Hue St., Hai Ba Trung, Hanoi',       '123 Phố Huế, Hai Bà Trưng, Hà Nội'),
  ('phone',        '0901 234 567',                                '0901 234 567'),
  ('email',        'hello@guitarservice.vn',                      'hello@guitarservice.vn'),
  ('hours',        'Mon – Sat: 9:00 AM – 6:00 PM',               'Thứ 2 – Thứ 7: 9:00 – 18:00'),
  ('founded_year', '2000',                                        '2000')
ON CONFLICT (key) DO UPDATE SET value_en = EXCLUDED.value_en, value_vi = EXCLUDED.value_vi;

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA — FAQ
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.faqs (question_en, question_vi, answer_en, answer_vi, category, sort_order) VALUES
  ('How long does a full setup take?',    'Setup tổng thể mất bao lâu?',           'A basic setup takes 1–2 days. A full setup takes 2–3 days.',                    'Setup cơ bản mất 1–2 ngày. Setup tổng thể mất 2–3 ngày.',               'setup',    0),
  ('What is included in a basic setup?',  'Setup cơ bản bao gồm những gì?',         'String change, action, intonation, nut cleaning, tuning machine lubrication.', 'Thay dây, action, intonation, vệ sinh nut, bôi trơn tuning machine.',   'setup',    1),
  ('Do you work on all guitar brands?',   'Các bạn nhận tất cả thương hiệu không?', 'Yes — all brands: Fender, Gibson, Taylor, Yamaha, and Vietnamese brands.',      'Có — tất cả thương hiệu: Fender, Gibson, Taylor, Yamaha và nội địa.',   'setup',    2),
  ('How do I book an appointment?',       'Làm sao để đặt lịch?',                   'Book online, call us, or message on Zalo/WhatsApp.',                           'Đặt online, gọi điện, hoặc nhắn Zalo/WhatsApp.',                        'booking',  0),
  ('Can I reschedule or cancel?',         'Tôi có thể đổi lịch không?',             'Yes, with 24 hours notice at no charge.',                                      'Có, thông báo trước 24 giờ, không mất phí.',                            'booking',  1),
  ('How much does a full setup cost?',    'Setup tổng thể giá bao nhiêu?',          '700,000–1,200,000 VND depending on guitar type and condition.',                 '700.000–1.200.000 VND tùy loại và tình trạng đàn.',                     'pricing',  0),
  ('Are parts included in the price?',    'Linh kiện có tính trong giá không?',     'Labour is included. Parts (strings, nuts, pickups) are quoted separately.',    'Nhân công đã bao gồm. Linh kiện (dây, nut, pickup) tính riêng.',        'pricing',  1),
  ('What does the 30-day warranty cover?','Bảo hành 30 ngày bao gồm những gì?',    'Any change in playability directly caused by our work.',                       'Mọi thay đổi về khả năng chơi do công việc của chúng tôi gây ra.',     'warranty', 0),
  ('Does humidity affect my setup?',      'Độ ẩm có ảnh hưởng đến setup không?',   'Yes. Seasonal changes are excluded from the 30-day warranty.',                 'Có. Thay đổi theo mùa không thuộc phạm vi bảo hành 30 ngày.',           'warranty', 1)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- STORAGE BUCKETS (run via Supabase Dashboard or add these manually)
-- Dashboard → Storage → New bucket:
--   • gallery-images   (public)
--   • booking-uploads  (private)
--   • blog-images      (public)
-- ─────────────────────────────────────────────────────────────────────────────
-- Optional: create via SQL (may not work on all Supabase plans)
INSERT INTO storage.buckets (id, name, public) VALUES
  ('gallery-images',   'gallery-images',   true),
  ('booking-uploads',  'booking-uploads',  false),
  ('blog-images',      'blog-images',      true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Public reads gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');
CREATE POLICY "Public reads blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');
CREATE POLICY "Admin uploads to all buckets"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- DONE — all 10 PDF tables created.
-- ─────────────────────────────────────────────────────────────────────────────
