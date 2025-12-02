# Skyvera Property Listing

<div align="center">

**A modern, full-stack real estate property listing platform**

Built with Next.js 15 • TypeScript • Supabase • Tailwind CSS

[Quick Start](#quick-start) • [Documentation](#documentation) • [Features](#features) • [Demo](#demo)

</div>

---

## Overview

**Skyvera Property Listing** (also known as Skyvera Listings) is a comprehensive real estate platform that enables users to browse properties in Dubai and London, submit inquiries, request valuations, and provides a powerful admin dashboard for complete property lifecycle management.

### Key Highlights

✨ **Modern Tech Stack** - Built with Next.js 15, TypeScript, and Supabase  
🎨 **Beautiful UI** - Responsive design with Tailwind CSS and shadcn/ui components  
🔒 **Secure** - Custom authentication, RLS policies, and password hashing  
📱 **Mobile-First** - Fully responsive across all devices  
⚡ **Fast** - Optimized with Turbopack and server-side rendering  
🖼️ **Image Management** - Supabase Storage integration for property images  

---

## Quick Start

Get up and running in under 10 minutes:

```bash
# 1. Clone and install
git clone <repository-url>
cd proparty-listing
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Run database migrations (in Supabase SQL Editor)
# See QUICK_START.md for detailed instructions

# 4. Start development server
npm run dev
```

**Default Admin Credentials:**
- Email: `admin@skyvera.com`
- Password: `password`

📖 **For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)**

---

## Features

### 🏠 Public Features

- **Property Browsing** - Browse properties with advanced filtering
- **Search & Filter** - Filter by region, type, price, bedrooms, and more
- **Property Details** - Detailed property pages with image galleries
- **Inquiry System** - Submit inquiries for specific properties
- **Valuation Requests** - Request property valuations
- **WhatsApp Integration** - Instant contact via WhatsApp

### 👨‍💼 Admin Features

- **Dashboard** - Overview of properties, inquiries, and valuations
- **Property Management** - Create, edit, and delete properties
- **Image Upload** - Upload and manage property images
- **Inquiry Management** - View and manage customer inquiries
- **Valuation Management** - Track valuation requests
- **Dynamic Configuration** - Add/remove property types and statuses
- **Secure Authentication** - Protected admin routes with middleware

---

## Technology Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Radix UI (shadcn/ui)
- **Forms**: React Hook Form + Zod
- **Authentication**: Custom with bcryptjs

---

## Documentation

We've created comprehensive documentation to help you understand and work with this project:

### 📚 Core Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 10 minutes
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete project documentation
  - Project overview and architecture
  - Database schema and relationships
  - Authentication and authorization
  - Component structure
  - Deployment guide
  - Security considerations

### 🔧 Technical Reference

- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation
  - Server Actions reference
  - Data fetching functions
  - API routes
  - Type definitions
  - Supabase utilities
  - Error handling patterns

### 🗄️ Database Documentation

- **[SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)** - Supabase setup details
- **[SUPABASE_IMPLEMENTATION_SUMMARY.md](./SUPABASE_IMPLEMENTATION_SUMMARY.md)** - Implementation summary
- **[SUPABASE_FEATURES_IMPLEMENTATION.md](./SUPABASE_FEATURES_IMPLEMENTATION.md)** - Feature implementation guide

### 🔐 Security

- **[SECURITY_FIX_README.md](./SECURITY_FIX_README.md)** - Security fixes and best practices

---

## Project Structure

```
proparty-listing/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin panel
│   │   ├── api/               # API routes
│   │   ├── properties/        # Property pages
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   └── ...                # Feature components
│   ├── lib/                   # Utilities
│   │   ├── supabase/          # Supabase clients
│   │   ├── actions.ts         # Server actions
│   │   └── data.ts            # Data fetching
│   └── middleware.ts          # Auth middleware
├── supabase/
│   └── migrations/            # Database migrations
├── DOCUMENTATION.md           # Complete documentation
├── API_REFERENCE.md           # API reference
├── QUICK_START.md             # Quick start guide
└── README.md                  # This file
```

---

## Development

### Available Scripts

```bash
# Development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**⚠️ Never commit `.env.local` to version control!**

---

## Database Setup

Run migrations in order in the Supabase SQL Editor:

1. `001_init_tables.sql` - Create tables
2. `002_rls_policies.sql` - Set up RLS policies
3. `003_storage_bucket.sql` - Configure storage
4. `004_hash_admin_password.sql` - Hash admin password
5. `005_custom_auth.sql` - Custom authentication
6. `006_property_config.sql` - Property configuration
7. `007_remove_constraints.sql` - Remove constraints

See [QUICK_START.md](./QUICK_START.md) for detailed instructions.

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

The application is optimized for Vercel deployment with automatic builds and previews.

### Other Platforms

Compatible with:
- Netlify
- AWS Amplify
- Google Cloud Run
- Railway
- Any platform supporting Next.js

See [DOCUMENTATION.md](./DOCUMENTATION.md#deployment) for platform-specific guides.

---

## Security

This application implements multiple security layers:

- ✅ Password hashing with bcryptjs
- ✅ Row-Level Security (RLS) policies
- ✅ Middleware-based route protection
- ✅ Server-side validation with Zod
- ✅ Secure environment variable handling
- ✅ SQL injection prevention

**Important**: Change the default admin password immediately after setup!

See [SECURITY_FIX_README.md](./SECURITY_FIX_README.md) for security best practices.

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

If you encounter issues:

1. Check [QUICK_START.md](./QUICK_START.md) for common issues
2. Review [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed information
3. Check Supabase project logs
4. Verify environment variables
5. Open an issue on GitHub

---

## License

This project is private and proprietary.

---

## Acknowledgments

Built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Primitive components

---

<div align="center">

**Made with ❤️ for real estate professionals**

[Documentation](./DOCUMENTATION.md) • [API Reference](./API_REFERENCE.md) • [Quick Start](./QUICK_START.md)

</div>
