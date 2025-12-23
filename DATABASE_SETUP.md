# Database Setup Instructions

## Quick Setup Options

### Option 1: Use Supabase (Recommended - Free & Easy)

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. Update `.env` file:
   ```
   DATABASE_URL="your-supabase-connection-string"
   ```

### Option 2: Use Neon (Free PostgreSQL)

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy the connection string
4. Update `.env` file with the connection string

### Option 3: Local PostgreSQL

1. Install PostgreSQL: https://www.postgresql.org/download/windows/
2. Create a database:
   ```sql
   CREATE DATABASE ty_packaging;
   ```
3. Update `.env` with your local connection:
   ```
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ty_packaging?schema=public"
   ```

## After Database Setup

Run these commands:

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

## Test Credentials

After seeding:
- **Email**: admin@typackaging.com
- **Password**: admin123

