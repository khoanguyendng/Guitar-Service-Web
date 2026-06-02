-- Phase 2: Blog, FAQ, and Gallery enhancements
-- Run in Supabase SQL editor or via: supabase db push

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  slug          text UNIQUE NOT NULL,
  title_en      text NOT NULL,
  title_vi      text NOT NULL,
  excerpt_en    text,
  excerpt_vi    text,
  content_en    text,
  content_vi    text,
  category      text NOT NULL DEFAULT 'setup-tips',
  tags          text[] DEFAULT '{}',
  published_at  timestamptz,
  read_time     int DEFAULT 5,
  is_featured   boolean DEFAULT false,
  is_published  boolean DEFAULT false,
  author_id     uuid REFERENCES auth.users(id),
  image_url     text
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  question_en text NOT NULL,
  question_vi text NOT NULL,
  answer_en   text NOT NULL,
  answer_vi   text NOT NULL,
  category    text NOT NULL DEFAULT 'general',
  sort_order  int DEFAULT 0,
  is_active   boolean DEFAULT true
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active FAQs"
  ON faqs FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage FAQs"
  ON faqs FOR ALL USING (auth.role() = 'authenticated');

-- Gallery enhancements (before/after support)
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS before_image_url text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS after_image_url  text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS service_type     text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS guitar_model     text;

-- Availability slots
CREATE TABLE IF NOT EXISTS availability_slots (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date        date NOT NULL,
  start_time  time NOT NULL,
  end_time    time NOT NULL,
  is_available boolean DEFAULT true,
  booking_id  uuid REFERENCES bookings(id),
  UNIQUE (date, start_time)
);

ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view availability"
  ON availability_slots FOR SELECT USING (true);

CREATE POLICY "Admins can manage slots"
  ON availability_slots FOR ALL USING (auth.role() = 'authenticated');

-- Site settings (CMS config)
CREATE TABLE IF NOT EXISTS site_settings (
  key         text PRIMARY KEY,
  value_en    text,
  value_vi    text,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings"
  ON site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings"
  ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Updated_at trigger for blog_posts
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
