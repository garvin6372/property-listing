-- First, let's create a function to hash passwords using pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Update the default admin user with a hashed password
-- The password will be 'password' hashed with bcrypt
UPDATE admin_users 
SET password = '$2b$10$JEw8EfZAJWC/Gbn7OMjMk.4gbSwgUJxEjm9bpjW9fImGb1PgWE2MC' 
WHERE email = 'admin@skyvera.com';