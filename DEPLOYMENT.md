# Deployment Guide - GitHub + Netlify

This guide will walk you through deploying your User Profile App to GitHub and Netlify.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account ([Sign up here](https://github.com/signup))
- Netlify account ([Sign up here](https://app.netlify.com/signup))

---

## 🚀 Step 1: Prepare Your Repository

### Option A: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name:** `user-profile-app` (or your preferred name)
   - **Description:** "Modern user profile application built with React and Vite"
   - Choose **Public** or **Private**
   - **DO NOT** initialize with README (we already have files)
5. Click **Create repository**

---

## 📤 Step 2: Push Your Code to GitHub

Open your terminal/command prompt in the project directory and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit - User Profile App"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/user-profile-app.git
```

---

## 🌐 Step 3: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Log in to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Sign in with GitHub (recommended) or email

2. **Import Project:**
   - Click **"Add new site"** → **"Import an existing project"**
   - Click **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account (if first time)

3. **Select Repository:**
   - Find and click your `user-profile-app` repository

4. **Configure Build Settings:**
   - Netlify will auto-detect settings from `netlify.toml`
   - Verify these settings:
     - **Branch to deploy:** `main`
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click **"Deploy site"**

5. **Wait for Deployment:**
   - Netlify will install dependencies and build your app
   - This usually takes 1-3 minutes
   - Watch the deploy log for progress

6. **Your App is Live! 🎉**
   - Once complete, you'll get a URL like: `https://random-name-123456.netlify.app`
   - Click the URL to view your live app!

---

### Method 2: Deploy via Netlify CLI (Advanced)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# For subsequent deploys
netlify deploy --prod
```

---

## 🎨 Step 4: Customize Your Netlify Site

### Change Site Name

1. Go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Enter your preferred name (e.g., `my-profile-app`)
4. Your new URL: `https://my-profile-app.netlify.app`

### Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow instructions to connect your domain

---

## 🔄 Step 5: Automatic Deployments

**Great news!** Netlify is now connected to your GitHub repository.

### Every time you push changes to GitHub:

```bash
# Make changes to your code
# ...

# Stage changes
git add .

# Commit changes
git commit -m "Updated settings page design"

# Push to GitHub
git push origin main
```

**Netlify will automatically:**
- Detect the push
- Build your app
- Deploy the new version
- Update your live site (usually within 1-3 minutes)

---

## 📊 Deployment Checklist

Before deploying, make sure:

- ✅ `.gitignore` file is present (to exclude `node_modules/` and `dist/`)
- ✅ `netlify.toml` file is present (for build configuration)
- ✅ `package.json` has correct build scripts
- ✅ All environment variables are set (if any)
- ✅ App runs locally without errors (`npm run dev`)
- ✅ App builds successfully (`npm run build`)

---

## 🔍 Verify Files

Make sure these files exist in your project:

```
user-profile-app/
├── .gitignore          ✅ Created
├── netlify.toml        ✅ Created
├── package.json        ✅ Exists
├── vite.config.js      ✅ Exists
├── index.html          ✅ Exists
└── src/                ✅ Exists
```

---

## 🐛 Troubleshooting

### Build Fails on Netlify

**Issue:** "Command failed with exit code 1"

**Solutions:**
1. Check if `package.json` has correct dependencies
2. Verify Node version (Netlify uses Node 18 by default)
3. Check build logs for specific errors
4. Test build locally: `npm run build`

### 404 Errors on Refresh

**Issue:** Page not found when refreshing on routes like `/profile` or `/settings`

**Solution:** Already fixed in `netlify.toml` with SPA redirect rule:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Styles Not Loading

**Issue:** App looks broken on Netlify

**Solutions:**
1. Clear browser cache
2. Check if CSS files are in `dist/` folder after build
3. Verify `index.html` links are correct
4. Check Netlify deploy logs for errors

---

## 📝 Environment Variables (If Needed)

If your app uses environment variables:

1. In Netlify Dashboard, go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add your variables (e.g., `VITE_API_URL`)
4. Redeploy your site

---

## 🔒 Security Headers

Your `netlify.toml` already includes security headers:
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy
- ✅ Cache-Control for assets

---

## 📈 Monitoring Your Site

### Netlify Dashboard Features:

- **Deploy log:** See build progress and errors
- **Analytics:** Track visitors (paid feature)
- **Forms:** Handle form submissions
- **Functions:** Add serverless functions (if needed)
- **Split Testing:** A/B test different versions

---

## 🎯 Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Git commands
git add .
git commit -m "Your message"
git push origin main

# Netlify CLI
netlify deploy --prod
netlify open          # Open site in browser
netlify logs          # View deploy logs
```

---

## 🌟 Next Steps

After deployment:

1. ✅ Test all pages on the live site
2. ✅ Test on mobile devices
3. ✅ Share your live URL!
4. ✅ Set up custom domain (optional)
5. ✅ Enable HTTPS (automatic on Netlify)
6. ✅ Monitor performance

---

## 📞 Need Help?

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **GitHub Docs:** [docs.github.com](https://docs.github.com)
- **Netlify Community:** [community.netlify.com](https://community.netlify.com)

---

## ✨ Your Live URLs

After deployment, you'll have:

- **GitHub Repository:** `https://github.com/YOUR_USERNAME/user-profile-app`
- **Netlify Site:** `https://your-site-name.netlify.app`
- **Netlify Admin:** `https://app.netlify.com/sites/your-site-name`

---

**Congratulations! Your app is now live on the internet! 🎉🚀**


