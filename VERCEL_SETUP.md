# Quick Vercel Setup Checklist

## Before Pushing to GitHub

✅ All code is ready
✅ `.env` is in `.gitignore` (already done)
✅ No sensitive data in code
✅ Database connection string ready

## GitHub Setup

1. **Create Repository**
   - Go to: https://github.com/new
   - Name: `ty-packaging`
   - Private/Public: Your choice
   - **Don't** initialize with README

2. **Push Code**
   ```bash
   git add .
   git commit -m "Initial commit: צ.י אריזות B2B Ecommerce Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ty-packaging.git
   git push -u origin main
   ```

## Vercel Deployment

1. **Import Project**
   - Go to: https://vercel.com/new
   - Import from GitHub
   - Select your repository
   - Click "Import"

2. **Environment Variables** (Add these in Vercel):
   ```
   DATABASE_URL=your-firebase-or-db-connection
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=generate-random-secret
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   DEFAULT_VAT_RATE=17
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build
   - Get your Vercel URL

## Custom Domain

1. **In Vercel Dashboard:**
   - Settings → Domains
   - Add your domain
   - Copy DNS records

2. **At Your Domain Registrar:**
   - Add DNS records shown by Vercel
   - Wait for verification (can take 24-48 hours)

3. **SSL Certificate:**
   - Vercel handles this automatically
   - No action needed

## After Deployment

1. **Set up database:**
   ```bash
   vercel env pull .env.local
   npm run db:push
   npm run create-admin
   ```

2. **Test login:**
   - Go to: https://your-domain.com/he/login
   - Email: admin@typackaging.com
   - Password: admin123

## Firebase Setup (if using Firebase)

Since you mentioned Firebase, here's how to integrate:

1. **Install Firebase:**
   ```bash
   npm install firebase
   ```

2. **Create Firebase config file:**
   - `src/lib/firebase.ts`
   - Add Firebase project credentials

3. **Update environment variables:**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   ```

4. **Update database queries:**
   - Replace Prisma queries with Firebase Firestore queries
   - Or use Firebase as storage only

Would you like me to set up Firebase integration?

