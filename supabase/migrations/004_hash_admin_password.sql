-- First, let's create a function to hash passwords using pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Update the default admin user with a hashed password
-- The password will be 'password' hashed with bcrypt
UPDATE admin_users 
SET password = '$2b$10$212x49RVJaTOEUd69j5LuuDO0EOx.lCswU5dPEctTF3WLikEEEiam' 
WHERE email = 'admin@skyvera.com';