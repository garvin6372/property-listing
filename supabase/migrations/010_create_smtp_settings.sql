-- Create smtp_settings table
CREATE TABLE smtp_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  secure BOOLEAN DEFAULT false,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_smtp_settings_updated_at
    BEFORE UPDATE ON smtp_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a default row (optional, but helpful for the UI to just update)
-- We won't insert default credentials for security, but the table is ready.
