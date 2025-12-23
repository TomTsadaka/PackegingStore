# Login Fix Guide

## Issue
Cannot login - "Invalid username or password" error.

## Root Cause
The admin user doesn't exist in the database because:
1. Database hasn't been seeded, OR
2. Database connection isn't configured properly

## Solution Steps

### Step 1: Set Up Database Connection

1. **Choose a database provider:**
   - **Option A: Supabase (Recommended - Free)**
     - Go to https://supabase.com
     - Create account and new project
     - Copy connection string from Settings → Database
   
   - **Option B: Neon (Free PostgreSQL)**
     - Go to https://neon.tech
     - Create account and project
     - Copy connection string

   - **Option C: Local PostgreSQL**
     - Install PostgreSQL
     - Create database: `CREATE DATABASE ty_packaging;`
     - Use connection: `postgresql://user:password@localhost:5432/ty_packaging`

2. **Update `.env` file:**
   ```env
   DATABASE_URL="your-connection-string-here"
   ```

### Step 2: Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database (creates admin user + sample data)
npm run db:seed
```

### Step 3: Verify Admin User Created

After seeding, you should see:
```
✅ Created admin user: admin@typackaging.com (password: admin123)
```

### Step 4: Login

1. Go to: http://localhost:3000/he/login
2. Enter:
   - **Email**: `admin@typackaging.com`
   - **Password**: `admin123`
3. Click Login

### Alternative: Create Admin User Only

If you only want to create the admin user (without seeding all data):

```bash
npm run create-admin
```

This will:
- Create admin user: `admin@typackaging.com` / `admin123`
- Create a company if needed
- Set role to OWNER

## Troubleshooting

### Error: "Can't reach database server"
- **Solution**: Make sure your database is running and `DATABASE_URL` is correct in `.env`

### Error: "User not found"
- **Solution**: Run `npm run db:seed` or `npm run create-admin`

### Error: "Invalid password"
- **Solution**: 
  1. Make sure you're using: `admin@typackaging.com` (exact spelling)
  2. Password: `admin123`
  3. Try running `npm run create-admin` to reset the password

### Check if User Exists

Use Prisma Studio to check:
```bash
npm run db:studio
```
Navigate to `User` model and search for `admin@typackaging.com`

## What Was Fixed

1. ✅ Improved password verification logic
2. ✅ Better error handling in auth.ts
3. ✅ More helpful error messages in login page
4. ✅ Created `create-admin` script for quick admin user setup
5. ✅ Added logging for debugging

## Quick Test

Once database is connected, test with:
```bash
npm run create-admin
```

Then try logging in with:
- Email: `admin@typackaging.com`
- Password: `admin123`

