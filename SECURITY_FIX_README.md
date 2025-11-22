# 🔐 SECURITY FIX - ACTION REQUIRED

## What Was Fixed

✅ **Removed hardcoded service role key** from `src/lib/supabase/admin.ts`

The file now uses environment variables instead of hardcoded secrets.

---

## What You Need to Do NOW

### 1. Create `.env.local` file

In your project root (`d:\Projects\proparty-listing`), create a file named `.env.local` with this content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nlggdhvjvvtwfpxtnjxk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Get Your Keys from Supabase

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **anon public** key → Replace `your_anon_key_here`
5. **ROTATE** the service_role key (click "Rotate" button)
6. Copy the **NEW service_role** key → Replace `your_service_role_key_here`

### 3. Restart Your Server

```bash
npm run dev
```

---

## Why This Matters

The old service role key was **hardcoded in your source code**. This is a critical security vulnerability because:
- Anyone with access to your code has full database access
- If pushed to GitHub, it's publicly exposed
- Service role keys bypass all security rules

**You MUST rotate the old key immediately** to prevent unauthorized access.

---

## Files Changed

- ✅ `src/lib/supabase/admin.ts` - Now uses `process.env.SUPABASE_SERVICE_ROLE_KEY`
- 📝 You need to create: `.env.local` (manually)

---

## Verification

After setup, your app should:
- ✅ Start without errors
- ✅ Load properties correctly
- ✅ Admin login works

If you see "Missing Supabase environment variables", check that `.env.local` exists and has all three variables.

---

For detailed instructions, see the setup guide in the artifacts panel.
