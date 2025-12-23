# Vercel Environment Variables Setup

## Required Environment Variables

You **DO** have environment variables that need to be set in Vercel. Here's what you need:

### 🔴 Required (Must Have)

```
DATABASE_URL=your-database-connection-string
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=https://your-domain.com (or https://your-project.vercel.app for now)
NEXT_PUBLIC_APP_URL=https://your-domain.com (or https://your-project.vercel.app for now)
```

### 🟡 Optional (But Recommended)

```
DEFAULT_VAT_RATE=17
```

### 🟢 Optional (If Using These Features)

```
# Stripe Payment (if using Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Supabase Storage (if using Supabase for images)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## How to Set Them in Vercel

### Step 1: During Project Import

When Vercel asks "Do you have environment variables?":
- Click **"Yes"** or **"Add Environment Variables"**
- Add each variable one by one

### Step 2: Or Add Later

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add each variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your database connection string
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**
5. Repeat for each variable

---

## Quick Setup Guide

### 1. Generate NEXTAUTH_SECRET

Run this command locally:
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

Copy the generated secret and use it for `NEXTAUTH_SECRET`.

### 2. Set DATABASE_URL

**If using Firebase:**
- Get your Firebase connection string from Firebase Console
- Format: `firebase://your-project-id`

**If using Supabase:**
- Go to Supabase → Settings → Database
- Copy the connection string (URI format)

**If using PostgreSQL:**
- Format: `postgresql://user:password@host:5432/database?schema=public`

### 3. Set URLs

**For initial deployment (before custom domain):**
```
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

**After connecting custom domain:**
```
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## Minimum Setup for First Deployment

For the first deployment, you need at least these 4 variables:

```
DATABASE_URL=your-database-connection-string
NEXTAUTH_SECRET=generate-random-32-character-string
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

**Note:** You can update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` later after connecting your custom domain.

---

## Example Values

Here's what your environment variables might look like (use your actual values):

```
DATABASE_URL=postgresql://user:password@db.xxxxx.supabase.co:5432/postgres
NEXTAUTH_SECRET=aBc123XyZ456DeF789GhI012JkL345MnO678PqR
NEXTAUTH_URL=https://typacks.vercel.app
NEXT_PUBLIC_APP_URL=https://typacks.vercel.app
DEFAULT_VAT_RATE=17
```

---

## Important Notes

⚠️ **Never commit `.env` file** - It's already in `.gitignore`
✅ **Add secrets only in Vercel** - Not in your code
✅ **Use different values** for Production vs Preview environments if needed
✅ **Update URLs** after connecting custom domain

---

## After Adding Variables

1. Click **"Deploy"** in Vercel
2. Wait for build to complete
3. Your app will be live!

If you need help getting any of these values, let me know!

