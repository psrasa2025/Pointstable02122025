# 📖 User Profile App - Complete User Manual

**Version:** 2.0  
**Last Updated:** December 3, 2024  
**Platform:** Web Application (React + Netlify)

---

## 📑 Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [App Features](#3-app-features)
4. [Pages Overview](#4-pages-overview)
5. [Navigation Guide](#5-navigation-guide)
6. [Points System](#6-points-system)
7. [Activities Management](#7-activities-management)
8. [Leaderboards](#8-leaderboards)
9. [Profile Management](#9-profile-management)
10. [Settings](#10-settings)
11. [Backend API Reference](#11-backend-api-reference)
12. [Deployment Guide](#12-deployment-guide)
13. [Local Development](#13-local-development)
14. [Troubleshooting](#14-troubleshooting)
15. [Technical Specifications](#15-technical-specifications)

---

## 1. Introduction

### 1.1 What is User Profile App?

User Profile App is a modern, full-stack web application for managing user profiles, points, activities, and social interactions. Built with React and powered by Netlify Serverless Functions, it provides a complete solution for:

- **User Authentication** - Secure login and registration
- **Profile Management** - Create and edit user profiles
- **Points System** - Earn, donate, transfer, and convert points
- **Activities** - Create, join, and manage activities
- **Leaderboards** - Country and world rankings
- **Mobile-Friendly** - Responsive design for all devices

### 1.2 Key Features

| Feature | Description |
|---------|-------------|
| 📱 Mobile Responsive | Works on phones, tablets, and desktops |
| 🔐 User Authentication | Secure login/register system |
| 💰 Points Management | Full points economy system |
| 📋 Activities | Create and participate in activities |
| 🏆 Leaderboards | Country and global rankings |
| ⚡ Serverless Backend | Fast, scalable API endpoints |
| 💾 Data Persistence | LocalStorage + API storage |
| 🎨 Modern UI | Clean, intuitive interface |

---

## 2. Getting Started

### 2.1 Accessing the App

**Live URL:** `https://your-site-name.netlify.app`

**Supported Browsers:**
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Mobile browsers

### 2.2 First Time Setup

1. **Visit the App** - Open the URL in your browser
2. **Splash Screen** - Click "Get Start →" button
3. **Register/Login** - Create an account or sign in
4. **Explore** - Navigate through the app features

### 2.3 Account Registration

1. Click "Sign up" on the login page
2. Fill in your details:
   - Username
   - Email address
   - Password
3. Click "Create Account"
4. You'll receive 100 welcome bonus points!

### 2.4 Logging In

1. Enter your email address
2. Enter your password
3. Click "Sign in"
4. You'll be redirected to the Home page

---

## 3. App Features

### 3.1 Feature Summary

```
┌─────────────────────────────────────────────────────────┐
│                    USER PROFILE APP                      │
├─────────────────────────────────────────────────────────┤
│  🏠 HOME PAGE (Main Hub)                                │
│  ├── 🔍 Find Activity                                   │
│  ├── 👤 Profile                                         │
│  ├── 📋 View Activity                                   │
│  ├── 👥 Refer/Request                                   │
│  ├── 💰 View Points                                     │
│  ├── 🎁 Donate                                          │
│  ├── 💱 Convert Currency                                │
│  ├── 💸 Transfer Points                                 │
│  ├── 🏆 Leaders Overview                                │
│  └── ⭐ Own Activity                                    │
├─────────────────────────────────────────────────────────┤
│  NAVIGATION BAR                                         │
│  ├── 🏠 Home (Points & Activities Hub)                  │
│  ├── 👤 Profile                                         │
│  ├── ✏️ Edit Profile                                    │
│  └── ⚙️ Settings                                        │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Pages Overview

### 4.1 Complete Page List

| # | Page | Path | Description |
|---|------|------|-------------|
| 1 | Splash | `/` | Welcome screen with app intro |
| 2 | Login | `/login` | User authentication |
| 3 | Register | `/register` | New user registration |
| 4 | Forgot Password | `/forgot-password` | Password recovery |
| 5 | Home | `/home` | Main hub with 10 action buttons |
| 6 | Profile | `/profile` | View user profile |
| 7 | Edit Profile | `/edit` | Edit profile information |
| 8 | Settings | `/settings` | App settings and preferences |
| 9 | Activities List | `/activities-list` | View all activities |
| 10 | Find Activity | `/find-activity` | Search activities |
| 11 | Activity Form | `/activity-form` | Request new activity |
| 12 | Invite Activities | `/invite-activities` | Invite friends |
| 13 | Friend Requests | `/friend-requests` | Manage friend requests |
| 14 | Points Table | `/points-table` | View points breakdown |
| 15 | Donation | `/donation` | Donate points |
| 16 | Convert Points | `/convert-points` | Convert to currency |
| 17 | Transfer Points | `/transfer-points` | Transfer to friends |
| 18 | Leaders | `/leaders` | Leaderboard selection |
| 19 | Country Leader | `/country-leader` | Country rankings |
| 20 | World Leader | `/world-leader` | Global rankings |
| 21 | Own Activity | `/own-activity` | Create your activity |

**Total Pages: 21**

---

## 5. Navigation Guide

### 5.1 Desktop Navigation

On desktop (screens wider than 768px), the navigation bar displays horizontally at the top:

```
┌─────────────────────────────────────────────────────────┐
│  User Profile    [🏠 Home] [👤 Profile] [✏️ Edit] [⚙️ Settings] │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Mobile Navigation

On mobile devices, tap the hamburger menu (☰) to open the side navigation:

```
┌──────────────────┐
│              ✕   │
│                  │
│  🏠 Home         │ ← Green highlighted
│                  │
│  👤 Profile      │
│                  │
│  ✏️ Edit         │
│                  │
│  ⚙️ Settings     │
│                  │
└──────────────────┘
```

### 5.3 Navigation Flow

```
Splash Page
    │
    ▼
Login Page ──────────► Register Page
    │                       │
    ▼                       ▼
Home Page ◄─────────────────┘
    │
    ├──► Find Activity
    ├──► Profile ──► Edit Profile
    ├──► View Activity (Activities List)
    ├──► Refer/Request ──► Friend Requests
    ├──► View Points (Points Table)
    │       ├──► Donate
    │       ├──► Convert
    │       └──► Transfer
    ├──► Leaders Overview
    │       ├──► Country Leader
    │       └──► World Leader
    └──► Own Activity
```

---

## 6. Points System

### 6.1 Understanding Points

Points are the virtual currency in the app. You can:

| Action | Description |
|--------|-------------|
| **Earn** | Complete activities, referrals, daily login |
| **Donate** | Give points to charities or causes |
| **Transfer** | Send points to other users |
| **Convert** | Exchange points for real currency |
| **Utilize** | Redeem for rewards |

### 6.2 Points Breakdown

Access via **Home → View Points**

```
┌─────────────────────────────────────┐
│      Points Breakdown Table         │
├─────────────────────────────────────┤
│  Total Points          1500         │
│  Donate                 250         │
│  Utilized               700         │
│  Available              550         │
├─────────────────────────────────────┤
│         [Convert]                   │
│         [Donate]                    │
└─────────────────────────────────────┘
```

### 6.3 Donating Points

1. Go to **Home → Donate**
2. Search for a recipient or charity
3. Enter the amount to donate
4. Add an optional message
5. Click "Donate"

### 6.4 Transferring Points

1. Go to **Home → Transfer Points**
2. Search for a friend by name or ID
3. Enter the transfer amount
4. Add an optional note
5. Click "Transfer"

### 6.5 Converting Points to Currency

1. Go to **Home → Convert Currency**
2. Enter the points amount
3. Select target currency:
   - USD (100 points = $1.00)
   - EUR (100 points = €0.90)
   - GBP (100 points = £0.80)
   - INR (100 points = ₹83.00)
4. Click "Convert"

---

## 7. Activities Management

### 7.1 Viewing Activities

**Home → View Activity**

Activities are displayed as cards showing:
- Activity name
- Date
- Status (Approved/Pending)

### 7.2 Finding Activities

**Home → Find Activity**

1. Enter search keywords
2. Filter by type (fitness, social, volunteer, education)
3. Browse results
4. Click to view details

### 7.3 Creating Your Own Activity

**Home → Own Activity**

Fill in the form:
- Activity Name
- Description
- Date & Time
- Location
- Max Participants
- Points Reward

Submit for approval.

### 7.4 Joining Activities

1. Find an activity
2. Click on it to view details
3. Click "Join Activity"
4. You'll receive points upon completion

### 7.5 Inviting Friends

**Home → Refer/Request → Invite**

1. Select an activity
2. Choose friends to invite
3. Add a personal message
4. Send invitations

---

## 8. Leaderboards

### 8.1 Accessing Leaderboards

**Home → Leaders Overview**

Choose between:
- 🌍 **World Leader** - Global rankings
- 🏳️ **Country Leader** - Your country's rankings

### 8.2 World Leaderboard

Shows top users globally:

```
┌──────────────────────────────────────────┐
│           World Leaderboard              │
├──────────────────────────────────────────┤
│  🏆 1. Ravi Kumar (India)      16,500    │
│  🥈 2. Priya Sharma (India)    15,800    │
│  🥉 3. Alex Johnson (USA)      15,420    │
│     4. Sarah Williams (USA)    14,850    │
│     5. Amit Patel (India)      14,500    │
└──────────────────────────────────────────┘
```

### 8.3 Country Leaderboard

1. Select your country from dropdown
2. View top 10 users in that country
3. See your rank within the country

---

## 9. Profile Management

### 9.1 Viewing Your Profile

**Navigation → Profile**

Your profile displays:
- Avatar/Photo
- Name & Title
- Location
- Bio
- Stats (Posts, Followers, Following)
- Contact Information
- Social Links

### 9.2 Editing Your Profile

**Navigation → Edit**

Editable fields:
- **Basic Info:** Name, Title, Location, Bio
- **Contact:** Email, Phone, Website
- **Social:** Twitter, LinkedIn, GitHub

Steps:
1. Click "Edit Profile" or navigate to Edit page
2. Update your information
3. Click "Save Changes"
4. Changes are saved automatically

### 9.3 Profile Data Persistence

Your profile data is stored in:
1. **LocalStorage** - For offline access
2. **Backend API** - For cross-device sync (when authenticated)

---

## 10. Settings

### 10.1 Accessing Settings

**Navigation → Settings**

### 10.2 Notification Settings

| Setting | Description |
|---------|-------------|
| Email Notifications | Receive updates via email |
| Push Notifications | Browser push alerts |
| SMS Notifications | Text message alerts |
| Weekly Digest | Weekly activity summary |
| Marketing Emails | Promotional content |

### 10.3 Account Settings

| Setting | Options |
|---------|---------|
| Language | English, Spanish, French, German, Chinese |
| Timezone | UTC, Eastern, Central, Mountain, Pacific, India |
| Theme | Light, Dark, Auto (System) |

### 10.4 Privacy Settings

| Setting | Options |
|---------|---------|
| Profile Visibility | Public, Friends Only, Private |
| Show Email | On/Off |
| Show Phone | On/Off |

### 10.5 Danger Zone

⚠️ **Caution:** These actions are irreversible!

- **Deactivate Account** - Temporarily disable your account
- **Delete Account** - Permanently remove all data

---

## 11. Backend API Reference

### 11.1 API Overview

The app uses Netlify Serverless Functions for backend operations.

**Base URL:** `https://your-site.netlify.app/api`

### 11.2 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/verify` | Verify token |

### 11.3 User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get profile |
| PUT | `/api/users/:id` | Update profile |
| DELETE | `/api/users/:id` | Delete account |

### 11.4 Points Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/points/` | Get points |
| GET | `/api/points/history` | Get history |
| GET | `/api/points/rates` | Get conversion rates |
| POST | `/api/points/add` | Add points |
| POST | `/api/points/donate` | Donate points |
| POST | `/api/points/transfer` | Transfer points |
| POST | `/api/points/convert` | Convert to currency |

### 11.5 Activities Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities/` | List activities |
| GET | `/api/activities/my` | My activities |
| GET | `/api/activities/:id` | Get activity |
| POST | `/api/activities/` | Create activity |
| PUT | `/api/activities/:id` | Update activity |
| DELETE | `/api/activities/:id` | Delete activity |
| POST | `/api/activities/:id/join` | Join |
| POST | `/api/activities/:id/leave` | Leave |
| POST | `/api/activities/:id/invite` | Invite friends |

### 11.6 Leaderboard Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaderboard/` | Top 10 world |
| GET | `/api/leaderboard/world` | World leaderboard |
| GET | `/api/leaderboard/country/:code` | Country leaderboard |
| GET | `/api/leaderboard/countries` | List countries |
| GET | `/api/leaderboard/user/:id` | User's rank |

### 11.7 Using the API

```javascript
// Import API service
import api from './services/api';

// Authentication
await api.auth.login('email@example.com', 'password');
await api.auth.register({ username, email, password, name });
await api.auth.logout();

// Points
const { points } = await api.points.getPoints();
await api.points.donate(100, 'Charity');
await api.points.transfer(50, 'friend-id');
await api.points.convert(1000, 'USD');

// Activities
const { activities } = await api.activities.getAll();
await api.activities.create({ name, date, location });
await api.activities.join('activity-id');

// Leaderboard
const { leaders } = await api.leaderboard.getWorld();
```

---

## 12. Deployment Guide

### 12.1 Prerequisites

- GitHub account
- Netlify account
- Git installed locally

### 12.2 Deploy to Netlify

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Step 2: Connect to Netlify**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select "Deploy with GitHub"
4. Choose your repository

**Step 3: Configure Build Settings**
```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

**Step 4: Deploy**
- Click "Deploy site"
- Wait 2-3 minutes for build
- Your site is live!

### 12.3 Auto-Deployment

After initial setup, every push to GitHub automatically:
1. Triggers a new build
2. Deploys frontend
3. Updates serverless functions
4. Goes live in ~2 minutes

### 12.4 Environment Variables

Set in Netlify Dashboard → Site Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `NODE_VERSION` | `18` (Node.js version) |
| `JWT_SECRET` | Your secret key (production) |
| `DATABASE_URL` | Database connection (production) |

---

## 13. Local Development

### 13.1 Requirements

- Node.js 18+
- npm or yarn
- Git

### 13.2 Setup

```bash
# Clone repository
git clone https://github.com/your-username/your-repo.git
cd user-profile-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 13.3 Running with Backend (Netlify Dev)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run with functions
netlify dev
```

This starts:
- Frontend: `http://localhost:8888`
- Functions: `http://localhost:8888/.netlify/functions/`

### 13.4 Project Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `netlify dev` | Run with serverless functions |

---

## 14. Troubleshooting

### 14.1 Common Issues

**Issue: Page not loading**
- Clear browser cache
- Check internet connection
- Try a different browser

**Issue: Login not working**
- Verify email/password
- Clear LocalStorage
- Check network requests

**Issue: Points not updating**
- Refresh the page
- Check API response
- Verify sufficient balance

**Issue: Mobile menu not opening**
- Ensure JavaScript is enabled
- Try refreshing
- Clear cache

### 14.2 Error Messages

| Error | Solution |
|-------|----------|
| "Invalid credentials" | Check email/password |
| "Insufficient points" | You don't have enough available points |
| "Activity not found" | Activity may have been deleted |
| "Network error" | Check internet connection |

### 14.3 Getting Help

1. Check this manual
2. Review `BACKEND_API_GUIDE.md`
3. Check browser console for errors
4. Contact support

---

## 15. Technical Specifications

### 15.1 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | CSS3 + CSS Variables |
| Routing | React Router DOM |
| State | React Context + useState |
| Storage | LocalStorage + API |
| Backend | Netlify Serverless Functions |
| Hosting | Netlify CDN |

### 15.2 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome | 90+ |
| Mobile Safari | 14+ |

### 15.3 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| < 360px | Extra small phones |
| < 480px | Mobile phones |
| < 768px | Tablets |
| < 1024px | Small laptops |
| ≥ 1024px | Desktop |

### 15.4 File Structure

```
user-profile-app/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── netlify.toml            # Netlify configuration
├── netlify/
│   └── functions/          # Serverless functions
│       ├── auth.js
│       ├── users.js
│       ├── points.js
│       ├── activities.js
│       └── leaderboard.js
├── public/
│   └── manifest.json       # PWA manifest
├── src/
│   ├── main.jsx            # App entry point
│   ├── App.jsx             # Root component
│   ├── App.css             # Global styles
│   ├── index.css           # CSS variables
│   ├── components/         # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── ProfileCard.jsx
│   │   └── InfoSection.jsx
│   ├── pages/              # Page components (21 pages)
│   ├── context/            # React Context
│   │   └── UserContext.jsx
│   ├── services/           # API services
│   │   └── api.js
│   └── utils/              # Utilities
│       └── storage.js
└── docs/                   # Documentation
    ├── USER_MANUAL.md
    ├── BACKEND_API_GUIDE.md
    └── DATA_STORAGE_GUIDE.md
```

### 15.5 Performance

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | 90+ |
| Bundle Size | < 200KB (gzipped) |

---

## 📞 Support & Resources

### Documentation Files

| File | Description |
|------|-------------|
| `USER_MANUAL.md` | This complete user guide |
| `BACKEND_API_GUIDE.md` | API documentation |
| `DATA_STORAGE_GUIDE.md` | Storage implementation |
| `DEPLOYMENT.md` | Deployment instructions |
| `QUICK_DEPLOY.md` | Quick deployment guide |
| `README.md` | Project overview |

### Quick Links

- **Live App:** `https://your-site.netlify.app`
- **GitHub:** `https://github.com/your-username/your-repo`
- **Netlify Dashboard:** `https://app.netlify.com`

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2024 | Initial release with frontend |
| 1.5 | Dec 2024 | Added mobile responsiveness |
| 2.0 | Dec 2024 | Added Netlify backend functions |

---

**© 2024 User Profile App. All rights reserved.**

*This manual was generated on December 3, 2024*

