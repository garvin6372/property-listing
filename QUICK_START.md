# Quick Start Guide - Skyvera Property Listing

This guide will help you get the Skyvera Property Listing application up and running in under 10 minutes.

## Prerequisites Checklist

- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] npm installed (comes with Node.js)
- [ ] Supabase account ([Sign up](https://supabase.com))
- [ ] Git installed (optional, for cloning)

---

## Step 1: Get the Code

```bash
# Clone the repository (or download ZIP)
git clone <repository-url>
cd proparty-listing

# Install dependencies
npm install
```

**Expected time**: 2-3 minutes

---

## Step 2: Set Up Supabase

### 2.1 Create a New Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: Skyvera Properties
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to you
4. Click "Create new project"
5. Wait for project to be ready (~2 minutes)

### 2.2 Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

**Expected time**: 3-4 minutes

---

## Step 3: Configure Environment Variables

1. Create a file named `.env.local` in the project root
2. Add the following content (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ Important**: Never commit `.env.local` to version control!

**Expected time**: 1 minute

---

## Step 4: Set Up the Database

### 4.1 Run Migrations

1. In Supabase, go to **SQL Editor**
2. Run each migration file **in order**:

#### Migration 1: Create Tables
```sql
-- Copy and paste contents from: supabase/migrations/001_init_tables.sql
```
Click **Run**

#### Migration 2: Set Up Security
```sql
-- Copy and paste contents from: supabase/migrations/002_rls_policies.sql
```
Click **Run**

#### Migration 3: Create Storage Bucket
```sql
-- Copy and paste contents from: supabase/migrations/003_storage_bucket.sql
```
Click **Run**

#### Migration 4: Hash Admin Password
```sql
-- Copy and paste contents from: supabase/migrations/004_hash_admin_password.sql
```
Click **Run**

#### Migration 5: Custom Auth (Optional)
```sql
-- Copy and paste contents from: supabase/migrations/005_custom_auth.sql
```
Click **Run**

#### Migration 6: Property Configuration
```sql
-- Copy and paste contents from: supabase/migrations/006_property_config.sql
```
Click **Run**

#### Migration 7: Remove Constraints
```sql
-- Copy and paste contents from: supabase/migrations/007_remove_constraints.sql
```
Click **Run**

**Expected time**: 2-3 minutes

---

## Step 5: Start the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.3.3
- Local:        http://localhost:3000
- Turbopack:    enabled

✓ Ready in 2.5s
```

**Expected time**: 30 seconds

---

## Step 6: Access the Application

### Public Site
Open your browser to: **http://localhost:3000**

You should see the homepage with:
- Hero search section
- Featured properties (empty initially)
- "When you need experts" section

### Admin Panel
Go to: **http://localhost:3000/admin/login**

**Default credentials**:
- Email: `admin@skyvera.com`
- Password: `password`

**⚠️ Change this password immediately in production!**

---

## Step 7: Add Your First Property

1. Log in to the admin panel
2. Click **Properties** in the sidebar
3. Click **Add New Property**
4. Fill in the form:
   - **Title**: Luxury Villa in Palm Jumeirah
   - **Description**: Beautiful 5-bedroom villa with sea views...
   - **Price**: 5000000
   - **Location**: Palm Jumeirah
   - **Region**: Dubai
   - **Type**: Villa
   - **Status**: Buy
   - **Dubai Status**: Ready
   - **Bedrooms**: 5
   - **Bathrooms**: 6
   - **Area**: 5000
   - **Images**: Upload 1-5 images
5. Click **Save Property**

---

## Verification Checklist

After completing the setup, verify:

- [ ] Homepage loads without errors
- [ ] Admin login works
- [ ] Admin dashboard displays
- [ ] Can create a new property
- [ ] Property appears on homepage
- [ ] Property detail page works
- [ ] Search functionality works
- [ ] Inquiry form submits successfully
- [ ] Valuation form submits successfully

---

## Common Issues & Solutions

### Issue: "Missing Supabase environment variables"

**Solution**: 
- Check that `.env.local` exists in the project root
- Verify all three environment variables are set
- Restart the dev server (`Ctrl+C`, then `npm run dev`)

---

### Issue: "Failed to fetch properties"

**Solution**:
- Verify Supabase project is active
- Check that migrations ran successfully
- Test connection: http://localhost:3000/api/test-supabase

---

### Issue: "Image upload failed"

**Solution**:
- Verify `property-images` bucket exists in Supabase Storage
- Check RLS policies on the bucket
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is correct

---

### Issue: "Admin login not working"

**Solution**:
- Verify `admin_users` table has the default user
- Check that migration 004 ran (hashes password)
- Try resetting the password manually in Supabase

---

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```

---

## Next Steps

Now that you have the application running:

1. **Customize Branding**
   - Update logo in `src/components/site-header.tsx`
   - Change colors in `src/app/globals.css`
   - Update metadata in `src/app/layout.tsx`

2. **Add Sample Data**
   - Create 5-10 sample properties
   - Add various property types
   - Test all filters and search

3. **Configure WhatsApp**
   - Update WhatsApp number in `src/components/whatsapp-button.tsx`

4. **Security**
   - Change admin password
   - Review RLS policies
   - Set up proper CORS in Supabase

5. **Deploy**
   - See `DOCUMENTATION.md` for deployment instructions
   - Recommended: Deploy to Vercel

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

---

## Project Structure Overview

```
proparty-listing/
├── src/
│   ├── app/              # Pages and routes
│   │   ├── admin/        # Admin panel
│   │   ├── api/          # API routes
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   │   └── ui/           # UI components
│   └── lib/              # Utilities and helpers
│       ├── supabase/     # Supabase clients
│       ├── actions.ts    # Server actions
│       └── data.ts       # Data fetching
├── supabase/
│   └── migrations/       # Database migrations
├── .env.local            # Environment variables (create this)
└── package.json          # Dependencies
```

---

## Resources

- **Full Documentation**: See `DOCUMENTATION.md`
- **API Reference**: See `API_REFERENCE.md`
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## Getting Help

If you encounter issues:

1. Check the **Common Issues** section above
2. Review the full documentation in `DOCUMENTATION.md`
3. Check Supabase project logs
4. Verify environment variables
5. Check browser console for errors

---

## Development Tips

### Hot Reload
The dev server supports hot reload. Changes to files will automatically refresh the browser.

### TypeScript Errors
If you see TypeScript errors:
```bash
npm run typecheck
```

### Database Changes
After modifying the database schema:
1. Create a new migration file
2. Run it in Supabase SQL Editor
3. Update TypeScript types in `src/lib/types.ts`

### Adding New Pages
1. Create file in `src/app/your-page/page.tsx`
2. Add navigation link in `src/components/site-header.tsx`
3. Page will be automatically routed

---

**Congratulations!** 🎉

You now have a fully functional property listing application running locally. Start customizing it to match your needs!

---

**Last Updated**: November 22, 2025
