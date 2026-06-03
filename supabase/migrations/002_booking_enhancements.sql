-- Phase 3: Booking enhancements
-- Adds status value 'in_progress' and extra columns for the wizard

-- Update the status enum (if using Postgres enums)
-- Note: If bookings.status is a plain text column, just update the CHECK constraint

-- Add new columns for multi-step wizard data
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS brand           text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS model           text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS condition       text DEFAULT 'good';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS time_slot       text DEFAULT 'flexible';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS language        text DEFAULT 'vi';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS photo_url       text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS email           text;

-- Update status check to include in_progress
-- (If status column has a CHECK constraint, run:)
-- ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
-- ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
--   CHECK (status IN ('pending','confirmed','in_progress','completed','cancelled'));

-- Update the booking_status enum type if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
    ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'in_progress';
  END IF;
END$$;
