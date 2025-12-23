# Deploy to Vercel - Step by Step

## Prerequisites
✅ Code pushed to GitHub
✅ Vercel account (sign up at https://vercel.com)

## Step 1: Import Project to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Authorize GitHub if needed
4. Select your `ty-packaging` repository
5. Click "Import"

## Step 2: Configure Project

Vercel will auto-detect:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

**You can leave defaults as-is.**

## Step 3: Add Environment Variables

Before deploying, add these in Vercel:

### Required Variables:

```
DATABASE_URL=your-database-connection-string
NEXTAUTH_URL=https://your-domain.com (or https://your-project.vercel.app for now)
NEXTAUTH_SECRET=generate-a-random-secret-here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Optional Variables:

```
DEFAULT_VAT_RATE=17
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

**How to add:**
1. In Vercel project settings → Environment Variables
2. Add each variable
3. Select environment: Production, Preview, Development
4. Click "Save"

## Step 4: Deploy

1. Click "Deploy" button
2. Wait 2-3 minutes for build
3. Your app will be live at: `https://your-project.vercel.app`

## Step 5: Connect Custom Domain

### In Vercel:

1. Go to: Project → Settings → Domains
2. Enter your domain: `yourdomain.com`
3. Click "Add"
4. Vercel will show DNS records

### At Your Domain Registrar:

Add these DNS records:

**For root domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Wait for DNS Propagation

- Can take 24-48 hours
- Vercel will verify automatically
- SSL certificate will be issued automatically

## Step 6: Update Environment Variables

After domain is connected, update:

```
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Then redeploy (or wait for next auto-deploy).

## Step 7: Initialize Database

After first deployment:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Pull env vars: `vercel env pull .env.local`
4. Run migrations: `npm run db:push`
5. Seed database: `npm run db:seed` or `npm run create-admin`

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Check for TypeScript errors

### Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check domain status in Vercel

### Database Connection
- Ensure DATABASE_URL is correct
- Database must be accessible from internet
- Check firewall rules

