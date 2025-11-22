# Developer Guide - Common Tasks

This guide covers common development tasks and how to accomplish them in the Skyline Property Listing application.

## Table of Contents

1. [Adding a New Property Field](#adding-a-new-property-field)
2. [Creating a New Admin Page](#creating-a-new-admin-page)
3. [Adding a New Filter Option](#adding-a-new-filter-option)
4. [Customizing the UI Theme](#customizing-the-ui-theme)
5. [Adding Email Notifications](#adding-email-notifications)
6. [Implementing Property Favorites](#implementing-property-favorites)
7. [Adding a New Property Type](#adding-a-new-property-type)
8. [Customizing the Homepage](#customizing-the-homepage)
9. [Adding Analytics](#adding-analytics)
10. [Performance Optimization](#performance-optimization)

---

## Adding a New Property Field

Let's add a "Year Built" field to properties.

### Step 1: Update Database Schema

Create a new migration file: `supabase/migrations/008_add_year_built.sql`

```sql
-- Add year_built column to properties table
ALTER TABLE properties
ADD COLUMN year_built INTEGER;

-- Add a check constraint to ensure reasonable years
ALTER TABLE properties
ADD CONSTRAINT year_built_check CHECK (year_built >= 1800 AND year_built <= 2100);
```

Run this in Supabase SQL Editor.

### Step 2: Update TypeScript Types

Edit `src/lib/types.ts`:

```typescript
export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  region: Region;
  type: PropertyType;
  status: ListingStatus;
  dubaiStatus?: DubaiStatus;
  imageIds: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt?: number; // Add this line
  createdAt?: string;
};
```

### Step 3: Update Validation Schema

Edit `src/lib/actions.ts`:

```typescript
const propertySchema = z.object({
  // ... existing fields
  yearBuilt: z.number().int().min(1800).max(2100).optional(),
});
```

### Step 4: Update Property Form

Edit `src/app/admin/properties/new/page.tsx` (or edit form):

```tsx
{/* Add this input field */}
<div>
  <Label htmlFor="yearBuilt">Year Built</Label>
  <Input
    id="yearBuilt"
    name="yearBuilt"
    type="number"
    min="1800"
    max="2100"
    placeholder="e.g., 2020"
  />
</div>
```

### Step 5: Update Display Components

Edit `src/components/property-card.tsx`:

```tsx
{property.yearBuilt && (
  <p className="text-sm text-muted-foreground">
    Built in {property.yearBuilt}
  </p>
)}
```

### Step 6: Update Data Formatting

Edit `src/lib/data.ts`:

```typescript
function formatProperty(property: any): Property {
  return {
    // ... existing fields
    yearBuilt: property.year_built,
  };
}

function formatPropertyForInsert(property: any) {
  return {
    // ... existing fields
    year_built: property.yearBuilt,
  };
}
```

---

## Creating a New Admin Page

Let's create a "Reports" page in the admin panel.

### Step 1: Create the Page File

Create `src/app/admin/reports/page.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ReportsPage() {
  // Fetch data here
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          View analytics and reports
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">125</p>
          </CardContent>
        </Card>
        
        {/* Add more report cards */}
      </div>
    </div>
  );
}
```

### Step 2: Add to Admin Sidebar

Edit `src/app/admin/layout.tsx`:

```tsx
const sidebarItems = [
  // ... existing items
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart, // Import from lucide-react
  },
];
```

### Step 3: Test the Page

Navigate to `http://localhost:3000/admin/reports`

The page is automatically protected by the middleware!

---

## Adding a New Filter Option

Let's add a "Parking Spaces" filter.

### Step 1: Add Database Field

```sql
ALTER TABLE properties
ADD COLUMN parking_spaces INTEGER DEFAULT 0;
```

### Step 2: Update Types

```typescript
export type Property = {
  // ... existing fields
  parkingSpaces: number;
};
```

### Step 3: Update Property Filters Component

Edit `src/components/property-filters.tsx`:

```tsx
// Add state
const [parkingSpaces, setParkingSpaces] = useState<number>(0);

// Add filter UI
<div className="space-y-2">
  <Label>Parking Spaces</Label>
  <Select
    value={parkingSpaces.toString()}
    onValueChange={(value) => setParkingSpaces(parseInt(value))}
  >
    <SelectTrigger>
      <SelectValue placeholder="Any" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="0">Any</SelectItem>
      <SelectItem value="1">1+</SelectItem>
      <SelectItem value="2">2+</SelectItem>
      <SelectItem value="3">3+</SelectItem>
    </SelectContent>
  </Select>
</div>

// Update filter logic
const filtered = properties.filter(property => {
  // ... existing filters
  if (parkingSpaces > 0 && property.parkingSpaces < parkingSpaces) {
    return false;
  }
  return true;
});
```

---

## Customizing the UI Theme

### Changing Primary Color

Edit `src/app/globals.css`:

```css
@layer base {
  :root {
    /* Change primary color (default is blue) */
    --primary: 142 76% 36%; /* Green */
    --primary-foreground: 355.7 100% 97.3%;
  }
}
```

### Adding Custom Colors

```css
:root {
  --brand: 200 100% 50%; /* Custom brand color */
}

.dark {
  --brand: 200 100% 60%;
}
```

Use in components:

```tsx
<div className="bg-[hsl(var(--brand))]">
  Custom color
</div>
```

### Changing Font

Edit `src/app/layout.tsx`:

```tsx
<link 
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
  rel="stylesheet" 
/>
```

Edit `tailwind.config.ts`:

```typescript
fontFamily: {
  body: ['Poppins', 'sans-serif'],
  headline: ['Poppins', 'sans-serif'],
},
```

---

## Adding Email Notifications

Let's send an email when a new inquiry is submitted.

### Step 1: Install Email Service

```bash
npm install @sendgrid/mail
# or
npm install nodemailer
```

### Step 2: Add Environment Variable

```env
SENDGRID_API_KEY=your_api_key
# or
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
```

### Step 3: Create Email Utility

Create `src/lib/email.ts`:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyTitle?: string;
}) {
  const msg = {
    to: 'admin@skyvera.com',
    from: 'notifications@skyvera.com',
    subject: `New Inquiry from ${inquiry.name}`,
    html: `
      <h2>New Property Inquiry</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Phone:</strong> ${inquiry.phone}</p>
      <p><strong>Property:</strong> ${inquiry.propertyTitle || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${inquiry.message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false };
  }
}
```

### Step 4: Update Inquiry Submission

Edit `src/lib/actions.ts`:

```typescript
import { sendInquiryNotification } from './email';

export async function submitInquiry(prevState: any, formData: FormData) {
  // ... existing code
  
  // After successful database insert
  if (data) {
    // Send email notification
    await sendInquiryNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message || '',
      propertyTitle: property?.title,
    });
  }
  
  // ... rest of code
}
```

---

## Implementing Property Favorites

Let's add a favorites feature for users.

### Step 1: Create Favorites Table

```sql
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  UNIQUE(user_id, property_id)
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
```

### Step 2: Create Favorites Context

Create `src/contexts/favorites-context.tsx`:

```tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (propertyId: string) => {
    const updated = [...favorites, propertyId];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFavorite = (propertyId: string) => {
    const updated = favorites.filter(id => id !== propertyId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
```

### Step 3: Add Favorite Button to Property Card

```tsx
'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/favorites-context';
import { Button } from '@/components/ui/button';

export function FavoriteButton({ propertyId }: { propertyId: string }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(propertyId);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => favorite ? removeFavorite(propertyId) : addFavorite(propertyId)}
    >
      <Heart className={favorite ? 'fill-red-500 text-red-500' : ''} />
    </Button>
  );
}
```

---

## Adding a New Property Type

### Via Admin UI

1. Log in to admin panel
2. Go to **Property Configuration**
3. Under "Property Types", enter new type name
4. Click "Add Type"

### Programmatically

```typescript
import { addPropertyType } from '@/lib/data';

await addPropertyType('Duplex');
```

### Via SQL

```sql
INSERT INTO property_types (name, is_active)
VALUES ('Duplex', true);
```

---

## Customizing the Homepage

### Changing Hero Section

Edit `src/components/hero-search.tsx`:

```tsx
<div className="text-center space-y-4">
  <h1 className="text-5xl font-bold">
    Your Custom Headline
  </h1>
  <p className="text-xl text-muted-foreground">
    Your custom subheading
  </p>
</div>
```

### Adding a New Section

Edit `src/app/page.tsx`:

```tsx
{/* Add after featured properties */}
<div className="container mx-auto px-4 py-16">
  <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
  <div className="grid md:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Expert Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Our team of experienced agents...</p>
      </CardContent>
    </Card>
    {/* More cards */}
  </div>
</div>
```

### Changing Featured Properties Count

```tsx
// In page.tsx
getClientProperties().then(properties => {
  setFeaturedProperties(properties.slice(0, 9)); // Show 9 instead of 6
});
```

---

## Adding Analytics

### Google Analytics

1. **Get GA4 Measurement ID**
   - Create property in Google Analytics
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to Environment Variables**
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Create Analytics Component**

Create `src/components/analytics.tsx`:

```tsx
'use client';

import Script from 'next/script';

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
```

4. **Add to Layout**

Edit `src/app/layout.tsx`:

```tsx
import { Analytics } from '@/components/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image';

// Use Next.js Image component
<Image
  src={property.images[0].url}
  alt={property.title}
  width={800}
  height={600}
  priority={index < 3} // Priority for first 3 images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Lazy Loading Components

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const PropertyMap = dynamic(() => import('@/components/property-map'), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // Disable SSR for this component
});
```

### Database Query Optimization

```typescript
// Use select to only fetch needed fields
const { data } = await supabase
  .from('properties')
  .select('id, title, price, location') // Only needed fields
  .limit(10);

// Use indexes for common queries
// Already created in migrations:
// - idx_properties_region
// - idx_properties_type
// - idx_properties_status
```

### Caching with React Query

```bash
npm install @tanstack/react-query
```

```tsx
'use client';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function PropertiesList() {
  const { data, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getClientProperties(),
  });

  // ... render
}
```

---

## Debugging Tips

### Enable Verbose Logging

```typescript
// In data.ts or actions.ts
console.log('Query params:', { region, type, status });
console.log('Query result:', data);
console.log('Error:', error);
```

### Check Supabase Logs

1. Go to Supabase Dashboard
2. Click **Logs** → **Database**
3. View query logs and errors

### Use React DevTools

```bash
# Install React DevTools browser extension
# Inspect component state and props
```

### TypeScript Errors

```bash
# Check all type errors
npm run typecheck

# Fix common issues
# - Add missing type definitions
# - Use type assertions when needed
# - Check import paths
```

---

## Testing

### Manual Testing Checklist

- [ ] Create property
- [ ] Edit property
- [ ] Delete property
- [ ] Upload images
- [ ] Submit inquiry
- [ ] Submit valuation
- [ ] Search properties
- [ ] Filter properties
- [ ] Admin login/logout
- [ ] Mobile responsiveness

### Automated Testing (Future)

```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Create test file
# src/components/__tests__/property-card.test.tsx
```

---

## Common Pitfalls

1. **Forgetting to revalidate paths** after mutations
   ```typescript
   revalidatePath('/properties');
   ```

2. **Using client-side Supabase for admin operations**
   - Always use `supabaseAdmin()` for admin operations

3. **Not handling errors**
   ```typescript
   if (error) {
     console.error(error);
     return { success: false, message: error.message };
   }
   ```

4. **Exposing service role key**
   - Never use in client components
   - Never commit to version control

5. **Not validating user input**
   - Always use Zod schemas
   - Validate on both client and server

---

**Happy Coding!** 🚀

For more information, see:
- [DOCUMENTATION.md](./DOCUMENTATION.md)
- [API_REFERENCE.md](./API_REFERENCE.md)
- [QUICK_START.md](./QUICK_START.md)
