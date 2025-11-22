-- Create properties table
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  location TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Dubai', 'London')),
  type TEXT NOT NULL CHECK (type IN ('Apartment', 'Villa', 'Townhouse', 'Office', 'Penthouse')),
  status TEXT NOT NULL CHECK (status IN ('Rent', 'Buy')),
  dubai_status TEXT CHECK (dubai_status IN ('Ready', 'Off-plan')),
  image_ids TEXT[],
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area INTEGER NOT NULL
);

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  property_id UUID REFERENCES properties(id)
);

-- Create valuations table
CREATE TABLE valuations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Insert a default admin user (in a real app, you would hash the password)
INSERT INTO admin_users (email, password) VALUES ('admin@skyvera.com', 'password');

-- Create indexes for better performance
CREATE INDEX idx_properties_region ON properties(region);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_inquiries_property_id ON inquiries(property_id);