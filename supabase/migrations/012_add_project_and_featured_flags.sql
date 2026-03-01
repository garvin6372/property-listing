-- Migration: add_project_and_featured_flags
-- Purpose: Support "Our Projects" and "Featured Properties" menus in Admin Panel 
-- by allowing existing properties to be flagged.

-- Add is_project flag with default false
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS is_project BOOLEAN DEFAULT false;

-- Add is_featured flag with default false
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Create an index to optimise fetching featured properties and projects
CREATE INDEX IF NOT EXISTS idx_properties_is_project ON public.properties(is_project) WHERE is_project = true;
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured) WHERE is_featured = true;
