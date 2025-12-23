# Push to GitHub - Quick Steps

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `ty-packaging` (or your preferred name)
3. Description: "B2B Ecommerce Platform for צ.י אריזות"
4. Choose: **Private** (recommended for business) or Public
5. **IMPORTANT**: Do NOT check "Initialize with README"
6. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ty-packaging.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
- Use Personal Access Token instead of password
- Create token: https://github.com/settings/tokens
- Select scope: `repo` (full control)
- Use token as password when prompted

## Step 3: Verify

1. Go to your GitHub repository
2. You should see all your files
3. Ready for Vercel deployment!

---

**Your code is already committed locally and ready to push!**

