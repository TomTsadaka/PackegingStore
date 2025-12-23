# GitHub Actions Vercel Setup

## Issue
GitHub Actions is trying to run `vercel pull` but doesn't have credentials.

## Solution: Add Vercel Token to GitHub Secrets

### Step 1: Get Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `GitHub Actions`
4. Copy the token (you'll only see it once!)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/TomTsadaka/TyPacks
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `VERCEL_TOKEN`
5. Value: Paste your Vercel token
6. Click **"Add secret"**

### Step 3: Update GitHub Actions Workflow

The workflow file (`.github/workflows/vercel.yml`) should use the token:

```yaml
- name: Pull Vercel Environment Information
  run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
```

## Alternative: Disable GitHub Actions (If Not Needed)

If you don't need GitHub Actions for deployment (Vercel auto-deploys on push), you can:

1. Delete `.github/workflows/vercel.yml`
2. Or disable GitHub Actions in repository settings

## Current Workflow

Your current workflow (`.github/workflows/vercel.yml`) tries to:
1. Pull environment variables
2. Build the project
3. Deploy to Vercel

**Note:** Vercel already auto-deploys when you push to GitHub, so this workflow might be redundant.

## Recommended: Use Vercel Auto-Deploy

Instead of GitHub Actions, let Vercel handle deployments automatically:
1. Vercel watches your GitHub repo
2. On every push to `main`, it auto-deploys
3. No GitHub Actions needed!

To use auto-deploy:
- Make sure your project is connected in Vercel dashboard
- Push to GitHub → Vercel auto-deploys

