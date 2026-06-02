-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Services ──────────────────────────────────────────────────────────────
create table public.services (
  id            uuid primary key default uuid_generate_v4(),
  created_at    timestamptz not null default now(),
  name_vi       text not null,
  name_en       text not null,
  description_vi text not null,
  description_en text not null,
  price_from    numeric not null,
  price_to      numeric,
  duration_days int not null default 1,
  is_active     boolean not null default true,
  sort_order    int not null default 0
);

alter table public.services enable row level security;
create policy "Public read services" on public.services for select using (is_active = true);
create policy "Admin manage services" on public.services using (auth.role() = 'service_role');

-- ── Bookings ──────────────────────────────────────────────────────────────
create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');

create table public.bookings (
  id             uuid primary key default uuid_generate_v4(),
  created_at     timestamptz not null default now(),
  name           text not null,
  phone          text not null,
  email          text not null,
  service_type   text not null,
  guitar_type    text not null,
  description    text,
  preferred_date date not null,
  status         public.booking_status not null default 'pending',
  notes          text
);

alter table public.bookings enable row level security;
-- Anyone can insert a booking; only service_role can read/update
create policy "Anyone can book" on public.bookings for insert with check (true);
create policy "Admin read bookings" on public.bookings for select using (auth.role() = 'service_role');
create policy "Admin update bookings" on public.bookings for update using (auth.role() = 'service_role');

-- ── Gallery ───────────────────────────────────────────────────────────────
create table public.gallery (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  image_url   text not null,
  caption_vi  text,
  caption_en  text,
  category    text not null default 'general',
  is_featured boolean not null default false,
  sort_order  int not null default 0
);

alter table public.gallery enable row level security;
create policy "Public read gallery" on public.gallery for select using (true);
create policy "Admin manage gallery" on public.gallery using (auth.role() = 'service_role');

-- ── Testimonials ──────────────────────────────────────────────────────────
create table public.testimonials (
  id             uuid primary key default uuid_generate_v4(),
  created_at     timestamptz not null default now(),
  customer_name  text not null,
  rating         smallint not null check (rating between 1 and 5),
  content_vi     text not null,
  content_en     text,
  is_approved    boolean not null default false,
  avatar_url     text
);

alter table public.testimonials enable row level security;
create policy "Public read approved testimonials"
  on public.testimonials for select using (is_approved = true);
create policy "Admin manage testimonials"
  on public.testimonials using (auth.role() = 'service_role');

-- ── Chat Sessions ─────────────────────────────────────────────────────────
create table public.chat_sessions (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  session_id  text not null unique,
  messages    jsonb not null default '[]',
  locale      text not null default 'vi'
);

alter table public.chat_sessions enable row level security;
create policy "Service role manages chat" on public.chat_sessions using (auth.role() = 'service_role');

-- ── Seed: sample services ─────────────────────────────────────────────────
insert into public.services (name_vi, name_en, description_vi, description_en, price_from, price_to, duration_days, sort_order) values
  ('Setup & Điều chỉnh', 'Setup & Adjustment', 'Điều chỉnh action, intonation, và pickup', 'Action, intonation, and pickup adjustment', 200000, 500000, 1, 1),
  ('Thay fret', 'Fret Job', 'Thay toàn bộ hoặc một phần fret', 'Full or partial refret', 800000, 2000000, 3, 2),
  ('Sửa điện tử', 'Electronics Repair', 'Sửa pickup, jack, potentiometer', 'Pickup, jack, potentiometer repair', 150000, 600000, 1, 3),
  ('Phục hồi đàn cổ', 'Vintage Restoration', 'Phục hồi đàn về trạng thái nguyên bản', 'Restore to original condition', 2000000, null, 14, 4);
