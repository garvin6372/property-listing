-- Create property_types table
CREATE TABLE property_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true
);

-- Create listing_statuses table
CREATE TABLE listing_statuses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true
);

-- Insert default property types
INSERT INTO property_types (name) VALUES 
  ('Apartment'),
  ('Villa'),
  ('Townhouse'),
  ('Office'),
  ('Penthouse');

-- Insert default listing statuses
INSERT INTO listing_statuses (name) VALUES 
  ('Buy'),
  ('Rent');

-- Update properties table to remove the old constraints
-- First, we need to remove the old constraints
ALTER TABLE properties 
  DROP CONSTRAINT IF EXISTS properties_type_check,
  DROP CONSTRAINT IF EXISTS properties_status_check;

-- Add foreign key constraints (optional, for referential integrity)
-- Note: This would require changing the column types to UUID references
-- For simplicity, we'll keep the text columns but remove the constraints