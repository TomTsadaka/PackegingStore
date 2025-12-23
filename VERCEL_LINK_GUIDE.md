# Linking to Existing Vercel Project

## Option 1: Link via CLI (Interactive)

Run:
```bash
vercel link
```

Then:
1. Select "Link to existing project"
2. Choose your project: `TyPacks` or `ty-packs`
3. Select the scope (your account)
4. Confirm

## Option 2: Link with Project Name

If you know your project name:
```bash
vercel link --project=ty-packs
```

## Option 3: Pull Environment Variables Directly

If your project is already deployed on Vercel, you can pull env vars:

```bash
vercel env pull .env.local
```

This will:
- Connect to your Vercel project
- Download all environment variables
- Save them to `.env.local`

## After Linking

Once linked, you can:
- Pull environment variables: `vercel env pull .env.local`
- Deploy: `vercel --prod`
- View logs: `vercel logs`

## If Project Doesn't Exist Yet

If you haven't created the project in Vercel dashboard yet:
1. Go to: https://vercel.com/new
2. Import your GitHub repository: `TomTsadaka/TyPacks`
3. Then come back and link: `vercel link`

