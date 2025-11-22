# Skyline Property Listing - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Database Schema](#database-schema)
6. [Authentication & Authorization](#authentication--authorization)
7. [API Routes & Server Actions](#api-routes--server-actions)
8. [Components](#components)
9. [Setup & Installation](#setup--installation)
10. [Environment Variables](#environment-variables)
11. [Deployment](#deployment)
12. [Development Workflow](#development-workflow)
13. [Security Considerations](#security-considerations)

---

## Project Overview

**Skyline Property Listing** (also known as Skyvera Listings) is a modern, full-stack real estate property listing application built with Next.js 15. The platform allows users to browse properties in Dubai and London, submit inquiries, request property valuations, and provides a comprehensive admin dashboard for property management.

### Key Capabilities
- Browse and search properties across Dubai and London
- Filter properties by region, type, status, price range, and more
- View detailed property information with image galleries
- Submit property inquiries and valuation requests
- Admin dashboard for complete property lifecycle management
- Secure authentication system for admin users
- Image upload and storage via Supabase Storage
- Dynamic property types and listing statuses configuration

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Radix UI (shadcn/ui components)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Carousel**: Embla Carousel React
- **Date Handling**: date-fns

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom admin authentication with bcrypt
- **Storage**: Supabase Storage for property images
- **Server Actions**: Next.js Server Actions
- **API Routes**: Next.js API Routes

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Turbopack (Next.js)
- **Linting**: ESLint
- **Type Checking**: TypeScript

### Additional Services
- **AI Integration**: Google Genkit (for potential AI features)
- **Password Hashing**: bcryptjs
- **UUID Generation**: uuid

---

## Project Structure

```
proparty-listing/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── admin/               # Admin panel routes
│   │   │   ├── dashboard/       # Admin dashboard
│   │   │   ├── properties/      # Property management
│   │   │   ├── inquiries/       # Inquiry management
│   │   │   ├── valuations/      # Valuation requests
│   │   │   ├── property-config/ # Property types & statuses config
│   │   │   ├── profile/         # Admin profile
│   │   │   ├── login/           # Admin login
│   │   │   └── layout.tsx       # Admin layout with sidebar
│   │   ├── api/                 # API routes
│   │   │   ├── check/           # Health check endpoint
│   │   │   ├── health/          # Health status
│   │   │   ├── properties/      # Properties API
│   │   │   └── test-supabase/   # Supabase connection test
│   │   ├── properties/          # Property detail pages
│   │   ├── search/              # Property search page
│   │   ├── valuation/           # Valuation request page
│   │   ├── actions.ts           # Server actions (auth, uploads)
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── hero-search.tsx      # Homepage hero with search
│   │   ├── property-card.tsx    # Property card component
│   │   ├── property-filters.tsx # Property filter sidebar
│   │   ├── inquiry-form.tsx     # Inquiry submission form
│   │   ├── valuation-form.tsx   # Valuation request form
│   │   ├── site-header.tsx      # Main navigation header
│   │   ├── site-footer.tsx      # Footer component
│   │   └── whatsapp-button.tsx  # Floating WhatsApp button
│   ├── contexts/                # React contexts
│   │   └── supabase-auth-context.tsx  # Supabase auth provider
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility libraries
│   │   ├── supabase/            # Supabase client configurations
│   │   │   ├── admin.ts         # Admin client (service role)
│   │   │   ├── client.ts        # Client-side client
│   │   │   ├── server.ts        # Server-side client
│   │   │   └── storage.ts       # Storage utilities
│   │   ├── actions.ts           # Server actions (properties, inquiries)
│   │   ├── auth.ts              # Authentication utilities
│   │   ├── data.ts              # Data fetching functions
│   │   ├── types.ts             # TypeScript type definitions
│   │   └── utils.ts             # General utilities
│   └── middleware.ts            # Next.js middleware (auth protection)
├── supabase/
│   └── migrations/              # SQL migration files
│       ├── 001_init_tables.sql
│       ├── 002_rls_policies.sql
│       ├── 003_storage_bucket.sql
│       ├── 004_hash_admin_password.sql
│       ├── 005_custom_auth.sql
│       ├── 006_property_config.sql
│       └── 007_remove_constraints.sql
├── .env.local                   # Environment variables
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## Features

### Public Features

#### 1. **Property Browsing & Search**
- **Homepage**: Featured properties display with hero search
- **Search Page**: Advanced filtering and search capabilities
  - Filter by region (Dubai/London)
  - Filter by property type (Apartment, Villa, Townhouse, Office, Penthouse)
  - Filter by listing status (Buy/Rent)
  - Filter by Dubai-specific status (Ready/Off-plan)
  - Price range filtering
  - Bedrooms and bathrooms filtering
  - Area (sqft) filtering
  - Location-based search
- **Property Details**: Individual property pages with full details and image galleries

#### 2. **Inquiry System**
- Submit inquiries for specific properties
- Capture customer contact information (name, email, phone)
- Optional message field
- Form validation with Zod

#### 3. **Valuation Requests**
- Dedicated valuation request page
- Capture property owner information
- Required message field for property details
- Form validation

#### 4. **WhatsApp Integration**
- Floating WhatsApp button for instant contact
- Positioned for easy access on all pages

### Admin Features

#### 1. **Admin Dashboard**
- Overview of key metrics:
  - Total properties
  - Active listings
  - Pending inquiries
  - Recent valuations
- Quick access to all admin functions
- Recent activity feed

#### 2. **Property Management**
- **Create Properties**: Add new property listings with:
  - Title, description, price
  - Location, region, type, status
  - Bedrooms, bathrooms, area
  - Multiple image uploads
  - Dubai-specific status (for Dubai properties)
- **Edit Properties**: Update existing property information
- **Delete Properties**: Remove property listings
- **Image Management**: Upload and manage property images via Supabase Storage

#### 3. **Inquiry Management**
- View all customer inquiries
- Filter and search inquiries
- Track inquiry status
- View associated property details

#### 4. **Valuation Management**
- View all valuation requests
- Review customer details and messages
- Track and respond to requests

#### 5. **Property Configuration**
- **Property Types**: Add/remove property types dynamically
- **Listing Statuses**: Add/remove listing statuses dynamically
- Soft delete functionality (sets `is_active: false`)

#### 6. **Admin Profile**
- View admin account information
- Update profile settings

### Security Features

#### 1. **Authentication**
- Custom admin authentication system
- Password hashing with bcryptjs
- Cookie-based session management
- Protected admin routes via Next.js middleware

#### 2. **Authorization**
- Middleware protection for all `/admin/*` routes
- Automatic redirect to login for unauthenticated users
- Automatic redirect to dashboard for authenticated users on login page

#### 3. **Row-Level Security (RLS)**
- Supabase RLS policies for data protection
- Service role key for admin operations
- Anon key for public read operations

---

## Database Schema

### Tables

#### 1. **properties**
```sql
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  location TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Dubai', 'London')),
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  dubai_status TEXT CHECK (dubai_status IN ('Ready', 'Off-plan')),
  image_ids TEXT[],
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area INTEGER NOT NULL
);
```

**Indexes**:
- `idx_properties_region` on `region`
- `idx_properties_type` on `type`
- `idx_properties_status` on `status`

#### 2. **inquiries**
```sql
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  property_id UUID REFERENCES properties(id)
);
```

**Indexes**:
- `idx_inquiries_property_id` on `property_id`

#### 3. **valuations**
```sql
CREATE TABLE valuations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL
);
```

#### 4. **admin_users**
```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
```

**Default Admin User**:
- Email: `admin@skyvera.com`
- Password: `password` (hashed with bcrypt)

#### 5. **property_types**
```sql
CREATE TABLE property_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
```

#### 6. **listing_statuses**
```sql
CREATE TABLE listing_statuses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
```

### Storage Buckets

#### **property-images**
- Public bucket for property images
- Configured in `003_storage_bucket.sql`
- Accessible via public URLs
- Used for all property image uploads

---

## Authentication & Authorization

### Authentication Flow

1. **Admin Login**:
   - User enters email and password on `/admin/login`
   - Server action `authenticateAdminAction` validates credentials
   - Password compared using bcrypt
   - On success, cookie `admin-token` is set
   - User redirected to `/admin/dashboard`

2. **Session Management**:
   - Cookie-based session with `admin-token`
   - Middleware checks for token on all `/admin/*` routes
   - Token validation happens on each protected route access

3. **Logout**:
   - Cookie is cleared
   - User redirected to `/admin/login`

### Middleware Protection

File: `src/middleware.ts`

```typescript
export function middleware(request: NextRequest) {
    // Only run on /admin routes
    if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    const token = request.cookies.get('admin-token')?.value
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    // If user has token and is on login page, redirect to dashboard
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // If user has NO token and is NOT on login page, redirect to login
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
}
```

### Supabase Client Types

1. **Admin Client** (`supabaseAdmin`):
   - Uses `SUPABASE_SERVICE_ROLE_KEY`
   - Full database access, bypasses RLS
   - Used for admin operations only
   - Server-side only

2. **Client-side Client** (`supabaseClient`):
   - Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Subject to RLS policies
   - Used for public data fetching
   - Safe for client-side use

3. **Server-side Client** (`createServerClient`):
   - Uses anon key with SSR support
   - Cookie-based session management
   - Used in server components

---

## API Routes & Server Actions

### Server Actions

#### Authentication Actions (`src/app/actions.ts`)

1. **`authenticateAdminAction(email, password)`**
   - Validates admin credentials
   - Returns success/failure status

2. **`uploadImageAction(formData)`**
   - Uploads images to Supabase Storage
   - Returns upload status and data

3. **`addPropertyTypeAction(name)`**
   - Adds new property type to database

4. **`addListingStatusAction(name)`**
   - Adds new listing status to database

5. **`deletePropertyTypeAction(name)`**
   - Soft deletes property type (sets `is_active: false`)

6. **`deleteListingStatusAction(name)`**
   - Soft deletes listing status (sets `is_active: false`)

#### Property & Form Actions (`src/lib/actions.ts`)

1. **`saveProperty(prevState, formData)`**
   - Creates or updates property
   - Handles image uploads
   - Validates property data with Zod
   - Returns success/error state

2. **`deleteProperty(id)`**
   - Deletes property from database
   - Revalidates property pages

3. **`submitInquiry(prevState, formData)`**
   - Submits customer inquiry
   - Validates form data with Zod
   - Stores in database

4. **`submitValuation(prevState, formData)`**
   - Submits valuation request
   - Validates form data with Zod
   - Stores in database

### API Routes

#### 1. **Health Check** (`/api/health`)
- Returns server health status

#### 2. **Properties API** (`/api/properties`)
- Fetch properties data
- Used for client-side data fetching

#### 3. **Supabase Test** (`/api/test-supabase`)
- Tests Supabase connection
- Useful for debugging

---

## Components

### Public Components

#### 1. **HeroSearch** (`hero-search.tsx`)
- Homepage hero section
- Quick search functionality
- Region and property type filters
- Call-to-action buttons

#### 2. **PropertyCard** (`property-card.tsx`)
- Displays property summary
- Image, title, price, location
- Key features (beds, baths, area)
- Links to property detail page

#### 3. **PropertyFilters** (`property-filters.tsx`)
- Advanced filtering sidebar
- Multiple filter criteria:
  - Region
  - Property type
  - Listing status
  - Dubai status
  - Price range
  - Bedrooms/bathrooms
  - Area
  - Location

#### 4. **InquiryForm** (`inquiry-form.tsx`)
- Customer inquiry submission
- Form validation
- Success/error handling

#### 5. **ValuationForm** (`valuation-form.tsx`)
- Valuation request submission
- Required fields validation
- Success/error handling

#### 6. **SiteHeader** (`site-header.tsx`)
- Main navigation
- Logo and branding
- Navigation links
- Responsive mobile menu

#### 7. **SiteFooter** (`site-footer.tsx`)
- Footer content
- Links and information

#### 8. **WhatsAppButton** (`whatsapp-button.tsx`)
- Floating WhatsApp contact button
- Fixed positioning

### Admin Components

Admin components are located within the admin routes and include:
- Property management forms
- Data tables for inquiries and valuations
- Dashboard widgets
- Admin sidebar navigation

### UI Components (`components/ui/`)

Reusable UI components from shadcn/ui:
- Button, Card, Input, Label
- Dialog, Alert Dialog
- Dropdown Menu, Select
- Toast notifications
- Tabs, Accordion
- Progress, Slider
- And many more...

---

## Setup & Installation

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Supabase Account**: Create at [supabase.com](https://supabase.com)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proparty-listing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project on Supabase
   - Note your project URL and API keys

4. **Configure environment variables**
   - Create `.env.local` file in the root directory
   - Add the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

5. **Run database migrations**
   - Navigate to Supabase SQL Editor
   - Run each migration file in order:
     1. `001_init_tables.sql`
     2. `002_rls_policies.sql`
     3. `003_storage_bucket.sql`
     4. `004_hash_admin_password.sql`
     5. `005_custom_auth.sql`
     6. `006_property_config.sql`
     7. `007_remove_constraints.sql`

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Public site: `http://localhost:3000`
   - Admin login: `http://localhost:3000/admin/login`
   - Default credentials:
     - Email: `admin@skyvera.com`
     - Password: `password`

---

## Environment Variables

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Variable Descriptions

- **`NEXT_PUBLIC_SUPABASE_URL`**: Your Supabase project URL
  - Found in: Supabase Dashboard → Settings → API
  - Public variable (accessible in browser)

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Supabase anonymous key
  - Found in: Supabase Dashboard → Settings → API
  - Public variable (accessible in browser)
  - Used for public read operations

- **`SUPABASE_SERVICE_ROLE_KEY`**: Supabase service role key
  - Found in: Supabase Dashboard → Settings → API
  - **PRIVATE** - Never expose to client
  - Used for admin operations, bypasses RLS
  - Server-side only

---

## Deployment

### Vercel Deployment (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - Add all environment variables from `.env.local`
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is kept secret

4. **Deploy**
   - Vercel will automatically build and deploy
   - Subsequent pushes to main branch auto-deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- **Netlify**: Use Next.js plugin
- **AWS Amplify**: Configure build settings
- **Google Cloud Run**: Containerize with Docker
- **Railway**: Direct deployment from GitHub

### Build Configuration

```json
{
  "scripts": {
    "dev": "next dev --turbopack -p 3000",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Development Workflow

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run typecheck

# Initialize Supabase setup
npm run supabase:setup
```

### Development Best Practices

1. **Type Safety**
   - Use TypeScript for all new files
   - Define types in `src/lib/types.ts`
   - Avoid using `any` type

2. **Component Structure**
   - Keep components small and focused
   - Use composition over inheritance
   - Extract reusable logic into custom hooks

3. **Server Actions**
   - Use server actions for mutations
   - Validate all input with Zod
   - Handle errors gracefully
   - Revalidate paths after mutations

4. **Styling**
   - Use Tailwind CSS utility classes
   - Follow shadcn/ui component patterns
   - Maintain consistent spacing and colors

5. **Database Operations**
   - Use appropriate Supabase client (admin vs. client)
   - Always handle errors
   - Use transactions for multi-step operations

### Adding New Features

1. **New Property Field**
   - Update `Property` type in `types.ts`
   - Update database schema (new migration)
   - Update forms and validation schemas
   - Update display components

2. **New Admin Page**
   - Create page in `src/app/admin/`
   - Add route to admin sidebar
   - Implement server actions if needed
   - Add to middleware protection (automatic)

3. **New Public Page**
   - Create page in `src/app/`
   - Add navigation link in `site-header.tsx`
   - Implement data fetching
   - Add to sitemap

---

## Security Considerations

### Current Security Measures

1. **Password Security**
   - Passwords hashed with bcryptjs
   - Salted hashing (10 rounds)
   - Never store plain text passwords

2. **Environment Variables**
   - Service role key kept server-side only
   - Public keys prefixed with `NEXT_PUBLIC_`
   - `.env.local` in `.gitignore`

3. **Route Protection**
   - Middleware protects all admin routes
   - Cookie-based authentication
   - Automatic redirects for unauthorized access

4. **Database Security**
   - Row-Level Security (RLS) policies
   - Service role bypasses RLS (admin only)
   - Anon key respects RLS (public)

5. **Input Validation**
   - Zod schemas for all forms
   - Server-side validation
   - SQL injection prevention (Supabase client)

### Security Recommendations

1. **Change Default Admin Password**
   - Update admin password immediately after setup
   - Use strong, unique password

2. **Enable HTTPS**
   - Always use HTTPS in production
   - Vercel provides this automatically

3. **Rate Limiting**
   - Consider adding rate limiting for forms
   - Prevent spam submissions

4. **CORS Configuration**
   - Configure CORS in Supabase dashboard
   - Restrict to your domain in production

5. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Run `npm audit` regularly

6. **Session Management**
   - Consider adding session expiration
   - Implement refresh token mechanism
   - Add "Remember Me" functionality

---

## Additional Documentation

For more detailed information, see:
- `SUPABASE_INTEGRATION.md` - Supabase setup details
- `SUPABASE_IMPLEMENTATION_SUMMARY.md` - Implementation summary
- `SUPABASE_FEATURES_IMPLEMENTATION.md` - Feature implementation guide
- `SECURITY_FIX_README.md` - Security fixes and best practices

---

## Support & Maintenance

### Common Issues

1. **Supabase Connection Errors**
   - Verify environment variables
   - Check Supabase project status
   - Test connection with `/api/test-supabase`

2. **Image Upload Failures**
   - Verify storage bucket exists
   - Check RLS policies on storage
   - Ensure service role key is correct

3. **Authentication Issues**
   - Clear cookies and try again
   - Verify admin user exists in database
   - Check password hash

### Troubleshooting

```bash
# Check environment variables
node check-env.js

# Test Supabase connection
curl http://localhost:3000/api/test-supabase

# View build errors
npm run build

# Type check
npm run typecheck
```

---

## License

This project is private and proprietary.

---

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

---

**Last Updated**: November 22, 2025
**Version**: 0.1.0
