# Deployment Guide - צ.י אריזות

## Step-by-Step Deployment to GitHub & Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Your purchased domain
- Database connection (Firebase/Supabase/PostgreSQL)

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ty-packaging` (or your preferred name)
3. Description: "B2B Ecommerce Platform for צ.י אריזות"
4. Choose: **Private** (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: T.Y Packaging B2B Ecommerce Platform"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ty-packaging.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: You'll be prompted for GitHub credentials. Use a Personal Access Token if 2FA is enabled.

---

## Part 2: Deploy to Vercel

### Step 1: Import Project

1. Go to https://vercel.com
2. Sign up/Login (use GitHub to connect)
3. Click "Add New Project"
4. Import your GitHub repository (`ty-packaging`)
5. Vercel will auto-detect Next.js

### Step 2: Configure Environment Variables

In Vercel project settings, add these environment variables:

**Required:**
```
DATABASE_URL=your-database-connection-string
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-random-secret-here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

**Optional:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
DEFAULT_VAT_RATE=17
```

### Step 3: Build Settings

Vercel will auto-detect:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live at: `https://your-project.vercel.app`

---

## Part 3: Connect Custom Domain

### Step 1: Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Enter your domain: `yourdomain.com`
3. Click "Add"
4. Vercel will show DNS records to add

### Step 2: Configure DNS

Add these DNS records at your domain registrar:

**Option A: Root Domain (yourdomain.com)**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Option B: Subdomain (www.yourdomain.com)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For both:**
```
Type: A
Name: @
Value: 76.76.21.21
```

### Step 3: SSL Certificate

- Vercel automatically provisions SSL certificates
- Wait 24-48 hours for DNS propagation
- SSL will be active automatically

### Step 4: Verify Domain

1. Vercel will verify DNS records
2. Once verified, domain status shows "Valid"
3. Your site is live at your custom domain!

---

## Part 4: Post-Deployment Setup

### Step 1: Update Environment Variables

Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your custom domain:

```
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Step 2: Initialize Database

After first deployment, run database setup:

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npm run db:push
npm run db:seed
```

**Option B: Using Vercel Dashboard**
1. Go to project → Settings → Environment Variables
2. Add `DATABASE_URL`
3. Redeploy project
4. Use a database management tool to run migrations

### Step 3: Create Admin User

After database is set up, create admin user:

```bash
# Via Vercel CLI
vercel env pull .env.local
npm run create-admin
```

Or use your database management tool to insert admin user.

---

## Important Notes

### Environment Variables
- Never commit `.env` file (already in .gitignore)
- Add all secrets in Vercel dashboard
- Use different values for Production vs Preview

### Database
- Use a production database (not localhost)
- Firebase Firestore, Supabase, or Neon recommended
- Update `DATABASE_URL` in Vercel environment variables

### Build Settings
- Vercel auto-detects Next.js
- No additional configuration needed
- Builds automatically on every push to main branch

### Custom Domain
- DNS changes can take 24-48 hours
- Vercel handles SSL automatically
- Supports both www and non-www

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` scripts are correct

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows Vercel IPs
- Ensure database is accessible from internet

### Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check domain status in Vercel dashboard

---

## Quick Commands Reference

```bash
# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# Deploy to Vercel (via CLI)
npm i -g vercel
vercel login
vercel

# Pull environment variables
vercel env pull .env.local

# Run database migrations
npm run db:push
npm run db:seed
```

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- GitHub Docs: https://docs.github.com

