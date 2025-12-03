# Cloudflare Pages Deployment Guide

## ✅ What's Already Done
- ✓ Removed `netlify.toml` 
- ✓ `_redirects` file is correctly configured in `public/` folder
- ✓ Build command: `npm run build`
- ✓ Output directory: `dist`

## 📋 Step-by-Step Deployment Instructions

### Phase 1: Push Code to GitHub (Beginner-Friendly)

#### Step 1.1: Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Ready for Cloudflare Pages"
```

#### Step 1.2: Create a GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., `friendship-quiz`)
3. **DO NOT** initialize with README, .gitignore, or license
4. Copy the repository URL (HTTPS or SSH)

#### Step 1.3: Connect Local Repo to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### Step 1.4: Verify on GitHub
- Go to your GitHub repository URL
- You should see all your project files

---

### Phase 2: Connect to Cloudflare Pages

#### Step 2.1: Sign Up / Log In to Cloudflare
1. Go to https://dash.cloudflare.com/
2. Sign up (free) or log in
3. Complete email verification if needed

#### Step 2.2: Create a Pages Project
1. In Cloudflare Dashboard, click **"Workers & Pages"** (left sidebar)
2. Click **"Pages"** tab
3. Click **"Create application"** → **"Connect to Git"**

#### Step 2.3: Authorize GitHub
1. Click **"Connect GitHub"**
2. Authorize Cloudflare to access your GitHub account
3. Select your repository (`friendship-quiz`)

#### Step 2.4: Configure Build Settings
1. **Project name**: `friendship-quiz` (or your preferred name)
2. **Production branch**: `main`
3. **Build command**: `npm run build`
4. **Build output directory**: `dist`
5. Leave other settings as default
6. Click **"Save and Deploy"**

#### Step 2.5: Wait for Deployment
- Cloudflare will automatically:
  - Clone your repo
  - Run `npm run build`
  - Deploy the `dist` folder
  - Provide you a free URL like: `https://friendship-quiz.pages.dev`

---

### Phase 3: Custom Domain (Optional)

#### Step 3.1: Add Custom Domain
1. In your Pages project, go to **"Custom domains"**
2. Click **"Set up custom domain"**
3. Enter your domain (e.g., `friendshipquiz.live`)
4. Follow Cloudflare's DNS setup instructions

#### Step 3.2: Update DNS Records
- Cloudflare will provide nameservers or CNAME records
- Update your domain registrar's DNS settings
- Wait 24-48 hours for propagation

---

### Phase 4: Automatic Deployments

#### How It Works
- Every time you push to `main` branch on GitHub
- Cloudflare automatically:
  1. Detects the push
  2. Runs `npm run build`
  3. Deploys new `dist` folder
  4. Updates your live site

#### To Deploy New Changes
```bash
git add .
git commit -m "Your changes description"
git push origin main
```

Then check Cloudflare Dashboard → Pages → Deployments to see build progress.

---

## 🔧 Troubleshooting

### Build Fails
1. Check **Deployments** tab in Cloudflare Pages
2. Click failed deployment to see error logs
3. Common issues:
   - Missing dependencies: Run `npm install` locally
   - Wrong build command: Verify `npm run build` works locally
   - Wrong output directory: Check `vite.config.js`

### Site Shows 404 on Routes
- ✓ Already fixed: Your `_redirects` file handles this
- All routes redirect to `/index.html` for React Router

### Site Won't Load
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5 minutes for DNS propagation
- Check Cloudflare Dashboard for deployment status

---

## 📊 Benefits of Cloudflare Pages

✓ **Free tier**: Unlimited bandwidth, unlimited sites  
✓ **Fast CDN**: Global edge network  
✓ **Automatic HTTPS**: Free SSL certificate  
✓ **Git integration**: Auto-deploy on push  
✓ **Preview deployments**: Test before going live  
✓ **Custom domains**: Use your own domain  

---

## 🚀 Quick Reference

| What | Value |
|------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Redirects File | `public/_redirects` |
| Production Branch | `main` |
| Free URL | `https://friendship-quiz.pages.dev` |

---

## ❓ Need Help?

- Cloudflare Docs: https://developers.cloudflare.com/pages/
- GitHub Help: https://docs.github.com/
- React Router: https://reactrouter.com/
