-- Remove the old constraints from properties table to allow dynamic values
ALTER TABLE properties 
  DROP CONSTRAINT IF EXISTS properties_type_check,
  DROP CONSTRAINT IF EXISTS properties_status_check;