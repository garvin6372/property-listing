# Supabase Integration Guide

This document explains how Supabase has been integrated into the Skyline Property Listing application.

## Overview

The application has been migrated from using in-memory data storage to using Supabase as the backend database. This provides persistence, scalability, and real-time capabilities.

## Key Changes

### 1. Dependency Installation

- Added `@supabase/supabase-js` for client-side Supabase interactions
- Added `dotenv` for environment variable management

### 2. Configuration Files

- Created `src/lib/supabase/client.ts` for client-side Supabase initialization
- Created `src/lib/supabase/admin.ts` for server-side Supabase initialization with service role key

### 3. Environment Variables

The following environment variables are required:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Schema

The application uses four main tables:

1. **properties** - Stores property listings
2. **inquiries** - Stores customer inquiries
3. **valuations** - Stores property valuation requests
4. **admin_users** - Stores admin user credentials

### 5. Data Access Layer

- Updated `src/lib/data.ts` to use Supabase instead of in-memory storage
- Updated `src/lib/actions.ts` to use Supabase for form submissions
- Created migration scripts in `supabase/migrations/`

### 6. Authentication

- Implemented custom admin authentication with hashed passwords
- Added authentication protection to admin routes
- Created middleware for route protection
- Replaced Supabase Auth with custom session management

### 7. API Routes

- Added health check endpoint at `/api/health`
- Added integration test endpoint at `/api/test-supabase`

### 8. Row Level Security (RLS)

Row Level Security policies have been implemented to control access to data:

- **Properties table**:
  - Public users (anon role): Can only read properties
  - Admin users (authenticated role): Can perform all CRUD operations

- **Inquiries table**:
  - Public users: Can only insert inquiries
  - Admin users: Can view all inquiries

- **Valuations table**:
  - Public users: Can only insert valuation requests
  - Admin users: Can view all valuation requests

The policies are defined in `supabase/migrations/002_rls_policies.sql`.

### 9. Storage

Supabase Storage has been configured with a `property-images` bucket:

- Public read access for all users to view property images
- Admin-only upload/delete permissions
- Storage utilities in `src/lib/supabase/storage.ts` for handling image operations

The storage setup is defined in `supabase/migrations/003_storage_bucket.sql`.

### 10. Password Security

Admin user passwords are now properly hashed using bcrypt:

- Passwords are hashed with bcrypt (10 salt rounds) before storage
- Authentication compares provided passwords with stored hashes
- New admin users are automatically registered with hashed passwords
- Utilities in `src/lib/auth.ts` for password hashing and comparison

The password hashing is implemented in `supabase/migrations/004_hash_admin_password.sql` and `src/lib/supabase/data.ts`.

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.io/) and create a new project
2. Get your project URL and API keys from the Supabase dashboard

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Initialize Database

Run the database initialization script:

```bash
npm run supabase:init
```

Or manually run the SQL commands from `supabase/migrations/001_init_tables.sql` in your Supabase SQL editor.

## Testing

You can test the Supabase integration by visiting `/api/test-supabase` in your browser. This will run a series of CRUD operations to verify that the integration is working correctly.

## Security Considerations

- The service role key should only be used server-side
- Client-side operations use the anon key with Row Level Security (RLS) where appropriate
- Passwords in the admin_users table should be hashed in production (currently stored in plain text for simplicity)

## Future Improvements

- Implement real-time subscriptions for property updates
- Add file storage for property images