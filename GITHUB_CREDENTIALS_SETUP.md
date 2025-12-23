# GitHub Credentials Setup Guide

## Issue: "Credentials not found"

This usually happens when Git doesn't have your GitHub credentials configured.

## Solution Options

### Option 1: Use Personal Access Token (Recommended)

**Step 1: Create Personal Access Token**

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `Vercel Deployment`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (if using GitHub Actions)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

**Step 2: Use Token for Git**

When Git asks for password, use the token instead:

```bash
# Push with token
git push origin main
# Username: your-github-username
# Password: paste-your-token-here
```

**Step 3: Save Credentials (Windows)**

Windows Credential Manager will save it automatically, or use:

```bash
git config --global credential.helper wincred
```

### Option 2: Use SSH Keys (More Secure)

**Step 1: Generate SSH Key**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Enter passphrase (optional but recommended)
```

**Step 2: Add SSH Key to GitHub**

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   (Or on Windows: `type C:\Users\YourName\.ssh\id_ed25519.pub`)

2. Go to: https://github.com/settings/keys
3. Click "New SSH key"
4. Paste your public key
5. Click "Add SSH key"

**Step 3: Change Remote to SSH**

```bash
git remote set-url origin git@github.com:TomTsadaka/TyPacks.git
git push origin main
```

### Option 3: Configure Git Credentials Globally

```bash
# Set your GitHub username
git config --global user.name "TomTsadaka"

# Set your email
git config --global user.email "your-email@example.com"

# Use credential helper (Windows)
git config --global credential.helper wincred

# Or use manager-core (newer)
git config --global credential.helper manager-core
```

### Option 4: For Vercel Deployment

If Vercel is saying "credentials not found":

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Git
   - Make sure GitHub is connected
   - Reconnect if needed

2. **Check Vercel GitHub Integration:**
   - Go to: https://vercel.com/account/integrations
   - Make sure GitHub is connected
   - Re-authorize if needed

## Quick Fix Commands

```bash
# Check current config
git config --list

# Set username and email
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Test connection
git ls-remote origin

# Push with explicit credentials
git push https://YOUR_TOKEN@github.com/TomTsadaka/TyPacks.git main
```

## Troubleshooting

### "Authentication failed"
- Use Personal Access Token instead of password
- Make sure token has `repo` scope

### "Permission denied"
- Check if you have access to the repository
- Verify SSH key is added to GitHub

### Vercel can't access GitHub
- Reconnect GitHub in Vercel settings
- Check repository permissions
- Make sure repository is not private (or Vercel has access)

## Need Help?

1. **Check current status:**
   ```bash
   git config --list
   git remote -v
   ```

2. **Test connection:**
   ```bash
   git ls-remote origin
   ```

3. **If using HTTPS, use token:**
   - Create token at: https://github.com/settings/tokens
   - Use token as password when prompted

4. **If using SSH:**
   - Make sure SSH key is added to GitHub
   - Test: `ssh -T git@github.com`

