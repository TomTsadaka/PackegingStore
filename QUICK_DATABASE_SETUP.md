# Quick Database Setup Guide

## The Problem
Your database isn't connected. The app is trying to connect to `localhost:5432` but there's no PostgreSQL server running.

## Quick Solution: Use Supabase (Free & Easy - 2 minutes)

### Step 1: Create Supabase Account
1. Go to: https://supabase.com
2. Click "Start your project" (free)
3. Sign up with GitHub/Google (or email)

### Step 2: Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: ty-packaging (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
3. Click "Create new project"
4. Wait 2 minutes for setup

### Step 3: Get Connection String
1. Go to **Settings** → **Database**
2. Scroll to **Connection string**
3. Select **URI** tab
4. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)

### Step 4: Update .env File
Replace `[YOUR-PASSWORD]` with your actual password, then update `.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

### Step 5: Run Setup Commands
```bash
npm run db:push
npm run create-admin
```

### Step 6: Login
- Email: `admin@typackaging.com`
- Password: `admin123`

## Alternative: Use Neon (Also Free)

1. Go to: https://neon.tech
2. Sign up (free)
3. Create project
4. Copy connection string
5. Update `.env` with connection string
6. Run: `npm run db:push` then `npm run create-admin`

## Alternative: Local PostgreSQL

If you have PostgreSQL installed locally:

1. Start PostgreSQL service
2. Create database:
   ```sql
   CREATE DATABASE ty_packaging;
   ```
3. Update `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ty_packaging?schema=public"
   ```
4. Run: `npm run db:push` then `npm run create-admin`

## After Database is Connected

Once you have a working database connection, run:

```bash
# Push schema
npm run db:push

# Create admin user
npm run create-admin

# Or seed everything (categories + products + admin)
npm run db:seed
```

Then you can login with:
- **Email**: admin@typackaging.com
- **Password**: admin123

