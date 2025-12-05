-- Update valuations table to include new fields from the valuation form
ALTER TABLE valuations
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS expected_value TEXT;

-- Make message column nullable since the new form doesn't include it
ALTER TABLE valuations ALTER COLUMN message DROP NOT NULL;
