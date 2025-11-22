# API Reference - Skyline Property Listing

## Table of Contents
1. [Server Actions](#server-actions)
2. [Data Fetching Functions](#data-fetching-functions)
3. [API Routes](#api-routes)
4. [Type Definitions](#type-definitions)
5. [Supabase Utilities](#supabase-utilities)

---

## Server Actions

Server Actions are Next.js server-side functions that can be called from client components. They are defined with the `'use server'` directive.

### Authentication Actions (`src/app/actions.ts`)

#### `authenticateAdminAction(email: string, password: string)`

Authenticates an admin user against the database.

**Parameters:**
- `email` (string): Admin email address
- `password` (string): Plain text password

**Returns:**
```typescript
Promise<{
  success: boolean;
  message: string;
}>
```

**Example:**
```typescript
const result = await authenticateAdminAction('admin@skyvera.com', 'password');
if (result.success) {
  // Set cookie and redirect
}
```

**Implementation Details:**
- Queries `admin_users` table
- Uses bcrypt to compare passwords
- Returns success/failure status

---

#### `uploadImageAction(formData: FormData)`

Uploads an image to Supabase Storage.

**Parameters:**
- `formData` (FormData): Must contain:
  - `file`: File object
  - `fileName`: String filename

**Returns:**
```typescript
Promise<{
  success: boolean;
  message?: string;
  data?: any;
}>
```

**Example:**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('fileName', `property-${Date.now()}.jpg`);

const result = await uploadImageAction(formData);
if (result.success) {
  console.log('Uploaded:', result.data);
}
```

**Implementation Details:**
- Uses Supabase Admin client
- Uploads to `property-images` bucket
- Sets cache control to 3600 seconds
- Does not upsert (fails if file exists)

---

#### `addPropertyTypeAction(name: string)`

Adds a new property type to the database.

**Parameters:**
- `name` (string): Property type name (e.g., "Duplex")

**Returns:**
```typescript
Promise<{
  success: boolean;
  message?: string;
  data?: PropertyType;
}>
```

**Example:**
```typescript
const result = await addPropertyTypeAction('Duplex');
if (result.success) {
  console.log('Added:', result.data);
}
```

---

#### `addListingStatusAction(name: string)`

Adds a new listing status to the database.

**Parameters:**
- `name` (string): Listing status name (e.g., "Lease")

**Returns:**
```typescript
Promise<{
  success: boolean;
  message?: string;
  data?: ListingStatus;
}>
```

---

#### `deletePropertyTypeAction(name: string)`

Soft deletes a property type (sets `is_active: false`).

**Parameters:**
- `name` (string): Property type name to delete

**Returns:**
```typescript
Promise<{
  success: boolean;
  message?: string;
}>
```

---

#### `deleteListingStatusAction(name: string)`

Soft deletes a listing status (sets `is_active: false`).

**Parameters:**
- `name` (string): Listing status name to delete

**Returns:**
```typescript
Promise<{
  success: boolean;
  message?: string;
}>
```

---

### Property & Form Actions (`src/lib/actions.ts`)

#### `saveProperty(prevState: any, formData: FormData)`

Creates or updates a property. This is designed to work with `useFormState`.

**Parameters:**
- `prevState` (any): Previous form state (from useFormState)
- `formData` (FormData): Form data containing property fields

**FormData Fields:**
- `id` (optional): Property ID for updates
- `title`: Property title
- `description`: Property description
- `price`: Property price (number)
- `location`: Property location
- `region`: Region (Dubai/London)
- `type`: Property type
- `status`: Listing status
- `dubaiStatus` (optional): Dubai status (Ready/Off-plan)
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms
- `area`: Area in sqft
- `images`: File objects (multiple)

**Returns:**
```typescript
Promise<{
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}>
```

**Example:**
```typescript
'use client';
import { useFormState } from 'react-dom';
import { saveProperty } from '@/lib/actions';

const [state, formAction] = useFormState(saveProperty, null);

<form action={formAction}>
  {/* form fields */}
</form>
```

**Validation Schema:**
```typescript
const propertySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().positive("Price must be positive"),
  location: z.string().min(2, "Location is required"),
  region: z.enum(["Dubai", "London"]),
  type: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Listing status is required"),
  dubaiStatus: z.enum(["Ready", "Off-plan"]).optional(),
  bedrooms: z.number().int().min(0, "Bedrooms must be 0 or more"),
  bathrooms: z.number().int().min(0, "Bathrooms must be 0 or more"),
  area: z.number().positive("Area must be positive"),
});
```

---

#### `deleteProperty(id: string)`

Deletes a property from the database.

**Parameters:**
- `id` (string): Property UUID

**Returns:**
```typescript
Promise<{
  success: boolean;
  message: string;
}>
```

**Example:**
```typescript
const result = await deleteProperty('123e4567-e89b-12d3-a456-426614174000');
if (result.success) {
  // Property deleted
}
```

**Side Effects:**
- Revalidates `/admin/properties` path
- Revalidates `/properties` path

---

#### `submitInquiry(prevState: any, formData: FormData)`

Submits a customer inquiry. Designed for `useFormState`.

**Parameters:**
- `prevState` (any): Previous form state
- `formData` (FormData): Form data

**FormData Fields:**
- `propertyId` (optional): Property UUID
- `name`: Customer name
- `email`: Customer email
- `phone`: Customer phone
- `message` (optional): Inquiry message

**Returns:**
```typescript
Promise<{
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}>
```

**Validation Schema:**
```typescript
const inquirySchema = z.object({
  propertyId: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  message: z.string().optional(),
});
```

---

#### `submitValuation(prevState: any, formData: FormData)`

Submits a valuation request. Designed for `useFormState`.

**Parameters:**
- `prevState` (any): Previous form state
- `formData` (FormData): Form data

**FormData Fields:**
- `name`: Customer name
- `email`: Customer email
- `phone`: Customer phone
- `message`: Valuation details (required)

**Returns:**
```typescript
Promise<{
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}>
```

**Validation Schema:**
```typescript
const valuationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
```

---

## Data Fetching Functions

These functions are in `src/lib/data.ts` and are used to fetch data from Supabase.

### Client-Side Functions

#### `getClientProperties(search?: string)`

Fetches properties for client-side use.

**Parameters:**
- `search` (optional string): Search query to filter properties

**Returns:**
```typescript
Promise<PropertyWithImages[]>
```

**Example:**
```typescript
const properties = await getClientProperties('Dubai');
```

**Implementation:**
- Uses `supabaseClient` (anon key)
- Filters by title, description, or location if search provided
- Converts image IDs to image objects
- Orders by `created_at` descending

---

#### `getClientPropertyById(id: string)`

Fetches a single property by ID for client-side use.

**Parameters:**
- `id` (string): Property UUID

**Returns:**
```typescript
Promise<PropertyWithImages | null>
```

**Example:**
```typescript
const property = await getClientPropertyById('123e4567-e89b-12d3-a456-426614174000');
```

---

### Server-Side Functions

#### `getProperties()`

Fetches all properties (admin use).

**Returns:**
```typescript
Promise<Property[]>
```

**Example:**
```typescript
const properties = await getProperties();
```

**Implementation:**
- Uses `supabaseAdmin` (service role key)
- Returns all properties with full data
- Bypasses RLS

---

#### `getPropertyById(id: string)`

Fetches a single property by ID (admin use).

**Parameters:**
- `id` (string): Property UUID

**Returns:**
```typescript
Promise<Property | null>
```

---

#### `addProperty(propertyData: Omit<Property, 'id'>)`

Adds a new property to the database.

**Parameters:**
- `propertyData`: Property object without ID

**Returns:**
```typescript
Promise<Property>
```

**Example:**
```typescript
const newProperty = await addProperty({
  title: 'Luxury Villa',
  description: 'Beautiful villa...',
  price: 5000000,
  location: 'Palm Jumeirah',
  region: 'Dubai',
  type: 'Villa',
  status: 'Buy',
  dubaiStatus: 'Ready',
  imageIds: ['img1.jpg', 'img2.jpg'],
  bedrooms: 5,
  bathrooms: 6,
  area: 5000,
});
```

---

#### `updateProperty(id: string, propertyData: Partial<Property>)`

Updates an existing property.

**Parameters:**
- `id` (string): Property UUID
- `propertyData`: Partial property object with fields to update

**Returns:**
```typescript
Promise<Property>
```

**Example:**
```typescript
const updated = await updateProperty('123...', {
  price: 4500000,
  status: 'Rent',
});
```

---

#### `getInquiries()`

Fetches all inquiries with associated property data.

**Returns:**
```typescript
Promise<(Inquiry & { property?: Property })[]>
```

**Example:**
```typescript
const inquiries = await getInquiries();
inquiries.forEach(inquiry => {
  console.log(inquiry.name, inquiry.property?.title);
});
```

---

#### `getValuations()`

Fetches all valuation requests.

**Returns:**
```typescript
Promise<Valuation[]>
```

---

#### `getPropertyTypes()`

Fetches all active property types.

**Returns:**
```typescript
Promise<PropertyType[]>
```

**Example:**
```typescript
const types = await getPropertyTypes();
// ['Apartment', 'Villa', 'Townhouse', ...]
```

---

#### `getListingStatuses()`

Fetches all active listing statuses.

**Returns:**
```typescript
Promise<ListingStatus[]>
```

---

#### `getLocations()`

Fetches unique locations from properties.

**Returns:**
```typescript
Promise<string[]>
```

**Example:**
```typescript
const locations = await getLocations();
// ['Palm Jumeirah', 'Dubai Marina', 'Mayfair', ...]
```

---

## API Routes

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-22T19:00:00.000Z"
}
```

---

### GET `/api/test-supabase`

Tests Supabase connection.

**Response (Success):**
```json
{
  "success": true,
  "message": "Connected to Supabase",
  "propertiesCount": 10
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

### GET `/api/properties`

Fetches all properties.

**Response:**
```json
{
  "properties": [
    {
      "id": "123...",
      "title": "Luxury Villa",
      "price": 5000000,
      // ... other fields
    }
  ]
}
```

---

## Type Definitions

### Core Types (`src/lib/types.ts`)

#### `Region`
```typescript
type Region = "Dubai" | "London";
```

#### `PropertyType`
```typescript
type PropertyType = string; // Dynamic, fetched from database
```

#### `ListingStatus`
```typescript
type ListingStatus = string; // Dynamic, fetched from database
```

#### `DubaiStatus`
```typescript
type DubaiStatus = "Ready" | "Off-plan";
```

#### `Property`
```typescript
type Property = {
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
  area: number; // in sqft
  createdAt?: string;
};
```

#### `PropertyWithImages`
```typescript
type PropertyWithImages = Omit<Property, 'imageIds'> & {
  images: Image[];
};

type Image = {
  id: string;
  url: string;
  alt: string;
};
```

#### `Inquiry`
```typescript
type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  submittedAt: Date;
};
```

#### `Valuation`
```typescript
type Valuation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: Date;
};
```

---

## Supabase Utilities

### Storage Functions (`src/lib/supabase/storage.ts`)

#### `uploadPropertyImage(file: File, fileName: string)`

Uploads a property image to Supabase Storage.

**Parameters:**
- `file` (File): Image file
- `fileName` (string): Desired filename

**Returns:**
```typescript
Promise<{
  success: boolean;
  data?: any;
  error?: any;
}>
```

**Example:**
```typescript
const result = await uploadPropertyImage(file, 'property-123.jpg');
if (result.success) {
  const publicUrl = getPropertyImagePublicUrl(result.data.path);
}
```

---

#### `getPropertyImagePublicUrl(path: string)`

Gets the public URL for a property image.

**Parameters:**
- `path` (string): Storage path

**Returns:**
```typescript
string // Public URL
```

**Example:**
```typescript
const url = getPropertyImagePublicUrl('property-123.jpg');
// https://nlggdhvjvvtwfpxtnjxk.supabase.co/storage/v1/object/public/property-images/property-123.jpg
```

---

### Client Configurations

#### `supabaseAdmin()` - Admin Client
```typescript
import { supabaseAdmin } from '@/lib/supabase/admin';

const admin = supabaseAdmin();
const { data } = await admin.from('properties').select('*');
```

**Features:**
- Uses service role key
- Bypasses RLS
- Server-side only
- Full database access

---

#### `supabaseClient` - Client-Side Client
```typescript
import { supabaseClient } from '@/lib/supabase/client';

const { data } = await supabaseClient.from('properties').select('*');
```

**Features:**
- Uses anon key
- Subject to RLS
- Safe for client-side
- Public read access

---

#### `createServerClient()` - Server Component Client
```typescript
import { createServerClient } from '@/lib/supabase/server';

const supabase = createServerClient();
const { data } = await supabase.from('properties').select('*');
```

**Features:**
- Uses anon key
- SSR support
- Cookie-based sessions
- Server components only

---

## Error Handling

### Standard Error Response

All server actions and API routes follow this error pattern:

```typescript
{
  success: false,
  message: "Error description",
  errors?: {
    fieldName: ["Error message 1", "Error message 2"]
  }
}
```

### Example Error Handling

```typescript
const result = await saveProperty(null, formData);

if (!result.success) {
  if (result.errors) {
    // Validation errors
    Object.entries(result.errors).forEach(([field, messages]) => {
      console.error(`${field}: ${messages.join(', ')}`);
    });
  } else {
    // General error
    console.error(result.message);
  }
}
```

---

## Rate Limiting & Best Practices

### Recommendations

1. **Debounce Search Queries**
   ```typescript
   const debouncedSearch = useMemo(
     () => debounce((query) => getClientProperties(query), 300),
     []
   );
   ```

2. **Cache Property Data**
   ```typescript
   // Use React Query or SWR for caching
   const { data } = useSWR('/api/properties', fetcher);
   ```

3. **Optimize Image Uploads**
   - Compress images before upload
   - Use WebP format when possible
   - Limit file size (e.g., 5MB max)

4. **Batch Operations**
   - Upload multiple images in parallel
   - Use Promise.all for concurrent requests

5. **Error Boundaries**
   - Wrap components in error boundaries
   - Show user-friendly error messages
   - Log errors for debugging

---

## Testing

### Example Test Cases

```typescript
// Test property creation
describe('saveProperty', () => {
  it('should create a new property', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Property');
    // ... other fields
    
    const result = await saveProperty(null, formData);
    expect(result.success).toBe(true);
  });
  
  it('should validate required fields', async () => {
    const formData = new FormData();
    const result = await saveProperty(null, formData);
    
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });
});
```

---

**Last Updated**: November 22, 2025
