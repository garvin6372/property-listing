-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for properties
-- Public users can only read properties
CREATE POLICY "Public can view properties" ON properties
FOR SELECT TO anon USING (true);

-- Admins can CRUD properties
CREATE POLICY "Admins can view properties" ON properties
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert properties" ON properties
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can update properties" ON properties
FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins can delete properties" ON properties
FOR DELETE TO authenticated USING (true);

-- Create policies for inquiries
-- Public users can only insert inquiries
CREATE POLICY "Public can insert inquiries" ON inquiries
FOR INSERT TO anon WITH CHECK (true);

-- Admins can view all inquiries
CREATE POLICY "Admins can view all inquiries" ON inquiries
FOR SELECT TO authenticated USING (true);

-- Users cannot read others' inquiries (not needed since inquiries don't belong to users)
-- CREATE POLICY "Users cannot read others' inquiries" ON inquiries
-- FOR SELECT TO anon USING (false);

-- Create policies for valuations
-- Public users can only insert valuations
CREATE POLICY "Public can insert valuations" ON valuations
FOR INSERT TO anon WITH CHECK (true);

-- Admins can view all valuations
CREATE POLICY "Admins can view all valuations" ON valuations
FOR SELECT TO authenticated USING (true);

-- Create admin role
-- Note: In Supabase, we use the built-in 'authenticated' role for logged-in users (admins)
-- and 'anon' role for anonymous/public users

-- Grant permissions to roles
GRANT ALL ON properties TO authenticated;
GRANT SELECT ON properties TO anon;
GRANT ALL ON inquiries TO authenticated;
GRANT INSERT ON inquiries TO anon;
GRANT ALL ON valuations TO authenticated;
GRANT INSERT ON valuations TO anon;
GRANT ALL ON admin_users TO authenticated;